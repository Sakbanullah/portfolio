import { motion, useReducedMotion } from 'framer-motion'
import Card from '../components/Card'
import SectionHeading from '../components/SectionHeading'
import skills from '../data/skills.json'

export default function Skills() {
  const reduce = useReducedMotion()

  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
      <SectionHeading kanji="技" title="Skills" kicker="Tools of the trade" />

      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((group) => (
          <Card key={group.category} size={{ col: 1, row: 1 }}>
            <div className="mb-4 flex items-center gap-3">
              <span aria-hidden="true" className="font-display text-2xl text-kin/60">
                {group.kanji}
              </span>
              <h3 className="text-sm tracking-[0.16em] uppercase">{group.category}</h3>
            </div>
            <ul className="space-y-3">
              {group.items.map((s) => (
                <li key={s.name}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>{s.name}</span>
                    <span className="text-xs text-sumi/45">{s.level}%</span>
                  </div>
                  {/* Bar tipis: lebar mengikuti level (0–100) */}
                  <div className="h-1 overflow-hidden rounded-full bg-sumi/10">
                    <motion.div
                      className="h-full bg-gradient-to-r from-vermilion to-kin"
                      initial={reduce ? { width: `${s.level}%` } : { width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  )
}
