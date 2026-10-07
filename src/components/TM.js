// Puts a small ™ after the first "Mugen-Plex" in a piece of text (trademark application pending).
// Use ® only after the mark is formally registered.
export default function TM({ text }) {
  const s = String(text ?? '');
  const i = s.indexOf('Mugen-Plex');
  if (i === -1) return <>{s}</>;
  const end = i + 'Mugen-Plex'.length;
  if (s[end] === '™') return <>{s}</>;
  return (
    <>
      {s.slice(0, end)}
      <sup className="text-[0.45em] font-semibold ml-0.5 align-super">™</sup>
      {s.slice(end)}
    </>
  );
}
