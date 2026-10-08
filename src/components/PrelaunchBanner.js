// Slim notice above the header. Edited in Admin > Homepage & About ("Pre-launch notice").
// Leave that field empty to hide the banner at launch.
export const DEFAULT_NOTICE =
  'Pre-launch preview: Mugen-Plex products are in development or validation. RUO; not currently available for order.';

export default function PrelaunchBanner({ text }) {
  if (!text) return null;
  const displayText = String(text).replace(/For Research Use Only/gi, 'RUO');
  return (
    <div role="note" className="bg-navy text-white text-xs md:text-[13px] text-center px-4 py-2 leading-snug">
      {displayText}
    </div>
  );
}
