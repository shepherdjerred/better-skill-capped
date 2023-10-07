import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore/lite';

export interface Env {
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  BUCKET: R2Bucket;
}

export default {
  async scheduled(_event: ScheduledEvent, env: Env, _ctx: ExecutionContext): Promise<void> {
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
    const url: string = docSnap.data().dumpUrl

    console.log(`found ${url}`);
    const jsonResponse = await fetch(url);
    const jsonContent = await jsonResponse.json();
    console.log(jsonContent);

    await env.BUCKET.put("manifest.json", JSON.stringify(jsonContent));
    console.log("all done!");
  },
};
