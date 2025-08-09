// app/onboarding/_components/OnboardingForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingForm() {
  const r = useRouter();
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const form = new FormData(e.currentTarget);
    const payload = {
      address: form.get("address"),
      city: form.get("city"),
      zip: form.get("zip"),
      taxCode: form.get("taxCode"),
      phone: form.get("phone"),
      consents: {
        terms: !!form.get("terms"),
        marketing: !!form.get("marketing"),
      },
    };
    const res = await fetch("/api/account/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setPending(false);
    if (res.ok) r.replace("/account");
    else alert("Errore salvataggio profilo");
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-4">
      {/* inputs... */}
      <button className="btn" disabled={pending}>
        {pending ? "Salvo..." : "Completa profilo"}
      </button>
    </form>
  );
}
