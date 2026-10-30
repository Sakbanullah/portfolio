import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Stamp from './Stamp'
import ThemeToggle from './ThemeToggle'
import profile from '../data/profile.json'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-sumi/10 bg-washi/80 backdrop-blur-md">
      {/* Baris atas: nama, badge, toggle tema, hamburger. Maks 2 level: nama di kiri, kontrol di kanan. */}
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-6"
      >
        <a
          aria-label={profile.name}
          href="#top"
          onClick={() => setOpen(false)}
          className="min-w-0 truncate font-display text-base font-semibold tracking-tight sm:text-lg"
        >
          {profile.name}
        </a>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Badge ketersediaan: glyph saja di bawah sm; teksnya tetap ada untuk pembaca layar */}
          <Stamp
            glyph="職"
            label={profile.availability}
            className="hidden min-[480px]:inline-flex"
            labelClassName="hidden sm:inline"
          />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            className="grid size-9 shrink-0 place-items-center border border-sumi/25 transition hover:bg-sumi/5 active:scale-95  md:hidden"
          >
            <span aria-hidden="true">{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </nav>

      {/* Tablet & desktop: link horizontal di baris kedua; wrap natural, tidak pernah tumpang tindih */}
      <ul className="mx-auto hidden max-w-6xl flex-wrap items-center gap-x-6 gap-y-1 px-4 pb-3 text-sm sm:px-6 md:flex">
        {LINKS.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="text-sumi/70 transition-colors hover:text-vermilion">
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-sumi/10 md:hidden"
          >
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-6 py-3 text-sm text-sumi/80 hover:bg-sumi/5"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
