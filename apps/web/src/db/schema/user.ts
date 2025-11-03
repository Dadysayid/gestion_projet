import { pgTable, text, boolean, timestamp } from "drizzle-orm/pg-core";

// ======================================================
// 🧱 Table: user (Better Auth base)
// ======================================================
export const user = pgTable("user", {
  id: text("id").primaryKey(), // géré par Better Auth
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: boolean("emailVerified").default(false),
  image: text("image"),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
