import Card from '../components/Card'
import Divider from '../components/Divider'
import SectionHeading from '../components/SectionHeading'
import profile from '../data/profile.json'

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
      <SectionHeading chapter={6} kanji="縁" title="Contact" kicker="Let's talk" />

      <div className="grid gap-4 md:grid-cols-3">
        <Card size={{ col: 2, row: 1 }} className="md:col-span-2">
          <p className="font-display text-2xl leading-snug">
            Open to backend and full-stack roles — remote or in {profile.location.split(',')[0]}.
          </p>
          <p className="mt-3 text-sm leading-loose text-sumi/70">
            The quickest way to reach me is email. I usually reply within a day.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-6 inline-flex max-w-full bg-vermilion px-5 py-2.5 text-sm font-medium text-paper break-all transition hover:opacity-90 active:scale-[0.98]"
          >
            {profile.email}
          </a>
        </Card>

        <Card size={{ col: 1, row: 1 }}>
          <p className="text-xs tracking-[0.2em] uppercase text-kin">Elsewhere</p>
          <Divider className="my-4" />
          <ul className="space-y-3 text-sm">
            {profile.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex justify-between transition-colors hover:text-vermilion"
                >
                  {s.label} <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  )
}
