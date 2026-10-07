import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "./config";

export const registerWithEmail = async (
  email: string,
  password: string,
  name: string,
) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);

  if (result.user) {
    await updateProfile(result.user, {
      displayName: name,
    });
  }

  return result.user;
};

export const loginWithEmail = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password);

  return result.user;
};

export const sendResetPasswordEmail = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};

export const logoutUser = async () => {
  await signOut(auth);
};
