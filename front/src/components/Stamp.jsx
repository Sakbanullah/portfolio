/**
 * Stempel hanko kecil: kotak cinnabar dengan tepi tidak rata dan glyph kanji.
 * Dekoratif di level teks — label aksesibel ada di sisi pemanggil.
 */
export default function Stamp({ glyph = '印', label, className = '', labelClassName = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        aria-hidden="true"
        className="hanko grid size-8 -rotate-6 place-items-center font-display text-base leading-none"
      >
        {glyph}
      </span>
      {label && (
        <span className={`text-xs font-medium tracking-[0.14em] uppercase text-vermilion ${labelClassName}`}>
          {label}
        </span>
      )}
    </span>
  )
}
