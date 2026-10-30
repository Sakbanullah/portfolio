// Ukuran card ditulis sebagai class literal supaya Tailwind bisa memindainya saat build.
// Badan card mengisi seluruh area card yang membentang (col/row span).
const COL = { 1: 'sm:col-span-1', 2: 'sm:col-span-2', 3: 'sm:col-span-3' }
const ROW = { 1: 'sm:row-span-1', 2: 'sm:row-span-2' }

/**
 * Satu lembar naskah (potongan kertas xuan). `size` berasal dari JSON ({ col, row }).
 * Mobile: 1 kolom. >=sm: col/row span sesuai JSON.
 * SATU batas visual: bingkai tipis di tepi (.paper-cut + ring). Tidak ada bingkai dalam (pseudo)
 * — dulu menyebabkan efek "card di dalam card" di semua section.
 */
export default function Card({
  size = { col: 1, row: 1 },
  className = '',
  children,
  as: Tag = 'div',
  ...rest
}) {
  const col = Math.min(size.col ?? 1, 3)
  const row = Math.min(size.row ?? 1, 2)

  return (
    <Tag
      {...rest}
      className={[
        'paper-cut group relative border border-sumi/20',
        'transition-[transform,box-shadow,border-color] duration-300',
        'hover:-translate-y-0.5 hover:border-sumi/35',
        COL[col],
        ROW[row],
        className,
      ].join(' ')}
    >
      <div className="relative flex h-full flex-col p-4 sm:p-6">
        <div className="flex h-full flex-col">{children}</div>
      </div>
    </Tag>
  )
}
