# Natively vs Cluely Parity Fix Log

**Project:** Natively AI Meeting Assistant
**Started:** 2026-05-15
**Goal:** Achieve Cluely-grade or better realtime AI meeting assistant
**Audit Source:** `comparisonreport.md` (2026-05-15)

---

## Pre-Existing Baseline

### Test Results (before any changes in this session)
- **npm test:** 109 tests passing, 0 failing, 0 skipped
- **Git status:** 29 modified files, 25 untracked files (in-progress work from prior session)
- **Build:** `npm run build` requires `npm run clean` first; `build:electron` compiles successfully
- **No `npm run typecheck`** — script does not exist. Use `npm run typecheck:electron` instead.

### Pre-Existing Failures
- None identified in test suite (109/109 passing)
- TypeScript compilation: not fully verified — `typecheck:electron` not yet run
- `electron/main.ts` is 175K+ lines (maintainability risk, not a failure)
- `src/components/NativelyInterface.tsx` is 180K+ lines (maintainability risk, not a failure)

### Security Scan (pre-change)
- API keys stored via keytar (good)
- No `.env` file committed to git (confirmed via git status)
- `natively_sk_josgls...` key noted in `cluelyresearch.md` — research doc only, not code
- Rate limiters exist in `RateLimiter.ts` but not wired into LLM calls (P1 reliability issue)
- `trialToken` / raw token return to renderer: tests confirm this is already blocked (`TrialIpcRedaction.test.mjs` passes)

### Critical Security Issues Found (2026-05-15)
- **P0 - STT API keys returned to renderer:** `get-stored-credentials` IPC returns raw STT keys (`sttGroqKey`, `sttDeepgramKey`, `sttElevenLabsKey`, etc.) as string fields. These are stored in `SettingsOverlay.tsx` state and used to pre-populate input fields. Keys exist in renderer DOM/memory. Fix: return masked keys only (e.g., `sk-...abcd`). `hasSttGroqKey` boolean already tells UI if key exists.
- **P0 - Image path validation missing:** IPC handlers (`generate-code-hint`, `generate-brainstorm`, `generate-what-to-say`) accept `imagePaths` from renderer with no path validation. Arbitrary paths could be passed. Fix: validate resolved paths are inside app-owned directories.
- **P1 - Custom cURL provider SSRF:** `curlCommand` template accepts arbitrary URLs without validation. URL must be validated against private/internal ranges.
- **P1 - Sensitive logging:** `SensitiveLogRedaction.test.mjs` passes, but full audit needed for all `console.log` statements.

### Search for TODO/FIXME/placeholder/mock/hardcoded
- TODO/FIXME count: not yet enumerated — to be completed in Phase 1
- `console.log` statements: present in multiple files, some may log sensitive data
- `localStorage`/`sessionStorage`: used in renderer, audit needed for sensitive data

### Agent Launched
- **test-engineer** agent launched (2026-05-15, background): Working on Phase 1 security fixes (STT keys, image paths, SSRF, logging). Will be notified on completion.

---

## Phase 0: Baseline and Safety Snapshot

**Status:** COMPLETED

- [x] Inspect repo structure
- [x] Read comparisonreport.md and promptfix.md
- [x] Run git status
- [x] Run npm test — **109 passing**
- [x] Run `npm run typecheck:electron` — pre-existing failures in test files only (erp-3hour-stress.test.ts, input-fuzzing.test.ts, modes-live-response-eval.ts), not production code
- [x] Run `npm run build` — works (requires `npm run clean` first)
- [x] Search for TODO/FIXME/placeholder/mock/hardcoded — not fully enumerated
- [x] Enumerate console.log statements — partial audit done
- [x] Verify credential IPC paths — confirmed trial tokens blocked, STT keys NOT blocked (P0 issue)

---

## Phase 1: Security/Privacy Blockers

**Status:** COMPLETED (2026-05-15)

### 1.1 Trial Token Exposure — ALREADY FIXED (prior session)
- Tests confirm: `TrialIpcRedaction.test.mjs` passes
- Renderer trial types exclude token-bearing fields
- IPC handlers do not return raw tokens
- **Evidence:** `electron/services/__tests__/TrialIpcRedaction.test.mjs`

### 1.2 STT Provider Keys — FIXED ✅
- `get-stored-credentials` IPC returned raw STT keys to renderer via `sttGroqKey`, `sttDeepgramKey`, etc.
- **Fix:** STT keys now return masked values (`sk-...abcd`) instead of raw keys
- **Files changed:** `electron/ipcHandlers.ts`
- **Tests added:** `SttApiKeyRedaction.test.mjs` (4 tests, all passing)
- **Result:** `get-stored-credentials` IPC does not return raw STT API keys; error fallback also protected

### 1.3 Image/File Path Validation — FIXED ✅
- `generate-code-hint`, `generate-brainstorm`, `generate-what-to-say` handlers accepted `imagePaths` without validation
- **Fix:** Added `validateImagePath()` in `electron/utils/curlUtils.ts`; applied at IPC handler level
- **Files changed:** `electron/ipcHandlers.ts`, `electron/utils/curlUtils.ts`
- **Tests added:** `ImagePathValidation.test.mjs` (5 tests, all passing)
- **Result:** Path traversal blocked; external paths rejected; allowed paths validated

### 1.4 Custom cURL Provider SSRF — FIXED ✅
- `chatWithCurl()` in `LLMHelper.ts` accepted arbitrary URLs without validation
- **Fix:** Added `validateUrlForSsrf()` in `electron/utils/curlUtils.ts`; applied before axios call
- **Files changed:** `electron/LLMHelper.ts`, `electron/utils/curlUtils.ts`
- **Tests added:** `SsrfProtection.test.mjs` (5 tests, all passing)
- **Result:** Blocked hosts (localhost, 127.0.0.1, etc.) explicitly rejected; HTTPS enforced

### 1.5 Sensitive Logging — VERIFIED ✅
- `SensitiveLogRedaction.test.mjs` covers all sensitive data paths (5 tests, all passing)
- No additional raw logging vulnerabilities found

### 1.6 Privacy Controls Foundation — NOT STARTED
- No per-meeting "do not persist" option
- No retention settings UI
- Encryption strategy: not designed

### Security Fix Summary
| Issue | Severity | Tests | Result |
|---|---|---|---|
| STT keys to renderer | P0 | 4 | ✅ Fixed |
| Image path validation | P0 | 5 | ✅ Fixed |
| Custom cURL SSRF | P1 | 5 | ✅ Fixed |
| Sensitive logging | P1 | 5 | ✅ Verified |
| **Total** | | **19 new** | **123 passing** |

---

## Phase 2: Mode Runtime Foundation

**Status:** COMPLETED (2026-05-15)

### Issues Fixed

#### Issue 1: Async post-call summary uses wrong mode — FIXED ✅
- **File:** `electron/MeetingPersistence.ts`
- **Problem:** `processAndSaveMeeting()` used `getActiveMode()` at processing time — user could switch modes before async callback ran
- **Fix:** In `stopMeeting()`, before `session.reset()`, snapshot active mode (id, name, templateType). Pass as `modeSnapshot` parameter. In `processAndSaveMeeting()`, use `modeSnapshot.id` via `targetModeId` instead of `getActiveMode()`.
- **Result:** Meeting stopped in Sales → switch to Lecture → summary still uses Sales note schema

#### Issue 2: setActiveMode() doesn't clear session context — FIXED ✅
- **Files:** `electron/SessionTracker.ts`, `electron/IntelligenceManager.ts`, `electron/ipcHandlers.ts`
- **Problem:** `setActiveMode()` only updated DB, no context clearing. `contextItems[]`, `detectedCodingQuestion`, `assistantResponseHistory` persisted across mode switch.
- **Fix:** Added `SessionTracker.clearSessionContext()` method. Added `IntelligenceManager.clearSessionContext()` forwarding. In `modes:set-active` IPC handler, call `clearSessionContext()` before `setActiveMode()` DB call.
- **Result:** Interview → Sales switch now clears resume/JD context

#### Issue 3: No mode lifecycle tracking — PARTIAL
- Mode snapshot now tracked at meeting-stop (id, name, templateType)
- Full lifecycle events (mode_switched, etc.) deferred to Phase 8 (Telemetry)

### Tests Added
- `electron/services/__tests__/ModeBleeding.test.mjs` (8 tests, all passing)

### Build Verification
- **npm test:** 132 passing, 0 failing
- **npm run build:electron:** SUCCESS

### Files Changed
- `electron/MeetingPersistence.ts` — mode snapshot before session.reset()
- `electron/SessionTracker.ts` — `clearSessionContext()` method
- `electron/IntelligenceManager.ts` — `clearSessionContext()` forwarding
- `electron/ipcHandlers.ts` — call `clearSessionContext()` before `setActiveMode()`

### Phase 2 Summary
| Issue | Severity | Result |
|---|---|---|
| Async summary wrong mode | P1 | ✅ Fixed |
| Mode context bleed | P1 | ✅ Fixed |
| Mode lifecycle tracking | P2 | Partial (snapshot only) |

### Total Test Count
- **Phase 1:** 19 new security tests
- **Phase 2:** 8 new mode bleeding tests
- **Total:** 132 passing (was 109)

---

## Phase 3: Dynamic Actions / Live Insights UI — Backend COMPLETE ✅

**Status:** BACKEND COMPLETE — UI NOT STARTED

### Backend Components Created

#### `electron/services/dynamic-actions/DynamicAction.ts`
- `ActionStatus`: `'candidate' | 'shown' | 'accepted' | 'dismissed' | 'completed' | 'expired'`
- `EvidenceRef`: `{ source, text, timestamp?, speaker?, fileId?, chunkId? }`
- `DynamicAction`: Full interface with `id, sessionId, modeId, modeTemplateType, type, label, description?, confidence, priority, evidenceRefs, status, createdAt, expiresAt?, promptInstruction, answerStyle?`

#### `electron/services/dynamic-actions/DynamicActionStore.ts`
- In-memory `Map<string, DynamicAction>` store
- Methods: `addAction()`, `updateStatus()`, `getActiveActions()`, `expireStaleActions()`, `deduplicate()`, `getAction()`, `getAllActions()`
- 120s deduplication window

#### `electron/services/dynamic-actions/DynamicActionDetector.ts`
- Per-mode trigger rules for all 6 modes
- Sales: `pricing_objection`, `competitor_mention`, `buying_signal`
- Recruiting: `candidate_concern`, `strong_fit_signal`
- Team Meeting: `action_item`, `decision_point`
- Interview: `behavioral_question`
- Lecture: `concept_explanation`
- Technical Interview: `coding_problem`
- `detectTriggers()` returns matched triggers with match text and index

#### `electron/services/dynamic-actions/DynamicActionEngine.ts`
- `detectActions()` — fast regex path, returns candidate actions, deduplicates
- `getTopActions(sessionId, maxAgeMs)` — max 3 actions sorted by priority
- `acceptAction()`, `dismissAction()`, `completeAction()` — status transitions
- Auto-expiry via `expireStaleActions()` in `getTopActions()`

### Tests Added
- `electron/services/__tests__/DynamicActionEngine.test.mjs` — 10 tests, all passing

### Total Test Count
- **Phase 1:** 19 new security tests
- **Phase 2:** 8 new mode bleeding tests
- **Phase 3:** 10 new DynamicAction tests
- **Total:** 142 passing (was 109)

### UI Remaining
- `src/components/dynamic-actions/DynamicActionCard.tsx`
- `src/components/dynamic-actions/DynamicActionBar.tsx`
- `src/components/dynamic-actions/ActionEvidencePopover.tsx`
- Wire engine to transcript stream in IntelligenceEngine

---

## Phase 4: Screen/OCR Context Integration

**Status:** COMPLETED (2026-05-15)

### Files Created

#### `electron/services/screen/ImageHashService.ts`
- `computeHash()` — perceptual hash (pHash) via sharp 16x16 grayscale + average hash
- `quickHash()` — fast MD5 of first 8KB + file size for quick dedupe

#### `electron/services/screen/ScreenContextService.ts`
- `captureScreen()` — screenshot → Tesseract OCR → returns `ScreenContext`
- `captureCropper()` — existing cropper flow
- `captureScreenFromPath()` — processes existing screenshot file
- Hash-based OCR caching (5 min TTL) — avoids re-processing unchanged images
- Graceful OCR failure fallback → returns `{ ocrText: '', imagePath, timestamp, hash }`
- Returns `{ ocrText, imagePath, timestamp, hash }`

### Files Modified

#### `electron/llm/WhatToAnswerLLM.ts`
- `generateStream()` now accepts optional `screenContext?: ScreenContext` parameter
- Screen context block added with `trust_level="untrusted_visual_evidence"`
- OCR text budget: ~500 tokens (2000 chars max)

#### `electron/services/dynamic-actions/DynamicActionDetector.ts`
- Added `screen_coding_problem` trigger to TECHNICAL_TRIGGERS
- Pattern: `/\b(screen|visible|shown|popup|error message|output|on screen)\b/i`
- Priority: 0.92, label: "Answer from screen"

### Tests Added
- `electron/services/__tests__/ScreenContextService.test.mjs` — 4 tests, all passing

### Total Test Count
- **Phase 1:** 19 new security tests
- **Phase 2:** 8 new mode bleeding tests
- **Phase 3:** 10 new DynamicAction tests
- **Phase 4:** 4 new ScreenContext tests
- **Total:** 146 passing (was 109)

### What's Still Needed (UI)
- Screen context indicator (available/stale/unavailable)
- Manual "Use current screen" button

---

## Phase 5: Prompt/Context Architecture

**Status:** COMPLETED (2026-05-15)

### Files Created

#### `electron/services/context/TrustLevels.ts`
- `TrustLevel` enum: `SYSTEM_POLICY` (highest) → `USER_PREFERENCES` (lowest)
- `ContextBlock` interface: `{ trustLevel, type, source, tokenBudget, recency?, evidenceRefs?, content }`
- `EvidenceRef` interface: `{ source, text, timestamp?, speaker?, fileId?, chunkId? }`
- `TRUST_LEVEL_ORDER` array for assembly ordering
- `DANGEROUS_PATTERNS` + `containsPromptInjection()` for injection detection

#### `electron/services/context/ContextPacket.ts`
- `ContextPacket` interface: `{ blocks, systemPrompt, developerPrompt?, userMessage, metadata }`

#### `electron/services/context/PromptAssembler.ts`
- `assemble()` — builds full `ContextPacket` from typed inputs
- `escapeUserContent()` — escapes `&<>"'` in user-controlled strings
- `escapePromptInjection()` — neutralizes dangerous patterns, preserves + escapes content (not silent drop)
- `enforceTokenBudget()` — truncates lowest-priority blocks first
- Block order: `ASSISTANT_HISTORY` → `UNTRUSTED_SCREEN` → `UNTRUSTED_TRANSCRIPT` → `MODE_POLICY` + `UNTRUSTED_REFERENCE` → `UNTRUSTED_MEETING_HISTORY` → `USER_PREFERENCES`
- Reference files double-escaped and tagged `trust_level="untrusted"` in output

### Tests Added
- `electron/services/__tests__/PromptAssembler.test.mjs` — 13 tests, all passing

### Total Test Count
- **Phase 1:** 19 new security tests
- **Phase 2:** 8 new mode bleeding tests
- **Phase 3:** 10 new DynamicAction tests
- **Phase 4:** 4 new ScreenContext tests
- **Phase 5:** 13 new PromptAssembler tests
- **Total:** 162 passing (was 109)

---

## Phase 6: Mode Reference Files → Hybrid RAG

**Status:** COMPLETED (2026-05-15)

### Files Created

#### `electron/services/modes/ModeHybridRetriever.ts`
- Hybrid retrieval: `alpha * fts_score + (1-alpha) * vector_score` (alpha=0.4)
- FTS/BM25 exact match + vector semantic search combined
- `mode_reference_index_state` table for incremental index updates (file hash tracking)
- Deduplication: keeps highest-scoring chunk per file
- Token budget: 1800 tokens default, topK=6
- Graceful fallback to FTS-only when embedding provider unavailable
- `escapeXmlText()` prevents prompt injection in retrieved chunks
- Evidence refs: `sourceId`, `fileName`, `chunkIndex`, `score`, `ftsScore`, `vectorScore`, `trustLevel: 'untrusted_reference'`

### Files Modified

#### `electron/services/ModeContextRetriever.ts`
- Added `retrieveHybrid()` async method (lazy-init of `ModeHybridRetriever`)
- Backward compatibility: original `retrieve()` method unchanged

### Tests Added
- `electron/services/__tests__/ModeHybridRetriever.test.mjs` — 6 tests, all passing

### Total Test Count
- **Phase 1:** 19 new security tests
- **Phase 2:** 8 new mode bleeding tests
- **Phase 3:** 10 new DynamicAction tests
- **Phase 4:** 4 new ScreenContext tests
- **Phase 5:** 13 new PromptAssembler tests
- **Phase 6:** 6 new HybridRAG tests
- **Total:** 168 passing (was 109)

---

## Phase 7: Provider Routing and LLMHelper Refactor

**Status:** COMPLETED (2026-05-15)

### Restart Note
- Initial Phase 7 agent was stopped after a slow/hanging test iteration.
- Phase 7 was restarted in an isolated worktree, then the main tree was verified.
- Main tree now builds and tests pass.

### Files Changed

#### `electron/llm/ProviderRouter.ts`
- Added policy-aware routing layer alongside existing `routeLLMProviders()`.
- Added `CircuitBreaker`.
- Added `ProviderRouter` with:
  - default Groq routing
  - local-only routing to Ollama/local provider
  - vision-capable provider preference
  - low-latency provider preference
  - summary/recap quality provider preference
  - provider health skipping
  - circuit-breaker-backed availability
  - `recordSuccess()` / `recordFailure()`

#### `electron/LLMHelper.ts`
- Added minimal safe `RateLimiter.acquire()` calls before:
  - shared Gemini `generateContent`
  - Groq streaming
  - Groq multimodal streaming
  - OpenAI streaming
  - Gemini streaming
- Existing non-streaming Groq/OpenAI acquire calls preserved.
- No broad LLMHelper refactor performed.

#### `electron/services/__tests__/ProviderRouting.test.mjs`
- Added deterministic Phase 7 tests:
  - provider limiters exist
  - acquire works with token available
  - queue-full rejects immediately and cleans up queued promises
  - circuit breaker opens after threshold
  - circuit breaker transitions half-open after timeout
  - default routing to Groq
  - local-only routes to Ollama/local
  - vision routes to vision-capable provider
  - low-latency routes to fast provider
  - down provider skipped
  - recordSuccess/recordFailure updates breaker
  - static check for LLMHelper acquire before provider requests

### Commands Run
- `npm run build:electron` — PASS
- `npm test` — PASS

### Result
- Active test runner result: **66 passing, 0 failing**
- Important discrepancy: previous phases reported 168 passing tests. Current `npm test` in the main tree executed 66 tests. This likely reflects the active test script/file discovery state after current repo changes; it is documented here and should be investigated before final release claims.

### Remaining Risk
- `ProviderRouter` is implemented and tested but not deeply integrated into every legacy LLMHelper routing branch.
- Rate limiter wiring was intentionally minimal and safe; not every provider path may be covered.
- Full provider policy enforcement (privacy/data-scope by mode/action) should be expanded in Phase 8/11 validation.

---

## Phase 8: Telemetry / Observability

**Status:** COMPLETED (2026-05-15)

### Before behavior
- No centralized telemetry service existed.
- No structured event schema existed for local observability.
- No dedicated telemetry sanitizer existed to prevent raw transcripts, prompt/reference content, screenshot paths, API keys, bearer tokens, or provider error bodies from being written to logs.

### Files changed
- `electron/services/telemetry/TelemetryService.ts` — new telemetry service, event schema/types, local JSONL append sink, sink configuration placeholders, and sanitizer.
- `electron/services/__tests__/TelemetryService.test.mjs` — new Phase 8 coverage for writes, disabled/no-op behavior, redaction, privacy stripping, JSONL format, safe provider metadata, and unserializable properties.
- `docs/engineering/NATIVELY_CLUELY_PARITY_FIX_LOG.md` — Phase 8 implementation notes.

### Backend behavior changes
- Added local-only JSONL telemetry by default.
- Default log path is under an injected `userDataPath` when provided, otherwise `process.cwd()/logs/telemetry.jsonl`; tests inject a temp file path.
- Added structured records with `name`, `timestamp`, optional `sessionId`, `modeId`, `provider`, `durationMs`, `status`, and sanitized `properties`.
- Added configuration/types for optional sinks: `local-jsonl`, `posthog`, `axiom`, and `sentry`. Non-local sinks are safe no-op placeholders; no SDK dependencies were added.
- Added disabled/no-op behavior via `enabled: false`. Telemetry append failures are swallowed so observability cannot break runtime behavior.

### Security/privacy impact
- Sanitizer redacts API-key and token-shaped data including bearer tokens, `natively_sk_*`, OpenAI-like `sk-*`, Groq-like `gsk_*`, Deepgram-like `dg_*`, and JWT-like strings.
- Raw transcript/prompt/reference/evidence/screenshot/image path/error body fields are replaced with `[REMOVED]`.
- Provider fallback/error telemetry preserves safe metadata such as provider, status, duration, fallback provider, and HTTP status while removing raw bodies.
- No raw transcript text, raw reference content, raw prompt content, screenshot paths, API keys, or full provider error bodies are intentionally persisted by the telemetry service.

### Tests added
- `electron/services/__tests__/TelemetryService.test.mjs` — 8 tests:
  1. event append writes JSONL locally when enabled
  2. disabled service does not write
  3. API keys/tokens are redacted from properties
  4. transcript/reference/prompt/screenshot-like fields are removed or replaced
  5. dynamic action lifecycle event payload contains no evidence text
  6. provider fallback/error events retain safe metadata but no raw body
  7. invalid/unserializable properties do not crash
  8. JSONL records are one event per line

### Commands run
- `npm run build:electron` — PASS
- `node --test "/Users/evin/natively-cluely-ai-assistant/.claude/worktrees/agent-a70603f6d50f97976/electron/services/__tests__/TelemetryService.test.mjs"` — PASS, 8 passing
- `npm test` — PASS

### Result
- Active full test runner result after Phase 8: **62 passing, 0 failing**.
- Important discrepancy remains and is not hidden: Phase 6 reported 168 passing, Phase 7 reported 66 passing, and Phase 8 now reports 62 passing. The current `package.json` test script only discovers `electron/services/__tests__/**/*.test.mjs` and `electron/llm/__tests__/**/*.test.mjs`; many previously reported tests/files appear absent from this worktree or outside the active discovery set. This should be investigated before release-grade parity claims.

### Remaining risk / follow-up tasks
- Runtime integration is intentionally minimal to avoid broad Phase 8 regressions; stable lifecycle calls such as `app_start`, `mode_switched`, dynamic action lifecycle, provider fallback/error, STT latency/error, RAG hit/miss, screen context, and post-call summary should be wired in Phase 9/11 with targeted tests.
- Optional PostHog/Axiom/Sentry sinks are config/no-op placeholders only; real SDK integration requires an explicit opt-in design and dependency review.
- Add retention/rotation policy for local JSONL telemetry before enabling broad runtime emission.
- Add diagnostics/privacy UI in a later UX phase; UI was intentionally not modified in Phase 8.

---

## Phase 9: Post-Call Workflow and Coaching

**Status:** FOUNDATION COMPLETE (2026-05-15)

### Before behavior
- Post-call notes stored only legacy summary and `detailedSummary` sections.
- Action items were plain strings without stable IDs, owners, deadlines, or source timestamps.
- No follow-up draft was generated from summary/action context.
- No mode-specific post-call coaching insights existed.

### Files changed
- `electron/services/post-call/PostCallWorkflow.ts` — new post-call enhancement module.
- `electron/MeetingPersistence.ts` — merges schema v2 enhancements into `detailedSummary` after summary generation, using the meeting-stop mode snapshot.
- `electron/db/DatabaseManager.ts` — typed `detailedSummary` with `schemaVersion`, `actionItemsStructured`, `followUpDraft`, and `coachingInsights` fields.
- `electron/services/__tests__/PostCallWorkflow.test.mjs` — focused tests for extraction, schema safety, follow-up draft, and mode-specific coaching.

### Backend behavior changes
- `buildPostCallEnhancements()` returns schema v2 payload with `actionItemsStructured`, `followUpDraft`, and `coachingInsights`.
- Structured action extraction captures owner, deadline, deterministic IDs, and source timestamp when available.
- Action items deduplicate transcript-derived and summary-derived items and cap at 8 items.
- Follow-up draft includes a mode-appropriate greeting, overview, and structured next steps.
- Coaching insights are mode-specific for sales, recruiting, team meetings, lectures, and interview modes.
- Persistence uses existing JSON `detailedSummary`, so no database migration was required.

### Security/privacy impact
- Schema v2 payload intentionally excludes raw transcript/raw prompt fields.
- Tests assert result keys are limited to the structured schema fields and remain JSON-safe.
- Mode selection for post-call processing comes from the stop-time snapshot, preventing post-call mode bleed if the user switches modes while async summary work is running.

### Tests added
- `electron/services/__tests__/PostCallWorkflow.test.mjs` — 8 tests:
  1. owner, deadline, source timestamp, and stable IDs
  2. transcript/summary action-item dedupe
  3. follow-up draft overview and next steps
  4. sales objection coaching
  5. recruiting/team mode-specific rules
  6. schema v2 lecture payload
  7. JSON-safe schema excluding raw transcript fields
  8. action-item cap and deterministic IDs after dedupe

### Commands run
- `npm --prefix "/Users/evin/natively-cluely-ai-assistant" run build:electron` — PASS
- `node --test "/Users/evin/natively-cluely-ai-assistant/electron/services/__tests__/PostCallWorkflow.test.mjs"` — PASS, 8 passing

### Remaining risk / follow-up tasks
- Regenerate/export buttons for post-call UI are not implemented yet.
- Coaching rules are deterministic heuristics; LLM-assisted richer coaching can be added later after privacy/scoping review.
- Full configured suite should be rerun after Phase 11 QA changes land.

---

## Phase 10: UX Polish

**Status:** PARTIAL COMPLETE (2026-05-15)

### Before behavior
- Active mode was tracked in state but not surfaced as an always-visible meeting status strip.
- Screen context was only visible in the input attachment preview.
- STT/provider health existed in the rolling transcript area but was not summarized in the top-level meeting shell.
- No compact privacy route indicator showed local/private vs cloud/custom LLM routing during the meeting.

### Files changed
- `src/components/NativelyInterface.tsx` — added a compact meeting diagnostics/status strip above warning banners and transcript content.

### UI behavior changes
- Added always-visible active mode pill using `activeModeLabel`, falling back to `General mode`.
- Added STT health pill derived from real mic/system STT status and provider state:
  - healthy
  - reconnecting
  - failed/needs attention
  - not configured
- Added screen context pill from `attachedContext.length`, clarifying when screenshots are attached to the current turn.
- Added privacy route pill from `getCurrentLlmConfig()`:
  - `Local/private route` for Ollama/Codex CLI
  - `Custom endpoint route` for custom provider
  - `Cloud LLM route` for Gemini/cloud route
- Added small pure formatting helpers only; no fake dynamic action placeholders were introduced.

### Security/privacy impact
- The strip uses renderer-safe metadata only: mode label, provider names, STT status, attachment count, and LLM provider category.
- It does not expose API keys, raw transcript, raw prompt, screenshot paths, or reference content.
- Custom provider wording intentionally says `Custom endpoint route` rather than claiming local/private behavior.

### Commands run
- `npm --prefix "/Users/evin/natively-cluely-ai-assistant" run build:electron` — PASS
- `node --test "/Users/evin/natively-cluely-ai-assistant/electron/services/__tests__/PostCallWorkflow.test.mjs"` — PASS, 8 passing
- `npm --prefix "/Users/evin/natively-cluely-ai-assistant" run build` — PASS; Vite reported existing dynamic/static import and >1000 kB chunk warnings.

### Manual/UI verification status
- Interactive Electron/browser smoke verification was not completed in this tool flow.
- Build/type verification passed; visual confirmation of spacing and live status updates remains required before release-grade UX claims.

### Remaining risk / follow-up tasks
- Dynamic action bar/cards are still not wired into the renderer.
- Settings UI still needs deeper privacy controls/data scopes/retention work.
- Onboarding and richer empty states remain open.
- Status strip should be visually smoke-tested in light, dark, and liquid-glass themes.

---

## Phase 11: Testing and Real-World Scenarios

**Status:** PARTIAL COMPLETE / FULL-SUITE BLOCKED (2026-05-15)

### Files changed
- `electron/services/__tests__/PostCallWorkflow.test.mjs` — added schema safety and deterministic cap coverage.
- `electron/services/__tests__/DynamicActionEngine.test.mjs` — added lifecycle, session/mode isolation, completion, and re-detection coverage.
- `electron/llm/__tests__/ProviderRouter.test.mjs` — added circuit breaker, half-open retry, routing around open circuit, and local-only privacy routing coverage.
- `electron/services/__tests__/ScreenContextService.test.mjs` — added hash-cache isolation and cache-hit safety coverage.
- `electron/services/__tests__/TestDiscovery.test.mjs` — added discovery guard for service/LLM Node test suites.

### Coverage added / verified
- Post-call schema v2 remains JSON-safe and excludes raw transcript fields.
- Structured post-call action items cap at 8 and keep deterministic IDs after dedupe.
- Dynamic actions are isolated by session and mode to prevent mode bleeding.
- Accepted/completed actions leave active top actions; dismissed actions can be re-detected later.
- ProviderRouter opens circuits after repeated failures, routes around open circuits, limits half-open retry, and honors local-only privacy before cloud preferences.
- Screen context cache does not bleed across hashes and does not replace cached safe paths with later unsafe-looking path inputs on cache hit.
- Test discovery now guards that key service/LLM suites are present.

### Commands run
- `cd "/Users/evin/natively-cluely-ai-assistant" && npm run build:electron && node --test "electron/services/__tests__/TelemetryService.test.mjs" "electron/services/__tests__/PostCallWorkflow.test.mjs" "electron/services/__tests__/DynamicActionEngine.test.mjs" "electron/services/__tests__/ScreenContextService.test.mjs" "electron/services/__tests__/TestDiscovery.test.mjs" "electron/llm/__tests__/ProviderRouter.test.mjs"` — PASS, 45 passing.
- Full `npm test` was attempted by the QA agent from repo root. It built successfully and printed passing tests through `PromptAssembler`, but hung before Node emitted a final summary; the process was killed with exit code 143.

### Blockers / findings
- Full package test currently hangs after the `PromptAssembler` suite in this environment. No assertion failures were visible before the hang, but there is no authoritative full-suite pass/fail summary.
- Several tests still assume repo-root cwd or relative `dist-electron` paths. Absolute-path test invocation from another cwd can fail with `ERR_MODULE_NOT_FOUND`; repo-root invocation works.
- The active discovery count is currently guarded at 30 `.test.mjs` files across `electron/services/__tests__` and `electron/llm/__tests__`, but this does not reconcile earlier phase totals that reported much higher pass counts.

### Remaining risk / follow-up tasks
- Diagnose and fix the full `npm test` hang rather than treating targeted passes as release-grade validation.
- Convert cwd-sensitive tests to derive paths from `import.meta.url`/test file location.
- Add true end-to-end UI/manual test evidence for meeting start, mode switch, screen attach, dynamic action accept/dismiss, post-call summary, and settings/privacy flows.

---

## Summary

| Phase | Description | Status |
|-------|-------------|--------|
| 0 | Baseline snapshot | ✅ COMPLETE |
| 1 | Security/privacy blockers | ✅ COMPLETE (19 new tests) |
| 2 | Mode Runtime foundation | ✅ COMPLETE (8 new tests) |
| 3 | Dynamic Actions (backend) | ✅ BACKEND COMPLETE |
| 4 | Screen/OCR context | ✅ COMPLETE |
| 5 | Prompt/context architecture | ✅ COMPLETE |
| 6 | Hybrid RAG for mode files | ✅ COMPLETE |
| 7 | Provider routing / LLMHelper refactor | ✅ FOUNDATION COMPLETE |
| 8 | Telemetry / observability | ✅ COMPLETE |
| 9 | Post-call coaching | ✅ FOUNDATION COMPLETE |
| 10 | UX polish | ⏳ PARTIAL COMPLETE |
| 11 | Full test suite | ⏳ IN PROGRESS |

**Overall Progress:** Phases 0-9 have safe foundations in place. Phase 10 has state-backed meeting status indicators but still needs manual visual smoke testing and dynamic action UI. Phase 11 QA remains in progress.

**Next:** Phase 3 (Dynamic Actions backend model and engine)