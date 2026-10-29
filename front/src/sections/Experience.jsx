import { motion, useReducedMotion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading'
import experience from '../data/experience.json'

export default function Experience() {
  const reduce = useReducedMotion()

  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
      <SectionHeading kanji="歴" title="Experience" kicker="Where the work happened" />

      <ol className="relative ml-3 border-l border-sumi/15 pl-6 sm:ml-4 sm:pl-8">
        {experience.map((job, i) => (
          <motion.li
            key={`${job.company}-${job.period}`}
            initial={reduce ? false : { opacity: 0.001 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="relative pb-10 last:pb-0"
          >
            {/* Node garis ganda di timeline */}
            <span
              aria-hidden="true"
              className="absolute -left-[calc(1.5rem+6px)] top-1.5 size-2.5 rotate-45 border border-vermilion bg-washi sm:-left-[calc(2rem+6px)]"
            />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-xl font-semibold">{job.role}</h3>
              <span className="text-xs tracking-[0.12em] uppercase text-kin">{job.period}</span>
            </div>
            <p className="mt-0.5 text-sm text-vermilion">{job.company}</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-sumi/75">
              {job.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span aria-hidden="true" className="mt-2 size-1 shrink-0 bg-sumi/30" />
                  {b}
                </li>
              ))}
            </ul>
            <ul className="mt-3 flex flex-wrap gap-2">
              {job.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full px-2.5 py-1 text-[11px] ring-1 ring-sumi/15 text-sumi/70"
                >
                  {s}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}
