import { motion, useReducedMotion } from 'framer-motion'
import Card from '../components/Card'
import SectionHeading from '../components/SectionHeading'
import projects from '../data/projects.json'

export default function Projects() {
  const reduce = useReducedMotion()

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
      <SectionHeading kanji="作" title="Projects" kicker="Things I've built" />

      {/* Bento grid: ukuran tiap card dibaca dari field `size` di projects.json */}
      <div className="grid grid-cols-1 grid-flow-dense gap-4 sm:grid-cols-3 sm:auto-rows-[minmax(190px,auto)]">
        {projects.map((p, i) => (
          <Card key={p.title} as={motion.article} size={p.size}>
            <motion.div
              className="flex h-full flex-col"
              initial={reduce ? false : { opacity: 0.001, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.05 }}
            >
              {p.featured && (
                <span className="mb-2 w-fit text-[10px] tracking-[0.2em] uppercase text-vermilion">
                  Featured
                </span>
              )}
              <h3 className="font-display text-xl font-semibold leading-snug">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-sumi/70">{p.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <li key={s} className="rounded-full bg-sumi/[0.04] px-2.5 py-1 text-[11px] text-sumi/70">
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex gap-4 text-sm">
                {p.links?.repo && (
                  <a href={p.links.repo} target="_blank" rel="noreferrer" className="text-vermilion hover:underline">
                    Repository ↗
                  </a>
                )}
                {p.links?.demo && (
                  <a href={p.links.demo} target="_blank" rel="noreferrer" className="text-vermilion hover:underline">
                    Live demo ↗
                  </a>
                )}
              </div>
            </motion.div>
          </Card>
        ))}
      </div>
    </section>
  )
}
