import { config } from "dotenv";
config({ path: ".env.local" }); // charge DATABASE_URL, BETTER_AUTH_SECRET

import { auth } from "../src/lib/auth";

async function main() {
  const res = await auth.api.signUpEmail({
    body: {
      email: "admin@demo.io",
      password: "ChangeMe123!",
      name: "Admin",
    },
    returnHeaders: false,
  });
  console.log("Admin créé:", res?.user?.email || "ok");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
