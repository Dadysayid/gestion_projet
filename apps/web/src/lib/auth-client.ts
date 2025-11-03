"use client";

import { createAuthClient } from "better-auth/client";
import { organization } from "better-auth/plugins";

function getBaseURL() {
  if (typeof window !== "undefined") {
    // Client-side: utiliser l'URL complète
    return `${window.location.origin}/api/auth`;
  }
  // Server-side: retourner une valeur par défaut (ne devrait pas être utilisé côté serveur)
  return process.env.NEXT_PUBLIC_BASE_URL
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`
    : "http://localhost:3000/api/auth";
}

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  plugins: [
    organization(),
  ],
});

export const { signIn, signUp, useSession, signOut } = authClient;
