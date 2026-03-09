export default function Home() {
  return (
    <div className="space-y-8">
      <section className="pt-8 pb-4">
        <h1 className="text-3xl font-bold mb-2">Welcome to Sydney 🇦🇺</h1>
        <p className="text-[var(--muted)] text-lg">
          Your scouting guide for IoT &amp; home automation opportunities in the
          Oceania market.
        </p>
      </section>

      <section className="bg-[var(--card)] rounded-2xl p-5 border border-stone-200 dark:border-stone-700">
        <h2 className="font-semibold text-sm uppercase tracking-wide text-[var(--muted)] mb-3">
          Trip Context
        </h2>
        <ul className="space-y-3 text-sm">
          <li className="flex gap-3">
            <span className="text-xl">🎯</span>
            <span>
              Explore Sydney&apos;s IoT and home automation landscape ahead of
              the China expo
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-xl">🌏</span>
            <span>
              Understand the Oceania market for selling smart home goods
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-xl">👀</span>
            <span>
              People-watch in key neighborhoods to understand consumer culture
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-xl">🤝</span>
            <span>
              Find potential partners, distributors, and retail opportunities
            </span>
          </li>
        </ul>
      </section>

      <section className="bg-[var(--accent-light)] rounded-2xl p-5 border border-red-200 dark:border-red-900">
        <h2 className="font-semibold text-sm uppercase tracking-wide text-[var(--accent)] mb-2">
          Quick Tips for Sydney
        </h2>
        <ul className="space-y-2 text-sm">
          <li>
            <strong>Transport:</strong> Get an Opal card or tap your phone.
            Trains + ferries are excellent.
          </li>
          <li>
            <strong>Coffee:</strong> Australians take it seriously. &quot;Flat
            white&quot; is the local order. No drip coffee.
          </li>
          <li>
            <strong>Tipping:</strong> Not expected. Prices include everything.
          </li>
          <li>
            <strong>Weather:</strong> March is late summer. Warm days, cool
            evenings. Sunscreen is essential.
          </li>
          <li>
            <strong>Business culture:</strong> Direct but friendly. First-name
            basis. Less formal than China or NZ.
          </li>
        </ul>
      </section>
    </div>
  );
}
