"use client";

import { useState } from "react";
import {
  events,
  categoryLabels,
  categoryColors,
  type Event,
} from "@/lib/events";

type Category = Event["category"] | "all";

function PriceBar({ event }: { event: Event }) {
  const max = 350; // max price across all events
  const width = Math.max((event.priceRange[1] / max) * 100, 8);
  const isFree = event.priceRange[0] === 0 && event.priceRange[1] === 0;

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-6 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-red-400 rounded-full flex items-center justify-end pr-2"
          style={{ width: `${width}%` }}
        >
          <span className="text-[10px] font-bold text-white drop-shadow-sm whitespace-nowrap">
            {isFree
              ? "FREE"
              : event.priceRange[0] === event.priceRange[1]
                ? `$${event.priceRange[0]}`
                : `$${event.priceRange[0]}–${event.priceRange[1]}`}
          </span>
        </div>
      </div>
    </div>
  );
}

function EventCard({ event }: { event: Event }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-[var(--card)] rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4"
      >
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-sm leading-tight">{event.name}</h3>
          <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${categoryColors[event.category]}`}
          >
            {categoryLabels[event.category]}
          </span>
        </div>
        <div className="text-xs text-[var(--muted)] space-y-0.5 mb-2">
          <p>📍 {event.venue}</p>
          <p>📅 {event.dates} · {event.time}</p>
        </div>
        <PriceBar event={event} />
        <span className="text-xs text-[var(--accent)] mt-2 block">
          {expanded ? "Less ↑" : "More ↓"}
        </span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-stone-100 dark:border-stone-700 pt-3">
          <p className="text-sm leading-relaxed">{event.description}</p>

          <div className="bg-[var(--accent-light)] rounded-xl p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--accent)] mb-1">
              Why this matters for you
            </p>
            <p className="text-sm">{event.whySherry}</p>
          </div>

          <div className="flex gap-2">
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-sm font-medium bg-[var(--accent)] text-white rounded-xl py-2.5 hover:opacity-90"
            >
              Get Tickets
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue + ", Sydney")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium border border-stone-200 dark:border-stone-700 rounded-xl px-4 py-2.5 hover:border-[var(--accent)]"
            >
              🗺️ Map
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function EventsPage() {
  const [filter, setFilter] = useState<Category>("all");

  const categories: Category[] = [
    "all",
    "tour",
    "theatre",
    "opera",
    "music",
    "sport",
    "festival",
  ];

  const filtered =
    filter === "all" ? events : events.filter((e) => e.category === filter);

  return (
    <div className="space-y-4">
      <div className="mb-2">
        <h1 className="text-2xl font-bold mb-1">Sydney Events</h1>
        <p className="text-sm text-[var(--muted)]">
          Mar 10–17, 2026 — tours, shows &amp; experiences
        </p>
      </div>

      {/* Price legend */}
      <div className="flex items-center gap-2 text-[10px] text-[var(--muted)]">
        <span>Price:</span>
        <div className="flex-1 h-2 bg-gradient-to-r from-green-400 to-red-400 rounded-full" />
        <span>$0 → $350</span>
      </div>

      {/* Category filters */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`text-xs px-3 py-1.5 rounded-full shrink-0 transition-colors ${
              filter === cat
                ? "bg-[var(--accent)] text-white"
                : "bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700"
            }`}
          >
            {cat === "all"
              ? `All (${events.length})`
              : `${categoryLabels[cat]} (${events.filter((e) => e.category === cat).length})`}
          </button>
        ))}
      </div>

      {/* Event cards */}
      <div className="space-y-3">
        {filtered.map((event) => (
          <EventCard key={event.name} event={event} />
        ))}
      </div>

      <p className="text-[10px] text-[var(--muted)] text-center pt-2">
        Prices in AUD. Verify on venue sites before booking.
      </p>
    </div>
  );
}
