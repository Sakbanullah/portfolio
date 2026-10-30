import Card from '../components/Card'
import Divider from '../components/Divider'
import SectionHeading from '../components/SectionHeading'
import skills from '../data/skills.json'

/**
 * Skill ditampilkan sebagai chip, tanpa angka/bar — menghindari klaim kuantitatif
 * yang tidak bisa diukur. Urutan dalam JSON = prioritas.
 */
export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
      <SectionHeading chapter={5} kanji="技" title="Skills" kicker="Tools of the trade" />

      <div className="grid gap-4 sm:grid-cols-2">
        {skills.map((group) => (
          <Card key={group.category} size={{ col: 1, row: 1 }}>
            <div className="mb-3 flex items-center gap-3">
              <span aria-hidden="true" className="font-display text-2xl text-kin/60">
                {group.kanji}
              </span>
              <h3 className="text-sm tracking-[0.16em] uppercase">{group.category}</h3>
            </div>
            <Divider className="mb-4" />
            <ul className="flex flex-wrap gap-2">
              {group.items.map((s) => (
                <li
                  key={s.name}
                  className="border border-sumi/20 px-3 py-1 text-sm text-sumi/80 transition-colors hover:border-vermilion/60 hover:text-sumi"
                >
                  {s.name}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  )
}
