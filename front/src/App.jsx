import Navbar from './components/Navbar'
import Divider from './components/Divider'
import Hero from './sections/Hero'
import About from './sections/About'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Contact from './sections/Contact'
import profile from './data/profile.json'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Divider className="mx-auto max-w-5xl px-6" />
        <Experience />
        <Divider className="mx-auto max-w-5xl px-6" />
        <Projects />
        <Divider className="mx-auto max-w-5xl px-6" />
        <Skills />
        <Contact />
      </main>
      <footer className="border-t border-sumi/10 py-8 text-center text-xs text-sumi/50">
        © 2026 {profile.name} — built with React, Tailwind & Framer Motion.
      </footer>
    </>
  )
}
