"use client";
import { trpc } from "../../lib/trpc";
import { useState } from "react";

export default function OrgsPage() {
  const { data, isLoading } = trpc.orgsList.useQuery();
  const utils = trpc.useUtils();
  const [name, setName] = useState("Demo Org");
  const create = trpc.orgsCreate.useMutation({
    onSuccess: () => utils.orgsList.invalidate(),
  });

  return (
    <main style={{ padding: 20 }}>
      <h1>Organisations</h1>
      <div style={{ margin: "12px 0", display: "flex", gap: 8 }}>
        <input value={name} onChange={(e)=>setName(e.target.value)} />
        <button onClick={()=>create.mutate({ name })}>Créer</button>
      </div>
      {isLoading ? "Chargement..." : (
        <ul>{data?.map((o:any) => <li key={o.id}>{o.name}</li>)}</ul>
      )}
    </main>
  );
}
