require("dotenv").config();
const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc } = require("firebase/firestore");
const puzzles = require("../data/puzzles.json");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function uploadPuzzles() {
  let count = 0;
  for (const [date, puzzle] of Object.entries(puzzles)) {
    await setDoc(doc(db, "daily_puzzles", date), puzzle, { merge: true });
    console.log(`✅ Uploaded: ${date}`);
    count++;
  }
  console.log(`\n🎉 Done! ${count} puzzles uploaded.`);
}

uploadPuzzles().catch(console.error);
