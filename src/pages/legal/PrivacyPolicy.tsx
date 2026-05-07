import LegalPage, { legalProse as P } from "@/components/LegalPage";

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy — Natively"
      heading="Privacy Policy"
      description="How Natively handles your data: privacy-first, local-first, no central server for your meeting data."
      canonicalPath="/privacy"
      lastUpdated="7 May 2026"
    >
      <h2 id="overview" className={P.h2}>Overview</h2>
      <p className={P.p}>
        This privacy policy describes how this open-source application ("Natively") handles your data. Our philosophy is privacy-first: we believe your meeting data belongs to you. We do not operate a central server to store your personal meeting recordings or transcripts.
      </p>

      <h2 id="data-collection" className={P.h2}>Data Collection</h2>
      <p className={P.p}>
        <strong className={P.strong}>We do not collect, store, or transmit your personal data to our own servers.</strong>
      </p>
      <p className={P.p}>The application functions as a local tool on your device.</p>
      <ul className={P.ul}>
        <li><strong className={P.strong}>Audio &amp; Video:</strong> The application captures audio and screen content only when you explicitly start a recording or session.</li>
        <li><strong className={P.strong}>Transcripts &amp; Notes:</strong> All generated transcripts, summaries, and meeting notes are stored locally on your device.</li>
        <li><strong className={P.strong}>Telemetry:</strong> This application does not include third-party analytics or tracking SDKs (such as Google Analytics or Mixpanel).</li>
      </ul>

      <h2 id="local-processing" className={P.h2}>Local Processing</h2>
      <p className={P.p}>The majority of the application's logic runs locally on your machine.</p>
      <ul className={P.ul}>
        <li><strong className={P.strong}>Database:</strong> Meeting history and notes are stored in a local SQLite database file on your computer.</li>
        <li><strong className={P.strong}>Settings:</strong> Configuration preferences are stored locally using <code className={P.code}>electron-store</code>.</li>
      </ul>

      <h2 id="network-communication" className={P.h2}>Network Communication</h2>
      <p className={P.p}>
        The application communicates over the internet only for specific, user-initiated features:
      </p>

      <h3 id="ai-services" className={P.h3}>1. Artificial Intelligence Services</h3>
      <p className={P.p}>
        To generate summaries and action items, the application sends text (transcripts) to the AI provider you have configured (e.g., OpenAI, Anthropic, Google Gemini, Groq).
      </p>
      <ul className={P.ul}>
        <li><strong className={P.strong}>Data Transmitted:</strong> Anonymized text transcripts and prompts.</li>
        <li><strong className={P.strong}>Privacy:</strong> This data is subject to the privacy policy of the respective AI provider you have chosen. We encourage using providers that do not train on API data.</li>
        <li><strong className={P.strong}>Keys:</strong> Your API keys are stored locally on your device and are never sent to us.</li>
      </ul>

      <h3 id="software-updates" className={P.h3}>2. Software Updates</h3>
      <p className={P.p}>
        The application periodically checks GitHub's servers to see if a new version of the software is available.
      </p>
      <ul className={P.ul}>
        <li><strong className={P.strong}>Data Transmitted:</strong> Basic application version information and your operating system type (e.g., macOS, Windows).</li>
      </ul>

      <h2 id="permissions" className={P.h2}>Permissions</h2>
      <p className={P.p}>To function correctly, the application requires the following permissions on your device:</p>
      <ul className={P.ul}>
        <li><strong className={P.strong}>Microphone:</strong> Required to record meeting audio for transcription.</li>
        <li><strong className={P.strong}>Screen Recording / Accessibility:</strong> Required to capture screen content or system audio if enabled.</li>
        <li><strong className={P.strong}>Notifications:</strong> Used to alert you when a summary is ready.</li>
      </ul>
      <p className={P.p}>
        You may revoke these permissions at any time through your operating system settings, though this will limit the application's functionality.
      </p>

      <h2 id="third-party-services" className={P.h2}>Third-Party Services</h2>
      <p className={P.p}>
        This project allows integration with third-party Large Language Model (LLM) providers. We do not control how these third parties handle your data once it is sent to them explicitly by the application.
      </p>
      <ul className={P.ul}>
        <li>OpenAI</li>
        <li>Anthropic</li>
        <li>Google (Gemini)</li>
        <li>Groq</li>
      </ul>
      <p className={P.p}>
        <strong className={P.strong}>This project does not use third-party tracking or marketing cookies.</strong>
      </p>

      <h2 id="data-retention" className={P.h2}>Data Retention</h2>
      <p className={P.p}>Since data is stored locally:</p>
      <ul className={P.ul}>
        <li><strong className={P.strong}>You are in control:</strong> You can delete meeting logs, transcripts, and the application database at any time from your local file system.</li>
        <li><strong className={P.strong}>No Remote Retention:</strong> We cannot delete your data for you because we do not have access to it.</li>
      </ul>

      <h2 id="open-source" className={P.h2}>Open Source Transparency</h2>
      <p className={P.p}>
        This project is open-source. The full source code is available for inspection on our GitHub repository. You can verify the claims in this policy by auditing the code directly.
      </p>

      <h2 id="contact" className={P.h2}>Contact</h2>
      <p className={P.p}>
        If you have any questions or concerns about this privacy policy, please contact us at:
      </p>
      <p className={P.p}>
        <strong className={P.strong}>
          <a href="mailto:natively.contact@gmail.com" className={P.a}>natively.contact@gmail.com</a>
        </strong>
      </p>
    </LegalPage>
  );
}
