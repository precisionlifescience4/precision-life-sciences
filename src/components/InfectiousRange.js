import Image from 'next/image';
import Link from 'next/link';

const ASSAYS = [
  {
    name: 'HBV',
    color: '#00A3E0',
    description: 'Hepatitis B virus',
  },
  {
    name: 'HCV',
    color: '#5A9B5F',
    description: 'Hepatitis C virus',
  },
  {
    name: 'HIV',
    color: '#7B61A8',
    description: 'Human immunodeficiency virus',
  },
  {
    name: 'Dengue / Chikungunya',
    color: '#E06F61',
    description: 'Combined arbovirus assay',
    compact: true,
  },
  {
    name: 'Influenza A & B',
    color: '#159AA3',
    description: 'Influenza virus assay',
    compact: true,
  },
  {
    name: 'CCHF',
    color: '#D86A2C',
    description: 'Crimean-Congo haemorrhagic fever virus',
  },
];

function MolecularWave({ color }) {
  const columns = Array.from({ length: 15 }, (_, index) => index);

  return (
    <svg
      viewBox="0 0 240 92"
      aria-hidden="true"
      className="absolute bottom-0 right-0 h-[48%] w-[78%] overflow-visible"
    >
      <path
        d="M4 75 C48 86 71 41 112 52 C151 63 178 22 236 15"
        fill="none"
        stroke={color}
        strokeWidth="1.4"
        opacity="0.55"
      />
      <path
        d="M4 83 C46 91 73 51 113 61 C154 72 184 34 236 24"
        fill="none"
        stroke={color}
        strokeWidth="0.9"
        opacity="0.28"
      />
      {columns.map((column) => {
        const x = 5 + column * 16.2;
        const y = 77 - Math.sin(column * 0.78) * 18 - column * 2.9;
        return (
          <g key={column} fill={color}>
            <circle cx={x} cy={y} r={column > 11 ? 2.8 : 2.1} opacity="0.88" />
            <circle cx={x} cy={y + 12} r="1.45" opacity="0.56" />
            <circle cx={x} cy={y + 23} r="1.05" opacity="0.34" />
            <circle cx={x} cy={y + 33} r="0.75" opacity="0.2" />
          </g>
        );
      })}
    </svg>
  );
}

function AssayCarton({ assay }) {
  return (
    <article className="group relative min-h-[300px] overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white p-7 shadow-[0_18px_55px_rgba(0,32,91,0.10)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_65px_rgba(0,32,91,0.16)]">
      <div className="absolute inset-y-0 left-0 w-2 bg-navy" />
      <div className="absolute inset-x-0 bottom-0 h-2" style={{ backgroundColor: assay.color }} />
      <div className="relative z-10">
        <Image
          src="/images/logo.svg"
          alt="Precision Life Sciences"
          width={180}
          height={45}
          className="h-auto w-[180px]"
        />
        <p className="mt-9 text-sm font-bold tracking-[0.08em] text-navy">
          MUGEN-PLEX<sup className="ml-0.5 text-[0.55em] align-super">™</sup>
        </p>
        <h3
          className={`${assay.compact ? 'max-w-[14rem] text-[1.75rem] leading-[1.02]' : 'text-5xl'} mt-1 font-extrabold tracking-tight`}
          style={{ color: assay.color }}
        >
          {assay.name}
        </h3>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-navy">
          Real-Time PCR Assay
        </p>
        <p className="mt-1 text-xs text-slate-500">48 tests · Research Use Only</p>
      </div>
      <MolecularWave color={assay.color} />
      <span className="sr-only">{assay.description}</span>
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
            One system. Clear assay recognition.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-slate-600">
            A consistent 48-test real-time PCR kit format, with a distinct colour for each assay and
            practical support for research laboratories.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ASSAYS.map((assay) => (
            <AssayCarton key={assay.name} assay={assay} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-navy/10 bg-white/85 px-6 py-5 text-center shadow-sm backdrop-blur sm:flex-row sm:text-left">
          <div>
            <p className="font-bold text-navy">For Research Use Only</p>
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
