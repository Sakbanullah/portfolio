/**
 * Judul bab gaya gulungan lukisan: nomor chapter + kanji ornamen, judul vertikal
 * (writing-mode: vertical-rl), kicker horizontal di samping. Isi paragraf tetap horizontal.
 */
export default function SectionHeading({ kanji, title, kicker, chapter }) {
  const n = chapter ? String(chapter).padStart(2, '0') : null
  return (
    <div className="mb-8 flex items-start gap-4 sm:gap-6">
      {n && (
        <span
          aria-hidden="true"
          className="vertical-title font-display text-xs tracking-[0.4em] text-kin"
        >
          {`第${n}章`}
        </span>
      )}
      <span aria-hidden="true" className="vertical-title font-display text-3xl text-vermilion sm:text-4xl">
        {kanji}
      </span>
      <div className="min-w-0 pt-1">
        {kicker && <p className="mb-2 text-xs tracking-[0.2em] uppercase text-kin">{kicker}</p>}
        <h2 className="vertical-title font-display text-3xl font-semibold tracking-[0.12em] sm:text-4xl">
          {title}
        </h2>
        <span aria-hidden="true" className="mt-4 block h-0.5 w-10 bg-vermilion" />
      </div>
    </div>
  )
}
