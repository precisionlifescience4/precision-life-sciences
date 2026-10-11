import Image from 'next/image';
import { INCORPORATION_CERTIFICATE_URL, SECP_CUIN, SECP_VERIFICATION_URL } from '@/lib/site';

function LogoFrame({ src, alt, width, height }) {
  return (
    <div className="flex h-20 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3">
      <Image src={src} alt={alt} width={width} height={height} className="max-h-full w-auto max-w-full object-contain" />
    </div>
  );
}

export default function InstitutionalStrip({ compact = false }) {
  return (
    <section className={`bg-white px-4 ${compact ? 'py-12' : 'py-16'}`} aria-labelledby="institutional-context-title">
      <div className="mx-auto max-w-6xl">
        <div className={`mx-auto max-w-3xl text-center ${compact ? 'mb-8' : 'mb-10'}`}>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyandark">Institutional context</span>
          <h2 id="institutional-context-title" className="mt-2 text-2xl font-extrabold text-navy md:text-3xl">
            The company, the research and the laboratory.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
            Three distinct parts of the Mugen-Plex story, each with its own documented role.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-graybg p-5 md:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyandark">01 / Company</p>
            <h3 className="mt-2 text-lg font-bold text-navy">Registered in Pakistan</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Precision Life Sciences (Private) Limited was incorporated on 29 July 2026. SECP CUIN {SECP_CUIN}.
            </p>
            <div className="mt-auto pt-6">
              <a href={INCORPORATION_CERTIFICATE_URL} target="_blank" rel="noreferrer" className="block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyandark" aria-label="View Precision Life Sciences certificate of incorporation">
                <LogoFrame src="/images/partners/secp-registered.svg" alt="SECP incorporation credential, CUIN 0348054" width={210} height={84} />
              </a>
              <a href={SECP_VERIFICATION_URL} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-cyandark underline-offset-4 hover:underline focus-visible:underline">
                Verify company registration ↗
              </a>
            </div>
          </article>

          <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-graybg p-5 md:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyandark">02 / Research</p>
            <h3 className="mt-2 text-lg font-bold text-navy">Developed in a university setting</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              The underlying work was developed during employment at Khyber Medical University, with support from DGST Khyber Pakhtunkhwa.
            </p>
            <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
              <LogoFrame src="/images/partners/kmu.png" alt="Khyber Medical University" width={150} height={61} />
              <LogoFrame src="/images/partners/dgst.png" alt="Directorate General of Science and Technology, Khyber Pakhtunkhwa" width={68} height={68} />
            </div>
          </article>

          <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-graybg p-5 md:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyandark">03 / Quality system</p>
            <h3 className="mt-2 text-lg font-bold text-navy">Certified project laboratory</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              KMU&apos;s Project R&amp;D Laboratory holds ISO 9001:2015 certification for its documented assay-development and validation scope.
            </p>
            <div className="mt-auto pt-6">
              <LogoFrame src="/images/partners/iso-9001-kmu-project-lab.svg" alt="ISO 9001:2015, KMU Project R and D Laboratory" width={190} height={89} />
              <p className="mt-3 text-xs leading-relaxed text-slate-500">
                Certificate AMER801517 · Applies to the KMU laboratory, not PLS or its products.
              </p>
            </div>
          </article>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-bold text-navy">Local commercial ecosystem</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">BQ Pharma &amp; Medical Devices is shown in the local product-development context.</p>
            </div>
            <Image src="/images/partners/bq-pharma.svg" alt="BQ Pharma and Medical Devices" width={160} height={46} className="h-9 w-auto max-w-40 shrink-0 object-contain" />
          </div>
          <div className="flex flex-col gap-4 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-bold text-navy">Standards &amp; science references</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">PSQCA and PCSIR are shown as public-body references, not endorsers.</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Image src="/images/partners/psqca.png" alt="Pakistan Standards and Quality Control Authority" width={48} height={48} className="h-12 w-12 object-contain" />
              <Image src="/images/partners/pcsir.png" alt="Pakistan Council of Scientific and Industrial Research" width={48} height={48} className="h-12 w-12 object-contain" />
            </div>
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-4xl text-center text-xs leading-relaxed text-slate-500">
          Corporate registration, institutional involvement and laboratory certification are separate claims. None implies product approval, PLS company ISO certification or endorsement by the institutions shown.
        </p>
      </div>
    </section>
  );
}
