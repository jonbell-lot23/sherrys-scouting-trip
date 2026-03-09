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
const DISMISSED_KEY = "sherry-dismissed-events";

function loadSet(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveSet(key: string, items: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(items));
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
  onDismiss,
}: {
  event: Event;
  pinned: boolean;
  onTogglePin: () => void;
  onDismiss: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const price = priceLabel(event.priceFrom);

  return (
    <div className="bg-[var(--card)] rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4"
      >
        <div className="flex items-start gap-2 mb-1.5">
          <span
            onClick={(e) => {
              e.stopPropagation();
              onTogglePin();
            }}
            className={`text-lg mt-[-1px] cursor-pointer shrink-0 ${pinned ? "text-amber-400" : "text-stone-300 dark:text-stone-600"}`}
            title={pinned ? "Unpin" : "Pin to top"}
          >
            {pinned ? "★" : "☆"}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-sm leading-tight">{event.name}</h3>
              <span
                className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${categoryColors[event.category]}`}
              >
                {categoryLabels[event.category]}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[var(--muted)] mt-1">
              <span>📍 {event.venue}</span>
            </div>
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-xs text-[var(--muted)]">🕐 {event.time}</span>
              <span className={`text-sm font-semibold ${event.priceFrom === 0 ? "text-green-600 dark:text-green-400" : ""}`}>
                {price}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-[var(--accent)]">
            {expanded ? "Less ↑" : "More ↓"}
          </span>
        </div>
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
              {event.priceFrom === 0 ? "More Info" : "Get Tickets"}
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue + ", Sydney")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium border border-stone-200 dark:border-stone-700 rounded-xl px-4 py-2.5 hover:border-[var(--accent)]"
            >
              🗺️
            </a>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            className="w-full text-center text-xs text-[var(--muted)] hover:text-[var(--accent)] py-1"
          >
            🚫 No thanks — hide this event
          </button>
        </div>
      )}
    </div>
  );
}

export default function EventsPage() {
  const [pins, setPins] = useState<string[]>([]);
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setPins(loadSet(PINS_KEY));
    setDismissed(loadSet(DISMISSED_KEY));
    setMounted(true);
  }, []);

  function togglePin(name: string) {
    const updated = pins.includes(name)
      ? pins.filter((p) => p !== name)
      : [...pins, name];
    setPins(updated);
    saveSet(PINS_KEY, updated);
  }

  function dismiss(name: string) {
    const updated = [...dismissed, name];
    setDismissed(updated);
    saveSet(DISMISSED_KEY, updated);
  }

  function undismissAll() {
    setDismissed([]);
    saveSet(DISMISSED_KEY, []);
  }

  const today = todayISO();

  // Filter out dismissed events
  const activeEvents = mounted
    ? events.filter((e) => !dismissed.includes(e.name))
    : events;

  // Collect all future dates
  const allDates = Array.from(
    new Set(activeEvents.flatMap((e) => e.eventDates.filter((d) => d >= today)))
  ).sort();

  // Group by date, pinned first then cheapest
  const groupedByDay = allDates.map((date) => {
    const dayEvents = activeEvents
      .filter((e) => e.eventDates.includes(date))
      .sort((a, b) => {
        const aPinned = pins.includes(a.name) ? 0 : 1;
        const bPinned = pins.includes(b.name) ? 0 : 1;
        if (aPinned !== bPinned) return aPinned - bPinned;
        return a.priceFrom - b.priceFrom;
      });
    return { date, events: dayEvents };
  });

  const dismissedCount = dismissed.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Sydney Events</h1>
        <p className="text-sm text-[var(--muted)]">
          Mar 10–17, 2026 — cheapest first, tap ☆ to pin
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
                onDismiss={() => dismiss(event.name)}
              />
            ))}
          </div>
        </section>
      ))}

      {groupedByDay.length === 0 && (
        <p className="text-sm text-[var(--muted)] text-center py-8">
          No upcoming events found. Check back closer to March 10!
        </p>
      )}

      {dismissedCount > 0 && (
        <button
          onClick={undismissAll}
          className="w-full text-center text-xs text-[var(--muted)] hover:text-[var(--accent)] py-2"
        >
          Show {dismissedCount} hidden event{dismissedCount > 1 ? "s" : ""}
        </button>
      )}

      <p className="text-[10px] text-[var(--muted)] text-center">
        Prices in AUD (cheapest available). Verify on venue sites before booking.
      </p>
    </div>
  );
}
