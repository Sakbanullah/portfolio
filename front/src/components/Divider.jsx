// Pembatas bab: garis bingkai ganda yang memudar ke tepi (sapuan kuas) + belah ketupat (菱形).
// Garisnya bergambar saat masuk viewport (data-reveal, GSAP di useScrollReveal).
export default function Divider({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      data-reveal="divider"
      className={`flex items-center gap-3 ${className}`}
    >
      <span
        data-reveal="line"
        className="h-px flex-1 bg-linear-to-r from-transparent via-sumi/35 to-sumi/35"
      />
      <span className="size-1.5 rotate-45 bg-vermilion" />
      <span className="h-px flex-1 bg-linear-to-l from-transparent via-sumi/35 to-sumi/35" />
    </div>
  )
}
