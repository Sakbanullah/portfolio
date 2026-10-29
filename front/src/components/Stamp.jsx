/**
 * Stempel hanko kecil: kotak merah dimiringkan dengan glyph kanji.
 * Dekoratif di level teks — label aksesibel ada di sisi pemanggil.
 */
export default function Stamp({ glyph = '印', label, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-[5px] bg-vermilion font-display text-base leading-none text-[#faf6ee] shadow-sm ring-1 ring-vermilion/60 [border-radius:42%_58%_45%_55%/55%_45%_58%_42%]"
      >
        {glyph}
      </span>
      {label && (
        <span className="text-xs font-medium tracking-[0.14em] uppercase text-vermilion">
          {label}
        </span>
      )}
    </span>
  )
}
