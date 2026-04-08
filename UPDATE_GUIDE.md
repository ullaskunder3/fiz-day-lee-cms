# 🧩 Puzzle Update Guide

Step-by-step instructions for adding new daily puzzles to the Fiz-Day-Lee CMS.

---

## Prerequisites

- Node.js installed
- `pnpm` package manager
- Firebase CLI (`firebase-tools`) available via `npx`
- `.env` file configured with `FIREBASE_API_KEY`, `FIREBASE_AUTH_DOMAIN`, `FIREBASE_PROJECT_ID`

---

## Step 1: Add New Puzzles to `data/puzzles.json`

Open `data/puzzles.json` and add new entries **after the last date**.

### Format

```json
"YYYY-MM-DD": {
    "answer": "xxxxx",
    "question": "A descriptive clue for the answer.",
    "topic": "Topic That Hints Next Answer"
}
```

## Step 2: Enable Firestore Write Access

Edit `firestore.rules` — change `allow write` from `false` to `true`:

```diff
  match /daily_puzzles/{document=**} {
    allow read: if true;
-   allow write: if false;
+   allow write: if true;
  }
```

---

## Step 3: Deploy the Updated Rules

```bash
npx firebase-tools deploy --only firestore:rules
```

Wait for the deployment to complete successfully.

---

## Step 4: Upload Puzzles to Firestore

```bash
pnpm run upload
```

This runs `scripts/upload.js`, which reads `data/puzzles.json` and writes each entry to the `daily_puzzles` Firestore collection using `setDoc` with `{ merge: true }`.

---

## Step 5: Lock Down Firestore (Disable Writes)

Edit `firestore.rules` — change `allow write` back to `false`:

```diff
  match /daily_puzzles/{document=**} {
    allow read: if true;
-   allow write: if true;
+   allow write: if false;
  }
```

---

## Step 6: Redeploy the Locked Rules

```bash
npx firebase-tools deploy --only firestore:rules
```

---

## 🤖 Automated Script

Instead of doing all of the above manually (steps 2–6), just run:

```bash
pnpm run updatedb
```

This will:
1. Temporarily enable Firestore writes
2. Deploy the write-enabled rules
3. Upload all puzzles from `data/puzzles.json`
4. Revert Firestore rules to read-only
5. Redeploy the locked-down rules
