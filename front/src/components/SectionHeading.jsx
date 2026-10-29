import { motion, useReducedMotion } from 'framer-motion'

/** Judul section: kanji ornamen, judul serif, garis aksen vermilion. */
export default function SectionHeading({ kanji, title, kicker }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0.001, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mb-8 flex items-end gap-4"
    >
      <span aria-hidden="true" className="font-display text-4xl leading-none text-vermilion/25">
        {kanji}
      </span>
      <div>
        {kicker && (
          <p className="mb-1 text-[11px] tracking-[0.2em] uppercase text-kin">{kicker}</p>
        )}
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        <span className="mt-2 block h-0.5 w-10 bg-vermilion" />
      </div>
    </motion.div>
  )
}
