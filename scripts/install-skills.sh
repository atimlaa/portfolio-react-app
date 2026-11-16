#!/usr/bin/env bash
# Installs/updates the Claude Code skills used on this project into .claude/skills/
#   impeccable            – design critique, audit, polish (pbakaus/impeccable)        [committed]
#   playwright-cli        – drive a real browser, write/run Playwright tests (microsoft) [committed]
#   design-taste-frontend – "taste" anti-generic-UI design rules (Leonxlnx/taste-skill)
#                           ~40 MB of reference assets, so it's git-ignored and installed here.
set -euo pipefail
cd "$(dirname "$0")/.."

npx -y skills add pbakaus/impeccable --skill impeccable --agent claude-code
npx -y skills add Leonxlnx/taste-skill --skill design-taste-frontend --agent claude-code
npx -y skills add microsoft/playwright-cli --skill playwright-cli --agent claude-code

# Browser for the Playwright test suite (yarn test:e2e)
npx playwright install chromium

echo "Skills installed in .claude/skills — restart Claude Code to pick them up."
