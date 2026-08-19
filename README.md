# Daily Puzzles Uploader

Uploads daily puzzles from a JSON file to Firebase Firestore.

> ⚡ Note: I got tired of manually updating daily questions on Firebase.  
> Instead of building a full CMS now, this small app uses a JSON file (`puzzles.json`) that I update and push — which automatically updates the database.  
> If the project grows and downloads increase, I’ll build a proper CMS later.

## Quick AI One-Prompt Update

If you are using an AI agent (Antigravity, Cursor, etc.), simply send this single prompt:

> **"Read AGENTS.md, generate the next month's worth of puzzles, update git and push to Firebase."**

---

## Setup

1. Clone the repo

   ```bash
   git clone https://github.com/ullaskunder3/fiz-day-lee-cms.git

   cd fiz-day-lee-cms
   or code fiz-day-lee-cms
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Create a `.env` file in the root:

   ```env
   FIREBASE_API_KEY=your_api_key
   FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   FIREBASE_PROJECT_ID=your_project_id
   ```

4. Place your `puzzles.json` in `data/` folder.

## Usage

```bash
# Auto unlock rules, upload data/puzzles.json, and lock rules back down:
pnpm run updatedb

# Direct upload only:
pnpm run upload
```

For detailed guides, see [UPDATE_GUIDE.md](file:///home/ullaskunder/dev-work/fiz-day-lee-cms/UPDATE_GUIDE.md) and [AGENTS.md](file:///home/ullaskunder/dev-work/fiz-day-lee-cms/AGENTS.md).
