import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore/lite";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

async function main() {
  const outputPath = process.env.OUTPUT_PATH ?? "/data/manifest.json";

  const firebaseConfig = {
    apiKey: "AIzaSyAgHWuN2OEx5R827dHlKO9HsOuBwZ017n0",
    authDomain: "sc-site-a8f24.firebaseapp.com",
    databaseURL: "https://sc-site-a8f24.firebaseio.com",
    projectId: "sc-site-a8f24",
    storageBucket: "sc-site-a8f24.appspot.com",
    messagingSenderId: "385410121336",
  };

  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);
  const docRef = await doc(db, "content-location/lol-content-location");
  const docSnap = await getDoc(docRef);
  const url: string = docSnap.data()?.["dumpUrl"];

  console.log(`Found manifest URL: ${url}`);
  const jsonResponse = await fetch(url);
  const jsonContent = await jsonResponse.json();

  // Ensure directory exists
  mkdirSync(dirname(outputPath), { recursive: true });

  // Write to filesystem
  writeFileSync(outputPath, JSON.stringify(jsonContent));
  console.log(`Manifest saved to ${outputPath}`);
}

main().catch((error) => {
  console.error("Failed to fetch manifest:", error);
  process.exit(1);
});
