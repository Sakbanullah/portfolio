import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Card from '../components/Card'
import Divider from '../components/Divider'
import SectionHeading from '../components/SectionHeading'
import ProjectDetail from './ProjectDetail'
import projects from '../data/projects.json'

// Label kecil khas section ini (Problem / Technical choices / Impact).
function Label({ children }) {
  return <p className="text-xs tracking-[0.16em] uppercase text-kin">{children}</p>
}

export default function Projects() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(null)
  // Detail lightbox: index project yang terbuka, null = tertutup.
  const [detail, setDetail] = useState(null)

  // Klik di area card membuka detail — kecuali target-nya elemen interaktif di dalam card
  // (tombol "Why this?", link repo/demo). Keyboard memakai tombol judul.
  const openDetail = (i, e) => {
    if (e && e.target.closest('a, button')) return
    setDetail(i)
  }

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
      <SectionHeading chapter={4} kanji="作" title="Projects" kicker="Things I've built" />

      {/* Bento grid: ukuran tiap card dibaca dari field `size` di projects.json.
          data-reveal: jangan diubah — dipakai parallax ScrollTrigger di App.jsx. */}
      <div
        data-reveal="projects-grid"
        className="grid grid-cols-1 grid-flow-dense gap-4 sm:grid-cols-3 sm:auto-rows-[minmax(190px,auto)]">
        {projects.map((p, i) => {
          const isOpen = open === i
          return (
            <Card
              key={p.title}
              as={motion.article}
              size={p.size}
              onClick={(e) => openDetail(i, e)}
              className="cursor-pointer"
            >
              <motion.div
                className="flex h-full flex-col"
                initial={reduce ? false : { opacity: 0.001, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.05 }}
              >
                {p.featured && (
                  <span className="mb-2 w-fit border border-vermilion/60 px-1.5 py-0.5 text-[10px] tracking-[0.2em] uppercase text-vermilion">
                    Featured
                  </span>
                )}
                <h3 className="font-display text-lg font-semibold leading-snug sm:text-xl">
                  {/* Tombol judul: jalur keyboard untuk membuka detail lightbox */}
                  <button
                    type="button"
                    onClick={() => setDetail(i)}
                    aria-haspopup="dialog"
                    className="text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vermilion"
                  >
                    {p.title}
                  </button>
                </h3>
                <p className="mt-2 text-sm leading-loose text-sumi/70">{p.summary}</p>

                {/* Tombol pembuka proses berpikir; satu card terbuka sekaligus */}
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`why-${i}`}
                  className="mt-3 w-fit text-sm text-vermilion transition hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vermilion"
                >
                  Why this? {isOpen ? '▴' : '▾'}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`why-${i}`}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <Divider className="my-4" />
                      <div className="space-y-4 text-sm leading-loose">
                        <div>
                          <Label>Problem</Label>
                          <p className="mt-1 text-sumi/80">{p.problem}</p>
                        </div>
                        <div>
                          <Label>Technical choices</Label>
                          {p.rationale?.why && (
                            <p className="mt-1 text-sumi/60 italic">{p.rationale.why}</p>
                          )}
                          <ul className="mt-2 space-y-2">
                            {p.rationale?.decisions?.map((d) => (
                              <li key={d.choice}>
                                <span className="font-medium text-sumi">{d.choice}</span>
                                <span className="text-sumi/70"> — {d.reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <Label>Impact</Label>
                          <p className="mt-1 text-sumi/80">{p.impact}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-auto pt-4">
                  <ul className="flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <li
                        key={s}
                        className="border border-sumi/20 px-2.5 py-1 text-xs text-sumi/70"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 flex gap-4 text-sm">
                    {p.links?.repo && (
                      <a
                        href={p.links.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-vermilion hover:underline"
                      >
                        Repository ↗
                      </a>
                    )}
                    {p.links?.demo && (
                      <a
                        href={p.links.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="text-vermilion hover:underline"
                      >
                        Live demo ↗
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </Card>
          )
        })}
      </div>

      {/* Detail lightbox (fokus dikelola, Esc menutup); reduce motion → muncul instan */}
      <AnimatePresence>
        {detail !== null && (
          <ProjectDetail project={projects[detail]} onClose={() => setDetail(null)} reduce={reduce} />
        )}
      </AnimatePresence>
    </section>
  )
}
