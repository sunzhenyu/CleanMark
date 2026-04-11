---
name: feedback_push_workflow
description: User wants local build verification before git push
type: feedback
---

Always run `pnpm build` locally and confirm it passes before running `git push`. Let the user review the build output first, then ask for confirmation to push.

**Why:** User was surprised by a push that happened before local verification. They want to control when code goes to remote.

**How to apply:** After making changes, run `pnpm build` (or equivalent), show the output, then explicitly ask the user if they want to push. Never auto-push.
