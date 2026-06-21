import SEOTemplate from "../SEOTemplate";
import { LocaleLink } from "@/components/LocaleLink";

export default function LocalMeetingNotesWithoutBot() {
  return (
    <SEOTemplate
      title="How to Take Private Meeting Notes Without a Bot (2026)"
      description="Tired of a bot joining every call? Here's how to take private, AI-powered meeting notes locally — no cloud, no visible participant, no minute caps — using on-device transcription."
      canonicalPath="/blog/local-meeting-notes-without-bot"
      h1="How to Take Private Meeting Notes Without a Bot in the Call"
      ru={{
        title: "Как вести приватные заметки со встреч без бота (2026)",
        description: "Надоел бот в каждом звонке? Вот как вести приватные ИИ-заметки локально — без облака, без видимого участника и без лимитов минут — с помощью транскрипции на устройстве.",
        h1: "Как вести приватные заметки со встреч без бота в звонке",
        children: (
          <>
            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Проблема видимого бота для заметок</h2>
              <p className="mb-4">
                Большинство ИИ-нотетейкеров (Otter, Fireflies, Fathom) работают, подключая бота-участника к вашему звонку. Этот бот отображается в списке участников, его видят все, и он отправляет аудио встречи на облачные серверы для обработки. Для конфиденциальных встреч, переговоров о зарплате или звонков под NDA это создаёт реальную проблему: вы добавляете стороннего наблюдателя в приватный разговор.
              </p>
              <p className="mb-4">
                Хорошая новость: вести точные ИИ-заметки можно и без бота, и без облака. Решение — <strong>локальная обработка на устройстве</strong>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Что значит «локальный нотетейкер»?</h2>
              <p className="mb-4">
                Локальный нотетейкер захватывает звук вашей встречи прямо на вашем компьютере — через системное аудио, а не через бота в звонке — и транскрибирует его с помощью модели распознавания речи, работающей на устройстве (например, локальной Whisper). Затем локальная LLM (через Ollama) генерирует сводку и пункты действий. Ничто не отправляется в облако.
              </p>
              <p className="mb-4">
                Поскольку захват происходит на уровне вашей системы, другие участники звонка не видят никакого дополнительного участника. Для них вы — просто человек на встрече.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Пошагово: приватные заметки без бота</h2>
              <ol className="list-decimal list-inside space-y-3 mb-4">
                <li>Установите <LocaleLink to="/ai-note-taker" className="text-primary hover:underline">локальный ИИ-нотетейкер</LocaleLink>, например Natively, на macOS или Windows.</li>
                <li>Установите Ollama и загрузите локальную модель (например, Llama или Mistral) для офлайн-инференса.</li>
                <li>Включите захват системного аудио — он берёт звук встречи и ваш микрофон как два отдельных канала.</li>
                <li>Начните встречу как обычно. Транскрипция и заметки появляются в реальном времени, локально.</li>
                <li>После звонка экспортируйте заметки в Markdown, JSON или текст. Аудио остаётся на устройстве.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Локальный против облачного: сравнение</h2>
              <div className="overflow-x-auto my-6">
                <table className="w-full text-left border-collapse">
                  <thead><tr className="bg-muted/50 text-foreground"><th className="p-4 border-b border-border/50 font-semibold">Фактор</th><th className="p-4 border-b border-border/50 font-semibold">Облачный бот</th><th className="p-4 border-b border-border/50 font-semibold">Локальный (Natively)</th></tr></thead>
                  <tbody className="text-sm">
                    <tr><td className="p-4 border-b border-border/50 font-medium">Видимый участник</td><td className="p-4 border-b border-border/50 text-red-400">Да, бот в списке</td><td className="p-4 border-b border-border/50 text-green-500">Нет</td></tr>
                    <tr><td className="p-4 border-b border-border/50 font-medium">Куда уходит аудио</td><td className="p-4 border-b border-border/50 text-red-400">Облачные серверы</td><td className="p-4 border-b border-border/50 text-green-500">Остаётся на устройстве</td></tr>
                    <tr><td className="p-4 border-b border-border/50 font-medium">Лимит минут</td><td className="p-4 border-b border-border/50 text-red-400">Часто на бесплатном тарифе</td><td className="p-4 border-b border-border/50 text-green-500">Нет</td></tr>
                    <tr><td className="p-4 border-b border-border/50 font-medium">Работа офлайн</td><td className="p-4 border-b border-border/50 text-red-400">Нет</td><td className="p-4 border-b border-border/50 text-green-500">Да (с Ollama)</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Когда локальные заметки особенно важны</h2>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Встречи под NDA или с конфиденциальной бизнес-информацией</li>
                <li>Переговоры о зарплате и обсуждение офферов</li>
                <li>Звонки по продажам с данными клиентов</li>
                <li>Медицинские, юридические или финансовые консультации</li>
                <li>Любой контекст, где сторонний облачный наблюдатель неприемлем</li>
              </ul>
              <p className="mb-4">
                Для этих случаев <LocaleLink to="/ai-meeting-assistant" className="text-primary hover:underline">локальный ИИ-ассистент для встреч</LocaleLink> — единственный подход, который не добавляет в разговор стороннюю сторону.
              </p>
            </section>
          </>
        )
      }}
    >
      <section>
        <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">The Problem With Visible Note-Taking Bots</h2>
        <p className="mb-4">
          Most AI notetakers (Otter, Fireflies, Fathom) work by adding a bot participant to your call. That bot shows up in the participant list, everyone can see it, and it sends the meeting audio to cloud servers for processing. For confidential meetings, salary negotiations, or calls under NDA, this is a real problem: you're adding a third-party observer to a private conversation.
        </p>
        <p className="mb-4">
          The good news: you can take accurate AI notes with no bot and no cloud. The solution is <strong>local, on-device processing</strong>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">What Is a "Local Notetaker"?</h2>
        <p className="mb-4">
          A local notetaker captures your meeting's sound directly on your computer — through system audio, not through a bot in the call — and transcribes it using a speech-recognition model that runs on your device (such as local Whisper). A local LLM (via Ollama) then generates the summary and action items. Nothing is sent to the cloud.
        </p>
        <p className="mb-4">
          Because the capture happens at your system level, the other people on the call never see an extra participant. To them, you're just a person in the meeting.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Step by Step: Private Notes Without a Bot</h2>
        <ol className="list-decimal list-inside space-y-3 mb-4">
          <li>Install a <LocaleLink to="/ai-note-taker" className="text-primary hover:underline">local AI note taker</LocaleLink> such as Natively on macOS or Windows.</li>
          <li>Install Ollama and pull a local model (e.g. Llama or Mistral) for offline inference.</li>
          <li>Enable system-audio capture — it takes the meeting sound and your microphone as two separate channels.</li>
          <li>Start your meeting as usual. Transcription and notes appear in real time, locally.</li>
          <li>After the call, export your notes to Markdown, JSON, or text. The audio stays on your device.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Local vs Cloud: A Side-by-Side</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-left border-collapse">
            <thead><tr className="bg-muted/50 text-foreground"><th className="p-4 border-b border-border/50 font-semibold">Factor</th><th className="p-4 border-b border-border/50 font-semibold">Cloud Bot</th><th className="p-4 border-b border-border/50 font-semibold">Local (Natively)</th></tr></thead>
            <tbody className="text-sm">
              <tr><td className="p-4 border-b border-border/50 font-medium">Visible participant</td><td className="p-4 border-b border-border/50 text-red-400">Yes, a bot in the list</td><td className="p-4 border-b border-border/50 text-green-500">None</td></tr>
              <tr><td className="p-4 border-b border-border/50 font-medium">Where audio goes</td><td className="p-4 border-b border-border/50 text-red-400">Cloud servers</td><td className="p-4 border-b border-border/50 text-green-500">Stays on device</td></tr>
              <tr><td className="p-4 border-b border-border/50 font-medium">Minute cap</td><td className="p-4 border-b border-border/50 text-red-400">Often on free tier</td><td className="p-4 border-b border-border/50 text-green-500">None</td></tr>
              <tr><td className="p-4 border-b border-border/50 font-medium">Works offline</td><td className="p-4 border-b border-border/50 text-red-400">No</td><td className="p-4 border-b border-border/50 text-green-500">Yes (with Ollama)</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">When Local Notes Matter Most</h2>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Meetings under NDA or with confidential business information</li>
          <li>Salary negotiations and offer discussions</li>
          <li>Sales calls handling customer data</li>
          <li>Medical, legal, or financial consultations</li>
          <li>Any context where a third-party cloud observer is unacceptable</li>
        </ul>
        <p className="mb-4">
          For these cases, a <LocaleLink to="/ai-meeting-assistant" className="text-primary hover:underline">local AI meeting assistant</LocaleLink> is the only approach that adds no outside party to the conversation.
        </p>
      </section>
    </SEOTemplate>
  );
}
