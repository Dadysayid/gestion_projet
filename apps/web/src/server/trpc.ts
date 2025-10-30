import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";

// Initialise tRPC avec SuperJSON (pour bien gérer les dates/objets)
export const t = initTRPC.create({ transformer: SuperJSON });

// Helpers pour créer des routes et des procédures
export const router = t.router;
export const procedure = t.procedure;
