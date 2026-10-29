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

  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))]
}
