import Image from 'next/image';

const RELATIONSHIP_GROUPS = [
  {
    title: 'Research context',
    description: 'The underlying work was developed during employment at KMU with support from DGST Khyber Pakhtunkhwa.',
    institutions: [
      {
        name: 'Directorate General of Science & Technology, Khyber Pakhtunkhwa',
        src: '/images/partners/dgst.png',
        width: 82,
        height: 82,
        className: 'h-12',
      },
      {
        name: 'Khyber Medical University',
        src: '/images/partners/kmu.png',
        width: 145,
        height: 58,
        className: 'h-9',
      },
    ],
  },
  {
    title: 'Commercial ecosystem',
    description: 'BQ Pharma & Medical Devices is presented as part of the local product-development and manufacturing ecosystem.',
    institutions: [
      {
        name: 'BQ Pharma & Medical Devices',
        src: '/images/partners/bq-pharma.svg',
        width: 180,
        height: 52,
        className: 'h-9',
      },
    ],
  },
  {
    title: 'Certified project facility',
    description: 'KMU’s project R&D Laboratory is certified to ISO 9001:2015 for development and validation of in-house diagnostic assays. Certificate AMER801517; surveillance/expiry 29 September 2027.',
    institutions: [
      {
        name: 'ISO 9001:2015 - KMU Project R&D Laboratory',
        src: '/images/partners/iso-9001-kmu-project-lab.svg',
        width: 180,
        height: 84,
        className: 'h-14',
        preserveColor: true,
      },
    ],
  },
  {
    title: 'Standards & science references',
    description: 'PSQCA and PCSIR are relevant national public institutions; their marks are shown for institutional context only.',
    institutions: [
      {
        name: 'Pakistan Standards & Quality Control Authority',
        src: '/images/partners/psqca.png',
        width: 70,
        height: 70,
        className: 'h-11',
      },
      {
        name: 'Pakistan Council of Scientific & Industrial Research',
        src: '/images/partners/pcsir.png',
        width: 70,
        height: 70,
        className: 'h-11',
      },
    ],
  },
];

export default function InstitutionalStrip({ compact = false }) {
  return (
    <section className={compact ? 'border-y border-slate-100 bg-white px-4 py-10' : 'bg-white px-4 py-16'}>
      <div className="mx-auto max-w-6xl">
        <div className={`mx-auto max-w-2xl text-center ${compact ? 'mb-7' : 'mb-9'}`}>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyandark">Institutional context</span>
          <h2 className={`mt-2 font-extrabold text-navy ${compact ? 'text-2xl' : 'text-2xl md:text-3xl'}`}>
            How the organisations relate to the work.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {RELATIONSHIP_GROUPS.map((group) => (
            <article key={group.title} className="rounded-xl border border-slate-200 bg-graybg p-5">
              <p className="font-bold text-navy">{group.title}</p>
              <p className="mt-2 min-h-16 text-xs leading-relaxed text-slate-600">{group.description}</p>
              <div className="mt-4 flex min-h-16 items-center gap-5 border-t border-navy/10 pt-4">
                {group.institutions.map((institution) => (
                  <figure key={institution.name} className="flex min-w-0 flex-1 justify-center">
                    <Image
                      src={institution.src}
                      alt={institution.name}
                      title={institution.name}
                      width={institution.width}
                      height={institution.height}
                      className={`${institution.className} w-auto max-w-full object-contain ${institution.preserveColor ? 'opacity-90' : 'grayscale opacity-70'}`}
                    />
                    <figcaption className="sr-only">{institution.name}</figcaption>
                  </figure>
                ))}
              </div>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-5 max-w-3xl text-center text-[0.7rem] leading-relaxed text-slate-500">
          Institutional marks provide relationship or public-body context only. The ISO statement applies specifically to the KMU project R&amp;D Laboratory and its certified scope; it does not represent PLS company certification, product certification, regulatory approval or endorsement.
        </p>
      </div>
    </section>
  );
}
