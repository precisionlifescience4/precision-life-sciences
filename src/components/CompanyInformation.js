import TM from '@/components/TM';
import { COMPANY } from '@/lib/company';

// Editable in Admin > Homepage & About ("facility_statement"). The certificate wording below it is fixed
// because it mirrors the scope printed on the ISO 9001 certificate.
export const DEFAULT_FACILITY_STATEMENT = `Mugen-Plex assays are developed and validated in the Research & Development Laboratory of Khyber Medical University (KMU), Peshawar, within the project “Import Substitution through Development of In-House Diagnostic Assays”, supported by the Directorate General of Science & Technology (DGST), Khyber Pakhtunkhwa.`;

const paragraphs = (text) => String(text || '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

function VerifyLink({ className = '', children }) {
  if (!COMPANY.verifyUrl) return null;
  return (
    <a href={COMPANY.verifyUrl} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span aria-hidden="true"> ↗</span>
      <span className="sr-only"> (opens the SECP website in a new tab)</span>
    </a>
  );
}

// Slim one-line registration strip for the home page.
export function RegistrationBar() {
  return (
    <section aria-label="Company registration" className="border-b border-slate-100 bg-graybg px-4 py-3.5">
      <p className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-xs text-slate-600 sm:text-[0.8rem]">
        <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden="true" className="shrink-0 text-cyandark">
          <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6.2 10.2l2.5 2.5 5-5.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-bold text-navy">{COMPANY.legalName}</span>
        <span className="hidden text-slate-300 sm:inline" aria-hidden="true">|</span>
        <span>SECP-registered · CUIN {COMPANY.cuin}</span>
        <span className="hidden text-slate-300 sm:inline" aria-hidden="true">|</span>
        <span>Incorporated {COMPANY.incorporatedLabel}</span>
        <VerifyLink className="font-semibold text-cyandark hover:text-navy">Verify on SECP</VerifyLink>
      </p>
    </section>
  );
}

// About-page section: registration details plus a statement of where the science is done.
export default function CompanyInformation({ statement }) {
  const rows = [
    ['Legal name', COMPANY.legalName],
    ['Company type', COMPANY.type],
    ['Incorporated under', COMPANY.act],
    ['Corporate Unique Identification No. (CUIN)', COMPANY.cuin],
    ['Date of incorporation', COMPANY.incorporatedLabel],
    ['Issued by', COMPANY.registrar],
    ['Office', COMPANY.office],
  ];

  return (
    <section id="company" aria-labelledby="company-heading" className="scroll-mt-24 bg-graybg px-4 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyandark">Company information</span>
          <h2 id="company-heading" className="mt-2 text-3xl font-extrabold text-navy">A registered Pakistani company.</h2>
          <p className="mt-3 leading-relaxed text-slate-600">
            {COMPANY.legalName} is incorporated under the {COMPANY.act} and is listed on the public SECP register.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_12px_35px_rgba(0,32,91,0.06)] md:p-8">
            <h3 className="text-lg font-extrabold text-navy">Registration details</h3>
            <dl className="mt-4 divide-y divide-slate-100 text-sm">
              {rows.map(([label, value]) => (
                <div key={label} className="grid gap-1 py-3 sm:grid-cols-[13rem_1fr] sm:gap-4">
                  <dt className="font-semibold text-slate-500">{label}</dt>
                  <dd className="font-semibold text-navy">{value}</dd>
                </div>
              ))}
            </dl>
            <VerifyLink className="mt-3 inline-block text-sm font-bold text-cyandark hover:text-navy">Verify on the SECP register</VerifyLink>
            <p className="mt-4 text-[0.7rem] leading-relaxed text-slate-500">
              Incorporation confirms the company’s legal existence. It is not a regulatory licence, product registration or endorsement, and Mugen-Plex products remain for research use only.
            </p>
          </article>

          <article className="rounded-2xl bg-navy p-7 text-white md:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan">Where the science is done</p>
            <h3 className="mt-3 text-xl font-extrabold">KMU Research &amp; Development Laboratory</h3>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
              {paragraphs(statement || DEFAULT_FACILITY_STATEMENT).map((p, i) => (
                <p key={i}>{i === 0 ? <TM text={p} /> : p}</p>
              ))}
              <p>
                The laboratory’s quality management system is certified to ISO 9001:2015 (certificate held by Khyber Medical University) for research and development, including the development and validation of in-house diagnostic assays.
              </p>
              <p>{COMPANY.legalName} is the company that markets the Mugen-Plex portfolio and handles product enquiries.</p>
            </div>
            <a href="#institutions" className="mt-5 inline-block text-sm font-bold text-cyan hover:text-white">Certificate details and institutions ↓</a>
          </article>
        </div>
      </div>
    </section>
  );
}
