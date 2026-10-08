import Image from 'next/image';
import Link from 'next/link';

const ASSAYS = [
  {
    name: 'HBV',
    image: '/images/infectious/mugen-plex-hbv.png',
    color: '#00A3E0',
    description: 'Hepatitis B virus',
  },
  {
    name: 'HCV',
    image: '/images/infectious/mugen-plex-hcv.png',
    color: '#5A9B5F',
    description: 'Hepatitis C virus',
  },
  {
    name: 'HIV',
    image: '/images/infectious/mugen-plex-hiv.png',
    color: '#7B61A8',
    description: 'Human immunodeficiency virus',
  },
  {
    name: 'Dengue / Chikungunya',
    image: '/images/infectious/mugen-plex-dengue-chikungunya.png',
    color: '#E06F61',
    description: 'Combined arbovirus assay',
  },
  {
    name: 'Influenza A & B',
    image: '/images/infectious/mugen-plex-influenza-a-b.png',
    color: '#159AA3',
    description: 'Influenza virus assay',
  },
  {
    name: 'CCHF',
    image: '/images/infectious/mugen-plex-cchf.png',
    color: '#D86A2C',
    description: 'Crimean-Congo haemorrhagic fever virus',
  },
];

function AssayCarton({ assay }) {
  return (
    <article className="group overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(0,32,91,0.10)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_65px_rgba(0,32,91,0.16)]">
      <div className="relative aspect-[3/2] overflow-hidden bg-[radial-gradient(circle_at_50%_20%,#ffffff_0%,#eef5fa_62%,#dbe8f1_100%)]">
        <Image
          src={assay.image}
          alt={`Mugen-Plex ${assay.name} 24/48/96-test real-time PCR assay carton by Precision Life Sciences.`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.035]"
        />
      </div>
      <div className="relative border-t border-slate-100 px-5 pb-5 pt-4">
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1"
          style={{ backgroundColor: assay.color }}
        />
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-extrabold tracking-tight text-navy">{assay.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{assay.description}</p>
          </div>
          <span className="shrink-0 rounded-full bg-graybg px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wide text-navy">
            24/48/96 Tests
          </span>
        </div>
      </div>
    </article>
  );
}

export default function InfectiousRange() {
  return (
    <section className="relative overflow-hidden bg-graybg px-4 py-20 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-55"
        style={{
          backgroundImage:
            'radial-gradient(circle at 12% 18%, rgba(0,163,224,0.12), transparent 25%), radial-gradient(circle at 88% 72%, rgba(0,32,91,0.08), transparent 28%)',
        }}
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-cyandark">
            Mugen-Plex<sup className="ml-0.5 text-[0.55em] align-super">™</sup> Infectious Disease
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-navy md:text-5xl">
            One workflow. Six clear choices.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-slate-600">
            The same disciplined Mugen-Plex format, with an assay-specific colour for fast recognition.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ASSAYS.map((assay) => (
            <AssayCarton key={assay.name} assay={assay} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-navy/10 bg-white/85 px-6 py-5 text-center shadow-sm backdrop-blur sm:flex-row sm:text-left">
          <div>
            <p className="font-bold text-navy">RUO</p>
            <p className="mt-1 text-sm text-slate-500">Not intended for use in diagnostic procedures.</p>
          </div>
          <Link
            href="/services"
            className="rounded-full bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-navylight"
          >
            Explore assays and services
          </Link>
        </div>
      </div>
    </section>
  );
}
