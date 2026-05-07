import LegalPage, { legalProse as P, Callout } from "@/components/LegalPage";
import { Link } from "react-router-dom";

interface Props {
  canonicalPath?: string;
}

const TOC = [
  { id: "1-about-the-service", label: "1. About the Service" },
  { id: "2-eligibility-and-account", label: "2. Eligibility & account" },
  { id: "3-natively-pro-license", label: "3. Natively Pro — license" },
  { id: "4-natively-api-service", label: "4. Natively API — service" },
  { id: "5-free-trial", label: "5. Free Trial" },
  { id: "6-pricing-and-payment", label: "6. Pricing & payment" },
  { id: "7-refunds", label: "7. Refunds" },
  { id: "8-your-data", label: "8. Your data" },
  { id: "9-third-party-services", label: "9. Third-party services" },
  { id: "10-acceptable-use", label: "10. Acceptable use (everywhere)" },
  { id: "11-ai-outputs", label: "11. AI outputs & user responsibility" },
  { id: "12-honest-feedback-vs-defamation", label: "12. Honest feedback vs. defamation" },
  { id: "13-intellectual-property", label: "13. Intellectual property" },
  { id: "14-disclaimers", label: "14. Disclaimers" },
  { id: "15-force-majeure", label: "15. Force majeure" },
  { id: "16-limitation-of-liability", label: "16. Limitation of liability" },
  { id: "17-indemnity", label: "17. Indemnity" },
  { id: "18-termination", label: "18. Termination" },
  { id: "19-notices", label: "19. Notices" },
  { id: "20-governing-law-and-dispute-resolution", label: "20. Governing law & dispute resolution" },
  { id: "21-general", label: "21. General" },
  { id: "22-changes", label: "22. Changes to the Service and these Terms" },
  { id: "23-contact", label: "23. Contact" },
];

export default function TermsAndConditions({ canonicalPath = "/termsandconditions" }: Props) {
  return (
    <LegalPage
      title="Terms & Conditions — Natively"
      heading="Terms & Conditions"
      description="Terms governing the Natively desktop app, Natively Pro, and the Natively API."
      canonicalPath={canonicalPath}
      lastUpdated="7 May 2026"
      toc={TOC}
    >
      <p className={P.p}>
        These Terms &amp; Conditions ("<strong className={P.strong}>Terms</strong>") govern your use of <strong className={P.strong}>Natively</strong> — including the Natively desktop application, the <strong className={P.strong}>Natively Pro</strong> licensed features, and the <strong className={P.strong}>Natively API</strong> managed service (together, the "<strong className={P.strong}>Service</strong>").
      </p>
      <p className={P.p}>
        By installing the app, clicking "Continue" on the startup screen, activating a Pro license, saving a Natively API key, or otherwise using the Service, you <strong className={P.strong}>agree to these Terms</strong> and to the{" "}
        <Link to="/refundpolicy" className={P.a}>Refund Policy</Link>{" "}and{" "}
        <Link to="/privacy" className={P.a}>Privacy Policy</Link>, each of which is incorporated by reference. If you don't agree to all of them, please don't use the Service.
      </p>
      <p className={P.p}>
        The Service is built and operated by a single developer ("<strong className={P.strong}>Natively</strong>", "<strong className={P.strong}>we</strong>", "<strong className={P.strong}>us</strong>"). We've tried to write these Terms in plain English. If anything is unclear, email <strong className={P.strong}><a href="mailto:natively.contact@gmail.com" className={P.a}>natively.contact@gmail.com</a></strong>. We aim to reply within <strong className={P.strong}>24–72 hours on weekdays</strong>. We may not respond on weekends or Indian public holidays.
      </p>

      <Callout>
        <p className="font-semibold text-[#111827]">
          Please read sections{" "}
          <a href="#11-ai-outputs" className={P.a}>11 (AI outputs)</a>,{" "}
          <a href="#12-honest-feedback-vs-defamation" className={P.a}>12 (honest feedback vs. defamation)</a>,{" "}
          <a href="#14-disclaimers" className={P.a}>14 (disclaimers)</a>,{" "}
          <a href="#16-limitation-of-liability" className={P.a}>16 (limitation of liability)</a>, and{" "}
          <a href="#20-governing-law-and-dispute-resolution" className={P.a}>20 (governing law &amp; dispute resolution)</a>{" "}
          carefully — they limit our liability, restrict the kind of statements you can make about us, and require disputes to be resolved in a specific way.
        </p>
      </Callout>

      <hr className={P.hr} />

      <h2 id="1-about-the-service" className={P.h2}>1. About the Service</h2>

      <h3 id="1-1-what-natively-is" className={P.h3}>1.1 What Natively is</h3>
      <p className={P.p}>
        Natively is a desktop assistant that captures audio and screen content on your device, processes it through AI models, and presents helpful responses in real time. The app integrates a wide range of third-party services — AI providers, speech-to-text engines, search APIs, payment processors, and OS-level audio &amp; screen-capture frameworks — to deliver these features.
      </p>

      <h3 id="1-2-the-two-paid-products" className={P.h3}>1.2 The two paid products</h3>
      <ul className={P.ul}>
        <li><strong className={P.strong}>Natively Pro</strong> — a per-user license that unlocks premium features inside the desktop app (such as Profile Engine, Resume Intelligence, Context Intelligence, Negotiation Coaching, JD Intelligence, and Company Research). Sold as a one-time purchase or a subscription, depending on the plan.</li>
        <li><strong className={P.strong}>Natively API</strong> — a managed service that provides AI, speech-to-text, and search quotas through a single Natively-issued API key. Billed as a recurring subscription.</li>
      </ul>
      <p className={P.p}>
        You may use the desktop app with your own provider keys (BYOK) without buying either of the paid products.
      </p>

      <h3 id="1-3-reliability" className={P.h3}>1.3 Heads-up on reliability</h3>
      <p className={P.p}>
        Because Natively integrates many third-party services, the surface area is wider than a typical closed-source product, and once in a while something may not behave exactly as expected. We treat reports as a priority and ship fixes regularly, often in the next update. <strong className={P.strong}>Please report bugs at <code className={P.code}>natively.contact@gmail.com</code> rather than opening a payment dispute or publicly characterising a bug as misconduct</strong> — see <a href="#12-honest-feedback-vs-defamation" className={P.a}>section 12</a> (honest feedback vs. defamation) and the <Link to="/refundpolicy" className={P.a}>Refund Policy</Link> for more.
      </p>

      <h3 id="1-4-beta-preview" className={P.h3}>1.4 Beta &amp; preview features</h3>
      <p className={P.p}>
        Some features are explicitly marked <strong className={P.strong}>Beta</strong> (for example, the Phone Mirror) or are offered as <strong className={P.strong}>preview</strong> / <strong className={P.strong}>early access</strong>. These features are provided <strong className={P.strong}>as-is</strong>, may change or be removed without notice, may be unstable or incomplete, are not covered by any service-level commitment, and are excluded from any refund or credit consideration. Use of Beta or preview features is at your own risk.
      </p>

      <h3 id="1-5-phone-mirror" className={P.h3}>1.5 Phone Mirror — additional terms</h3>
      <p className={P.p}>
        The Phone Mirror feature pairs your desktop app to a phone over your local or cellular network. You are responsible for the security of any device you pair, for the secrecy of any pairing code or short-lived token shown during pairing, and for the network on which pairing happens. Pairing tokens should not be shared, screenshotted publicly, or pasted into untrusted environments. We do not store the contents of phone-mirror sessions on our servers.
      </p>

      <h3 id="1-6-no-reliance" className={P.h3}>1.6 No reliance on roadmap, marketing, or future features</h3>
      <p className={P.p}>
        Marketing materials, roadmaps, demo videos, social-media posts, blog content, screenshots in app-store listings, and any statements about features that are unreleased, in development, or planned are <strong className={P.strong}>forward-looking and non-binding</strong>. Your purchase or continued use of the Service must be based on the features available <strong className={P.strong}>at the time of purchase</strong>, not on any expectation of future features, performance, integrations, capabilities, or pricing.
      </p>

      <h3 id="1-7-sunset" className={P.h3}>1.7 If we ever discontinue the Service (sunset)</h3>
      <p className={P.p}>
        We hope this never happens, but you deserve to know what would. If we decide to <strong className={P.strong}>discontinue</strong> the Service:
      </p>
      <ul className={P.ul}>
        <li>We'll give at least <strong className={P.strong}>30 days' advance notice</strong> by in-app notice and/or email to your account address before access is turned off.</li>
        <li>For users on <strong className={P.strong}>active paid subscriptions</strong> (Pro Yearly, Natively API monthly), we'll either continue access through the end of your current paid term, <strong className={P.strong}>or</strong> issue a pro-rata refund for the unused remainder, at our choice.</li>
        <li>For users who bought a <strong className={P.strong}>lifetime / one-time Pro license</strong>, we'll provide reasonable continued access where technically feasible (for example, by releasing a final build with the license-server check disabled, or by issuing a perpetual offline-validatable license file). Where that isn't feasible, we may offer a partial credit at our discretion.</li>
        <li>After sunset, sections of these Terms that by their nature should survive (data, IP, disclaimers, liability, indemnity, governing law) will continue to apply.</li>
      </ul>
      <p className={P.p}>
        This section is not a guarantee of indefinite operation; it sets out what we'd do in good faith if discontinuation became necessary.
      </p>

      <hr className={P.hr} />

      <h2 id="2-eligibility-and-account" className={P.h2}>2. Eligibility &amp; account</h2>

      <h3 id="2-1-age" className={P.h3}>2.1 You must be old enough to enter into a contract</h3>
      <p className={P.p}>
        You must be at least the age required to form a binding contract where you live, and in any case <strong className={P.strong}>at least 18 years old</strong> to purchase Natively Pro or a Natively API subscription. Use of the Service by minors is not permitted.
      </p>
      <p className={P.p}>
        If you're using the Service on behalf of a company or other organisation, you confirm you have authority to bind that organisation to these Terms.
      </p>

      <h3 id="2-2-responsibility" className={P.h3}>2.2 You're responsible for your account, license, and API key</h3>
      <p className={P.p}>
        You're responsible for keeping your license key, API key, account credentials, and any related authentication tokens confidential. You're responsible for all activity that happens under them, whether or not you authorised it. The information you provide at sign-up or checkout (name, email, billing details) must be <strong className={P.strong}>accurate, current, and complete</strong>.
      </p>
      <p className={P.p}>If you suspect a key has been exposed, email us as soon as possible so we can rotate it.</p>

      <h3 id="2-3-sanctions" className={P.h3}>2.3 Geographic &amp; sanctions restrictions</h3>
      <p className={P.p}>You may not use the Service if you are:</p>
      <ul className={P.ul}>
        <li>Located in, ordinarily resident in, or accessing the Service from any <strong className={P.strong}>country, region, or territory subject to comprehensive sanctions</strong> by the Government of India, the United States, the United Kingdom, the European Union, or the United Nations Security Council; or</li>
        <li>A <strong className={P.strong}>person or entity</strong> on any government <strong className={P.strong}>denied-party, restricted-party, or sanctioned-party list</strong> maintained by any of the bodies above.</li>
      </ul>
      <p className={P.p}>
        You represent that you are not such a person and will not use the Service in violation of applicable export-control or sanctions laws.
      </p>

      <hr className={P.hr} />

      <h2 id="3-natively-pro-license" className={P.h2}>3. Natively Pro — license</h2>

      <h3 id="3-1-grant" className={P.h3}>3.1 What we're granting you</h3>
      <p className={P.p}>
        When you purchase a Pro license, we grant you a <strong className={P.strong}>limited, non-exclusive, non-transferable, non-sublicensable, revocable</strong> licence to install and use the Pro features of the Natively desktop application:
      </p>
      <ul className={P.ul}>
        <li>For your <strong className={P.strong}>personal, single-user</strong> use; and</li>
        <li>On a small, reasonable number of devices that <strong className={P.strong}>you personally own or control</strong>.</li>
      </ul>
      <p className={P.p}>All rights not expressly granted to you are reserved by Natively.</p>

      <h3 id="3-2-restrictions" className={P.h3}>3.2 What you may not do with the license</h3>
      <p className={P.p}>You may not:</p>
      <ul className={P.ul}>
        <li><strong className={P.strong}>Share, resell, sublicense, transfer, lease, rent, or assign</strong> the license, the license key, or the activated software to anyone else, including listing it on any resale platform or marketplace.</li>
        <li><strong className={P.strong}>Activate beyond the allowed device count</strong>, or attempt to bypass the device-binding mechanism in any way (including spoofing, modifying, virtualising, or hiding the hardware identifier the application uses to bind a license to a device).</li>
        <li><strong className={P.strong}>Reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code</strong> of any non-open-source component of the Service, except to the extent that this restriction cannot lawfully be excluded.</li>
        <li><strong className={P.strong}>Use the Service for unlawful purposes</strong>, or in a way that violates the rights of others.</li>
        <li><strong className={P.strong}>Circumvent or interfere</strong> with license validation, rate limits, telemetry, anti-abuse mechanisms, or any security feature.</li>
      </ul>

      <h3 id="3-3-moving" className={P.h3}>3.3 Moving devices</h3>
      <p className={P.p}>
        If you're moving to a new computer, deactivate the license on the old one in <strong className={P.strong}>Settings → Natively Pro</strong> before activating it on the new one. Within the device limit, this is fully supported and unlimited.
      </p>

      <h3 id="3-4-revoke" className={P.h3}>3.4 We may revoke a license that's clearly abused</h3>
      <p className={P.p}>
        If a license is being shared, resold, or used outside the limits in section 3.2, we may deactivate it across all devices without refund. We try to reach out before taking that step where we reasonably can.
      </p>

      <h3 id="3-5-output-ownership" className={P.h3}>3.5 Ownership of outputs you generate</h3>
      <p className={P.p}>
        You <strong className={P.strong}>own the outputs</strong> you generate using the Service (resume drafts, prepared answers, generated text, exported notes, etc.), subject to: (a) the terms of the underlying AI provider that produced the output (their terms cascade through us to you); (b) any third-party rights in the inputs you provided (e.g., copyrighted source material); and (c) the rest of these Terms.
      </p>
      <p className={P.p}>
        Natively does not claim any ownership of your outputs, does not use your outputs to train any model, and does not sell them.
      </p>

      <h3 id="3-6-bulk" className={P.h3}>3.6 Bulk, team, or educational licensing</h3>
      <p className={P.p}>
        Bulk, team, multi-seat, classroom, bootcamp, or institutional licensing is not provided through the standard checkout. If you'd like to license Pro for more than one person — for example, for a small team, a hiring agency, a coaching practice, a bootcamp cohort, or a university course — please email <strong className={P.strong}><a href="mailto:natively.contact@gmail.com" className={P.a}>natively.contact@gmail.com</a></strong> and we'll set up a separate written arrangement. Standard single-user licenses purchased through the website may not be deployed to multiple individuals.
      </p>

      <hr className={P.hr} />

      <h2 id="4-natively-api-service" className={P.h2}>4. Natively API — service</h2>

      <h3 id="4-1-what-you-pay-for" className={P.h3}>4.1 What you're paying for</h3>
      <p className={P.p}>
        A Natively API subscription gives you a monthly quota across our integrated AI, speech-to-text, and search providers, accessed through a single Natively-issued API key. Quotas, plans, and prices are listed in-app and on our website.
      </p>

      <h3 id="4-2-acceptable-use" className={P.h3}>4.2 Acceptable use</h3>
      <p className={P.p}>You agree not to:</p>
      <ul className={P.ul}>
        <li><strong className={P.strong}>Resell, repackage, or proxy</strong> the Natively API to third parties without a written agreement with us.</li>
        <li><strong className={P.strong}>Use the API to build a directly competing product</strong>, or to scrape our outputs at scale to train another model.</li>
        <li>Use the API to <strong className={P.strong}>send unlawful, harmful, or abusive content</strong>, or content that violates the policies of our underlying providers.</li>
        <li><strong className={P.strong}>Share your API key</strong> with others, or use a single key across multiple end-users without our consent.</li>
      </ul>

      <h3 id="4-3-quota-fair-use" className={P.h3}>4.3 Quota, fair use, and abuse handling</h3>
      <p className={P.p}>
        Quotas reset on the cadence shown in your plan. Burst usage that exceeds plan limits or that looks like automated abuse may be rate-limited or temporarily paused while we look into it. We'll always try to contact you before taking any action that affects your access.
      </p>

      <h3 id="4-4-provider-availability" className={P.h3}>4.4 Provider availability</h3>
      <p className={P.p}>
        The Natively API is a thin layer over multiple third-party providers. If a provider has an outage or changes its terms in a way that affects what we can offer, we'll do our best to route around it, but we <strong className={P.strong}>do not guarantee</strong> that any specific underlying model, vendor, latency, accuracy, or feature will always be available. Material changes will be communicated.
      </p>

      <h3 id="4-5-mid-cycle" className={P.h3}>4.5 Mid-cycle plan changes</h3>
      <p className={P.p}>You can upgrade, downgrade, or switch plans at any time:</p>
      <ul className={P.ul}>
        <li><strong className={P.strong}>Upgrades</strong> take effect immediately. Your account dashboard will show whether the difference is prorated for the remaining cycle or whether the upgrade simply replaces the current plan at the next billing date.</li>
        <li><strong className={P.strong}>Downgrades</strong> take effect at the <strong className={P.strong}>end of the current cycle</strong>, so you keep the higher-tier benefits until then. Downgrades do not generate automatic refunds for the unused portion of the higher tier.</li>
      </ul>

      <hr className={P.hr} />

      <h2 id="5-free-trial" className={P.h2}>5. Free Trial</h2>
      <p className={P.p}>
        The Free Trial gives you time-limited or quota-limited access to features without payment. The trial is intended for <strong className={P.strong}>personal evaluation only</strong>.
      </p>
      <p className={P.p}>
        The following will void trial eligibility and may permanently disqualify the device, account, or payment instrument from future trials and from the Service:
      </p>
      <ul className={P.ul}>
        <li>Creating multiple accounts or using multiple email addresses to repeatedly claim the trial;</li>
        <li>Using automation, virtual machines, or device-identifier modification to extend or re-claim a trial;</li>
        <li>Combining trial usage with refund requests in a buy-then-refund-then-re-trial pattern.</li>
      </ul>
      <p className={P.p}>
        Trials may be modified, suspended, or revoked at any time without notice and without compensation.
      </p>

      <hr className={P.hr} />

      <h2 id="6-pricing-and-payment" className={P.h2}>6. Pricing &amp; payment</h2>

      <h3 id="6-1-prices" className={P.h3}>6.1 Prices</h3>
      <p className={P.p}>
        Current prices are shown in-app and at checkout. Subscriptions renew automatically at the price shown on the order confirmation, unless cancelled before the next renewal.
      </p>

      <h3 id="6-2-payment-processing" className={P.h3}>6.2 Payment processing</h3>
      <p className={P.p}>
        Payments are handled by our payment processor (currently Dodo Payments). Their terms apply alongside ours for the payment transaction itself. We don't store your full card details on our servers.
      </p>

      <h3 id="6-3-taxes" className={P.h3}>6.3 Taxes</h3>
      <p className={P.p}>
        Where applicable, sales tax / GST / VAT will be added at checkout based on your billing location. <strong className={P.strong}>You are responsible for any local taxes, duties, withholding, customs, or similar charges that are not collected at the point of sale</strong>, and you agree to indemnify us against any such amount that becomes payable on your behalf.
      </p>

      <h3 id="6-4-failed-payments" className={P.h3}>6.4 Failed payments</h3>
      <p className={P.p}>
        If a renewal payment fails, we'll usually retry a few times before suspending access. You'll keep access through the end of the period you've already paid for.
      </p>

      <h3 id="6-5-anti-fraud" className={P.h3}>6.5 Anti-fraud screening</h3>
      <p className={P.p}>
        We may <strong className={P.strong}>screen, delay, hold, or decline</strong> any order that our systems or processor flag as potentially fraudulent, suspicious, or in breach of these Terms — including orders that come from sanctioned regions, mismatched billing/IP geographies, disposable email addresses, or payment instruments associated with prior chargebacks. Where possible we'll let you know and ask for additional information; where not, we'll cancel the order and refund the captured amount through the original payment method.
      </p>

      <h3 id="6-6-app-store-purchases" className={P.h3}>6.6 Purchases through third-party app marketplaces</h3>
      <p className={P.p}>
        If you purchased Natively or a Natively subscription through a <strong className={P.strong}>third-party marketplace</strong> (for example, Apple's App Store / Mac App Store, the Microsoft Store, Google Play, or Setapp), that store's terms apply to the <strong className={P.strong}>purchase, billing, renewal, and refund</strong> of that order. We don't have visibility into those orders the way we do into orders made directly through our checkout, and we cannot issue refunds for a charge that the store collected. Refund requests for those purchases must go through the relevant store's flow — see the <Link to="/refundpolicy" className={P.a}>Refund Policy</Link> for direct links.
      </p>

      <h3 id="6-7-right-to-compete" className={P.h3}>6.7 Right to compete</h3>
      <p className={P.p}>
        These Terms do not prevent us from developing or releasing similar products, services, or features at any time, with or without your input. They also do not prevent you from building competing products, provided you do not breach sections{" "}
        <a href="#3-2-restrictions" className={P.a}>3.2</a>,{" "}
        <a href="#4-2-acceptable-use" className={P.a}>4.2</a>,{" "}
        <a href="#10-acceptable-use" className={P.a}>10</a>, or{" "}
        <a href="#13-intellectual-property" className={P.a}>13</a>{" "}of these Terms.
      </p>

      <hr className={P.hr} />

      <h2 id="7-refunds" className={P.h2}>7. Refunds</h2>
      <p className={P.p}>
        Refunds are governed by our <strong className={P.strong}><Link to="/refundpolicy" className={P.a}>Refund Policy</Link></strong>, which forms part of these Terms by reference.
      </p>
      <p className={P.p}>In short:</p>
      <ul className={P.ul}>
        <li><strong className={P.strong}>Natively Pro</strong> is generally non-refundable, with a 1-hour pre-activation grace window for honest mistakes (case-by-case).</li>
        <li><strong className={P.strong}>Natively API</strong> is refundable within 24 hours of the <strong className={P.strong}>first purchase only</strong> (renewals are not refundable), and one refund per customer.</li>
        <li><strong className={P.strong}>All voucher / promo-code / limited-time-offer purchases are final sale</strong> for both products.</li>
        <li><strong className={P.strong}>App-store purchases</strong> are governed by the store's refund flow, not ours.</li>
      </ul>
      <p className={P.p}>Please read the full Refund Policy before purchasing.</p>

      <hr className={P.hr} />

      <h2 id="8-your-data" className={P.h2}>8. Your data</h2>

      <h3 id="8-1-local-first" className={P.h3}>8.1 Local-first</h3>
      <p className={P.p}>
        Natively is local-first wherever possible. Audio capture, screen capture, and most processing happen on your device. Data is sent to a third-party provider (or to the Natively API) only to the extent necessary to fulfil the feature you're using. Meeting history, transcripts, and notes are stored in a local SQLite database; configuration is stored locally via <code className={P.code}>electron-store</code>; <strong className={P.strong}>none of this content is sent to a Natively-operated server.</strong>
      </p>

      <h3 id="8-2-what-we-store" className={P.h3}>8.2 What we store on our side</h3>
      <p className={P.p}>
        For paid products we store the minimum needed to operate them — for example, your license key, hardware ID, plan, billing email, and quota counters. We do not store the audio you capture or the content of your screen captures on our servers. Your provider API keys (when you use BYOK) are stored locally on your device and are never transmitted to us.
      </p>

      <h3 id="8-3-content-yours" className={P.h3}>8.3 Your content stays yours</h3>
      <p className={P.p}>
        You retain all rights to the content you create and the data you bring into Natively (resumes, notes, custom context files, etc.). We don't use your content to train models, and we don't sell it.
      </p>

      <h3 id="8-4-privacy-details" className={P.h3}>8.4 Privacy details</h3>
      <p className={P.p}>
        Full details — including which third-party providers your data may flow through depending on the features you use — live in the Privacy Policy at <strong className={P.strong}><Link to="/privacy" className={P.a}>natively.software/privacy</Link></strong>, which is incorporated into these Terms by reference.
      </p>

      <h3 id="8-5-backup" className={P.h3}>8.5 Backup is your responsibility</h3>
      <p className={P.p}>
        Because Natively is local-first, <strong className={P.strong}>backing up your local Natively data (database, transcripts, notes, settings, exported files, custom context) is solely your responsibility</strong>. We have no copy of your local data and cannot restore it if your device fails, your operating system reinstalls, you delete a file, your local database becomes corrupted, or you uninstall the application. We accept no liability for any loss of local data.
      </p>

      <h3 id="8-6-security" className={P.h3}>8.6 Security &amp; vulnerability reporting</h3>
      <p className={P.p}>
        Please do <strong className={P.strong}>not</strong> report security vulnerabilities through public GitHub issues or social media. Send security reports to <strong className={P.strong}><a href="mailto:natively.contact@gmail.com" className={P.a}>natively.contact@gmail.com</a></strong> following the disclosure process described in our <a href="https://github.com/evinjohnn/natively-cluely-ai-assistant/blob/main/SECURITY.md" className={P.a} rel="noreferrer noopener">Security Policy</a>. We acknowledge security reports within 72 hours and treat them as a priority.
      </p>

      <h3 id="8-7-communications" className={P.h3}>8.7 Communications from us</h3>
      <p className={P.p}>
        By using the Service you agree to receive <strong className={P.strong}>operational emails</strong> related to your purchases, license, security incidents, terms changes, and billing. These emails are part of the Service and you cannot opt out of them while the relevant relationship is active. <strong className={P.strong}>Marketing emails</strong> (product updates, feature announcements, promotions) are optional and you can opt out of them at any time using the unsubscribe link.
      </p>

      <hr className={P.hr} />

      <h2 id="9-third-party-services" className={P.h2}>9. Third-party services</h2>
      <p className={P.p}>
        The Service depends on third-party providers, including (but not limited to) AI model providers (e.g., OpenAI, Anthropic, Google, Groq), speech-to-text providers, search providers, payment processors, OS-level audio &amp; screen-capture frameworks, license-management services, and software-update infrastructure. Those providers have their own terms and privacy policies, and your use of features powered by them is also subject to those terms.
      </p>
      <p className={P.p}>
        We do our best to choose reputable providers and to disclose which provider is in play for each feature. We are <strong className={P.strong}>not responsible</strong> for changes to those providers' terms, pricing, availability, latency, accuracy, or output quality, but we'll do our best to communicate and adapt.
      </p>

      <hr className={P.hr} />

      <h2 id="10-acceptable-use" className={P.h2}>10. Acceptable use (everywhere)</h2>
      <p className={P.p}>
        In addition to the product-specific rules above, you agree not to use the Service to:
      </p>
      <ul className={P.ul}>
        <li>Do anything illegal under the law that applies to you.</li>
        <li>Harass, defraud, impersonate, or harm others.</li>
        <li>Generate or distribute child sexual abuse material, content that incites violence, or content that promotes self-harm.</li>
        <li>Build malware, surveillance tools used without consent, or systems intended to deceive people about who they're talking to.</li>
        <li>Probe, scan, or test the security of the Service in ways that interfere with normal operation (responsible vulnerability disclosure under <a href="#8-6-security" className={P.a}>section 8.6</a> is welcome and encouraged).</li>
        <li>Bypass rate limits, license checks, anti-abuse measures, device-binding, hardware-identifier mechanisms, or telemetry signals.</li>
      </ul>
      <p className={P.p}>We may suspend access for serious or repeated violations.</p>

      <h3 id="10-1-recording-consent" className={P.h3}>10.1 Recording, capture, and consent — your responsibility</h3>
      <p className={P.p}>
        Natively captures audio and screen content from your device. <strong className={P.strong}>You are solely responsible for ensuring that your use of the Service complies with all applicable recording, wiretapping, surveillance, workplace-monitoring, and privacy laws</strong> in every jurisdiction relevant to the call, conversation, meeting, screen, or other content you capture. Many jurisdictions (including a number of US states, the European Union, and the United Kingdom) require <strong className={P.strong}>all-party consent</strong> before a conversation may be recorded; obtaining that consent is your obligation, not ours.
      </p>
      <p className={P.p}>
        You also represent that your use of the Service does not violate the <strong className={P.strong}>terms or policies of any third-party platform</strong> on which you use it (for example, a video-conferencing tool, an interview platform, an examination provider, or an employer's IT policy). Many platforms and employers prohibit AI assistance during calls, interviews, or assessments — compliance with their rules is on you.
      </p>
      <p className={P.p}>
        You agree to indemnify Natively against any claim arising from your failure to obtain the consents or comply with the laws and policies described in this section.
      </p>

      <h3 id="10-2-no-circumvention" className={P.h3}>10.2 No circumvention</h3>
      <p className={P.p}>
        You may not modify, reverse-engineer, spoof, or interfere with any technical measure used to enforce these Terms — including the hardware-identifier mechanism that binds a Pro license to a device, license-server validation, rate limits, telemetry signals used to detect abuse, or the activation flow.
      </p>

      <h3 id="10-3-no-impersonation" className={P.h3}>10.3 No impersonation or misrepresentation of Natively</h3>
      <p className={P.p}>You may not:</p>
      <ul className={P.ul}>
        <li><strong className={P.strong}>Impersonate Natively or any of our employees, contractors, or partners</strong>, including by setting up accounts, websites, social-media profiles, or email addresses designed to suggest an affiliation that does not exist.</li>
        <li><strong className={P.strong}>Falsely claim</strong>, in any forum, that Natively has made statements, given advice, granted permissions, made commitments, or engaged in conduct that we have not actually made, given, granted, or engaged in.</li>
        <li><strong className={P.strong}>Modify, fabricate, or tamper with screenshots, transcripts, AI outputs, support emails, log files, or product UI</strong> in a way that misrepresents what Natively did, said, or produced — and then publish, share, or rely on that fabricated content.</li>
      </ul>

      <hr className={P.hr} />

      <h2 id="11-ai-outputs" className={P.h2}>11. AI outputs &amp; user responsibility</h2>

      <h3 id="11-1-ai-fallible" className={P.h3}>11.1 AI is fallible</h3>
      <p className={P.p}>
        Natively presents responses generated by third-party AI models. Those models may produce outputs that are <strong className={P.strong}>inaccurate, incomplete, biased, outdated, fabricated ("hallucinated"), or inappropriate</strong> for the context. AI outputs are provided <strong className={P.strong}>as a tool to assist you</strong>, not as advice or a finished work product.
      </p>

      <h3 id="11-2-your-responsibility" className={P.h3}>11.2 You alone are responsible for what you do with the output</h3>
      <p className={P.p}>You are solely responsible for:</p>
      <ul className={P.ul}>
        <li><strong className={P.strong}>Reviewing every output</strong> before relying on it, sharing it, or acting on it;</li>
        <li>Any <strong className={P.strong}>decision</strong> you make on the basis of an AI output, including (without limitation) decisions about employment, interviews, hiring, contracts, salary, negotiations, education, examinations, finance, health, legal matters, or business strategy;</li>
        <li>The <strong className={P.strong}>accuracy, legality, and appropriateness</strong> of any content you generate, send, share, or otherwise transmit using the Service.</li>
      </ul>

      <h3 id="11-3-not-professional-advice" className={P.h3}>11.3 Not professional advice</h3>
      <p className={P.p}>
        Natively is <strong className={P.strong}>not a substitute for professional advice</strong>. Outputs related to legal, medical, mental-health, financial, tax, or any other regulated subject are not legal, medical, financial, tax, or other professional advice, and must not be relied on as such. Always consult a qualified professional for matters that require professional advice.
      </p>

      <h3 id="11-4-interview-use" className={P.h3}>11.4 Interview, examination, and assessment use</h3>
      <p className={P.p}>
        Natively may be used in contexts where AI assistance is restricted or prohibited (for example, live interviews, certifications, examinations, regulated assessments). Many platforms, employers, schools, certifying bodies, and jurisdictions prohibit such use. <strong className={P.strong}>Use of the Service in those contexts is at your own risk.</strong> Natively does not encourage or endorse use of the Service in any way that violates a platform's terms, an employer's policy, an academic-integrity rule, or applicable law, and we accept no responsibility for the consequences of such use, including loss of opportunity, employment, qualification, or reputation.
      </p>

      <h3 id="11-5-consequential" className={P.h3}>11.5 Consequential outcomes</h3>
      <p className={P.p}>
        Without limiting <a href="#16-limitation-of-liability" className={P.a}>section 16</a>, Natively shall <strong className={P.strong}>not be liable</strong> for any outcome, decision, loss, missed opportunity, or damage that results, in whole or in part, from your reliance on or use of any AI output produced through the Service.
      </p>

      <h3 id="11-6-output-ownership" className={P.h3}>11.6 Output ownership and prompt content</h3>
      <p className={P.p}>
        Subject to <a href="#3-5-output-ownership" className={P.a}>section 3.5</a>, the underlying AI provider's terms, and any third-party rights in your inputs, you own the outputs you generate. <strong className={P.strong}>You also represent and warrant</strong> that:
      </p>
      <ul className={P.ul}>
        <li>You have the right to submit any content you supply to the Service as input (resumes, JDs, custom context, audio, screen content, etc.);</li>
        <li>Your inputs do not infringe a third party's intellectual-property rights, privacy, or confidentiality obligations;</li>
        <li>You will not use the Service to <strong className={P.strong}>deliberately generate defamatory content about a real, identifiable person</strong>, deceptive deepfakes presented as authentic, or content designed to defraud, harass, or unlawfully impersonate someone.</li>
      </ul>

      <hr className={P.hr} />

      <h2 id="12-honest-feedback-vs-defamation" className={P.h2}>12. Honest feedback vs. defamation</h2>

      <h3 id="12-1-feedback-welcome" className={P.h3}>12.1 Honest feedback is welcome and protected</h3>
      <p className={P.p}>
        We welcome honest feedback, reviews, criticism, and bug reports — they make the Service better, and <strong className={P.strong}>nothing in these Terms restricts your right to share truthful opinions and accurate factual statements about Natively</strong>, including unfavourable ones, in any forum.
      </p>
      <p className={P.p}>
        If a feature didn't work for you, an output disappointed you, support was slower than you'd hoped, or the app crashed — please feel free to say so publicly, post a review, file a GitHub issue, or write about it on social media. That's not what this section is about.
      </p>

      <h3 id="12-2-prohibited" className={P.h3}>12.2 What this section does prohibit</h3>
      <p className={P.p}>
        What is not protected, and what may give rise to legal action under the <strong className={P.strong}>defamation, libel, slander, trade-libel, "passing off", or related laws</strong> of the applicable jurisdiction, is conduct that is <strong className={P.strong}>knowingly false</strong> or made with <strong className={P.strong}>reckless disregard for the truth</strong> and that causes — or is reasonably likely to cause — material harm to Natively's reputation, commercial interests, or the developer's personal reputation. Examples include (without limitation):
      </p>
      <ul className={P.ul}>
        <li>Publicly attributing to Natively conduct, statements, features, data-handling practices, security incidents, scams, or harms that <strong className={P.strong}>did not occur</strong> or that you have not made any reasonable effort to verify.</li>
        <li>Mischaracterising <strong className={P.strong}>a known bug, a feature limitation, an unfamiliarity with how the app works, or an honest mistake</strong> on our part as deliberate misconduct, fraud, malware, spyware, or malicious intent, where you have no reasonable basis to do so.</li>
        <li>Distributing <strong className={P.strong}>fabricated screenshots, log files, transcripts, support emails, AI outputs, or product UI</strong> that you misrepresent as having come from the Service or from Natively.</li>
        <li>Continuing to repeat statements about Natively in public after we have, in good faith and with evidence, <strong className={P.strong}>brought to your attention that they are false</strong>, and you have no reasonable basis to continue.</li>
        <li>Coordinated brigading, mass-reporting, or organised harassment campaigns against the Service or the developer based on knowingly false claims.</li>
      </ul>
      <p className={P.p}>
        <strong className={P.strong}>Important clarification:</strong> A small bug, a confusing UI, a feature you couldn't figure out, or a result that disappointed you is not, on its own, evidence of misconduct on our part. We'd genuinely rather hear about it at <code className={P.code}>natively.contact@gmail.com</code> and fix it than read a public accusation that we acted in bad faith. Please give us that chance.
      </p>

      <h3 id="12-3-remedies" className={P.h3}>12.3 Remedies</h3>
      <p className={P.p}>
        Where conduct of the kind described in section 12.2 causes us reputational, commercial, or financial harm, we reserve the right to pursue <strong className={P.strong}>all remedies available under applicable law</strong>, including (without limitation) damages, injunctive relief (including takedown orders and content-removal injunctions), platform-level reporting, and recovery of legal costs. <a href="#20-governing-law-and-dispute-resolution" className={P.a}>Section 20</a> (governing law &amp; dispute resolution) applies to any such claim.
      </p>

      <h3 id="12-4-takedown" className={P.h3}>12.4 Takedown procedure</h3>
      <p className={P.p}>
        If you believe content posted about Natively is false, please email <strong className={P.strong}><a href="mailto:natively.contact@gmail.com" className={P.a}>natively.contact@gmail.com</a></strong> with a description of the content, where it is posted, and the basis on which you believe it is inaccurate. We will respond within 24–72 hours on weekdays.
      </p>

      <hr className={P.hr} />

      <h2 id="13-intellectual-property" className={P.h2}>13. Intellectual property</h2>

      <h3 id="13-1-our-ip" className={P.h3}>13.1 Our IP</h3>
      <p className={P.p}>
        Natively, the Natively name and logos, the desktop application, the website, the Natively API, the documentation, and any related materials are owned by us or our licensors and are protected by copyright and other intellectual-property laws. Nothing in these Terms transfers ownership to you.
      </p>

      <h3 id="13-2-feedback" className={P.h3}>13.2 Feedback</h3>
      <p className={P.p}>
        If you send us feedback, suggestions, or bug reports, you grant us a non-exclusive, perpetual, royalty-free licence to use that feedback to improve the Service. You don't have to send us feedback — but if you do, this is how we treat it.
      </p>

      <h3 id="13-3-trademarks" className={P.h3}>13.3 Trademarks &amp; branding</h3>
      <p className={P.p}>
        "<strong className={P.strong}>Natively</strong>", the Natively logo, "<strong className={P.strong}>Natively Pro</strong>", and "<strong className={P.strong}>Natively API</strong>" are trademarks of the developer of Natively. You may not, without prior written permission:
      </p>
      <ul className={P.ul}>
        <li>Use the Natively name or logo in a way that suggests endorsement, affiliation, sponsorship, or partnership that does not exist;</li>
        <li>Incorporate the Natively name or logo into a product name, service name, domain name, social-media handle, or company name;</li>
        <li>Use the marks in advertising, marketing, or promotional materials for any product or service other than honest factual references (such as an honest review or a comparison post).</li>
      </ul>
      <p className={P.p}>
        Honest, non-misleading editorial and review uses (e.g., naming Natively in an article, video, or comparison) are fine and don't require permission.
      </p>

      <h3 id="13-4-open-source" className={P.h3}>13.4 Open-source components</h3>
      <p className={P.p}>
        The desktop application incorporates open-source components, each licensed under its own terms (typically MIT, Apache 2.0, BSD, or similar permissive licenses). The terms of those licenses prevail over these Terms in respect of those components. A list of components is available with the application or in the source repository.
      </p>

      <h3 id="13-5-reservation" className={P.h3}>13.5 Reservation of rights</h3>
      <p className={P.p}>
        All rights, title, and interest in and to the Service that are not expressly granted to you in these Terms are <strong className={P.strong}>reserved</strong> by Natively. No implied licences are granted.
      </p>

      <hr className={P.hr} />

      <h2 id="14-disclaimers" className={P.h2}>14. Disclaimers</h2>
      <p className={P.p}>
        The Service is provided <strong className={P.strong}>"as is"</strong> and <strong className={P.strong}>"as available"</strong>, without warranties of any kind, express or implied, beyond those that cannot lawfully be excluded. We expressly disclaim warranties of <strong className={P.strong}>merchantability, fitness for a particular purpose, non-infringement, accuracy, reliability, availability, error-free operation, uninterrupted service, security, and quiet enjoyment</strong>.
      </p>
      <p className={P.p}>We do <strong className={P.strong}>not</strong> warrant that:</p>
      <ul className={P.ul}>
        <li>The Service will be uninterrupted, error-free, secure, or free of harmful components;</li>
        <li>AI outputs will be accurate, complete, current, lawful, fit for any particular purpose, or free of bias or fabrication;</li>
        <li>Any specific third-party provider, model, feature, or latency will continue to be available;</li>
        <li>The Service will meet your specific requirements, expectations, commercial outcomes, or interview / examination / business goals.</li>
      </ul>
      <p className={P.p}>You assume the entire risk of your use of the Service.</p>

      <h3 id="14-1-maintenance" className={P.h3}>14.1 Maintenance &amp; updates</h3>
      <p className={P.p}>
        We may, at any time and without prior notice, perform <strong className={P.strong}>maintenance, updates, hot-fixes, model rotations, provider switches, or feature changes</strong> that temporarily affect the availability, performance, or behaviour of the Service. No refund, credit, or compensation is owed for downtime, regression, or behavioural change resulting from routine maintenance or updates.
      </p>

      <h3 id="14-2-no-sla" className={P.h3}>14.2 No service-level commitment</h3>
      <p className={P.p}>
        Unless we have entered into a separate written service-level agreement with you, <strong className={P.strong}>no SLA, uptime guarantee, response-time commitment, or performance commitment applies</strong> to the Service or to support requests.
      </p>

      <h3 id="14-3-auto-updates" className={P.h3}>14.3 Auto-updates &amp; consent to updates</h3>
      <p className={P.p}>
        The desktop application periodically checks for and may automatically download and install updates. By using the Service, you <strong className={P.strong}>consent</strong> to receive these updates, including updates that change behaviour, add or remove features, modify the user interface, change which third-party providers are used, or address security issues. Where reasonable, we'll communicate material changes — but security and stability updates may be installed without prior notice.
      </p>

      <hr className={P.hr} />

      <h2 id="15-force-majeure" className={P.h2}>15. Force majeure</h2>
      <p className={P.p}>
        We are <strong className={P.strong}>not liable</strong> for any failure or delay in performing the Service that is caused, in whole or in part, by events beyond our reasonable control, including (without limitation):
      </p>
      <ul className={P.ul}>
        <li>Outages, errors, or terms changes by any <strong className={P.strong}>third-party provider</strong> (AI, speech-to-text, search, payment, license-server, hosting, or OS-level capture provider) on which the Service depends;</li>
        <li>Internet, telecommunications, electrical, or cloud-infrastructure failures;</li>
        <li>Distributed-denial-of-service attacks, cyberattacks, malware, or unauthorised intrusions;</li>
        <li>Acts of government, regulatory action, sanctions, or changes in law;</li>
        <li>Acts of God, natural disasters, pandemics, public-health emergencies, war, civil unrest, or terrorism;</li>
        <li>Any other event of force majeure.</li>
      </ul>
      <p className={P.p}>
        During such an event we will use reasonable efforts to restore the Service, but no refund, credit, or compensation is owed for downtime caused by force majeure.
      </p>

      <hr className={P.hr} />

      <h2 id="16-limitation-of-liability" className={P.h2}>16. Limitation of liability</h2>
      <p className={P.p}>To the maximum extent permitted by law:</p>
      <ul className={P.ul}>
        <li>We will <strong className={P.strong}>not be liable</strong> for any <strong className={P.strong}>indirect, incidental, special, consequential, exemplary, or punitive damages</strong>, or for <strong className={P.strong}>lost profits, lost revenue, lost data, lost savings, lost business, lost opportunity, lost goodwill, lost interview / examination / employment / contract outcomes, or reputational harm</strong>, arising out of or related to the Service or these Terms, regardless of the legal theory and even if we have been advised of the possibility of such damages.</li>
        <li>Our <strong className={P.strong}>total aggregate liability</strong> for any and all claims arising out of or related to the Service or these Terms is limited to the <strong className={P.strong}>amount you actually paid to Natively for the product giving rise to the claim in the 12 months immediately preceding the event giving rise to the claim</strong>, with a <strong className={P.strong}>hard ceiling of US$100</strong> (one hundred US dollars). For users who have not paid Natively any amount, our aggregate liability is <strong className={P.strong}>zero</strong>.</li>
        <li>The limitations in this section apply to the <strong className={P.strong}>fullest extent permitted by law</strong>, and survive termination of these Terms.</li>
      </ul>

      <hr className={P.hr} />

      <h2 id="17-indemnity" className={P.h2}>17. Indemnity</h2>
      <p className={P.p}>
        You agree to defend, indemnify, and hold harmless Natively (and its officers, employees, contractors, and agents) from and against any and all claims, demands, losses, liabilities, damages, fines, penalties, costs, and expenses (including reasonable legal fees) arising out of or related to:
      </p>
      <ul className={P.ul}>
        <li>Your <strong className={P.strong}>breach</strong> of these Terms or the Refund Policy;</li>
        <li>Your <strong className={P.strong}>misuse</strong> of the Service;</li>
        <li>Any <strong className={P.strong}>content</strong> you submit, generate, share, or transmit through the Service that violates the rights of any third party or any law;</li>
        <li>Your failure to obtain <strong className={P.strong}>recording or capture consents</strong> as required by <a href="#10-1-recording-consent" className={P.a}>section 10.1</a>;</li>
        <li>Your failure to comply with <strong className={P.strong}>platform terms, employer policies, or academic-integrity rules</strong> as referenced in sections <a href="#10-1-recording-consent" className={P.a}>10.1</a> and <a href="#11-4-interview-use" className={P.a}>11.4</a>;</li>
        <li>Any <strong className={P.strong}>decision or action</strong> taken by you (or anyone acting on your behalf) on the basis of an AI output, including any consequences in interview, examination, assessment, employment, contractual, or regulatory contexts;</li>
        <li>Any <strong className={P.strong}>defamatory or knowingly false statement</strong> you make about Natively as described in <a href="#12-honest-feedback-vs-defamation" className={P.a}>section 12</a>.</li>
      </ul>

      <hr className={P.hr} />

      <h2 id="18-termination" className={P.h2}>18. Termination</h2>

      <h3 id="18-1-by-you" className={P.h3}>18.1 By you</h3>
      <p className={P.p}>
        You can stop using the Service at any time. For paid subscriptions, cancel through your account or by emailing us — your plan will stop renewing at the end of the current period.
      </p>

      <h3 id="18-2-by-us" className={P.h3}>18.2 By us</h3>
      <p className={P.p}>
        We may suspend or terminate your access if you breach these Terms, if we are required to by law or by an underlying provider, if your use is causing serious harm to the Service or other users, or for any other lawful reason. Where reasonably possible, we'll let you know first.
      </p>

      <h3 id="18-3-refuse-service" className={P.h3}>18.3 Right to refuse service</h3>
      <p className={P.p}>
        We reserve the right to <strong className={P.strong}>refuse, suspend, or terminate</strong> the Service to any person for any lawful reason, including suspected abuse, fraud, chargeback history, or repeated violation of <a href="#12-honest-feedback-vs-defamation" className={P.a}>section 12</a>, with no obligation to provide notice or reason beyond what is required by law.
      </p>

      <h3 id="18-4-effect" className={P.h3}>18.4 Effect of termination</h3>
      <p className={P.p}>
        After termination, your right to use the Service ends. Your <strong className={P.strong}>local data</strong> (transcripts, notes, settings) remains on your device — termination does not delete it. Sections that by their nature should survive — including{" "}
        <a href="#8-your-data" className={P.a}>8</a> (data),{" "}
        <a href="#11-ai-outputs" className={P.a}>11</a> (AI outputs),{" "}
        <a href="#12-honest-feedback-vs-defamation" className={P.a}>12</a> (honest feedback vs. defamation),{" "}
        <a href="#13-intellectual-property" className={P.a}>13</a> (IP),{" "}
        <a href="#14-disclaimers" className={P.a}>14</a> (disclaimers),{" "}
        <a href="#15-force-majeure" className={P.a}>15</a> (force majeure),{" "}
        <a href="#16-limitation-of-liability" className={P.a}>16</a> (limitation of liability),{" "}
        <a href="#17-indemnity" className={P.a}>17</a> (indemnity),{" "}
        <a href="#19-notices" className={P.a}>19</a> (notices),{" "}
        <a href="#20-governing-law-and-dispute-resolution" className={P.a}>20</a> (governing law &amp; dispute resolution), and{" "}
        <a href="#21-general" className={P.a}>21</a> (general) — will continue to apply.
      </p>

      <hr className={P.hr} />

      <h2 id="19-notices" className={P.h2}>19. Notices</h2>

      <h3 id="19-1-to-you" className={P.h3}>19.1 Notices to you</h3>
      <p className={P.p}>
        We may give you legal notice by emailing the address associated with your Natively account or your most recent purchase, by posting a notice in-app, or by posting a notice on <strong className={P.strong}>natively.software</strong>. Notice is deemed given on the date sent.
      </p>

      <h3 id="19-2-to-us" className={P.h3}>19.2 Notices to us</h3>
      <p className={P.p}>
        You must give us legal notice in writing by email to <strong className={P.strong}><a href="mailto:natively.contact@gmail.com" className={P.a}>natively.contact@gmail.com</a></strong>, with a clear subject line indicating that the message is a legal notice. Notice is deemed given when we acknowledge receipt by reply. Email is the <strong className={P.strong}>exclusive</strong> channel for valid legal notice — service through social media, GitHub issues, comments, third-party platforms, or any other channel does not constitute valid notice.
      </p>

      <hr className={P.hr} />

      <h2 id="20-governing-law-and-dispute-resolution" className={P.h2}>20. Governing law &amp; dispute resolution</h2>

      <h3 id="20-1-governing-law" className={P.h3}>20.1 Governing law</h3>
      <p className={P.p}>
        These Terms, the Refund Policy, the Privacy Policy, and any dispute, claim, or controversy arising out of or related to them or the Service (whether in contract, tort, statute, defamation, or otherwise) are governed by and construed in accordance with the <strong className={P.strong}>laws of India</strong>, without regard to conflict-of-laws principles.
      </p>

      <h3 id="20-2-step-1" className={P.h3}>20.2 Step 1 — try to resolve it directly</h3>
      <p className={P.p}>
        Before commencing any formal dispute-resolution process, you agree to <strong className={P.strong}>first contact us at <code className={P.code}>natively.contact@gmail.com</code></strong> with a written description of the dispute and a proposed resolution, and to allow us <strong className={P.strong}>at least thirty (30) days</strong> to respond and attempt to resolve the dispute in good faith. We agree to do the same if we have a dispute with you.
      </p>

      <h3 id="20-3-step-2" className={P.h3}>20.3 Step 2 — exclusive forum / arbitration</h3>
      <p className={P.p}>If the dispute is not resolved under section 20.2:</p>
      <ul className={P.ul}>
        <li><strong className={P.strong}>For users ordinarily resident in India:</strong> the courts located in <strong className={P.strong}>Kochi, Kerala, India</strong> have <strong className={P.strong}>exclusive jurisdiction</strong>, and you and we both submit to that exclusive jurisdiction.</li>
        <li><strong className={P.strong}>For users ordinarily resident outside India:</strong> the dispute will be finally resolved by <strong className={P.strong}>binding arbitration</strong> seated in <strong className={P.strong}>Kochi, Kerala, India</strong>, conducted in <strong className={P.strong}>English</strong> by a sole arbitrator under the <strong className={P.strong}>Arbitration and Conciliation Act, 1996</strong> of India. The arbitrator's award will be final and binding and may be entered for enforcement in any court of competent jurisdiction.</li>
      </ul>

      <h3 id="20-4-no-class" className={P.h3}>20.4 No class actions</h3>
      <p className={P.p}>
        You and Natively each agree that any dispute will be brought in <strong className={P.strong}>your or our individual capacity only</strong>, and <strong className={P.strong}>not</strong> as a plaintiff or class member in any purported class, collective, consolidated, or representative proceeding. The arbitrator (or court, where applicable) has no authority to consolidate claims or to preside over any form of class or representative proceeding.
      </p>

      <h3 id="20-5-equitable" className={P.h3}>20.5 Equitable relief carve-out</h3>
      <p className={P.p}>
        Nothing in this section prevents either party from seeking <strong className={P.strong}>injunctive or other equitable relief</strong> in any court of competent jurisdiction to protect its intellectual-property rights, confidential information, brand and reputation (<a href="#12-honest-feedback-vs-defamation" className={P.a}>section 12</a>), or to enforce sections{" "}
        <a href="#3-2-restrictions" className={P.a}>3.2</a>,{" "}
        <a href="#4-2-acceptable-use" className={P.a}>4.2</a>,{" "}
        <a href="#10-acceptable-use" className={P.a}>10</a>,{" "}
        <a href="#12-honest-feedback-vs-defamation" className={P.a}>12</a>, or{" "}
        <a href="#13-intellectual-property" className={P.a}>13</a>.
      </p>

      <h3 id="20-6-limitation-period" className={P.h3}>20.6 Limitation period</h3>
      <p className={P.p}>
        Any claim or cause of action arising out of or related to these Terms or the Service must be commenced within <strong className={P.strong}>one (1) year</strong> after the cause of action arises, otherwise it is permanently barred.
      </p>

      <h3 id="20-7-fallback" className={P.h3}>20.7 Fallback if arbitration is unavailable</h3>
      <p className={P.p}>
        If for any reason a court of competent jurisdiction holds that the binding arbitration in section 20.3 is unavailable or unenforceable for a particular dispute, that dispute will be heard in the courts of <strong className={P.strong}>Kochi, Kerala, India</strong>, and you and we both submit to that exclusive jurisdiction for that purpose only. Sections{" "}
        <a href="#20-4-no-class" className={P.a}>20.4</a> (no class actions) and{" "}
        <a href="#20-6-limitation-period" className={P.a}>20.6</a> (limitation period) continue to apply.
      </p>

      <hr className={P.hr} />

      <h2 id="21-general" className={P.h2}>21. General</h2>

      <h3 id="21-1-entire" className={P.h3}>21.1 Entire agreement</h3>
      <p className={P.p}>
        These Terms, together with the <strong className={P.strong}>Refund Policy</strong> and the <strong className={P.strong}>Privacy Policy</strong>, constitute the <strong className={P.strong}>entire agreement</strong> between you and Natively concerning the Service, and supersede all prior or contemporaneous communications, proposals, marketing statements, or agreements (oral or written) on the same subject. No oral statement, demo, sales pitch, or social-media post creates any binding obligation on Natively beyond what is set out in these documents.
      </p>

      <h3 id="21-2-severability" className={P.h3}>21.2 Severability</h3>
      <p className={P.p}>
        If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court or arbitrator of competent jurisdiction, that provision will be modified to the minimum extent necessary to make it enforceable, or if it cannot be modified, severed; the remainder of these Terms will continue in full force and effect.
      </p>

      <h3 id="21-3-no-waiver" className={P.h3}>21.3 No waiver</h3>
      <p className={P.p}>
        A failure or delay by Natively to enforce any provision of these Terms is <strong className={P.strong}>not a waiver</strong> of that provision or of any other provision, and does not prevent us from enforcing it later.
      </p>

      <h3 id="21-4-assignment" className={P.h3}>21.4 Assignment</h3>
      <p className={P.p}>
        You may not assign or transfer these Terms or any of your rights under them without our prior written consent. We may assign these Terms to an affiliate or in connection with a merger, acquisition, reorganisation, or sale of substantially all of our assets.
      </p>

      <h3 id="21-5-no-agency" className={P.h3}>21.5 No agency</h3>
      <p className={P.p}>
        Nothing in these Terms creates any partnership, joint venture, agency, employment, or fiduciary relationship between you and Natively.
      </p>

      <h3 id="21-6-headings" className={P.h3}>21.6 Headings</h3>
      <p className={P.p}>Section headings are for convenience only and do not affect interpretation.</p>

      <h3 id="21-7-currency" className={P.h3}>21.7 Currency</h3>
      <p className={P.p}>
        Unless otherwise stated, all amounts referenced in these Terms or the Refund Policy are in <strong className={P.strong}>US dollars (USD)</strong>.
      </p>

      <h3 id="21-8-language" className={P.h3}>21.8 Language</h3>
      <p className={P.p}>
        These Terms are written in English. The English version is the <strong className={P.strong}>binding version</strong>. Any translation is provided for convenience only; in the event of conflict between the English version and a translation, the English version controls.
      </p>

      <h3 id="21-9-electronic-acceptance" className={P.h3}>21.9 Electronic acceptance</h3>
      <p className={P.p}>
        You agree that your acceptance of these Terms — including by clicking "Continue" on the startup screen, activating a Pro license, saving a Natively API key, or otherwise using the Service — has the <strong className={P.strong}>same legal effect as a handwritten signature</strong> and is enforceable accordingly.
      </p>

      <hr className={P.hr} />

      <h2 id="22-changes" className={P.h2}>22. Changes to the Service and these Terms</h2>
      <p className={P.p}>
        We may update the Service and these Terms over time as the product evolves. Material changes will be announced in-app, on the website, or by email, with a revised "Last updated" date at the top of this page. If you keep using the Service after a material change, you accept the updated Terms.
      </p>

      <hr className={P.hr} />

      <h2 id="23-contact" className={P.h2}>23. Contact</h2>
      <p className={P.p}>
        For anything to do with these Terms, refunds, billing, abuse reports, defamation concerns, security disclosures, legal notices, or general questions:
      </p>
      <p className={P.p}>
        <strong className={P.strong}>Email:</strong>{" "}
        <a href="mailto:natively.contact@gmail.com" className={P.a}>natively.contact@gmail.com</a>
      </p>
      <p className={P.p}>
        We aim to reply within <strong className={P.strong}>24–72 hours on weekdays</strong>. We may not respond on weekends or Indian public holidays — if you write in over a weekend, please expect a reply early the following week.
      </p>

      <hr className={P.hr} />

      <p className={P.p}>
        Thanks for using Natively. We're a small team, we read every email, and we're genuinely trying to build something useful for you.
      </p>
    </LegalPage>
  );
}
