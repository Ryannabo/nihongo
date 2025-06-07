import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const counterDoc = doc(db, "metrics", "downloads");

document.getElementById("downloadBtn").addEventListener("click", async () => {
  await updateDoc(counterDoc, {
    count: increment(1)
  });

  // Link to your GitHub-hosted game file
  window.open("https://github.com/your-username/your-repo/releases/download/v1.0/your-game.zip", "_blank");
});

async function loadCount() {
  const docSnap = await getDoc(counterDoc);
  if (docSnap.exists()) {
    document.getElementById("downloadCount").textContent = docSnap.data().count;
  } else {
    document.getElementById("downloadCount").textContent = "0";
  }
}

loadCount();
