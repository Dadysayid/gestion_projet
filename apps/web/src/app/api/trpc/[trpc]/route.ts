import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "../../../../server/router";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}), // on branchera l'auth/context plus tard
  });

export { handler as GET, handler as POST };
