import SEOTemplate from "../SEOTemplate";
import { LocaleLink } from "@/components/LocaleLink";

export default function FreeAIInterviewAssistant() {
  return (
    <SEOTemplate
      title="Free AI Interview Assistant — No Subscription Required | Natively"
      description="The best free AI interview assistant for coding interviews. Natively runs locally on your device — no subscription, no credit card, no cloud. Works with Ollama for fully offline, $0 operation."
      canonicalPath="/free-ai-interview-assistant"
      h1="Free AI Interview Assistant: Zero Subscription, Zero Cloud"
      ru={{
        title: "Бесплатный ИИ-ассистент для собеседований — Без подписки | Natively",
        description: "Лучший бесплатный ИИ-ассистент для интервью по кодингу. Natively работает локально — без подписки, без карты, без облака. Работает с Ollama полностью офлайн.",
        h1: "Бесплатный ИИ-ассистент для собеседований: Без подписки, без облака",
        children: (
          <>
            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Почему большинство ИИ-ассистентов для интервью платные</h2>
              <p className="mb-4">
                Большинство инструментов для подготовки к собеседованиям — FinalRoundAI ($25–50/мес), Cluely, LockedIn AI — монетизируются через подписки, потому что они несут расходы на облачные серверы. Каждый ваш запрос обрабатывается на их инфраструктуре — это стоит денег, которые они перекладывают на вас.
              </p>
              <p className="mb-4">
                Natively устраняет эту стоимость полностью. Обрабатывая всё локально на вашем устройстве, Natively не несёт операционных расходов на каждый запрос. Это позволяет предлагать базовые функции <strong>бесплатно навсегда</strong>.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Три способа использовать Natively бесплатно</h2>

              <h3 className="text-xl font-medium text-foreground mt-8 mb-4">Вариант 1: Ollama (полностью бесплатно, полностью офлайн)</h3>
              <p className="mb-4">
                Самая мощная бесплатная конфигурация. Установите <a href="https://ollama.ai" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Ollama</a> на свой Mac или Windows-машину, загрузите модель (Llama 3.1, DeepSeek Coder или Mistral) и настройте Natively на её использование. Ваши общие расходы на API: <strong>$0.00</strong>. Эта конфигурация работает полностью офлайн — интернет-соединение во время собеседования не требуется.
              </p>
              <p className="mb-4">
                Рекомендуемые бесплатные модели для собеседований по кодингу:
              </p>
              <ul className="list-disc list-inside space-y-1 mb-4">
                <li><strong>DeepSeek Coder 6.7B</strong> — отлично для алгоритмов и генерации кода</li>
                <li><strong>Llama 3.1 8B</strong> — сильные универсальные рассуждения</li>
                <li><strong>Mistral 7B</strong> — быстрая, эффективная, хорошие технические рассуждения</li>
                <li><strong>Qwen2.5 Coder 7B</strong> — специализирована на задачах с кодом</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mt-8 mb-4">Вариант 2: Собственный API-ключ (~$0.01–0.05/собеседование)</h3>
              <p className="mb-4">
                Если вам нужен доступ к более мощным моделям (GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro), вы можете использовать собственный API-ключ. Natively отправляет в API только конкретный вопрос — а не непрерывный аудиопоток — сохраняя ваши расходы минимальными.
              </p>
              <p className="mb-4">
                Типичная стоимость за сессию собеседования: <strong>$0.02–0.10</strong>. Сравните это с $25–50/мес у FinalRoundAI.
              </p>

              <h3 className="text-xl font-medium text-foreground mt-8 mb-4">Вариант 3: Бесплатный тариф Natively</h3>
              <p className="mb-4">
                Natively бесплатен и имеет открытый исходный код: используйте локальные модели через Ollama (полностью офлайн, $0) или свой собственный API-ключ (BYOK). Если вы предпочитаете не управлять ключами, размещённый Natively API начинается с $8/мес (Standard), а тарифы Pro, Max и Ultra стоят $15, $25 и $35/мес.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Что включает бесплатный ИИ-ассистент для собеседований</h2>
              <div className="overflow-x-auto my-8">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted/50 text-foreground">
                      <th className="p-4 border-b border-border/50 font-semibold">Функция</th>
                      <th className="p-4 border-b border-border/50 font-semibold">Бесплатно (Ollama/BYOK)</th>
                      <th className="p-4 border-b border-border/50 font-semibold">Natively API (от $8/мес)</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="p-4 border-b border-border/50 font-medium">Помощь с кодингом в реальном времени</td>
                      <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓ Без ограничений</td>
                      <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓ Без ограничений</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-border/50 font-medium">Решение алгоритмических задач</td>
                      <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓</td>
                      <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-border/50 font-medium">Поддержка системного дизайна</td>
                      <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓</td>
                      <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-border/50 font-medium">Поведенческие собеседования (STAR)</td>
                      <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓</td>
                      <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-border/50 font-medium">Невидимый оверлей</td>
                      <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓</td>
                      <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-border/50 font-medium">Офлайн-режим (Ollama)</td>
                      <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓</td>
                      <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-border/50 font-medium">Поддержка облачного API (BYOK)</td>
                      <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓ Любой провайдер</td>
                      <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓ Любой провайдер</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-border/50 font-medium">Продвинутые конфигурации моделей</td>
                      <td className="p-4 border-b border-border/50 text-muted-foreground">Базовые</td>
                      <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓ Полный доступ</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-border/50 font-medium">Приоритетные ИИ-модели</td>
                      <td className="p-4 border-b border-border/50 text-muted-foreground">Стандартные</td>
                      <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓ GPT-4o, Claude 3.5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Бесплатно против платно: сколько реально стоят ИИ-ассистенты для собеседований</h2>
              <p className="mb-4">
                Вот реалистичное сравнение стоимости для типичного поиска работы продолжительностью 3 месяца с еженедельными собеседованиями:
              </p>
              <div className="overflow-x-auto my-8">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted/50 text-foreground">
                      <th className="p-4 border-b border-border/50 font-semibold">Инструмент</th>
                      <th className="p-4 border-b border-border/50 font-semibold">Стоимость в месяц</th>
                      <th className="p-4 border-b border-border/50 font-semibold">Итого за 3 месяца</th>
                      <th className="p-4 border-b border-border/50 font-semibold">Приватность данных</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="p-4 border-b border-border/50 font-medium">FinalRoundAI</td>
                      <td className="p-4 border-b border-border/50 text-red-400">$25–50</td>
                      <td className="p-4 border-b border-border/50 text-red-400">$75–$150</td>
                      <td className="p-4 border-b border-border/50 text-muted-foreground">Хранится в облаке</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-border/50 font-medium">Natively + Ollama</td>
                      <td className="p-4 border-b border-border/50 text-green-500 font-medium">$0.00</td>
                      <td className="p-4 border-b border-border/50 text-green-500 font-medium">$0.00</td>
                      <td className="p-4 border-b border-border/50 text-green-500 font-medium">100% локально</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-border/50 font-medium">Natively + BYOK (OpenAI)</td>
                      <td className="p-4 border-b border-border/50 text-green-500 font-medium">~$0.50–$2</td>
                      <td className="p-4 border-b border-border/50 text-green-500 font-medium">~$1.50–$6</td>
                      <td className="p-4 border-b border-border/50 text-green-500 font-medium">Ваш API-ключ</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-border/50 font-medium">Natively API (Pro)</td>
                      <td className="p-4 border-b border-border/50 text-green-500 font-medium">$15</td>
                      <td className="p-4 border-b border-border/50 text-green-500 font-medium">$45</td>
                      <td className="p-4 border-b border-border/50 text-green-500 font-medium">Размещённый</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Как настроить бесплатный ИИ-ассистент для собеседований за 5 минут</h2>
              <ol className="list-decimal list-inside space-y-4 mb-4">
                <li>
                  <strong>Скачайте Natively</strong> — Зайдите на natively.software и скачайте для macOS (M1/M2/M3 или Intel) либо Windows.
                </li>
                <li>
                  <strong>Установите Ollama</strong> (для работы за $0) — Скачайте Ollama с <a href="https://ollama.ai" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">ollama.ai</a> и выполните <code className="bg-muted px-1 rounded">ollama pull llama3.1</code> или <code className="bg-muted px-1 rounded">ollama pull deepseek-coder</code>
                </li>
                <li>
                  <strong>Предоставьте разрешения</strong> — В системных настройках macOS предоставьте Natively доступ к записи экрана и микрофону.
                </li>
                <li>
                  <strong>Настройте ИИ-провайдера</strong> — В настройках Natively выберите Ollama и загруженную модель. Или вставьте свой API-ключ OpenAI/Anthropic.
                </li>
                <li>
                  <strong>Начните собеседование</strong> — Запустите Natively, разместите оверлей и начните следующее техническое собеседование.
                </li>
              </ol>
              <p className="mb-4">
                <LocaleLink to="/ai-coding-interview-helper" className="text-primary hover:underline">ИИ-помощник по кодингу на собеседованиях</LocaleLink> активируется автоматически, когда обнаруживает вопросы по программированию или паттерны разговора на собеседовании.
              </p>
            </section>
          </>
        )
      }}
    >
      <section>
        <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Why Most AI Interview Assistants Cost $25–50/Month</h2>
        <p className="mb-4">
          The leading AI interview tools — FinalRoundAI, Cluely, LockedIn AI, and others — all charge monthly subscriptions because they run expensive cloud infrastructure. Every time you use their copilot during an interview, your audio and screen are processed on their remote servers. That costs money, and they pass it to you through subscriptions.
        </p>
        <p className="mb-4">
          Natively eliminates this cost entirely. By processing everything locally on your device, Natively incurs zero per-request infrastructure costs. This allows the core features to be <strong>free forever</strong> — not freemium tricks, not limited trial periods.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Three Ways to Use Natively For Free</h2>

        <h3 className="text-xl font-medium text-foreground mt-8 mb-4">Option 1: Ollama (Completely Free, Fully Offline)</h3>
        <p className="mb-4">
          The most powerful free setup. Install <a href="https://ollama.ai" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Ollama</a> on your Mac or Windows machine, pull a model (Llama 3.1, DeepSeek Coder, or Mistral), and configure Natively to use it. Your total API cost: <strong>$0.00</strong>. This setup works completely offline — no internet connection needed during your interview.
        </p>
        <p className="mb-4">
          Recommended free models for coding interviews:
        </p>
        <ul className="list-disc list-inside space-y-1 mb-4">
          <li><strong>DeepSeek Coder 6.7B</strong> — excellent for algorithm and code generation</li>
          <li><strong>Llama 3.1 8B</strong> — strong general-purpose reasoning</li>
          <li><strong>Mistral 7B</strong> — fast, efficient, good technical reasoning</li>
          <li><strong>Qwen2.5 Coder 7B</strong> — specialized for code tasks</li>
        </ul>

        <h3 className="text-xl font-medium text-foreground mt-8 mb-4">Option 2: Bring Your Own API Key (~$0.01–0.05/interview)</h3>
        <p className="mb-4">
          If you want access to more powerful models (GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro), you can use your own API key. Natively sends only the specific question to the API — not a continuous audio stream — keeping your costs minimal.
        </p>
        <p className="mb-4">
          Typical cost per interview session: <strong>$0.02–0.10</strong>. Compare this to FinalRoundAI's $25–50/month.
        </p>

        <h3 className="text-xl font-medium text-foreground mt-8 mb-4">Option 3: Natively Free Tier</h3>
        <p className="mb-4">
          Natively is free and open source: run local models via Ollama (fully offline, $0) or bring your own API key (BYOK). If you'd rather not manage keys, the hosted Natively API starts at $8/month (Standard), with Pro, Max, and Ultra at $15, $25, and $35/month.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">What the Free AI Interview Assistant Includes</h2>
        <div className="overflow-x-auto my-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 text-foreground">
                <th className="p-4 border-b border-border/50 font-semibold">Feature</th>
                <th className="p-4 border-b border-border/50 font-semibold">Free (Ollama/BYOK)</th>
                <th className="p-4 border-b border-border/50 font-semibold">Natively API (from $8/mo)</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr>
                <td className="p-4 border-b border-border/50 font-medium">Real-time coding assistance</td>
                <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓ Unlimited</td>
                <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓ Unlimited</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-border/50 font-medium">Algorithm problem solving</td>
                <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓</td>
                <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-border/50 font-medium">System design support</td>
                <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓</td>
                <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-border/50 font-medium">Behavioral interviews (STAR)</td>
                <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓</td>
                <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-border/50 font-medium">Invisible overlay</td>
                <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓</td>
                <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-border/50 font-medium">Offline mode (Ollama)</td>
                <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓</td>
                <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-border/50 font-medium">Cloud API support (BYOK)</td>
                <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓ Any provider</td>
                <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓ Any provider</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-border/50 font-medium">Advanced model configurations</td>
                <td className="p-4 border-b border-border/50 text-muted-foreground">Basic</td>
                <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓ Full access</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-border/50 font-medium">Priority AI models</td>
                <td className="p-4 border-b border-border/50 text-muted-foreground">Standard</td>
                <td className="p-4 border-b border-border/50 text-green-500 font-medium">✓ GPT-4o, Claude 3.5</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">Free vs Paid: What AI Interview Assistants Actually Cost</h2>
        <p className="mb-4">
          Here is a realistic cost comparison for a typical job search lasting 3 months with weekly interviews:
        </p>
        <div className="overflow-x-auto my-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-muted/50 text-foreground">
                <th className="p-4 border-b border-border/50 font-semibold">Tool</th>
                <th className="p-4 border-b border-border/50 font-semibold">Monthly Cost</th>
                <th className="p-4 border-b border-border/50 font-semibold">3-Month Total</th>
                <th className="p-4 border-b border-border/50 font-semibold">Data Privacy</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr>
                <td className="p-4 border-b border-border/50 font-medium">FinalRoundAI</td>
                <td className="p-4 border-b border-border/50 text-red-400">$25–50</td>
                <td className="p-4 border-b border-border/50 text-red-400">$75–$150</td>
                <td className="p-4 border-b border-border/50 text-muted-foreground">Cloud stored</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-border/50 font-medium">Natively + Ollama</td>
                <td className="p-4 border-b border-border/50 text-green-500 font-medium">$0.00</td>
                <td className="p-4 border-b border-border/50 text-green-500 font-medium">$0.00</td>
                <td className="p-4 border-b border-border/50 text-green-500 font-medium">100% local</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-border/50 font-medium">Natively + BYOK (OpenAI)</td>
                <td className="p-4 border-b border-border/50 text-green-500 font-medium">~$0.50–$2</td>
                <td className="p-4 border-b border-border/50 text-green-500 font-medium">~$1.50–$6</td>
                <td className="p-4 border-b border-border/50 text-green-500 font-medium">Your API key</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-border/50 font-medium">Natively API (Pro)</td>
                <td className="p-4 border-b border-border/50 text-green-500 font-medium">$15</td>
                <td className="p-4 border-b border-border/50 text-green-500 font-medium">$45</td>
                <td className="p-4 border-b border-border/50 text-green-500 font-medium">Hosted</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-foreground mt-12 mb-6">How to Set Up Your Free AI Interview Assistant in 5 Minutes</h2>
        <ol className="list-decimal list-inside space-y-4 mb-4">
          <li>
            <strong>Download Natively</strong> — Visit natively.software and download for macOS (M1/M2/M3 or Intel) or Windows.
          </li>
          <li>
            <strong>Install Ollama</strong> (for $0 operation) — Download Ollama from <a href="https://ollama.ai" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">ollama.ai</a> and run <code className="bg-muted px-1 rounded">ollama pull llama3.1</code> or <code className="bg-muted px-1 rounded">ollama pull deepseek-coder</code>
          </li>
          <li>
            <strong>Grant permissions</strong> — In macOS System Settings, grant screen recording and microphone access to Natively.
          </li>
          <li>
            <strong>Configure your AI provider</strong> — In Natively settings, select Ollama and your downloaded model. Or paste your OpenAI/Anthropic API key.
          </li>
          <li>
            <strong>Start your interview</strong> — Launch Natively, position the overlay, and begin your next technical interview.
          </li>
        </ol>
        <p className="mb-4">
          The <LocaleLink to="/ai-coding-interview-helper" className="text-primary hover:underline">AI coding interview helper</LocaleLink> activates automatically when it detects coding questions or interview conversation patterns.
        </p>
      </section>
    </SEOTemplate>
  );
}
