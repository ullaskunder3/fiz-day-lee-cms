const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const RULES_PATH = path.join(__dirname, "..", "firestore.rules");

const RULES_WRITE_OPEN = `rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /daily_puzzles/{document=**} {
      allow read: if true;
      allow write: if true;
    }
  }
}
`;

const RULES_WRITE_CLOSED = `rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /daily_puzzles/{document=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
`;

function run(cmd, label) {
  console.log(`\n🔧 ${label}...`);
  console.log(`   $ ${cmd}\n`);
  try {
    execSync(cmd, { stdio: "inherit", cwd: path.join(__dirname, "..") });
    console.log(`✅ ${label} — done`);
  } catch (err) {
    console.error(`❌ ${label} — FAILED`);
    throw err;
  }
}

async function main() {
  console.log("╔══════════════════════════════════════╗");
  console.log("║   🧩 Fiz-Day-Lee Database Updater    ║");
  console.log("╚══════════════════════════════════════╝\n");

  // Step 1: Enable writes
  console.log("📝 Step 1/5 — Enabling Firestore write access...");
  fs.writeFileSync(RULES_PATH, RULES_WRITE_OPEN, "utf-8");
  console.log("✅ firestore.rules updated (write: true)\n");

  // Step 2: Deploy write-enabled rules
  run("npx firebase-tools deploy --only firestore:rules", "Step 2/5 — Deploying write-enabled rules");

  // Step 3: Upload puzzles
  run("node scripts/upload.js", "Step 3/5 — Uploading puzzles to Firestore");

  // Step 4: Disable writes
  console.log("\n🔒 Step 4/5 — Locking Firestore write access...");
  fs.writeFileSync(RULES_PATH, RULES_WRITE_CLOSED, "utf-8");
  console.log("✅ firestore.rules updated (write: false)\n");

  // Step 5: Redeploy locked rules
  run("npx firebase-tools deploy --only firestore:rules", "Step 5/5 — Deploying locked-down rules");

  console.log("\n╔══════════════════════════════════════╗");
  console.log("║   🎉 All done! Database updated.     ║");
  console.log("╚══════════════════════════════════════╝");
  console.log("\n💡 Don't forget to commit & push:\n   git add -A && git commit -m 'feat: update puzzles' && git push\n");
}

main().catch((err) => {
  // Ensure rules are always locked even on failure
  console.error("\n⚠️  Error occurred — reverting rules to locked state...");
  fs.writeFileSync(RULES_PATH, RULES_WRITE_CLOSED, "utf-8");
  console.log("🔒 firestore.rules reverted to write: false");
  console.log("⚠️  You may need to manually deploy rules: npx firebase-tools deploy --only firestore:rules");
  process.exit(1);
});
