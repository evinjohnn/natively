import LegalPage, { legalProse as P } from "@/components/LegalPage";

export default function RefundPolicy() {
  return (
    <LegalPage
      title="Refund Policy — Natively"
      heading="Refund Policy"
      description="Refund policy for Natively Pro and the Natively API."
      canonicalPath="/refundpolicy"
      lastUpdated="7 May 2026"
    >
      <p className={P.p}>
        This is the full refund policy for <strong className={P.strong}>Natively Pro</strong> and the <strong className={P.strong}>Natively API</strong> service. We've tried to write it like a person, not a lawyer — please give it a read before purchasing.
      </p>
      <p className={P.p}>
        If you have a question that isn't answered here, email us at <strong className={P.strong}><a href="mailto:natively.contact@gmail.com" className={P.a}>natively.contact@gmail.com</a></strong>. We aim to reply within <strong className={P.strong}>24–72 hours on weekdays</strong>. We may not respond on weekends or Indian public holidays — if you write in over a weekend, please expect a reply early the following week.
      </p>

      <hr className={P.hr} />

      <h2 id="heads-up" className={P.h2}>A heads-up before you read</h2>
      <p className={P.p}>
        Natively is built and maintained by a single developer and integrates a wide range of third-party services — AI providers, speech-to-text engines, search APIs, payment processors, OS-level audio &amp; screen capture, and more. That gives the app a lot of capability, but it also means the surface area is wider than a typical closed-source product, and once in a while something may not behave exactly as expected.
      </p>
      <p className={P.p}>
        If you run into something like that, <strong className={P.strong}>please report it rather than disputing the charge</strong>. We read every report and fixes typically land in the next update. We'd much rather earn your trust by shipping a fix than have you walk away frustrated.
      </p>

      <hr className={P.hr} />

      <h2 id="1-natively-pro" className={P.h2}>1. Natively Pro</h2>
      <p className={P.p}>
        Natively Pro unlocks features such as the Profile Engine, Resume Intelligence, Context Intelligence, Negotiation Coaching, JD Intelligence, and Company Research. Pro is a digital product, delivered instantly, and tied to a single user.
      </p>

      <h3 id="1-1-free-trial" className={P.h3}>1.1 Please try the Free Trial first</h3>
      <p className={P.p}>
        The Free Trial is the same product — same features, same experience — and it exists specifically so you can be confident Pro is right for you before committing. There's no upsell pressure inside the trial and no obligation to buy. We'd sincerely rather you take a little extra time on the trial than purchase and feel buyer's remorse afterwards.
      </p>

      <h3 id="1-2-pro-non-refundable" className={P.h3}>1.2 Pro is generally non-refundable</h3>
      <p className={P.p}>
        Once a license is activated and Pro features have been used, the value can't really be undone. As a small team we also can't reliably tell genuine "I changed my mind" requests apart from "I used Pro for the thing I needed and now want my money back," so Pro is sold on a <strong className={P.strong}>non-refundable</strong> basis. We're sorry to be firm on this — it's the only way we can keep prices fair and keep building the product.
      </p>

      <h3 id="1-3-grace-window" className={P.h3}>1.3 1-hour grace window for honest mistakes</h3>
      <p className={P.p}>
        Mistakes happen — wrong plan, accidental click, second thoughts the moment after checkout. If that's you, please email us within <strong className={P.strong}>1 hour of the order</strong> and <strong className={P.strong}>before the license is activated</strong>. We review each request individually, and where it's clearly an honest mistake (no activation, no usage, prompt contact) we're glad to reverse the charge.
      </p>
      <p className={P.p}>
        For the avoidance of doubt, <strong className={P.strong}>"activation" means the moment your license key is successfully validated by our license server</strong> — which is the moment you click <em>Activate License</em> in <strong className={P.strong}>Settings → Natively Pro</strong> and see the "Activated" confirmation. Once activation has succeeded, or any Pro feature has been used, the order is final.
      </p>
      <p className={P.p}>
        If you accidentally <strong className={P.strong}>bought the wrong product</strong> (for example, Pro when you meant Natively API, or Lifetime when you meant Yearly), please tell us in that same email and we'll either reverse the charge or, where you'd prefer, swap you to the right product (any difference in price is settled in either direction).
      </p>

      <h3 id="1-4-yearly" className={P.h3}>1.4 Yearly subscriptions</h3>
      <p className={P.p}>
        Yearly Pro is billed once for the full term. It isn't refundable mid-term, but you can cancel any time and you simply won't be charged at the next renewal — and you'll keep access for the rest of the period you've already paid for.
      </p>

      <h3 id="1-5-vouchers" className={P.h3}>1.5 Voucher and promo-code purchases are final sale</h3>
      <p className={P.p}>
        Anything bought with a coupon (including <code className={P.code}>INSIDER25</code>), voucher, referral credit, or limited-time offer is <strong className={P.strong}>non-refundable</strong>. Those prices are already as low as we can sustainably offer. This is shown clearly at checkout when the code is applied.
      </p>

      <h3 id="1-6-one-license" className={P.h3}>1.6 One license per person</h3>
      <p className={P.p}>
        A license is meant for a single user across a small number of devices. If you're moving to a new computer, just deactivate the license on the old one in <strong className={P.strong}>Settings → Natively Pro</strong> — that's fully supported.
      </p>
      <p className={P.p}>
        Sharing keys, reselling them, listing them on resale platforms, or activating beyond the allowed device limit unfortunately means we'll have to deactivate the license, and a refund won't be possible in those situations.
      </p>

      <hr className={P.hr} />

      <h2 id="2-natively-api" className={P.h2}>2. Natively API</h2>
      <p className={P.p}>
        The Natively API is our managed plan that bundles AI, speech-to-text, and search quotas into a simple monthly subscription. Plans are billed in advance and renew automatically until cancelled.
      </p>

      <h3 id="2-1-24-hour-window" className={P.h3}>2.1 24-hour refund window — first purchase only</h3>
      <p className={P.p}>
        If you bought a Natively API plan <strong className={P.strong}>at full price</strong> (no voucher, no promo code), you can request a full refund within <strong className={P.strong}>24 hours of the original purchase</strong>.
      </p>
      <p className={P.p}>To be clear about the scope:</p>
      <ul className={P.ul}>
        <li>This window applies to your <strong className={P.strong}>first purchase</strong> of a given plan only. <strong className={P.strong}>Renewals are not refundable.</strong> If your plan auto-renews and you'd prefer it didn't, please cancel from your account before the next renewal date.</li>
        <li>Each customer is generally eligible for <strong className={P.strong}>one refund</strong> under this window. We may decline subsequent refund requests where a customer has previously been refunded.</li>
        <li>After 24 hours, refunds aren't guaranteed, but we're always happy to hear what's going on and see what we can do.</li>
      </ul>

      <h3 id="2-2-vouchers" className={P.h3}>2.2 Voucher and promo-code purchases are final sale</h3>
      <p className={P.p}>
        Anything bought with a coupon, voucher, referral credit, or limited-time offer is <strong className={P.strong}>non-refundable</strong>. Those prices are already as low as we can sustainably go. This is shown clearly at checkout the moment a code is applied, so there are no surprises afterwards.
      </p>

      <h3 id="2-3-cancelling" className={P.h3}>2.3 Cancelling a subscription</h3>
      <p className={P.p}>
        You can cancel any time from your account dashboard or by emailing us. Your plan will simply stop renewing at the end of the current period, and you'll keep access until then.
      </p>
      <p className={P.p}>
        We don't automatically refund the unused portion of a cycle that's already started, but if something feels off, please reach out.
      </p>

      <h3 id="2-4-mid-cycle" className={P.h3}>2.4 Mid-cycle plan changes</h3>
      <ul className={P.ul}>
        <li><strong className={P.strong}>Upgrades</strong> (e.g., Standard → Pro) take effect immediately. You'll either be charged a prorated difference for the remainder of the current cycle, or have the upgrade take effect at the next billing date — depending on what your account dashboard offers at the time.</li>
        <li><strong className={P.strong}>Downgrades</strong> (e.g., Ultra → Standard) take effect at the <strong className={P.strong}>end of the current cycle</strong>, so you keep what you paid for. We don't issue automatic refunds for the unused portion of a higher tier when you downgrade.</li>
      </ul>

      <h3 id="2-5-quota-disputes" className={P.h3}>2.5 Quota disputes</h3>
      <p className={P.p}>
        If you believe your quota counters look wrong (for example, charges for requests that didn't complete, or a counter that jumped during a known outage), please email us with a description of when you noticed it. Where we agree there was a billing or counter error on our side, we'll <strong className={P.strong}>credit the affected quota or issue a refund for the difference</strong> at our discretion. Disputes about counter accuracy must be raised within <strong className={P.strong}>30 days</strong> of the affected billing cycle.
      </p>

      <hr className={P.hr} />

      <h2 id="3-both-products" className={P.h2}>3. Things that apply to both products</h2>

      <h3 id="3-1-taxes" className={P.h3}>3.1 Taxes &amp; fees</h3>
      <p className={P.p}>
        When a refund is approved, sales tax / GST / VAT and processor fees are usually returned along with the price.
      </p>
      <p className={P.p}>
        Bank-side currency-conversion losses sometimes aren't recoverable — those happen at your bank, not on our side — and we wanted to be upfront so there's no surprise.
      </p>
      <p className={P.p}>
        Refunds are <strong className={P.strong}>issued in the currency of the original transaction</strong>. If your bank converts the refund back to your home currency at a different rate than it charged you, that exchange-rate spread is between you and your bank; we don't make up the difference.
      </p>

      <h3 id="3-2-pending-charges" className={P.h3}>3.2 Pending charges and double-charges</h3>
      <p className={P.p}>
        Some banks place a temporary <strong className={P.strong}>authorization hold</strong> at checkout that looks like a charge but later disappears on its own. If you see what looks like a duplicate charge, please wait <strong className={P.strong}>3–5 business days</strong> before assuming it's permanent — most holds clear by themselves.
      </p>
      <p className={P.p}>
        If after 5 business days you can confirm the same order was actually charged twice (we'll only have one order ID on our side for it), email us and we'll refund the duplicate immediately as part of the "always make it right" cases in section 3.5.
      </p>

      <h3 id="3-3-refunds-we-cant-approve" className={P.h3}>3.3 Refunds we can't approve</h3>
      <p className={P.p}>
        Refunds will not be issued where, in our reasonable view, the request shows signs of abuse — including but not limited to:
      </p>
      <ul className={P.ul}>
        <li>Repeated trial claiming across multiple email addresses or devices;</li>
        <li>Buy-then-refund-then-rebuy patterns from the same person, payment instrument, or device;</li>
        <li>Use of Pro or API features for the task the customer wanted to accomplish, followed by a refund request;</li>
        <li>License sharing, key resale, or activation beyond the allowed device count;</li>
        <li>Violations of our Terms &amp; Conditions or Acceptable Use policy;</li>
        <li>Purchases that we reasonably believe were made fraudulently or with a stolen / unauthorised payment instrument (in which case the cardholder, not us, is the right party to dispute the charge).</li>
      </ul>

      <h3 id="3-4-please-email" className={P.h3}>3.4 Please email us before opening a dispute</h3>
      <p className={P.p}>
        A polite email almost always lands faster, and gets you a better outcome, than a chargeback with your bank. Disputes are particularly costly for a small team — fees, lost taxes, processor penalties — so please give us a chance to make it right first. We promise we'll read it.
      </p>
      <p className={P.p}>If a chargeback or payment dispute is opened without contacting us first:</p>
      <ul className={P.ul}>
        <li>The license or API key may be paused while the payment processor investigates.</li>
        <li>If the dispute is decided in your favour without us being given a chance to resolve it, the license may be <strong className={P.strong}>permanently deactivated</strong> and the account blocked from future Natively services.</li>
        <li>In cases of clear fraud or bad-faith disputes, we reserve the right to recover the disputed amount and any related processor fees through legal means.</li>
      </ul>

      <h3 id="3-5-discretionary" className={P.h3}>3.5 When we may issue a discretionary refund</h3>
      <p className={P.p}>
        There are a few cases where, even outside the windows above, we'll review your situation in good faith and may issue a refund at our discretion:
      </p>
      <ul className={P.ul}>
        <li><strong className={P.strong}>Duplicate charges</strong> caused by a payment-system glitch.</li>
        <li><strong className={P.strong}>Pro genuinely failing to activate</strong> on every device you try, due to a confirmed bug on our side that we've been unable to resolve in a reasonable time.</li>
        <li><strong className={P.strong}>Natively API materially failing to deliver paid quota</strong> due to a confirmed outage or bug on our side.</li>
      </ul>
      <p className={P.p}>
        These are not unconditional guarantees of a refund — we'll work with you in good faith and try to resolve the underlying issue first. <strong className={P.strong}>Claims under this section must be raised within 60 days of the relevant charge</strong>, with your order ID. We may decline to act on claims raised outside that window.
      </p>

      <hr className={P.hr} />

      <h2 id="4-other-purchase-paths" className={P.h2}>4. Other purchase paths (special cases)</h2>

      <h3 id="4-1-app-stores" className={P.h3}>4.1 Purchases via app stores</h3>
      <p className={P.p}>
        If you bought Natively or a Natively subscription through a <strong className={P.strong}>third-party app marketplace</strong> (for example, Apple's App Store / Mac App Store, the Microsoft Store, Google Play, or Setapp), the <strong className={P.strong}>store's own refund policy</strong> governs that purchase. We don't have direct visibility into those orders or the ability to issue a refund on the store's behalf. Please follow the refund flow inside that store:
      </p>
      <ul className={P.ul}>
        <li><strong className={P.strong}>Apple App Store / Mac App Store</strong> → <a href="https://reportaproblem.apple.com" className={P.a} rel="noreferrer noopener">reportaproblem.apple.com</a></li>
        <li><strong className={P.strong}>Microsoft Store</strong> → <a href="https://account.microsoft.com" className={P.a} rel="noreferrer noopener">account.microsoft.com</a> → Order history</li>
        <li><strong className={P.strong}>Google Play</strong> → <a href="https://play.google.com/store/account" className={P.a} rel="noreferrer noopener">play.google.com/store/account</a> → Order history</li>
        <li><strong className={P.strong}>Setapp</strong> → <a href="https://setapp.com/support" className={P.a} rel="noreferrer noopener">setapp.com support</a></li>
      </ul>
      <p className={P.p}>
        If the store declines and you believe it's our fault (a bug we caused, etc.), email us and we'll see what we can do.
      </p>

      <h3 id="4-2-gift-purchases" className={P.h3}>4.2 Gift purchases</h3>
      <p className={P.p}>
        If someone bought Natively for you as a gift, the <strong className={P.strong}>person whose payment method was charged</strong> is the one who can request a refund. Please ask them to email us with the order ID; we can't refund a payment to a card we never charged.
      </p>

      <h3 id="4-3-bulk-team-edu" className={P.h3}>4.3 Bulk, team, or educational licenses</h3>
      <p className={P.p}>
        We sometimes provide bulk Pro licenses or educational discounts under a separate written arrangement. Refund terms for those purchases are governed by the agreement signed at the time, which may differ from the windows above. If you don't have a written agreement and you bought through the standard checkout, the regular rules above apply.
      </p>

      <hr className={P.hr} />

      <h2 id="5-how-to-request" className={P.h2}>5. How to request a refund</h2>
      <p className={P.p}>
        Email <strong className={P.strong}><a href="mailto:natively.contact@gmail.com" className={P.a}>natively.contact@gmail.com</a></strong> with:
      </p>
      <ol className={P.ol}>
        <li>Your <strong className={P.strong}>order ID</strong> (it's in the receipt email from the payment processor). <strong className={P.strong}>Refund requests without a verifiable order ID cannot be processed</strong> — please don't omit this.</li>
        <li>The <strong className={P.strong}>product</strong> (Natively Pro or Natively API) and the plan.</li>
        <li>A short note about <strong className={P.strong}>what happened</strong> — a sentence or two is plenty.</li>
      </ol>
      <p className={P.p}>
        We aim to reply within <strong className={P.strong}>24–72 hours on weekdays</strong>. Weekends and Indian public holidays may not be covered — please expect a reply early the following week if you write in over a weekend.
      </p>

      <hr className={P.hr} />

      <h2 id="6-changes" className={P.h2}>6. Changes to this policy</h2>
      <p className={P.p}>
        We may update this policy from time to time. The version that applies to your purchase is the one that was live on the day you bought. Material changes will be noted at the top of the page with a revised "Last updated" date.
      </p>

      <hr className={P.hr} />

      <p className={P.p}>Thanks for supporting Natively — it genuinely means a lot.</p>
    </LegalPage>
  );
}
