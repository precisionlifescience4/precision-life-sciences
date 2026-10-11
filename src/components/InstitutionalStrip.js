import Image from 'next/image';
import { INCORPORATION_CERTIFICATE_URL, SECP_CUIN } from '@/lib/site';

const MARKS = [
  {
    role: 'Developed at',
    name: 'Khyber Medical University',
    image: '/images/partners/kmu.png',
    alt: 'Khyber Medical University logo',
    width: 260,
    height: 105,
  },
  {
    role: 'Supported by',
    name: 'Directorate General of Science & Technology, KP',
    image: '/images/partners/dgst.png',
    alt: 'Directorate General of Science and Technology, Khyber Pakhtunkhwa logo',
    width: 200,
    height: 202,
  },
  {
    role: 'Commercial partner',
    name: 'BQ Pharma & Medical Devices',
    image: '/images/partners/bq-pharma.svg',
    alt: 'BQ Pharma and Medical Devices identifier',
    width: 300,
    height: 86,
  },
  {
    role: 'Quality management',
    name: 'ISO 9001:2015 · KMU Project R&D Laboratory',
    image: '/images/partners/iso-9001-kmu-project-lab.svg',
    alt: 'ISO 9001:2015 certification of the KMU Project R and D Laboratory',
    width: 280,
    height: 131,
  },
  {
    role: 'Incorporated with',
    name: `SECP · CUIN ${SECP_CUIN}`,
    image: '/images/partners/secp-registered.svg',
    alt: 'SECP incorporation credential',
    width: 280,
    height: 112,
    href: INCORPORATION_CERTIFICATE_URL,
  },
  {
    role: 'Standards reference',
    name: 'PSQCA',
    image: '/images/partners/psqca.png',
    alt: 'Pakistan Standards and Quality Control Authority logo',
    width: 180,
    height: 180,
  },
  {
    role: 'Science reference',
    name: 'PCSIR',
    image: '/images/partners/pcsir.png',
    alt: 'Pakistan Council of Scientific and Industrial Research logo',
    width: 160,
    height: 160,
  },
];

function MarkTile({ mark }) {
  const logo = (
    <div className="flex aspect-square items-center justify-center rounded-2xl border border-slate-200 bg-graybg p-5 transition-colors group-hover:border-cyandark group-focus-visible:border-cyandark">
      <Image
        src={mark.image}
        alt={mark.alt}
        width={mark.width}
        height={mark.height}
        className="h-auto max-h-full w-auto max-w-full object-contain"
      />
    </div>
  );

  return (
    <article className="group w-[calc(50%-0.5rem)] max-w-[228px] min-w-0 sm:w-[calc(33.333%-0.75rem)] lg:w-[calc(25%-0.75rem)]">
      {mark.href ? (
        <a href={mark.href} target="_blank" rel="noreferrer" className="block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyandark" aria-label={`View certificate: ${mark.name}`}>
          {logo}
        </a>
      ) : logo}
      <div className="px-1 pt-3 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-cyandark">{mark.role}</p>
        <h3 className="mt-1 text-sm font-bold leading-snug text-navy sm:text-base">{mark.name}</h3>
      </div>
    </article>
  );
}

export default function InstitutionalStrip({ compact = false }) {
  return (
    <section className={`border-t border-slate-100 bg-white px-4 ${compact ? 'py-12' : 'py-16'}`} aria-labelledby="institutional-context-title">
      <div className="mx-auto max-w-6xl">
        <div className={`text-center ${compact ? 'mb-8' : 'mb-10'}`}>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyandark">Institutional context</span>
          <h2 id="institutional-context-title" className="mt-2 text-2xl font-extrabold text-navy md:text-3xl">
            Our ecosystem
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-8">
          {MARKS.map((mark) => <MarkTile key={mark.name} mark={mark} />)}
        </div>
      </div>
    </section>
  );
}
