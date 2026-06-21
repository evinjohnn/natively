import SEOTemplate from "../SEOTemplate";
import { LocaleLink } from "@/components/LocaleLink";

export default function AINoteTakerPrivacyGuide() {
  return (
    <SEOTemplate
      title="Are AI Note-Takers Private? Otter, Fireflies & Cluely (2026)"
      description="Are AI note-takers private? We explain what Otter, Fireflies, and Cluely actually do with your meeting audio — and how local, on-device note-taking keeps your conversations yours."
      canonicalPath="/blog/ai-note-taker-privacy-guide"
      h1="Are AI Note-Takers Private? What They Do With Your Audio"
      ru={{
        title: "Приватны ли ИИ-нотетейкеры? Otter, Fireflies и Cluely (2026)",
        description: "Приватны ли ИИ-нотетейкеры? Объясняем, что Otter, Fireflies и Cluely на самом деле делают с аудио ваших встреч — и как локальные заметки на устройстве сохраняют ваши разговоры приватными.",
        h1: "Приватны ли ИИ-нотетейкеры? Что они делают с вашим аудио",
        children: (
          <>
            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Короткий ответ</h2>
              <p className="mb-4">
                Большинство ИИ-нотетейкеров <strong>не приватны в строгом смысле</strong>: они отправляют аудио ваших встреч на облачные серверы для транскрипции и резюмирования. Ваши слова, имена участников и обсуждаемый контент покидают ваше устройство и хранятся или обрабатываются сторонней компанией. Единственный способ гарантировать приватность — обрабатывать всё локально, на устройстве.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Что облачные нотетейкеры делают с вашим аудио</h2>
              <p className="mb-4">
                Чтобы работать, облачный нотетейкер должен: захватить аудио встречи, передать его на свои серверы, прогнать через модели распознавания речи и ИИ, а затем сохранить транскрипт и сводку в вашем аккаунте. Это означает, что копия вашего разговора находится на их инфраструктуре — подчиняясь их политике хранения, их мерам безопасности и их юрисдикции.
              </p>
              <p className="mb-4">
                Это не делает их вредоносными — это стандартная архитектура SaaS. Но это означает, что ваши приватные разговоры технически доступны вне вашего контроля.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Сравнение по приватности (2026)</h2>
              <div className="overflow-x-auto my-6">
                <table className="w-full text-left border-collapse">
                  <thead><tr className="bg-muted/50 text-foreground"><th className="p-4 border-b border-border/50 font-semibold">Инструмент</th><th className="p-4 border-b border-border/50 font-semibold">Обработка</th><th className="p-4 border-b border-border/50 font-semibold">Бот в звонке</th></tr></thead>
                  <tbody className="text-sm">
                    <tr><td className="p-4 border-b border-border/50 font-medium">Otter.ai</td><td className="p-4 border-b border-border/50 text-red-400">Облако</td><td className="p-4 border-b border-border/50 text-red-400">Да</td></tr>
                    <tr><td className="p-4 border-b border-border/50 font-medium">Fireflies.ai</td><td className="p-4 border-b border-border/50 text-red-400">Облако</td><td className="p-4 border-b border-border/50 text-red-400">Да</td></tr>
                    <tr><td className="p-4 border-b border-border/50 font-medium">Cluely</td><td className="p-4 border-b border-border/50 text-red-400">Облако</td><td className="p-4 border-b border-border/50 text-yellow-500">Нет (оверлей)</td></tr>
                    <tr><td className="p-4 border-b border-border/50 font-medium">Natively</td><td className="p-4 border-b border-border/50 text-green-500 font-medium">На устройстве</td><td className="p-4 border-b border-border/50 text-green-500 font-medium">Нет (оверлей)</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mb-4">
                Cluely, как и Natively, использует невидимый оверлей вместо бота, но всё равно обрабатывает аудио в облаке. Подробный разбор — <LocaleLink to="/blog/is-cluely-safe" className="text-primary hover:underline">Безопасен ли Cluely?</LocaleLink>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Вопросы, которые стоит задать любому ИИ-нотетейкеру</h2>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Покидает ли моё аудио устройство? Если да — куда оно идёт?</li>
                <li>Как долго хранятся транскрипты и могу ли я их удалить?</li>
                <li>Используются ли мои данные для обучения моделей?</li>
                <li>Виден ли другим участникам бот или индикатор записи?</li>
                <li>Могу ли я работать полностью офлайн?</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Действительно приватная альтернатива: локальная обработка</h2>
              <p className="mb-4">
                <LocaleLink to="/ai-note-taker" className="text-primary hover:underline">Natively</LocaleLink> обрабатывает транскрипцию и резюмирование полностью на вашем устройстве через локальную Whisper и Ollama. Аудио никогда не передаётся, бот не подключается, а транскрипты хранятся локально и могут быть экспортированы или удалены вами. Для встреч под NDA, переговоров и конфиденциальных звонков это единственная архитектура, которая делает «приватный» буквально истинным.
              </p>
            </section>
          </>
        )
      }}
    >
      <section>
        <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">The Short Answer</h2>
        <p className="mb-4">
          Most AI note-takers are <strong>not private in the strict sense</strong>: they send your meeting audio to cloud servers to transcribe and summarize it. Your words, participant names, and the content discussed leave your device and are stored or processed by a third-party company. The only way to guarantee privacy is to process everything locally, on your device.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">What Cloud Note-Takers Do With Your Audio</h2>
        <p className="mb-4">
          To function, a cloud note-taker must: capture the meeting audio, transmit it to its servers, run it through speech-recognition and AI models, then store the transcript and summary in your account. That means a copy of your conversation lives on their infrastructure — subject to their retention policy, their security, and their jurisdiction.
        </p>
        <p className="mb-4">
          This doesn't make them malicious — it's standard SaaS architecture. But it does mean your private conversations are technically accessible outside your control.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Privacy Comparison (2026)</h2>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-left border-collapse">
            <thead><tr className="bg-muted/50 text-foreground"><th className="p-4 border-b border-border/50 font-semibold">Tool</th><th className="p-4 border-b border-border/50 font-semibold">Processing</th><th className="p-4 border-b border-border/50 font-semibold">Bot in Call</th></tr></thead>
            <tbody className="text-sm">
              <tr><td className="p-4 border-b border-border/50 font-medium">Otter.ai</td><td className="p-4 border-b border-border/50 text-red-400">Cloud</td><td className="p-4 border-b border-border/50 text-red-400">Yes</td></tr>
              <tr><td className="p-4 border-b border-border/50 font-medium">Fireflies.ai</td><td className="p-4 border-b border-border/50 text-red-400">Cloud</td><td className="p-4 border-b border-border/50 text-red-400">Yes</td></tr>
              <tr><td className="p-4 border-b border-border/50 font-medium">Cluely</td><td className="p-4 border-b border-border/50 text-red-400">Cloud</td><td className="p-4 border-b border-border/50 text-yellow-500">No (overlay)</td></tr>
              <tr><td className="p-4 border-b border-border/50 font-medium">Natively</td><td className="p-4 border-b border-border/50 text-green-500 font-medium">On-device</td><td className="p-4 border-b border-border/50 text-green-500 font-medium">No (overlay)</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mb-4">
          Cluely, like Natively, uses an invisible overlay instead of a bot, but it still processes audio in the cloud. For the full breakdown, read <LocaleLink to="/blog/is-cluely-safe" className="text-primary hover:underline">Is Cluely Safe?</LocaleLink>
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Questions to Ask Any AI Note-Taker</h2>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Does my audio leave my device? If so, where does it go?</li>
          <li>How long are transcripts retained, and can I delete them?</li>
          <li>Is my data used to train models?</li>
          <li>Can other participants see a bot or recording indicator?</li>
          <li>Can I run fully offline?</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">The Genuinely Private Alternative: Local Processing</h2>
        <p className="mb-4">
          <LocaleLink to="/ai-note-taker" className="text-primary hover:underline">Natively</LocaleLink> processes transcription and summarization entirely on your device via local Whisper and Ollama. Audio is never transmitted, no bot joins, and transcripts are stored locally for you to export or delete. For meetings under NDA, negotiations, and confidential calls, this is the only architecture that makes "private" literally true.
        </p>
      </section>
    </SEOTemplate>
  );
}
