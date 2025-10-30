"use client";
import { trpc } from "../../lib/trpc";

export default function Page() {
  const { data, isLoading, error } = trpc.ping.useQuery();
  if (error) return <div>Erreur: {error.message}</div>;
  return <div style={{ padding: 20 }}>tRPC ping: {isLoading ? "..." : data}</div>;
}
