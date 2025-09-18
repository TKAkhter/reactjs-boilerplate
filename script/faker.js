import 'dotenv/config';
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { faker } from "@faker-js/faker";

const firebaseConfig = {
  apiKey: process.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const generateAlert = () => {
    const nameEmailPairs = [
        { name: "wajiha", email: "wajiha.akhter01@gmail.com" },
        { name: "rafia", email: "rafia.akhter01@gmail.com" },
        { name: "talha", email: "talha.akhter01@gmail.com" },
        { name: "zainab", email: "zainab.akhter01@gmail.com" },
    ];

    const selected = faker.helpers.arrayElement(nameEmailPairs);

    const now = new Date();
    const daysAgo = faker.number.int({ min: 0, max: 40 });
    const createdAt = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);

    const isEating = faker.datatype.boolean();

    return {
        name: selected.name,
        email: selected.email,
        createdAt,
        isEating,
    };
};

const addDummyAlerts = async (count = 20) => {
    const alertRef = collection(db, "alerts");

    for (let i = 0; i < count; i++) {
        const alert = generateAlert();
        await addDoc(alertRef, alert);
        console.log(`✅ Added alert ${i + 1}: ${alert.name}, Eating: ${alert.isEating}`);
    }
    console.log("🎉 Dummy alerts inserted.");
};

const countFromArg = parseInt(process.argv[2] || "10", 10);
addDummyAlerts(countFromArg);