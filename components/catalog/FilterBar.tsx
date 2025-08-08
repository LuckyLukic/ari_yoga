"use client";

import { useState } from "react";

export function FilterBar({
  onChange,
}: {
  onChange: (filters: {
    level: string;
    duration: string;
    query: string;
  }) => void;
}) {
  const [level, setLevel] = useState("");
  const [duration, setDuration] = useState("");
  const [query, setQuery] = useState("");

  function update() {
    onChange({ level, duration, query });
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end">
      <div>
        <label className="block text-sm font-medium">Livello</label>
        <select
          className="mt-1 rounded border p-2"
          value={level}
          onChange={(e) => {
            setLevel(e.target.value);
            update();
          }}
        >
          <option value="">Tutti</option>
          <option value="Base">Base</option>
          <option value="Intermedio">Intermedio</option>
          <option value="Avanzato">Avanzato</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Durata</label>
        <select
          className="mt-1 rounded border p-2"
          value={duration}
          onChange={(e) => {
            setDuration(e.target.value);
            update();
          }}
        >
          <option value="">Tutte</option>
          <option value="0-20">0-20 min</option>
          <option value="21-40">21-40 min</option>
          <option value="41-60">41-60 min</option>
        </select>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium">Cerca</label>
        <input
          type="text"
          placeholder="Titolo o tag..."
          className="mt-1 w-full rounded border p-2"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            update();
          }}
        />
      </div>
    </div>
  );
}
