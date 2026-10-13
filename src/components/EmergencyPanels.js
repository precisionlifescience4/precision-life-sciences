import Link from 'next/link';
import { EMERGENCY_PANELS } from '@/lib/emergencyPanels';

export default function EmergencyPanels() {
  return (
    <section aria-labelledby="emergency-panels-heading" className="border-t border-slate-100 bg-white px-4 py-14 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyandark">Emergency medicine research pipeline</p>
            <h2 id="emergency-panels-heading" className="mt-2 text-2xl font-extrabold text-navy md:text-3xl">
              Two panels in development.
            </h2>
            <p className="mt-3 leading-relaxed text-slate-600">
              Expanding Mugen-Plex into time-sensitive research areas while the panel scope and technical specifications are defined.
            </p>
          </div>
          <Link href="/services#emergency-panels" className="shrink-0 text-sm font-bold text-cyandark hover:text-navy">
            Explore the panel concepts →
          </Link>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {EMERGENCY_PANELS.map((panel) => (
            <article key={panel.id} className="rounded-2xl border border-slate-200 bg-graybg p-6">
              <span aria-hidden="true" className="mb-4 block h-1 w-12 rounded-full" style={{ backgroundColor: panel.accent }} />
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">In development · RUO concept</p>
              <h3 className="mt-2 text-xl font-extrabold text-navy">{panel.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{panel.description}</p>
            </article>
          ))}
        </div>
        <p className="mt-5 text-xs leading-relaxed text-slate-500">
          These are research concepts, not available diagnostic products. Target coverage, specimen requirements and performance have not been established.
        </p>
      </div>
    </section>
  );
}
