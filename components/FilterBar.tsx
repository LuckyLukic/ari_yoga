"use client";

import { useState } from "react";

type Props = {
  onChange: (filters: {
    level: string;
    duration: string;
    query: string;
  }) => void;
};

export function FilterBar({ onChange }: Props) {
  const [level, setLevel] = useState("");
  const [duration, setDuration] = useState("");
  const [query, setQuery] = useState("");

  function update(
    partial: Partial<{ level: string; duration: string; query: string }>
  ) {
    const next = { level, duration, query, ...partial };
    setLevel(next.level);
    setDuration(next.duration);
    setQuery(next.query);
    onChange(next);
  }

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-4">
        <input
          value={query}
          onChange={(e) => update({ query: e.target.value })}
          placeholder="Cerca titolo o tag…"
          className="rounded-lg border px-3 py-2 text-sm outline-none focus:ring"
        />
        <select
          value={level}
          onChange={(e) => update({ level: e.target.value })}
          className="rounded-lg border px-3 py-2 text-sm outline-none focus:ring"
        >
          <option value="">Tutti i livelli</option>
          <option>Base</option>
          <option>Intermedio</option>
          <option>Avanzato</option>
        </select>
        <select
          value={duration}
          onChange={(e) => update({ duration: e.target.value })}
          className="rounded-lg border px-3 py-2 text-sm outline-none focus:ring"
        >
          <option value="">Tutte le durate</option>
          <option value="0-15">0–15 min</option>
          <option value="15-30">15–30 min</option>
          <option value="30-999">30+ min</option>
        </select>

        <button
          onClick={() => {
            setLevel("");
            setDuration("");
            setQuery("");
            onChange({ level: "", duration: "", query: "" });
          }}
          className="rounded-lg border px-3 py-2 text-sm"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
