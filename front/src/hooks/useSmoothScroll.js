import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import 'lenis/dist/lenis.css'

const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches

// Lenis merender scroll ke transform (class .lenis-scroll), jadi getBoundingClientRect()
// ikut bergeser saat animasi berjalan → handling anchor bawaannya berhenti meleset.
// Offset anchor diambil dari posisi layout (offsetTop), bukan rect.
function scrollToHash(hash) {
  const el = hash.length > 1 && document.querySelector(hash)
  if (!el) return false
  const nav = document.querySelector('header')?.offsetHeight ?? 0
  return Math.max(0, el.offsetTop - nav - 8)
}

// Smooth scroll global, disetir ticker GSAP (satu rAF loop untuk semua).
// Mati total saat prefers-reduced-motion; anchor tetap jalan lewat scroll-behavior CSS.

// Instance Lenis aktif, dipakai modal (ProjectDetail) untuk stop/start scroll di belakang latar.
let activeLenis = null
export function getLenis() {
  return activeLenis
}

export function useSmoothScroll() {
  useEffect(() => {
    if (reduceMotion()) return

    const lenis = new Lenis()
    activeLenis = lenis
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Posisi target dihitung ulang sekali setelah handler React selesai: tinggi navbar
    // berubah saat menu mobile menutup, jadi hitungan di momen klik bisa meleset.
    let lastHash = null
    const settle = () => {
      if (!lastHash) return
      const y = scrollToHash(lastHash)
      lastHash = null
      if (y !== false) lenis.scrollTo(y)
    }
    const onClick = (e) => {
      // Hanya anchor di halaman ini; posisi dihitung manual (lihat scrollToHash).
      const a = e.composedPath().find((n) => n instanceof HTMLAnchorElement && n.hash)
      if (!a || a.origin !== location.origin || a.pathname !== location.pathname) return
      if (scrollToHash(a.hash) === false) return
      e.preventDefault()
      lastHash = a.hash
      lenis.scrollTo(scrollToHash(a.hash))
      setTimeout(settle, 0)
    }
    document.addEventListener('click', onClick)

    // Pengguna menyalakan reduced motion saat halaman terbuka: reload sekali agar
    // semua efek (Lenis + ScrollTrigger) mati bersih tanpa state campuran.
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    const reload = () => location.reload()
    media.addEventListener('change', reload)

    return () => {
      media.removeEventListener('change', reload)
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(tick)
      activeLenis = null
      lenis.destroy()
    }
  }, [])
}
