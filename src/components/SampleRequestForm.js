'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { INFECTIOUS_ASSAYS } from '@/lib/assays';

const INPUT_CLASS = 'mt-2 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-3 text-base text-navy transition placeholder:text-slate-400 focus:border-cyandark focus:outline-none focus:ring-2 focus:ring-cyan/20 disabled:bg-slate-50';
const LABEL_CLASS = 'text-sm font-semibold text-navy';

function initialForm(params) {
  const product = (params.get('product') || '').slice(0, 160).trim().toLowerCase();
  const assay = INFECTIOUS_ASSAYS.find((item) => [item.slug, item.shortName.toLowerCase(), item.fullName.toLowerCase(), `mugen-plex ${item.shortName.toLowerCase()}`].includes(product));
  return {
    name: '', organization: '', email: '', location: '', research_use: '', message: '', website: '',
    assay: assay?.slug || '', format: 'advise', research_only: false,
  };
}

export default function SampleRequestForm() {
  const params = useSearchParams();
  const [form, setForm] = useState(() => initialForm(params));
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const feedbackRef = useRef(null);
  const submitting = useRef(false);

  useEffect(() => {
    if (status === 'sent' || status === 'error') feedbackRef.current?.focus();
  }, [status]);

  const set = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
    if (status === 'error') setStatus('idle');
  };

  const inputProps = (field) => ({
    id: `sample-${field}`,
    name: field,
    value: form[field],
    onChange: (event) => set(field, event.target.value),
    'aria-invalid': fieldErrors[field] ? true : undefined,
    'aria-describedby': fieldErrors[field] ? `sample-${field}-error` : undefined,
    className: INPUT_CLASS,
  });

  const fieldError = (field) => fieldErrors[field] && <p id={`sample-${field}-error`} className="mt-2 text-sm text-denguedark">{fieldErrors[field]}</p>;

  async function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    const errors = {};
    for (const field of ['name', 'organization', 'email', 'location', 'research_use']) {
      if (!form[field].trim()) errors[field] = 'Please complete this field.';
    }
    if (!errors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Please enter a valid email address.';
    if (!INFECTIOUS_ASSAYS.some((assay) => assay.slug === form.assay) && form.assay !== 'help-me-choose') errors.assay = 'Choose an assay or select “Help me choose”.';
    if (!form.research_only) errors.research_only = 'Please confirm the research-use-only acknowledgement.';
    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      setError('Please check the highlighted fields.');
      setStatus('error');
      return;
    }

    submitting.current = true;
    setStatus('sending');
    setError('');
    setFieldErrors({});
    let failureMessage = 'Your request could not be sent. Your details are still here; please try again or contact the PLS team.';
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name, organization: form.organization, email: form.email,
          website: form.website, inquiry_type: 'General', request_kind: 'sample-evaluation',
          sample_request: {
            assay: form.assay, format: form.format, location: form.location,
            research_use: form.research_use, research_only: form.research_only,
          },
          message: form.message,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success !== true) {
        if (response.status === 400 && result.fields) setFieldErrors(result.fields);
        failureMessage = response.status === 429
          ? 'Too many requests have been sent. Please wait a few minutes before trying again.'
          : response.status === 400 && result.error
            ? result.error
            : failureMessage;
        throw new Error(failureMessage);
      }
      setStatus('sent');
    } catch {
      setError(failureMessage);
      setStatus('error');
    } finally {
      submitting.current = false;
    }
  }

  if (status === 'sent') {
    return (
      <div ref={feedbackRef} tabIndex={-1} role="status" aria-live="polite" className="rounded-2xl border border-slate-200 bg-white p-7 focus:outline-none sm:p-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan/10 text-cyandark" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 12 4 4L19 6" /></svg>
        </span>
        <h2 className="mt-6 text-2xl font-bold text-navy">Your interest is registered.</h2>
        <p className="mt-4 leading-relaxed text-slate-600">Thank you. The PLS team will review your research needs and follow up using the email address you provided.</p>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">This is an enquiry acknowledgement. Evaluation availability, any costs and shipment arrangements require separate confirmation from PLS.</p>
        <Link href="/services#infectious" className="mt-7 inline-flex font-bold text-cyandark underline underline-offset-4 hover:text-navy">Explore the assay range</Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} aria-label="Sample kit evaluation enquiry" aria-busy={status === 'sending'} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_16px_48px_rgba(0,32,91,0.04)] sm:p-9">
      <h2 className="text-2xl font-bold text-navy">Request a sample kit</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">Register your interest in a future evaluation. Fields marked * are required.</p>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website} onChange={(event) => set('website', event.target.value)} className="hidden" />

      {status === 'error' && <div ref={feedbackRef} tabIndex={-1} role="alert" className="mt-6 rounded-lg border border-denguedark/25 bg-dengue/5 p-4 text-sm leading-relaxed text-denguedark focus:outline-2 focus:outline-offset-2 focus:outline-denguedark">{error}</div>}

      <fieldset disabled={status === 'sending'} className="mt-7 space-y-5 disabled:opacity-70">
        <legend className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">01 · Your research</legend>
        <div>
          <label htmlFor="sample-assay" className={LABEL_CLASS}>Assay of interest *</label>
          <select {...inputProps('assay')} required>
            <option value="" disabled>Select an assay</option>
            {INFECTIOUS_ASSAYS.map((assay) => <option key={assay.slug} value={assay.slug}>Mugen-Plex {assay.shortName}</option>)}
            <option value="help-me-choose">Help me choose</option>
          </select>
          {fieldError('assay')}
        </div>
        <div>
          <label htmlFor="sample-format" className={LABEL_CLASS}>Preferred kit format</label>
          <select {...inputProps('format')}>
            <option value="advise">Please advise</option>
            <option value="24">24 tests</option>
            <option value="48">48 tests</option>
            <option value="96">96 tests</option>
          </select>
          {fieldError('format')}
        </div>
        <div>
          <label htmlFor="sample-research_use" className={LABEL_CLASS}>Intended research use *</label>
          <textarea {...inputProps('research_use')} required maxLength={800} rows={3} placeholder="Briefly describe the research workflow you would like to evaluate." aria-describedby={`sample-research-help${fieldErrors.research_use ? ' sample-research_use-error' : ''}`} />
          <p id="sample-research-help" className="mt-2 text-xs leading-relaxed text-slate-500">Please describe the project in general terms. Do not include patient details or identifiable research-participant information.</p>
          {fieldError('research_use')}
        </div>
      </fieldset>

      <fieldset disabled={status === 'sending'} className="mt-8 border-t border-slate-100 pt-6 disabled:opacity-70">
        <legend className="pr-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">02 · Your laboratory</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="sample-name" className={LABEL_CLASS}>Your name *</label>
            <input {...inputProps('name')} required autoComplete="name" maxLength={120} />
            {fieldError('name')}
          </div>
          <div>
            <label htmlFor="sample-organization" className={LABEL_CLASS}>Institution / organization *</label>
            <input {...inputProps('organization')} required autoComplete="organization" maxLength={200} />
            {fieldError('organization')}
          </div>
          <div>
            <label htmlFor="sample-email" className={LABEL_CLASS}>Email address *</label>
            <input {...inputProps('email')} required type="email" autoComplete="email" maxLength={200} />
            {fieldError('email')}
          </div>
          <div>
            <label htmlFor="sample-location" className={LABEL_CLASS}>City and country *</label>
            <input {...inputProps('location')} required maxLength={160} placeholder="e.g. Peshawar, Pakistan" />
            {fieldError('location')}
          </div>
        </div>
        <div className="mt-5">
          <label htmlFor="sample-message" className={LABEL_CLASS}>Anything else we should know? <span className="font-normal text-slate-500">(optional)</span></label>
          <textarea {...inputProps('message')} maxLength={1800} rows={3} placeholder="Your instrument, preferred timing or questions for our team." />
          {fieldError('message')}
        </div>
      </fieldset>

      <div className="mt-6 border-t border-slate-100 pt-6">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-slate-600" htmlFor="sample-research_only">
          <input id="sample-research_only" name="research_only" type="checkbox" required checked={form.research_only} onChange={(event) => set('research_only', event.target.checked)} disabled={status === 'sending'} aria-invalid={fieldErrors.research_only ? true : undefined} aria-describedby={fieldErrors.research_only ? 'sample-research_only-error' : undefined} className="mt-1 h-4 w-4 shrink-0 accent-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyandark" />
          <span>I understand these products are for research use only, not diagnostic use, and that any evaluation is subject to availability and PLS confirmation. *</span>
        </label>
        {fieldError('research_only')}
        <button type="submit" disabled={status === 'sending'} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-navy px-7 py-3.5 text-sm font-bold text-white transition hover:bg-navylight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy disabled:cursor-wait disabled:opacity-60 sm:w-auto">
          {status === 'sending' ? 'Sending your request…' : 'Send evaluation enquiry'}
          {status !== 'sending' && <span aria-hidden="true">→</span>}
        </button>
        <p className="mt-4 text-xs leading-relaxed text-slate-500">Your contact details are used by the PLS team to respond to this enquiry.</p>
      </div>
    </form>
  );
}
