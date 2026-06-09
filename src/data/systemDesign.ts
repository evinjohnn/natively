// Data source for programmatic /system-design/<product> walk-through pages.
//
// Rendered by src/pages/programmatic/SystemDesignPage.tsx via SEOTemplate. Quality
// gate: each entry is a hand-written, genuinely useful design walk-through (unique
// intro + requirements + a real component breakdown + scaling notes), never a
// templated stub. To add one: append here AND register the route in routes.tsx,
// App.tsx, scripts/prerender.js, and sitemap.xml.

export interface DesignSection {
  heading: string;
  /** One or more plain-text paragraphs. */
  body: string[];
  /** Optional bullet list rendered after the paragraphs. */
  bullets?: string[];
}

export interface SystemDesignCase {
  path: string;
  product: string;
  title: string;
  description: string;
  h1: string;
  intro: string[];
  sections: DesignSection[];
  related: { to: string; label: string }[];
}

export const SYSTEM_DESIGN_CASES: SystemDesignCase[] = [
  {
    path: "/system-design/uber",
    product: "Uber",
    title: "System Design: Uber (Ride-Hailing) — Interview Walk-Through",
    description:
      "How to design a ride-hailing system like Uber in a system design interview: requirements, geospatial matching, real-time location, scaling, and the trade-offs interviewers want to hear.",
    h1: "System Design Interview: Design Uber",
    intro: [
      "\"Design Uber\" is one of the most common system design prompts because it touches geospatial indexing, real-time location streaming, matching, and high write throughput all at once. The interviewer isn't looking for the real Uber architecture — they want to see you scope the problem, make defensible choices, and reason about scale out loud.",
      "Work it in a deliberate order: clarify requirements, estimate scale, sketch the core entities and APIs, design the data and the matching path, then talk through bottlenecks and trade-offs. The walk-through below follows that order so you can practice the structure, not just the answer.",
    ],
    sections: [
      {
        heading: "1. Clarify requirements",
        body: [
          "Separate functional from non-functional, and pin scope before designing. Riders request a ride and see a driver approach in real time; drivers go online and receive nearby requests; the system matches them and tracks the trip to completion.",
        ],
        bullets: [
          "Functional: request a ride, match to a nearby driver, live-track the trip, fare calculation, trip history.",
          "Non-functional: low-latency matching (seconds), high availability, real-time location updates, consistency of a driver being assigned to exactly one rider.",
          "Out of scope (say so): payments processing internals, ratings, surge ML — mention them, then defer.",
        ],
      },
      {
        heading: "2. Estimate scale",
        body: [
          "Back-of-envelope numbers justify later choices. Assume ~10M daily active drivers sending a location ping every 4 seconds — that's ~2.5M writes/second of location data, a write-heavy workload that immediately rules out a naive relational table as the hot path.",
        ],
      },
      {
        heading: "3. Core components and APIs",
        body: [
          "Sketch the services and the request flow. Keep the matching path independent from the durable trip store so each can scale on its own characteristics.",
        ],
        bullets: [
          "Location service: ingests driver pings, keeps current positions in an in-memory geospatial index.",
          "Matching service: on a ride request, queries nearby online drivers and assigns one.",
          "Trip service: durable record of trip lifecycle (requested → matched → ongoing → completed).",
          "Notification/streaming: pushes live driver position to the rider (WebSocket/long-poll).",
        ],
      },
      {
        heading: "4. Geospatial matching — the heart of the problem",
        body: [
          "This is what the interviewer most wants to hear. Storing raw lat/long and scanning is O(n); you need a spatial index. Explain quadtrees or geohashing: divide the map into cells so 'find drivers near this point' becomes a lookup of a few cells, not a full scan.",
          "Geohashing encodes a region into a short string where shared prefixes mean spatial proximity, which makes 'nearby' a prefix query. Drivers' current cells live in an in-memory store (e.g. Redis) for fast reads and frequent updates; cell granularity is a tunable trade-off between precision and fan-out.",
        ],
      },
      {
        heading: "5. Scaling and bottlenecks",
        body: [
          "Name the pressure points and how you'd relieve them. The 2.5M writes/second location stream is the dominant one.",
        ],
        bullets: [
          "Shard the location index geographically — a city's drivers and riders are handled by the same shard, keeping matching local.",
          "Absorb the write spike with an in-memory store and async durable writes; you don't need every ping in a durable DB.",
          "Ensure one-driver-one-rider with an atomic assignment (a lock or conditional update) to avoid double-booking.",
          "Use a message queue (Kafka) between location ingestion and downstream consumers to decouple spikes.",
        ],
      },
      {
        heading: "6. Trade-offs to verbalize",
        body: [
          "Close by naming the tensions an interviewer rewards: strong vs eventual consistency (driver assignment must be strong; location display can be eventual), in-memory speed vs durability, and cell-size precision vs query fan-out. Stating these explicitly is the difference between a passing and a strong answer.",
        ],
      },
    ],
    related: [
      { to: "/system-design-interview-assistant", label: "System Design Interview Assistant" },
      { to: "/system-design/whatsapp", label: "System Design: WhatsApp" },
      { to: "/system-design/netflix", label: "System Design: Netflix" },
      { to: "/system-design/twitter", label: "System Design: Twitter" },
    ],
  },
  {
    path: "/system-design/whatsapp",
    product: "WhatsApp",
    title: "System Design: WhatsApp (Chat) — Interview Walk-Through",
    description:
      "How to design a messaging system like WhatsApp in a system design interview: real-time delivery, message storage, online presence, group chat, and the trade-offs interviewers expect.",
    h1: "System Design Interview: Design WhatsApp",
    intro: [
      "\"Design WhatsApp\" tests real-time delivery at massive scale, durable message storage, presence (online/last-seen), and the connection-management problem of keeping hundreds of millions of devices live. As always, the interviewer wants your reasoning and trade-offs, not a copy of the real system.",
      "Move through it methodically: clarify requirements, estimate scale, design the connection and delivery path, decide how messages are stored, then handle group chat and the hard edges like offline delivery and ordering. The walk-through below follows that path.",
    ],
    sections: [
      {
        heading: "1. Clarify requirements",
        body: [
          "Pin down scope first. The core is one-to-one messaging with reliable delivery; clarify whether group chat, media, and end-to-end encryption are in scope for this round.",
        ],
        bullets: [
          "Functional: send/receive messages, delivery + read receipts, online presence, group chat, offline delivery when a recipient is disconnected.",
          "Non-functional: low latency, high availability, durability (no lost messages), ordering within a conversation.",
          "Clarify: E2E encryption and media handling — acknowledge them, scope in or out explicitly.",
        ],
      },
      {
        heading: "2. Estimate scale",
        body: [
          "Set the numbers that drive design. Assume ~2B users and tens of billions of messages per day; that's hundreds of thousands of messages per second at peak, and hundreds of millions of simultaneously-connected devices — connection management becomes a first-class problem.",
        ],
      },
      {
        heading: "3. Connection and delivery path",
        body: [
          "Messaging needs a persistent connection, not request/response polling. Devices hold an open WebSocket to a gateway server. A central component must know which gateway currently holds each user's connection so a message can be routed to the right server.",
        ],
        bullets: [
          "WebSocket gateway: maintains live device connections, handles send/receive.",
          "Session/presence registry: maps user → current gateway server (e.g. in Redis), updated on connect/disconnect.",
          "Message routing: sender's gateway looks up the recipient's gateway and forwards; if offline, the message is queued.",
        ],
      },
      {
        heading: "4. Message storage and offline delivery",
        body: [
          "Messages must survive a disconnected recipient. Persist each message durably and track per-recipient delivery state; deliver immediately if the recipient is online, otherwise store-and-forward when they reconnect.",
          "A write-heavy, key-by-conversation access pattern favors a wide-column store like Cassandra (high write throughput, horizontal scale) over a single relational DB. Once a message is confirmed delivered to all recipients, it can be deleted or aged out, since WhatsApp doesn't retain delivered messages server-side indefinitely.",
        ],
      },
      {
        heading: "5. Group chat",
        body: [
          "Group messaging is fan-out: one send becomes N deliveries. For typical group sizes, fan-out-on-write (push to each member's delivery path) is simple and fast to read. Note the trade-off — very large groups make fan-out-on-write expensive, which is why huge broadcast groups are a different design problem.",
        ],
      },
      {
        heading: "6. Trade-offs to verbalize",
        body: [
          "Finish on the tensions: ordering (per-conversation sequence numbers vs global ordering), consistency vs availability for receipts (eventual is fine for 'last seen', stronger for delivery), and fan-out-on-write vs on-read for groups. Calling these out is what makes the answer senior.",
        ],
      },
    ],
    related: [
      { to: "/system-design-interview-assistant", label: "System Design Interview Assistant" },
      { to: "/system-design/uber", label: "System Design: Uber" },
      { to: "/system-design/netflix", label: "System Design: Netflix" },
      { to: "/system-design/twitter", label: "System Design: Twitter" },
    ],
  },
  {
    path: "/system-design/netflix",
    product: "Netflix",
    title: "System Design: Netflix (Video Streaming) — Interview Walk-Through",
    description:
      "How to design a video streaming service like Netflix in a system design interview: ingestion, transcoding, CDN delivery, adaptive bitrate, and the trade-offs interviewers want.",
    h1: "System Design Interview: Design Netflix",
    intro: [
      "\"Design Netflix\" is a read-heavy streaming problem dominated by one fact: serving video at global scale is a content-delivery and storage problem far more than a compute one. The interviewer wants to see you separate the control plane (browsing, search, recommendations) from the data plane (actually streaming bytes) and reason about delivering petabytes close to users.",
      "Work it in order: clarify requirements, estimate scale, design the upload/transcode pipeline, then the playback path through a CDN, and finish on adaptive bitrate and trade-offs. The walk-through below follows that structure so you can practice the reasoning, not memorize an architecture.",
    ],
    sections: [
      {
        heading: "1. Clarify requirements",
        body: [
          "Separate functional from non-functional and scope tightly. The core is: users browse a catalog and stream video smoothly across devices and network conditions.",
        ],
        bullets: [
          "Functional: browse/search the catalog, start playback, adaptive quality, resume where you left off, multi-device.",
          "Non-functional: very high availability, low startup latency, smooth playback (no rebuffering), global reach.",
          "Out of scope (say so): the recommendation ML internals, billing, DRM specifics — name them, then defer.",
        ],
      },
      {
        heading: "2. Estimate scale",
        body: [
          "Numbers justify the CDN-first design. Assume hundreds of millions of subscribers and many millions of concurrent streams at peak. A single stream is multiple Mbps, so aggregate egress is tens of terabits per second — impossible to serve from a few central data centers, which immediately motivates edge caching.",
        ],
      },
      {
        heading: "3. Ingestion and transcoding pipeline",
        body: [
          "Uploaded masters are processed offline, not on the playback path. Each title is transcoded into many renditions — multiple resolutions and bitrates — and segmented into small chunks (a few seconds each) for adaptive streaming.",
        ],
        bullets: [
          "Transcoding farm: convert the master into H.264/H.265/AV1 renditions at several bitrates; this is embarrassingly parallel batch work.",
          "Segmentation + packaging: split each rendition into short segments with a manifest (HLS/DASH) describing them.",
          "Store outputs in object storage (e.g. S3-like) as the origin of truth, then push popular content to the edge.",
        ],
      },
      {
        heading: "4. CDN and the playback path",
        body: [
          "Playback is served from the edge, not the origin. Video segments are cached on CDN nodes physically close to users (Netflix runs its own Open Connect appliances inside ISPs). The client fetches the manifest, then pulls segments from the nearest healthy edge node.",
          "The control plane (catalog, search, user profiles, 'continue watching') is a separate set of stateless API services backed by their own databases and caches — it returns metadata and a manifest URL, and is completely decoupled from the heavy byte delivery.",
        ],
        bullets: [
          "Edge cache (CDN/Open Connect): serves the vast majority of bytes; pre-positions popular titles by region ahead of demand.",
          "Origin storage: object store that backs cache misses.",
          "Control-plane APIs: catalog, playback authorization, bookmarks — small payloads, horizontally scaled, cache-fronted.",
        ],
      },
      {
        heading: "5. Adaptive bitrate streaming",
        body: [
          "Smooth playback under variable networks comes from the client, not the server. The player monitors throughput and buffer level and switches segment quality up or down between segments using the manifest's rendition list — higher bitrate on fast connections, lower to avoid rebuffering on slow ones.",
        ],
      },
      {
        heading: "6. Trade-offs to verbalize",
        body: [
          "Close on the tensions an interviewer is listening for: precompute-all-renditions storage cost vs on-the-fly transcoding latency (Netflix precomputes — storage is cheaper than startup delay); cache-everything vs cache-popular at the edge (a long-tail catalog can't all live at every edge); and strong vs eventual consistency for control-plane data like 'continue watching' (eventual is fine). Naming these is what makes the answer senior.",
        ],
      },
    ],
    related: [
      { to: "/system-design-interview-assistant", label: "System Design Interview Assistant" },
      { to: "/system-design/twitter", label: "System Design: Twitter" },
      { to: "/system-design/uber", label: "System Design: Uber" },
      { to: "/interview-questions/software-engineer", label: "Software Engineer Interview Questions" },
    ],
  },
  {
    path: "/system-design/twitter",
    product: "Twitter",
    title: "System Design: Twitter (Timeline) — Interview Walk-Through",
    description:
      "How to design a social feed like Twitter/X in a system design interview: tweet storage, timeline generation, fan-out, the celebrity problem, and the trade-offs interviewers expect.",
    h1: "System Design Interview: Design Twitter",
    intro: [
      "\"Design Twitter\" is the canonical feed-generation problem. It looks simple — post a tweet, read a timeline — but the interesting part is generating each user's home timeline at scale, where the right answer is a hybrid fan-out strategy. The interviewer wants to see you discover that the naive approaches both break, and reason your way to the blend.",
      "Move through it deliberately: clarify requirements, estimate the read/write ratio, design tweet storage, then the timeline — comparing fan-out-on-write vs fan-out-on-read and arriving at the hybrid that handles the celebrity problem. The walk-through below follows that path.",
    ],
    sections: [
      {
        heading: "1. Clarify requirements",
        body: [
          "Scope to the core feed problem. Users post tweets, follow others, and read a home timeline that merges tweets from everyone they follow, newest-first.",
        ],
        bullets: [
          "Functional: post a tweet, follow/unfollow, home timeline (people you follow), user timeline (one author), basic search out of scope unless asked.",
          "Non-functional: very read-heavy, low-latency timeline reads, high availability; eventual consistency for the timeline is acceptable.",
          "Clarify: media, replies/threads, and ranking — acknowledge, then scope a chronological feed for this round.",
        ],
      },
      {
        heading: "2. Estimate scale and the read/write ratio",
        body: [
          "The ratio drives the whole design. Reads vastly outnumber writes — users scroll their timeline far more often than they post. With hundreds of millions of users, the system must make timeline reads cheap even if that makes writes more expensive. That single observation points toward precomputing timelines.",
        ],
      },
      {
        heading: "3. Tweet storage",
        body: [
          "Tweets themselves are simple, append-heavy data. Store them in a horizontally-partitioned store keyed by tweet ID (with a time-sortable ID like a Snowflake ID so ordering is embedded). A separate social graph store holds follower/following relationships.",
        ],
        bullets: [
          "Tweets: distributed store, sharded by tweet ID; time-sortable IDs give cheap chronological ordering.",
          "Social graph: who-follows-whom, optimized for 'get all followers of X' and 'get all followees of X'.",
          "A cache (Redis) holds hot data — recent tweets and precomputed timelines.",
        ],
      },
      {
        heading: "4. Timeline generation: fan-out on write vs read",
        body: [
          "This is the heart of the problem. Fan-out-on-write (push) inserts each new tweet into every follower's precomputed timeline list at post time — timeline reads become a cheap cache lookup, but a post by someone with millions of followers triggers millions of writes. Fan-out-on-read (pull) builds the timeline at read time by merging recent tweets from everyone you follow — cheap writes, but expensive, slow reads for users following many accounts.",
        ],
        bullets: [
          "Fan-out-on-write: fast reads, expensive writes; great for normal users.",
          "Fan-out-on-read: cheap writes, expensive reads; needed for accounts with huge follower counts.",
        ],
      },
      {
        heading: "5. The celebrity problem and the hybrid",
        body: [
          "Neither pure approach wins, so combine them. Use fan-out-on-write for the vast majority of users, but for 'celebrity' accounts with very large follower counts, do NOT fan out their tweets on write. Instead, at read time, merge a follower's precomputed timeline with a live pull of the few celebrities they follow. This caps the write amplification while keeping reads fast — the answer interviewers are listening for.",
        ],
      },
      {
        heading: "6. Trade-offs to verbalize",
        body: [
          "Finish on the tensions: write amplification vs read latency (the whole fan-out decision), the storage cost of precomputed timelines vs recomputing them, and consistency — a few seconds of delay before a tweet appears in followers' timelines is acceptable, so eventual consistency lets you scale. Explicitly stating the hybrid's threshold (how you classify a 'celebrity') shows senior judgment.",
        ],
      },
    ],
    related: [
      { to: "/system-design-interview-assistant", label: "System Design Interview Assistant" },
      { to: "/system-design/netflix", label: "System Design: Netflix" },
      { to: "/system-design/whatsapp", label: "System Design: WhatsApp" },
      { to: "/interview-questions/software-engineer", label: "Software Engineer Interview Questions" },
    ],
  },
];

export const DESIGN_BY_PATH: Record<string, SystemDesignCase> = Object.fromEntries(
  SYSTEM_DESIGN_CASES.map((c) => [c.path, c]),
);
