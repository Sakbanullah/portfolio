import { useRef } from 'react'
import Navbar from './components/Navbar'
import ChapterNav from './components/ChapterNav'
import Divider from './components/Divider'
import Hero from './sections/Hero'
import About from './sections/About'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Contact from './sections/Contact'
import profile from './data/profile.json'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useScrollReveal } from './hooks/useScrollReveal'

// Satu halaman = satu gulungan: batang gulungan (roller) atas & bawah, enam bab berurutan.
export default function App() {
  const mainRef = useRef(null)
  useSmoothScroll()
  useScrollReveal(mainRef)

  return (
    <div className="mx-auto max-w-[72rem] px-0 sm:px-4">
      <div aria-hidden="true" className="roller mt-2 sm:mt-4" />
      <Navbar />
      <ChapterNav />
      <main ref={mainRef}>
        <Hero />
        <Divider className="mx-auto max-w-5xl px-6" />
        <About />
        <Divider className="mx-auto max-w-5xl px-6" />
        <Experience />
        <Divider className="mx-auto max-w-5xl px-6" />
        <Projects />
        <Divider className="mx-auto max-w-5xl px-6" />
        <Skills />
        <Divider className="mx-auto max-w-5xl px-6" />
        <Contact />
        <footer className="mt-4 border-t border-sumi/15 py-8 text-center text-xs text-sumi/50">
          © 2026 {profile.name} — built with React, Tailwind & Framer
        </footer>
      </main>
      <div aria-hidden="true" className="roller mb-2 sm:mb-4" />
    </div>
  )
}
