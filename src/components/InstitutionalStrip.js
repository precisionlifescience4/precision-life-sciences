import Image from 'next/image';

const INSTITUTIONS = [
  {
    name: 'BQ Pharma & Medical Devices',
    src: '/images/partners/bq-pharma.svg',
    width: 180,
    height: 52,
    className: 'h-9',
  },
  {
    name: 'Directorate General of Science & Technology, Khyber Pakhtunkhwa',
    src: '/images/partners/dgst.png',
    width: 82,
    height: 82,
    className: 'h-14',
  },
  {
    name: 'Khyber Medical University',
    src: '/images/partners/kmu.png',
    width: 145,
    height: 58,
    className: 'h-10',
  },
  {
    name: 'Pakistan Standards & Quality Control Authority',
    src: '/images/partners/psqca.png',
    width: 70,
    height: 70,
    className: 'h-12',
  },
  {
    name: 'Pakistan Council of Scientific & Industrial Research',
    src: '/images/partners/pcsir.png',
    width: 70,
    height: 70,
    className: 'h-12',
  },
];

export default function InstitutionalStrip({ compact = false }) {
  return (
    <section className={compact ? 'border-y border-slate-100 bg-white px-4 py-10' : 'bg-white px-4 py-16'}>
      <div className="mx-auto max-w-6xl">
        {!compact && (
          <div className="mx-auto mb-9 max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyandark">
              Pakistan science &amp; quality ecosystem
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-navy md:text-3xl">
              Local collaboration, built into the journey.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-600">
              Academic research, public-sector science, local manufacturing and national quality infrastructure.
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {INSTITUTIONS.map((institution) => (
            <figure
              key={institution.name}
              className="flex min-h-28 flex-col items-center justify-center rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-4 text-center"
            >
              <div className="flex h-14 items-center justify-center">
                <Image
                  src={institution.src}
                  alt={institution.name}
                  width={institution.width}
                  height={institution.height}
                  className={`${institution.className} w-auto max-w-full object-contain grayscale opacity-65 transition duration-300 hover:grayscale-0 hover:opacity-100`}
                />
              </div>
              <figcaption className="mt-2 text-[0.65rem] font-semibold leading-snug text-slate-500">
                {institution.name}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mx-auto mt-5 max-w-3xl text-center text-[0.68rem] leading-relaxed text-slate-400">
          Institutional marks identify collaborators and relevant public bodies; their display does not by itself
          represent product certification or endorsement.
        </p>
      </div>
    </section>
  );
}
