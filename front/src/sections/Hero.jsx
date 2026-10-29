import { motion, useReducedMotion } from 'framer-motion'
import Card from '../components/Card'
import Stamp from '../components/Stamp'
import profile from '../data/profile.json'

export default function Hero() {
  const reduce = useReducedMotion()
  // Helper: animasi muncul saat scroll; mati jika prefers-reduced-motion.
  const rise = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0.001, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  })

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Tekstur seigaiha tipis + kanji besar sebagai ornamen latar */}
      <div aria-hidden="true" className="seigaiha pointer-events-none absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 right-0 select-none font-display text-[26vw] leading-none text-sumi/[0.04]"
      >
        {profile.kanji}
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-4 px-4 pt-16 pb-14 sm:px-6 md:grid-cols-3">
        <Card size={{ col: 2, row: 2 }} className="md:col-span-2">
          <motion.div {...rise()}>
            <Stamp glyph="印" label={profile.availability} />
          </motion.div>
          <motion.h1
            {...rise(0.05)}
            className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl"
          >
            {profile.name}
          </motion.h1>
          <motion.p {...rise(0.1)} className="mt-3 text-sm tracking-[0.18em] uppercase text-vermilion">
            {profile.role} <span className="text-sumi/40">→</span> {profile.targetRole}
          </motion.p>
          <motion.p {...rise(0.15)} className="mt-5 max-w-xl text-base leading-relaxed text-sumi/75">
            {profile.tagline}
          </motion.p>
          <motion.div {...rise(0.2)} className="mt-7 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-full bg-vermilion px-5 py-2.5 text-sm font-medium text-[#faf6ee] transition hover:opacity-90"
            >
              View projects
            </a>
            <a
              href="#contact"
              className="rounded-full px-5 py-2.5 text-sm font-medium ring-1 ring-sumi/25 transition hover:bg-sumi/5"
            >
              Get in touch
            </a>
          </motion.div>
        </Card>

        <Card size={{ col: 1, row: 1 }} className="hidden md:block">
          <p className="text-[11px] tracking-[0.2em] uppercase text-kin">Currently</p>
          <p className="mt-2 font-display text-lg">Shipping APIs in Go</p>
          <p className="mt-auto text-xs text-sumi/50">{profile.location}</p>
        </Card>
        <Card size={{ col: 1, row: 1 }} className="hidden md:block">
          <p className="text-[11px] tracking-[0.2em] uppercase text-kin">Learning</p>
          <p className="mt-2 font-display text-lg">React & interface design</p>
          <p className="mt-auto text-xs text-sumi/50">Full stack, patiently.</p>
        </Card>
      </div>
    </section>
  )
}
