# Daily Puzzles Uploader

Uploads daily puzzles from a JSON file to Firebase Firestore.

> ⚡ Note: I got tired of manually updating daily questions on Firebase.  
> Instead of building a full CMS now, this small app uses a JSON file (`puzzles.json`) that I update and push — which automatically updates the database.  
> If the project grows and downloads increase, I’ll build a proper CMS later.

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
pnpm run upload
```

Uploads all puzzles in the JSON to the `daily_puzzles` collection.

## TODO / Next Steps

- Add Firestore security rules to allow only authorized edits.
- Validate puzzle JSON structure before uploading.
- Add logging of failed uploads with details.
- Automate upload with GitHub Actions / cron job.

- CMS -> firebase
