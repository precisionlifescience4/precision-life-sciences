'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const STARTERS = ['Which assays can I explore?', 'How do I request a sample kit?', 'What should I confirm before sending samples?'];
const QUICK_LINKS = [
  ['Request a sample kit', '/request-sample'],
  ['Sample transport', '/sample-transport'],
  ['Contact the team', '/contact'],
];

function DeenaIcon({ className = 'h-6 w-6' }) {
  return (
    <svg aria-hidden="true" focusable="false" className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="m13 17-6-5 8-1-2-8 7 6 4-7 3 8 8-5-2 8 8 2-7 5" />
      <path d="M13 18v7c0 7 5 12 11 12s11-5 11-12v-7" />
      <circle cx="19" cy="23" r="4" />
      <circle cx="29" cy="23" r="4" />
      <path d="M23 23h2M15 22l-3-1m21 1 3-1M20 30c2.2 2 5.8 2 8 0" />
      <path d="M8 46c1-6 6-10 12-10l4 5 4-5c6 0 11 4 12 10M24 41v5" />
      <circle cx="40" cy="7" r="2" fill="currentColor" stroke="none" />
      <circle cx="44" cy="12" r="1.25" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function ChatAssistant() {
  const pathname = usePathname();
  const dialog = useRef(null);
  const launcher = useRef(null);
  const input = useRef(null);
  const log = useRef(null);
  const busy = useRef(false);
  const restoreInputFocus = useRef(false);
  const [open, setOpen] = useState(false);
  const [availability, setAvailability] = useState('checking');
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    fetch('/api/chat', { signal: controller.signal }).then(r => r.ok ? r.json() : null)
      .then(data => setAvailability(data?.available ? 'available' : 'unavailable'))
      .catch(e => { if (e.name !== 'AbortError') setAvailability('unavailable'); });
    return () => controller.abort();
  }, [open]);

  useEffect(() => { if (log.current) log.current.scrollTop = log.current.scrollHeight; }, [messages, sending, error]);
  useEffect(() => {
    if (!sending && restoreInputFocus.current) {
      restoreInputFocus.current = false;
      if (dialog.current?.open) input.current?.focus();
    }
  }, [sending]);

  useEffect(() => { dialog.current?.close(); }, [pathname]);

  function close() { dialog.current?.close(); }
  function show() {
    dialog.current?.showModal();
    setOpen(true);
  }

  async function ask(text) {
    const content = text.trim();
    if (!content || content.length > 1200 || busy.current || availability !== 'available') return;
    busy.current = true;
    setSending(true);
    setError('');
    // Only keep the bounded conversation needed for this response; nothing is persisted locally.
    const history = [...messages.map(m => ({ role: m.role, content: m.content.slice(0, 1800) })), { role: 'user', content }].slice(-7);
    while (history.length > 1 && (history.reduce((n, m) => n + m.content.length, 0) > 10000 || new TextEncoder().encode(JSON.stringify({ messages: history })).length > 15000)) history.splice(0, 2);
    setQuestion('');
    setMessages(current => [...current, { role: 'user', content }]);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }), signal: AbortSignal.timeout(30000),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 503) setAvailability('unavailable');
        throw new Error(data.error || 'The assistant could not answer. Please try again.');
      }
      setMessages(current => [...current, { role: 'assistant', content: data.answer, sources: data.sources || [] }]);
    } catch (e) {
      setError(e.name === 'TimeoutError' ? 'The reply took too long. Please try again or contact the team.' : e.message || 'The assistant is unavailable. Please try again.');
      setQuestion(content);
      // A failed turn is not carried into the next model request.
      setMessages(current => current.slice(0, -1));
    } finally {
      busy.current = false;
      restoreInputFocus.current = true;
      setSending(false);
    }
  }

  if (pathname.startsWith('/admin')) return null;

  return (
    <>
      <button ref={launcher} onClick={show} type="button" aria-haspopup="dialog" aria-controls="pls-assistant" aria-expanded={open} className="fixed right-3 z-40 flex min-h-12 items-center gap-2.5 rounded-full border-2 border-white bg-navy px-5 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-navylight sm:right-6" style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan text-navy shadow-inner"><DeenaIcon /></span>
        Ask DeeNA
      </button>
      <dialog ref={dialog} id="pls-assistant" aria-labelledby="pls-assistant-title" aria-describedby="pls-assistant-description" className="pls-chat-dialog" onClose={() => { setOpen(false); launcher.current?.focus(); }} onClick={event => { if (event.target === dialog.current) { const r = dialog.current.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) close(); } }}>
        <div className="flex shrink-0 items-center justify-between gap-3 bg-navy px-5 py-4 text-white">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cyan text-navy shadow-inner"><DeenaIcon className="h-8 w-8" /></span>
            <div><h2 id="pls-assistant-title" className="text-base font-semibold">DeeNA</h2><p className="mt-1 text-xs text-slate-300">PLS information & enquiries assistant</p></div>
          </div>
          <button type="button" onClick={close} aria-label="Close DeeNA" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl hover:bg-white/10">×</button>
        </div>
        <div ref={log} role="log" aria-label="Conversation with DeeNA" aria-live="polite" aria-relevant="additions text" className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5">
          <p id="pls-assistant-description" className="text-sm leading-relaxed text-slate-600">I can help you find PLS assays, laboratory services and sample information. I can’t confirm availability or accept a shipment.</p>
          {availability === 'checking' && <p role="status" className="mt-4 text-sm text-slate-500">Checking assistant availability…</p>}
          {availability === 'unavailable' && <div role="status" className="mt-4 rounded-lg border border-slate-200 bg-graybg p-4 text-sm leading-relaxed text-slate-600">AI chat is currently unavailable. You can use the links below or contact the PLS team for help.</div>}
          {availability === 'available' && messages.length === 0 && <div className="mt-5 space-y-2">{STARTERS.map(text => <button type="button" key={text} onClick={() => ask(text)} disabled={sending} className="block w-full rounded-lg border border-navy/15 bg-graybg px-3 py-3 text-left text-sm text-navy transition-colors hover:border-cyandark disabled:opacity-50">{text} <span aria-hidden="true">↗</span></button>)}</div>}
          <div className="mt-5 space-y-4">
            {messages.map((message, index) => <div key={index} className={`rounded-xl px-4 py-3 text-sm leading-relaxed ${message.role === 'user' ? 'ml-7 bg-navy text-white' : 'mr-3 border border-slate-200 bg-graybg text-slate-700'}`}>
              <p className={`mb-1 text-[10px] font-bold uppercase tracking-wider ${message.role === 'user' ? 'text-slate-300' : 'text-cyandark'}`}>{message.role === 'user' ? 'You' : 'DeeNA'}</p>
              <p className="whitespace-pre-wrap break-words">{message.content}</p>
              {message.sources?.length > 0 && <ul aria-label="Related PLS pages" className="mt-3 space-y-2 border-t border-navy/10 pt-3">{message.sources.map(source => <li key={source.href}><Link href={source.href} onClick={close} className="font-semibold text-cyandark underline underline-offset-4">{source.title} →</Link></li>)}</ul>}
            </div>)}
          </div>
          {sending && <p role="status" className="mt-4 text-sm text-slate-500">Preparing a reply…</p>}
          {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
        </div>
        <div className="shrink-0 border-t border-slate-200 bg-white px-5 pb-4 pt-3">
          <div className="mb-3 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-cyandark">{QUICK_LINKS.map(([label, href]) => <Link key={href} href={href} onClick={close} className="py-1 underline underline-offset-4">{label}</Link>)}</div>
          {availability === 'available' && <form onSubmit={event => { event.preventDefault(); ask(question); }}>
            <label htmlFor="pls-chat-question" className="sr-only">Your question about PLS</label>
            <div className="flex gap-2"><input ref={input} id="pls-chat-question" value={question} onChange={event => setQuestion(event.target.value)} maxLength={1200} autoComplete="off" placeholder="Ask about PLS…" disabled={sending} className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-3 text-base disabled:bg-slate-50" /><button type="submit" disabled={sending || !question.trim()} className="rounded-lg bg-navy px-4 text-sm font-semibold text-white disabled:opacity-40">Send</button></div>
            <p className="mt-2 text-[11px] leading-relaxed text-slate-500">Messages are processed by AI providers through OpenAI or Vercel AI Gateway. Don’t include patient data or confidential information. AI can make mistakes; confirm details with PLS.</p>
          </form>}
          {messages.length > 0 && <button type="button" disabled={sending} onClick={() => { setMessages([]); setError(''); setQuestion(''); input.current?.focus(); }} className="mt-2 min-h-8 text-xs font-semibold text-slate-500 underline underline-offset-4 disabled:opacity-40">Clear conversation</button>}
        </div>
      </dialog>
    </>
  );
}
