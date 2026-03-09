"use client";

import { useState } from "react";
import { neighborhoods, type Neighborhood } from "@/lib/neighborhoods";

function Stars({ count }: { count: number }) {
  return (
    <span className="text-sm">
      {"★".repeat(count)}
      {"☆".repeat(5 - count)}
    </span>
  );
}

function NeighborhoodCard({ n }: { n: Neighborhood }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-[var(--card)] rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5"
      >
        <div className="flex items-start justify-between mb-2">
          <h2 className="font-bold text-lg">{n.name}</h2>
          <span className="text-xs bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded-full shrink-0 ml-2">
            <Stars count={n.peopleWatching} />
          </span>
        </div>
        <p className="text-sm text-[var(--muted)] leading-relaxed">{n.vibe}</p>
        <span className="text-xs text-[var(--accent)] mt-2 block">
          {expanded ? "Tap to collapse ↑" : "Tap for details ↓"}
        </span>
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-stone-100 dark:border-stone-700 pt-4">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-2">
              Best Spots
            </h3>
            <div className="flex flex-wrap gap-2">
              {n.bestSpots.map((spot) => (
                <span
                  key={spot}
                  className="text-xs bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded-full"
                >
                  📍 {spot}
                </span>
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
        </div>
      )}
    </div>
  );
}

export default function NeighborhoodsPage() {
  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Sydney Neighborhoods</h1>
        <p className="text-sm text-[var(--muted)]">
          8 areas worth exploring — with vibe comparisons to cities you know
        </p>
      </div>

      {neighborhoods.map((n) => (
        <NeighborhoodCard key={n.slug} n={n} />
      ))}
    </div>
  );
}
