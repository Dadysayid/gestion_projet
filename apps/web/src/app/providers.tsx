"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "../lib/trpc";
import { httpBatchLink, loggerLink } from "@trpc/client";
import SuperJSON from "superjson";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [client] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({ enabled: () => true }),
        httpBatchLink({ url: "/api/trpc", transformer: SuperJSON }),
      ],
    })
  );

  return (
    <trpc.Provider client={client} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
