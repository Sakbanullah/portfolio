import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { getLenis } from '../hooks/useSmoothScroll'
import Divider from '../components/Divider'

// Label kecil, tampilan sama dengan panel "Why this?" di card.
function Label({ children }) {
  return <p className="text-xs tracking-[0.16em] uppercase text-kin">{children}</p>
}

/**
 * Detail project sebagai lightbox (role="dialog"). Dibuka dari card Projects.
 * - Esc / tombol tutup / klik latar menutup.
 * - Fokus keyboard: ditangkap di dalam dialog (Tab trap), dikembalikan ke elemen pemicu saat tutup.
 * - Saat Lenis aktif: scroll di belakang modal dihentikan (lenis.stop()); fallback: overflow hidden.
 */
export default function ProjectDetail({ project, onClose, reduce = false }) {
  const ref = useRef(null)

  useEffect(() => {
    const prev = document.activeElement
    const el = ref.current
    // Fokus awal di tombol tutup — berikutnya Tab bergerak ke konten dialog.
    el?.querySelector('[data-autofocus]')?.focus()

    const lenis = getLenis()
    if (lenis) lenis.stop()
    else document.documentElement.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const focusable = el.querySelectorAll('a[href], button:not([disabled])')
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      if (lenis) lenis.start()
      else document.documentElement.style.overflow = ''
      // Kembalikan fokus ke element terakhir sebelum dialog dibuka (tetangga card).
      prev?.focus?.()
    }
  }, [onClose])

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduce ? undefined : { opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-60 grid place-items-center p-4"
    >
      {/* Latar: klik menutup; tidak menerima fokus (Esc & tombol tutup jadi jalur keyboard) */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-sumi/50 backdrop-blur-sm"
      />

      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        initial={reduce ? false : { opacity: 0.001, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? undefined : { opacity: 0.001, y: 16, scale: 0.97 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="relative max-h-[85vh] w-full max-w-xl overflow-y-auto paper-cut border border-sumi/25 p-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] sm:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            {project.featured && (
              <span className="mb-2 w-fit border border-vermilion/60 px-1.5 py-0.5 text-[10px] tracking-[0.2em] uppercase text-vermilion">
                Featured
              </span>
            )}
            <h3 className="font-display text-xl font-semibold leading-snug sm:text-2xl">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-loose text-sumi/70">{project.summary}</p>
          </div>
          <button
            type="button"
            data-autofocus
            onClick={onClose}
            aria-label="Close details"
            className="grid size-8 shrink-0 place-items-center border border-sumi/25 transition hover:bg-sumi/5 active:scale-90"
          >
            ✕
          </button>
        </div>

        <Divider className="my-4" />

        <div className="space-y-4 text-sm leading-loose">
          <div>
            <Label>Problem</Label>
            <p className="mt-1 text-sumi/80">{project.problem}</p>
          </div>
          <div>
            <Label>Technical choices</Label>
            {project.rationale?.why && (
              <p className="mt-1 text-sumi/60 italic">{project.rationale.why}</p>
            )}
            <ul className="mt-2 space-y-2">
              {project.rationale?.decisions?.map((d) => (
                <li key={d.choice}>
                  <span className="font-medium text-sumi">{d.choice}</span>
                  <span className="text-sumi/70"> — {d.reason}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Label>Impact</Label>
            <p className="mt-1 text-sumi/80">{project.impact}</p>
          </div>
        </div>

        <div className="mt-5">
          <ul className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <li
                key={s}
                className="border border-sumi/20 px-2.5 py-1 text-xs text-sumi/70"
              >
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-3 flex gap-4 text-sm">
            {project.links?.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noreferrer"
                className="text-vermilion hover:underline"
              >
                Repository ↗
              </a>
            )}
            {project.links?.demo && (
              <a
                href={project.links.demo}
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
    </motion.div>
  )
}
