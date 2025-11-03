import { router, procedure } from "./trpc";
import { z } from "zod";
import { db } from "../db/client";

export const appRouter = router({
  ping: procedure.query(() => "pong"),
});

export type AppRouter = typeof appRouter;
