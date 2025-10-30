import { router, procedure } from "./trpc";
import { z } from "zod";
import { db } from "../db/client";
import { orgs } from "../db/schema";

export const appRouter = router({
  ping: procedure.query(() => "pong"),

  
  orgsList: procedure.query(async () => {
    return db.select().from(orgs);
  }),

 
  orgsCreate: procedure
    .input(z.object({ name: z.string().min(2) }))
    .mutation(async ({ input }) => {
      const [row] = await db.insert(orgs).values({ name: input.name }).returning();
      return row;
    }),
});

export type AppRouter = typeof appRouter;
