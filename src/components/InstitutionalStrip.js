import Image from 'next/image';
import { INCORPORATION_CERTIFICATE_URL, SECP_CUIN } from '@/lib/site';

const MARKS = [
  {
    role: 'Developed at',
    name: 'Khyber Medical University',
    image: '/images/partners/kmu-official.png',
    alt: 'Khyber Medical University logo',
    width: 180,
    height: 106,
    presentation: 'fullWordmark',
  },
  {
    role: 'Supported by',
    name: 'Directorate General of Science & Technology, KP',
    image: '/images/partners/dgst-official-user.png',
    alt: 'Directorate General of Science and Technology, Khyber Pakhtunkhwa logo',
    width: 192,
    height: 192,
    presentation: 'emblem',
  },
  {
    role: 'Commercial partner',
    name: 'BQ Pharma & Medical Devices',
    image: '/images/partners/bq-pharma.svg',
    alt: 'BQ Pharma and Medical Devices identifier',
    width: 300,
    height: 86,
    presentation: 'wordmark',
  },
  {
    role: 'Quality management',
    name: 'ISO 9001:2015 Â· KMU Project R&D Laboratory',
    image: '/images/partners/iso-9001-kmu-project-lab.svg',
    alt: 'ISO 9001:2015 certification of the KMU Project R and D Laboratory',
    width: 280,
    height: 131,
    presentation: 'credential',
  },
  {
    role: 'Incorporated with',
    name: `SECP Â· CUIN ${SECP_CUIN}`,
    image: '/images/partners/secp-registered.svg',
    alt: 'SECP incorporation credential',
    width: 280,
    height: 112,
    presentation: 'credential',
    href: INCORPORATION_CERTIFICATE_URL,
  },
];

function MarkTile({ mark }) {
  const presentationClass = {
    emblem: 'max-h-[76%] max-w-[66%]',
    credential: 'max-h-[62%] max-w-[84%]',
    fullWordmark: 'max-h-[78%] max-w-[90%]',
    wordmark: 'max-h-[58%] max-w-[90%]',
  }[mark.presentation] || 'max-h-[60%] max-w-[82%]';

  const logo = (
    <div className="flex h-40 items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_1px_0_rgba(15,43,91,0.04)] transition-colors group-hover:border-cyandark group-focus-visible:border-cyandark sm:h-44">
      <Image
        src={mark.image}
        alt={mark.alt}
        width={mark.width}
        height={mark.height}
        className={`h-auto w-auto object-contain ${presentationClass}`}
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
