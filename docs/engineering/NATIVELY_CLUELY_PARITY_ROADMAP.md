# Natively vs Cluely Parity Roadmap

**Project:** Natively AI Meeting Assistant
**Last Updated:** 2026-05-15
**Target:** Cluely-grade or better realtime AI meeting assistant

---

## Priority Order

### Priority 1: Security/Privacy Blockers (Phase 1)
*Must fix before any product feature work.*

1. **STT keys to renderer** — Audit all 6 STT providers, ensure only `hasKey` booleans returned
2. **Custom cURL SSRF protection** — Validate URLs, block private ranges, add data-scope controls
3. **Image path allowlist** — Ensure all `imagePaths` IPC validates resolved paths inside app directory
4. **Sensitive logging audit** — Remove raw transcript/response logging, verify sentinel tests pass
5. **Privacy controls UI** — Per-meeting persist toggle, retention settings foundation

### Priority 2: Mode Runtime & Mode Bleeding (Phase 2)
*Fixes data contamination risk; foundation for everything else.*

1. **Mode snapshot for async summary** — Meeting-stop must snapshot activeModeId, not use current mode
2. **Mode-context clear on switch** — `setActiveMode()` must clear transient context, show UI toast
3. **ModeRuntime data model** — Define `ModeDefinition`, `ModeActionDefinition`, `ModePolicy` interfaces
4. **ModeActionRegistry** — Per-mode action registry with trigger rules
5. **Rate limiter wiring** — Connect `RateLimiter.acquire()` to all LLM calls

### Priority 3: Dynamic Actions Core (Phase 3 — backend first)
*Cluely's signature feature. Build backend first, UI second.*

1. **DynamicAction model** — `id, sessionId, modeId, type, label, confidence, evidenceRefs, status, promptInstruction`
2. **DynamicActionEngine** — Listens to transcript, emits candidate actions
3. **Per-mode trigger rules** — Sales: pricing/competitor; Recruiting: candidate concerns; Team: action items; etc.
4. **Action lifecycle** — candidate → shown → accepted/dismissed → completed/expired
5. **Dedupe + expiry** — Suppress repeated actions, expire stale actions

### Priority 4: Prompt/Context Architecture (Phase 5)
*Stop raw string concatenation. Build trust levels first.*

1. **PromptAssembler** — Central context assembly with typed `ContextPacket` blocks
2. **TrustLevels** — Every context block has type/source/trust level/token budget/recency
3. **Reference file escaping** — Filenames and content escaped; never treated as instructions
4. **Token budget enforcement** — Per-block budgets, priority-based overflow handling
5. **Evidence refs in output** — Citations attached to generated answers

### Priority 5: Screen/OCR Context (Phase 4)
*Unlock coding, Excel, slide, PDF question answering.*

1. **ScreenContextService** — Safe capture → app directory → OCR → hash-based dedupe
2. **WhatToAnswerLLM integration** — `imagePaths` flows into context with untrusted label
3. **Vision/non-vision routing** — OCR text to non-vision providers; image to vision-capable
4. **UI: screen context indicator** — available / stale / unavailable / permission error
5. **UI: manual "Use current screen" button**
6. **"Answer from screen" dynamic action** — Triggers on visible coding problem

### Priority 6: Hybrid RAG for Mode Files (Phase 6)
*Upgrade from keyword search to semantic vector search.*

1. **Audit existing sqlite-vec infrastructure** — `RAGManager`, `VectorStore`, `EmbeddingPipeline`
2. **Hybrid retrieval** — FTS/BM25 exact + vector semantic → combined score → rerank → dedupe
3. **Incremental index updates** — Delta indexing on file add/update/delete (not full rebuild)
4. **Embedding fallback** — If embedding provider unavailable, degrade to lexical with logging
5. **Citation/source tracking** — Chunk-level evidence refs for generated answers

### Priority 7: Provider Routing & LLMHelper Refactor (Phase 7)
*Policy-aware routing; separate LLMHelper god object carefully.*

1. **ProviderRouter policy awareness** — Route by mode, action type, vision need, latency, privacy, cost
2. **Rate limiter wiring** — Already created in `RateLimiter.ts`, wire to all provider calls
3. **Circuit breaker** — Prevent cascading provider failures
4. **Local-only mode** — Must not call cloud providers when enabled
5. **Telemetry spans on provider calls** — Latency, provider, status, fallback events
6. **LLMHelper refactor** — Extract `PromptAssembler`, `ProviderGateway`, `MediaPreprocessor` only if safe

### Priority 8: Dynamic Actions UI (Phase 3 — UI)
*Render action cards. Must work end-to-end.*

1. **DynamicActionCard component** — Compact card: label, evidence snippet, confidence, shortcut hint
2. **DynamicActionBar** — Max 3 visible cards, primary card keyboard-accessible
3. **ActionEvidencePopover** — Show evidence details on demand
4. **Active mode badge** — Near action bar during meeting
5. **Accept/dismiss/loading states** — Card lifecycle fully implemented in UI
6. **Tab/keyboard shortcut** — Primary action triggerable without mouse

### Priority 9: Telemetry / Observability (Phase 8)
*Cannot optimize what you can't measure.*

1. **TelemetryService** — Local JSONL + optional PostHog/Axiom/Sentry
2. **Event schema** — All 20+ events defined (meeting_start, dynamic_action_shown, rag_miss, etc.)
3. **No sensitive data in telemetry** — Structured redacted logging only
4. **Diagnostics UI panel** — Provider status, STT status, last error, avg latency, active mode
5. **RAG hit/miss tracking** — Per-retrieval metrics

### Priority 10: Post-Call Coaching (Phase 9)
*Upgrade from notes to actionable follow-ups.*

1. **Mode-specific notes schema** — Stable IDs for sections, not just titles
2. **Action item extraction** — Owner + deadline from transcript
3. **Follow-up draft** — AI-generated email/message draft
4. **Coaching insights per mode:**
   - Sales: missed discovery, unanswered objection, weak next step
   - Recruiting: missing follow-up, candidate concern not addressed
   - Interview: answer too vague, missing example/metric
   - Team: action item missing owner/deadline
5. **Regenerate + export UI** — Post-call page with regenerate/copy buttons

### Priority 11: UX Polish (Phase 10)
*Surface what's happening. Reduce confusion.*

1. **Active mode badge** — Always visible during meeting
2. **Provider/STT health indicator** — Connected/disconnected/error states
3. **Privacy indicator** — Local-only vs cloud STT vs cloud LLM vs custom provider
4. **Better error messages** — Actionable, not technical
5. **Mode selector preview** — What does each mode do?
6. **Settings UI improvements** — Masked keys, data scope display, privacy controls
7. **Onboarding tour** — Choose use case, test mic/audio/AI, add first reference file

### Priority 12: E2E Testing (Phase 11)
*Real-world scenarios. Long meetings. Provider failures. Mode switching.*

Full test matrix from `promptfix.md` — 68+ tests covering:
- Security (7 tests)
- Mode correctness (5 modes × 5 tests)
- Mode bleeding (5 tests)
- Dynamic actions (11 tests)
- RAG (7 tests)
- Screen/OCR (6 tests)
- STT/audio (11 tests)
- Long sessions (7 tests)
- E2E (13 tests)

---

## NOT in Scope (Enterprise-Grade)

These require significantly more work and are enterprise features, not individual-user parity:

- **CRM/ATS integrations** (HubSpot, Salesforce, Greenhouse, Lever)
- **Team prompts / role-based modes / shared KB**
- **Pre-call briefs** (Calendar → participant research → preparation summary)
- **Web search** (Tavily/live links as RAG sources)
- **Meeting sharing** (shareable links)
- **PDF/Word export**
- **Meeting version history**
- **Multi-language support (i18n)**
- **Accessibility audit (a11y)**
- **Mobile companion app**

---

## What Natively Already Does Well

These areas need no or minimal work:

1. **Real multi-provider LLM routing** — Gemini, Groq, OpenAI, Claude, Ollama with fallback
2. **Real multi-provider STT** — Deepgram, ElevenLabs, Google, OpenAI, Local Whisper, Natively Pro
3. **Anti-AI-tell post-processing** — Dash reduction, filler phrase stripping (better than Cluely)
4. **Speculative inference** — Pre-starts LLM on high-confidence partials
5. **Local Whisper STT** — Works offline (Cluely is cloud-only — market this!)
6. **Multi-provider fallback** — Architecturally superior to Cluely's single-provider
7. **Mode prompt customization** — More flexible than Cluely's constrained customization
8. **Open-source transparency** — Cluely is closed; Natively can build trust

---

## 7-Day Target

Given realistic engineering capacity:

| Day | Focus |
|-----|-------|
| 1 | Phase 1 security audit + Phase 2 mode snapshot/mode bleeding fix |
| 2 | Phase 3 DynamicAction backend model + engine + per-mode triggers |
| 3 | Phase 5 PromptAssembler + TrustLevels + Phase 6 hybrid RAG |
| 4 | Phase 4 ScreenContextService + OCR integration |
| 5 | Phase 7 provider routing + rate limiter wiring + Phase 8 telemetry |
| 6 | Phase 3 UI (DynamicActionCard/Bar) + Phase 10 UX polish |
| 7 | Phase 9 post-call + Phase 11 E2E tests + final report |

---

## Remaining Gaps vs Cluely (After This Effort)

| Area | Gap | Notes |
|------|-----|-------|
| Dynamic action cards | Partial | Backend engine and lifecycle tests exist; renderer card/bar UI still needs end-to-end wiring |
| Enterprise features | Critical | CRM/ATS/team prompts — NOT in scope for individual-user parity |
| Pre-call briefs | Critical | Calendar integration — NOT in scope for this effort |
| Web search | Medium | Tavily/live web RAG not wired up — NOT critical for core meeting use |
| Screen OCR | Partial | Screen context service and cache safety tests exist; manual UI/status smoke testing still required |
| Post-call coaching | Partial | Schema v2, structured actions, follow-up draft, and deterministic coaching exist; regenerate/export UI remains open |
| Telemetry | Partial | Local JSONL service and redaction tests exist; runtime event wiring and retention/rotation remain open |
| Phase 11 validation | Blocked | Targeted QA set passes 45/45; full `npm test` currently hangs after PromptAssembler and needs diagnosis |

**Verdict after current pass:** Natively has safe foundations for individual-user Cluely parity across security, mode runtime, dynamic-action backend, screen context, RAG, provider routing, telemetry, and post-call workflow. Release-grade parity still requires dynamic action UI, manual UX/E2E evidence, full-suite hang diagnosis, and privacy/retention controls.

---

## Risk Areas Needing Manual Review

1. **NativelyInterface.tsx (180K+ lines)** — Any change could have unexpected side effects. Test extensively.
2. **electron/main.ts (175K+ lines)** — IPC handlers are dense. Validate security paths carefully.
3. **Mode switching mid-meeting** — Race conditions between transcript processing and context clearing
4. **LLMHelper refactor** — God object with many responsibilities. Extract carefully, test after each extraction.
5. **Custom cURL provider** — SSRF attack surface. Treat as potentially malicious user input.
6. **Encryption strategy** — No encryption currently for meeting data at rest. Design before implementing.
7. **Windows compatibility** — System audio capture may not work on Windows. Needs testing.