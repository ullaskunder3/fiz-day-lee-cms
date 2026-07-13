require("dotenv").config();
const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc, getDocs, collection, deleteDoc } = require("firebase/firestore");
const puzzles = require("../data/puzzles.json");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function uploadPuzzles() {
  console.log("🗑️  Deleting existing puzzles from the database...");
  const querySnapshot = await getDocs(collection(db, "daily_puzzles"));
  let deleteCount = 0;
  for (const docSnapshot of querySnapshot.docs) {
    await deleteDoc(docSnapshot.ref);
    deleteCount++;
  }
  console.log(`✅ Deleted ${deleteCount} old puzzles.\n`);

  console.log("📤 Uploading new puzzles...");
  let count = 0;
  for (const [date, puzzle] of Object.entries(puzzles)) {
    await setDoc(doc(db, "daily_puzzles", date), puzzle, { merge: true });
    console.log(`✅ Uploaded: ${date}`);
    count++;
  }
  console.log(`\n🎉 Done! ${count} puzzles uploaded.`);
}

uploadPuzzles().catch(console.error);
