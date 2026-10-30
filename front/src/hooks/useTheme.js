import { useEffect, useState } from 'react'

// Tema awal: localStorage > preferensi sistem (sama dengan script di index.html).
function initial() {
  try {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
  } catch {
    /* localStorage bisa diblokir */
  }
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const prefersReduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches

export function useTheme() {
  const [theme, setTheme] = useState(initial)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* abaikan */
    }
  }, [theme])

  const toggle = () => {
    // Transisi warna halus: class .theme-fade di <html> dihapus setelah transisi selesai
    // (lihat aturan .theme-fade di index.css; mati untuk prefers-reduced-motion).
    if (!prefersReduced()) {
      document.documentElement.classList.add('theme-fade')
      setTimeout(() => document.documentElement.classList.remove('theme-fade'), 350)
    }
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  return [theme, toggle]
}
