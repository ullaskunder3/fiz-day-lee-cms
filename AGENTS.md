# 🤖 AI Agent Instructions & One-Prompt Workflow

This document provides exact instructions for AI Coding Assistants (e.g., Antigravity, Cursor, Gemini) to execute the puzzle update and Firebase deployment workflow in a single prompt.

---

## 🚀 One-Prompt User Command

To update puzzles and deploy to Firebase in the future, simply prompt the AI:

> **"Read AGENTS.md, generate the next month's worth of puzzles, update git and push to Firebase."**

---

## 📋 Automated Execution Steps for AI

When triggered by the prompt above, the AI agent must perform the following steps autonomously:

### Step 1: Pre-Flight Check & Git Pull
- Run `git pull --rebase` to ensure the local main branch is up-to-date with remote.

### Step 2: Clean Up Past Months in `data/puzzles.json`
- Inspect current system date.
- Remove all puzzle entries from past calendar months (e.g., if current month is August 2026, delete all `2026-07-*` keys).

### Step 3: Generate New Daily Puzzles
- Fill in missing days for the **current month** and the **entire next month**.
- **Answer Rules**:
  - Exactly **5 letters max** for every answer string.
  - **No duplicate answers**: Check all existing keys in `data/puzzles.json` to ensure zero repeat words.
- **Question Clues**:
  - Clues must be creative, engaging, and clear.
- **Topic Chaining**:
  - Day N's `"topic"` field must hint at the category for Day N+1's answer.

### Step 4: Sync & Deploy to Firebase Firestore
- Run the automated database updater:
  ```bash
  pnpm run updatedb
  ```
  *(This script automatically unlocks Firestore write rules, uploads `data/puzzles.json` to the `daily_puzzles` Firestore collection, and re-locks security rules to `write: false`.)*

### Step 5: Git Commit & Push
- Commit any repo changes (if tracked) and push to remote:
  ```bash
  git push origin main
  ```
