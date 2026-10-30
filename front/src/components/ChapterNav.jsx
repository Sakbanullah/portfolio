import { useEffect, useState } from 'react'
import profile from '../data/profile.json'

// Penanda bab aktif di tepi kanan gulungan (desktop). Satu penanda bergeser halus.
// Kanji dari data; label teks untuk pembaca layar.
const CHAPTERS = [
  { id: 'top', kanji: profile.kanji, label: 'Opening' },
  { id: 'about', kanji: '人', label: 'About' },
  { id: 'experience', kanji: '歴', label: 'Experience' },
  { id: 'projects', kanji: '作', label: 'Projects' },
  { id: 'skills', kanji: '技', label: 'Skills' },
  { id: 'contact', kanji: '縁', label: 'Contact' },
]

export default function ChapterNav() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        // Pilih bab terakhir yang masuk pita — urutan DOM = urutan scroll.
        let last = -1
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          last = Math.max(last, CHAPTERS.findIndex((c) => c.id === e.target.id))
        })
        if (last >= 0) setActive(last)
      },
      // Pita di 40% tinggi viewport: bab yang melintasinya = bab aktif.
      // Bab pendek (Hero, About) bisa terlewati di antara dua event → jaga riwayat entri.
      { rootMargin: '-40% 0px -35% 0px' }
    )
    CHAPTERS.forEach((c) => {
      const el = document.getElementById(c.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  // Anchornya kembar dengan navbar (target sama) → seluruh nav disembunyikan dari pembaca layar.
  return (
    <nav aria-hidden="true" className="fixed top-1/2 right-3 z-40 hidden -translate-y-1/2 md:block">
      <ol className="flex flex-col items-center gap-3">
        {CHAPTERS.map((c, i) => (
          <li key={c.id}>
            <a
              href={`#${c.id}`}
              aria-current={i === active ? 'true' : undefined}
              tabIndex={-1}
              className={`chapter-mark block origin-center font-display text-sm leading-none transition-transform ${
                i === active ? 'scale-125 text-vermilion' : 'text-sumi'
              }`}
            >
              {c.kanji}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
