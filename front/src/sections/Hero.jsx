import Card from '../components/Card'
import Stamp from '../components/Stamp'
import profile from '../data/profile.json'

/**
 * Bab 1 — pembuka gulungan. Gulungan "terbuka" sekali saat halaman dimuat
 * (clip-path lewat .hero-unroll di index.css; mati untuk reduced motion).
 * Judul bergaya ink reveal: mask default CSS sudah terbuka, jadi tanpa JS/motion tetap terbaca.
 */
export default function Hero() {
  return (
    <section id="top" className="hero-unroll relative overflow-hidden">
      {/* Kanji besar sebagai ornamen latar; data-reveal="kanji": parallax ScrollTrigger. */}
      <div
        aria-hidden="true"
        data-reveal="kanji"
        className="pointer-events-none absolute -top-10 right-0 select-none font-display text-[26vw] leading-none text-sumi/[0.05]"
      >
        {profile.kanji}
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-4 px-4 pt-14 pb-14 sm:px-6 md:grid-cols-3">
        <Card size={{ col: 2, row: 2 }} className="md:col-span-2">
          <div>
            <Stamp glyph="印" label={profile.availability} />
          </div>
          {/* data-ink="hero": ink reveal GSAP (useScrollReveal). Sengaja tanpa framer-motion. */}
          <h1
            data-ink="hero"
            className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight xs:text-5xl sm:text-6xl"
          >
            {profile.name}
          </h1>
          <p className="mt-3 text-xs tracking-[0.14em] uppercase text-vermilion sm:text-sm sm:tracking-[0.18em]">
            {profile.role} <span className="text-sumi/40">→</span> {profile.targetRole}
          </p>
          <p className="mt-5 max-w-xl text-base leading-loose text-sumi/80">{profile.tagline}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="bg-vermilion px-5 py-2.5 text-sm font-medium text-paper transition hover:opacity-90 active:scale-[0.98]"
            >
              View projects
            </a>
            <a
              href="#contact"
              className="border border-sumi/30 px-5 py-2.5 text-sm font-medium transition hover:bg-sumi/5 active:scale-[0.98]"
            >
              Get in touch
            </a>
          </div>
        </Card>

        <Card size={{ col: 1, row: 1 }} className="hidden md:block">
          <p className="text-xs tracking-[0.2em] uppercase text-kin">Currently</p>
          <p className="mt-2 font-display text-lg">Shipping APIs in Go</p>
          <p className="mt-auto text-xs text-sumi/50">{profile.location}</p>
        </Card>
        <Card size={{ col: 1, row: 1 }} className="hidden md:block">
          <p className="text-xs tracking-[0.2em] uppercase text-kin">Learning</p>
          <p className="mt-2 font-display text-lg">React & interface design</p>
          <p className="mt-auto text-xs text-sumi/50">Full stack, patiently.</p>
        </Card>
      </div>
    </section>
  )
}
