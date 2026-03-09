"use client";

import { useState, useEffect } from "react";
import {
  events,
  priceLabel,
  categoryLabels,
  categoryColors,
  type Event,
} from "@/lib/events";

const PINS_KEY = "sherry-pinned-events";

function loadPins(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(PINS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function savePins(pins: string[]) {
  try {
    localStorage.setItem(PINS_KEY, JSON.stringify(pins));
  } catch {}
}

function formatDay(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${days[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()}`;
}

function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function EventCard({
  event,
  pinned,
  onTogglePin,
}: {
  event: Event;
  pinned: boolean;
  onTogglePin: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const price = priceLabel(event.priceFrom);

  return (
    <div className="bg-[var(--card)] rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden">
      <div className="flex">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex-1 text-left p-4 min-w-0"
        >
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-bold text-sm leading-tight">{event.name}</h3>
            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${categoryColors[event.category]}`}
            >
              {categoryLabels[event.category]}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
            <span>📍 {event.venue}</span>
            <span>🕐 {event.time}</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className={`text-sm font-semibold ${event.priceFrom === 0 ? "text-green-600 dark:text-green-400" : ""}`}>
              {price}
            </span>
            <span className="text-xs text-[var(--accent)]">
              {expanded ? "Less ↑" : "More ↓"}
            </span>
          </div>
        </button>

        <button
          onClick={onTogglePin}
          className="px-3 flex items-start pt-4 shrink-0"
          title={pinned ? "Unpin" : "Pin to top"}
        >
          <span className={`text-lg ${pinned ? "text-amber-400" : "text-stone-300 dark:text-stone-600"}`}>
            {pinned ? "★" : "☆"}
          </span>
        </button>
      </div>

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
  const [pins, setPins] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setPins(loadPins());
    setMounted(true);
  }, []);

  function togglePin(name: string) {
    const updated = pins.includes(name)
      ? pins.filter((p) => p !== name)
      : [...pins, name];
    setPins(updated);
    savePins(updated);
  }

  const today = todayISO();

  // Collect all future dates across events, deduplicated and sorted
  const allDates = Array.from(
    new Set(events.flatMap((e) => e.eventDates.filter((d) => d >= today)))
  ).sort();

  // Group events by date, sorted by price (pinned first within each day)
  const groupedByDay = allDates.map((date) => {
    const dayEvents = events
      .filter((e) => e.eventDates.includes(date))
      .sort((a, b) => {
        const aPinned = pins.includes(a.name) ? 0 : 1;
        const bPinned = pins.includes(b.name) ? 0 : 1;
        if (aPinned !== bPinned) return aPinned - bPinned;
        return a.priceFrom - b.priceFrom;
      });
    return { date, events: dayEvents };
  });

  // Also show pinned events that may have passed, in a separate section
  const pinnedPastEvents = mounted
    ? events.filter(
        (e) =>
          pins.includes(e.name) &&
          e.eventDates.every((d) => d < today)
      )
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Sydney Events</h1>
        <p className="text-sm text-[var(--muted)]">
          Mar 10–17, 2026 — sorted cheapest first, tap ☆ to pin
        </p>
      </div>

      {groupedByDay.map(({ date, events: dayEvents }) => (
        <section key={date}>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-2 sticky top-[53px] bg-[var(--bg)] py-1 z-10">
            {formatDay(date)}
            {date === today && (
              <span className="ml-2 text-[var(--accent)] normal-case">
                — Today
              </span>
            )}
          </h2>
          <div className="space-y-3">
            {dayEvents.map((event) => (
              <EventCard
                key={event.name + date}
                event={event}
                pinned={pins.includes(event.name)}
                onTogglePin={() => togglePin(event.name)}
              />
            ))}
          </div>
        </section>
      ))}

      {pinnedPastEvents.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)] mb-2">
            Pinned (past)
          </h2>
          <div className="space-y-3 opacity-50">
            {pinnedPastEvents.map((event) => (
              <EventCard
                key={event.name}
                event={event}
                pinned={true}
                onTogglePin={() => togglePin(event.name)}
              />
            ))}
          </div>
        </section>
      )}

      {groupedByDay.length === 0 && (
        <p className="text-sm text-[var(--muted)] text-center py-8">
          No upcoming events found. Check back closer to March 10!
        </p>
      )}

      <p className="text-[10px] text-[var(--muted)] text-center pt-2">
        Prices in AUD (cheapest available). Verify on venue sites before booking.
      </p>
    </div>
  );
}
