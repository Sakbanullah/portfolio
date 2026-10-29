// Ukuran card ditulis sebagai class literal supaya Tailwind bisa memindainya saat build.
// Badan card mengisi seluruh area card yang membentang (col/row span).
const COL = { 1: 'sm:col-span-1', 2: 'sm:col-span-2', 3: 'sm:col-span-3' }
const ROW = { 1: 'sm:row-span-1', 2: 'sm:row-span-2' }

/**
 * Satu sel bento. `size` berasal dari JSON ({ col, row }).
 * Mobile: 1 kolom. >=sm: col/row span sesuai JSON.
 * Bingkai garis ganda: ring luar tipis + garis dalam inset.
 */
export default function Card({ size = { col: 1, row: 1 }, className = '', children, as: Tag = 'div' }) {
  const col = Math.min(size.col ?? 1, 3)
  const row = Math.min(size.row ?? 1, 2)

  return (
    <Tag
      className={[
        'group relative rounded-xl bg-paper ring-1 ring-sumi/15',
        'transition-[transform,box-shadow] duration-300',
        'hover:-translate-y-0.5 hover:shadow-[0_8px_28px_-16px_rgba(0,0,0,0.35)]',
        'before:pointer-events-none before:absolute before:inset-1.5 before:rounded-lg before:border before:border-sumi/10',
        COL[col],
        ROW[row],
        className,
      ].join(' ')}
    >
      <div className="relative flex h-full flex-col p-5 sm:p-6">
        <div className="flex h-full flex-col">{children}</div>
      </div>
    </Tag>
  )
}
