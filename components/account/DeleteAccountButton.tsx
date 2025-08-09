"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

export function DeleteAccountButton() {
  const [loading, setLoading] = useState(false);

  return (
    <button
      onClick={async () => {
        if (loading) return;
        const ok = confirm(
          "Sei sicuro? Questa azione è irreversibile e rimuoverà i tuoi dati."
        );
        if (!ok) return;

        setLoading(true);
        const res = await fetch("/api/account/delete", { method: "POST" });
        setLoading(false);

        if (!res.ok) {
          alert("Errore durante l’eliminazione. Riprova.");
          return;
        }
        // esce e torna alla home
        await signOut({ callbackUrl: "/" });
      }}
      className="mt-4 rounded bg-red-600 px-4 py-2 text-sm text-white disabled:opacity-60"
      disabled={loading}
    >
      {loading ? "Eliminazione..." : "Elimina account"}
    </button>
  );
}
