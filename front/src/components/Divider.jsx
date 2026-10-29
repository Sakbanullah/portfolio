// Garis pemisah bergaya bingkai ganda dengan belah ketupat (菱形) di tengah.
export default function Divider({ className = '' }) {
  return (
    <div aria-hidden="true" className={`flex items-center gap-3 ${className}`}>
      <span className="h-px flex-1 bg-sumi/15" />
      <span className="size-1.5 rotate-45 bg-kin/70" />
      <span className="h-px flex-1 bg-sumi/15" />
    </div>
  )
}
