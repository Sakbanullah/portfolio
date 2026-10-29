import { motion, useReducedMotion } from 'framer-motion'
import Card from '../components/Card'
import SectionHeading from '../components/SectionHeading'
import profile from '../data/profile.json'

// Placeholder portrait dalam SVG — ganti dengan <img> saat foto asli siap.
function Portrait() {
  return (
    <svg viewBox="0 0 200 240" role="img" aria-label="Portrait placeholder" className="h-auto w-full">
      <rect width="200" height="240" rx="10" className="fill-washi" />
      <circle cx="100" cy="92" r="38" className="fill-sumi/20" />
      <path d="M32 240c0-42 30-72 68-72s68 30 68 72z" className="fill-sumi/20" />
      <circle cx="100" cy="92" r="38" className="fill-none stroke-sumi/25" strokeDasharray="3 4" />
    </svg>
  )
}

export default function About() {
  const reduce = useReducedMotion()

  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
      <SectionHeading kanji="人" title="About" kicker="The person behind the endpoints" />
      <div className="grid gap-4 md:grid-cols-3">
        <Card size={{ col: 1, row: 2 }} className="flex items-center justify-center">
          <div className="max-w-[220px] overflow-hidden rounded-lg ring-1 ring-sumi/10">
            <Portrait />
          </div>
        </Card>

        <Card size={{ col: 2, row: 1 }} className="md:col-span-2">
          <div className="space-y-4 text-sm leading-relaxed text-sumi/80">
            {profile.about.map((p, i) => (
              <motion.p
                key={i}
                initial={reduce ? false : { opacity: 0.001, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </Card>

        <Card size={{ col: 2, row: 1 }} className="md:col-span-2">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
            {profile.facts.map((f) => (
              <div key={f.label}>
                <dt className="text-[11px] tracking-[0.16em] uppercase text-kin">{f.label}</dt>
                <dd className="mt-1 text-sm">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>
    </section>
  )
}
