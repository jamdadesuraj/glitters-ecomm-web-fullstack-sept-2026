import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const initializeFirebaseAdmin = (): admin.app.App => {
  if (admin.apps.length > 0) {
    return admin.app();
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing Firebase env vars: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY",
    );
  }

  const app = admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });

  console.log("✅ Firebase Admin SDK initialized");
  return app;
};

// Initialize once on import and export the auth instance
const app = initializeFirebaseAdmin();
export const firebaseAdminAuth = admin.auth(app);

export default initializeFirebaseAdmin;
