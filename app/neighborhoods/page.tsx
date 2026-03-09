"use client";

import { useState, useEffect } from "react";
import { neighborhoods, type Neighborhood } from "@/lib/neighborhoods";

const NOTES_KEY = "sherry-neighborhood-notes";

function loadNotes(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(NOTES_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveNotes(notes: Record<string, string>) {
  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch {}
}

function Stars({ count }: { count: number }) {
  return (
    <span className="text-sm">
      {"★".repeat(count)}
      {"☆".repeat(5 - count)}
    </span>
  );
}

function NeighborhoodCard({
  n,
  note,
  onNoteSave,
}: {
  n: Neighborhood;
  note: string;
  onNoteSave: (slug: string, text: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [draft, setDraft] = useState(note);
  const [saved, setSaved] = useState(false);
  const dirty = draft !== note;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(n.mapQuery)}`;

  // Sync draft when note prop changes (e.g. on mount)
  useEffect(() => {
    setDraft(note);
  }, [note]);

  return (
    <div className="bg-[var(--card)] rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5"
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{n.icon}</span>
            <h2 className="font-bold text-lg">{n.name}</h2>
          </div>
          <span className="text-xs bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded-full shrink-0 ml-2">
            <Stars count={n.peopleWatching} />
          </span>
        </div>
        <p className="text-sm text-[var(--muted)] leading-relaxed">{n.vibe}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs text-[var(--accent)]">
            {expanded ? "Tap to collapse ↑" : "Tap for details ↓"}
          </span>
          {note && <span className="text-xs text-[var(--muted)]">📝 Has notes</span>}
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-stone-100 dark:border-stone-700 pt-4">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:underline"
            onClick={(e) => e.stopPropagation()}
          >
            🗺️ Open in Google Maps
          </a>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-2">
              Best Spots
            </h3>
            <div className="flex flex-wrap gap-2">
              {n.bestSpots.map((spot) => (
                <a
                  key={spot}
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(spot + ", " + n.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                >
                  📍 {spot}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-2">
              Feels Like...
            </h3>
            <div className="space-y-2">
              {n.feelsLike.map((f) => (
                <div
                  key={f.city}
                  className="text-sm bg-[var(--accent-light)] rounded-xl p-3"
                >
                  <span className="font-medium">{f.city}</span>
                  <span className="text-[var(--muted)]"> — {f.why}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-2">
              IoT / Business Angle
            </h3>
            <p className="text-sm leading-relaxed">{n.iotAngle}</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-2">
              Your Notes
            </h3>
            <textarea
              value={draft}
              onChange={(e) => { setDraft(e.target.value); setSaved(false); }}
              placeholder="Jot down observations, contacts, ideas..."
              rows={3}
              className="w-full text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-[var(--bg)] px-3 py-2 resize-none focus:outline-none focus:border-[var(--accent)]"
            />
            <div className="flex items-center justify-between mt-2">
              <span className="text-[10px] text-[var(--muted)]">
                {saved ? "Saved!" : dirty ? "Unsaved changes" : note ? "Saved" : ""}
              </span>
              <button
                onClick={() => {
                  onNoteSave(n.slug, draft);
                  setSaved(true);
                  setTimeout(() => setSaved(false), 2000);
                }}
                disabled={!dirty}
                className={`text-xs font-medium px-4 py-1.5 rounded-lg transition-colors ${
                  dirty
                    ? "bg-[var(--accent)] text-white"
                    : "bg-stone-100 dark:bg-stone-800 text-[var(--muted)]"
                }`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function NeighborhoodsPage() {
  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    setNotes(loadNotes());
  }, []);

  function handleNoteSave(slug: string, text: string) {
    const updated = { ...notes, [slug]: text };
    setNotes(updated);
    saveNotes(updated);
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Sydney Neighborhoods</h1>
        <p className="text-sm text-[var(--muted)]">
          8 areas worth exploring — with vibe comparisons to cities you know
        </p>
      </div>

      {neighborhoods.map((n) => (
        <NeighborhoodCard
          key={n.slug}
          n={n}
          note={notes[n.slug] || ""}
          onNoteSave={handleNoteSave}
        />
      ))}
    </div>
  );
}
