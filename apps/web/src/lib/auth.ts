import { db } from "@/db/client";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins";
// <-- importe TES tables (singulier) depuis ton schema Drizzle :
import { user, session, account, verification } from "@/db/schema";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
    profile: { name: true },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    // 👇 mapping explicite vers tes tables au singulier
    schema: { user, session, account, verification },
  }),
  plugins: [
    organization(), // ⬅️ active Organizations
  ],
});
