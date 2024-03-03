import admin, { ServiceAccount } from "firebase-admin";
import serviceAccount from "../firebase.json" assert { type: "json" };
export const firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});
