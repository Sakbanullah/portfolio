import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches


// Animasi berbasis posisi scroll (domain GSAP — jangan dicampur framer-motion di elemen sama):
// - garis Divider "tergambar" saat masuk viewport
// - parallax lembut pada grid Projects
// Target dipilih lewat data-attribute, bukan className pemanggil.
export function useScrollReveal(ref) {
  useEffect(() => {
    const root = ref.current
    if (!root || reduceMotion()) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal="divider"]', root).forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll('[data-reveal="line"]'),
          { scaleX: 0.2 },
          {
            scaleX: 1,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 95%', once: true },
          }
        )
      })
      // Parallax lembut pada grid Projects (desktop saja; mobile terlalu mahal).
      const grid = root.querySelector('[data-reveal="projects-grid"]')
      if (grid && matchMedia('(min-width: 768px)').matches) {
        gsap.fromTo(
          grid,
          { y: 0 },
          {
            y: -28,
            ease: 'none',
            scrollTrigger: { trigger: grid, start: 'top bottom', end: 'bottom top', scrub: 0.5 },
          }
        )
      }
      // Tahap 3: kanji watermark Hero bergeser pelan (parallax ringan) saat scroll.
      const kanji = root.querySelector('[data-reveal="kanji"]')
      if (kanji) {
        gsap.fromTo(
          kanji,
          { yPercent: 0 },
          {
            yPercent: 14,
            ease: 'none',
            scrollTrigger: {
              trigger: kanji.closest('section') || kanji,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.6,
            },
          }
        )
      }
      // Tahap 5 efek A: judul hero muncul seperti tinta sumi menyebar — tiga blot
      // radial-gradient (mask) yang mengembang dengan jeda, pakai CSS variable.
      // Nilai default CSS = terbuka penuh, jadi kalau JS gagal judul tetap terbaca.
      const ink = root.querySelector('[data-ink="hero"]')
      if (ink) {
        const blots = [
          { x: '--ink-x1', y: '--ink-y1', fx: '58%', fy: '95%', d: 0.1 },
          { x: '--ink-x2', y: '--ink-y2', fx: '48%', fy: '85%', d: 0.25 },
          { x: '--ink-x3', y: '--ink-y3', fx: '32%', fy: '70%', d: 0.4 },
        ]
        blots.forEach((b) => {
          gsap.set(ink, { [b.x]: '1.5%', [b.y]: '3%' })
          gsap.to(ink, {
            [b.x]: b.fx,
            [b.y]: b.fy,
            duration: 0.9,
            delay: b.d,
            ease: 'power2.inOut',
          })
        })
      }
    }, root)

    return () => ctx.revert()
  }, [ref])
}
