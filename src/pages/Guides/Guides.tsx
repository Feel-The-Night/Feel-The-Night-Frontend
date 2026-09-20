import GuideCard, { type Guide } from './GuideCard'
import styles from './Guides.module.css'

/** Sample rows drawn in the Figma file, kept in their original languages. */
const guides: Guide[] = [
  {
    title: 'Titulo muito manero do guia manero',
    tags: ['BNB', 'Midscreen', 'Setup'],
    author: 'kisalto | akaza | lucsa',
  },
  {
    title: 'Very cool title for a very cool guide',
    tags: ['All Around'],
    author: 'notfoxof',
  },
  {
    title: 'Título genial de la guía genial.',
    tags: ['Pressure', 'Mixup'],
    author: 'algum espanhol',
  },
  {
    title: 'クールなガイドのとてもクールなタイトル',
    tags: ['Optimize'],
    author: 'tsukibito',
  },
]

/** 24 character slots are drawn in the filter panel; the roster is not defined yet. */
const characterSlots = Array.from({ length: 24 }, (_, index) => index + 1)

export default function Guides() {
  return (
    <section className={styles.page}>
      <h1 className={styles.srOnly}>Guides</h1>

      <div className={styles.panel}>
        {/* Layout only - search, sorting and filtering are a separate issue. */}
        <div className={styles.toolbar}>
          <div className={styles.searchRow}>
            <input
              className={styles.search}
              type="search"
              placeholder="Search..."
              aria-label="Search guides"
            />
            <button className={styles.sort} type="button">
              Date
            </button>
          </div>

          <fieldset className={styles.filters}>
            <legend className={styles.srOnly}>Filter by character</legend>
            {characterSlots.map((slot) => (
              <button
                className={styles.characterSlot}
                key={slot}
                type="button"
                aria-label={`Character ${slot}`}
              />
            ))}
          </fieldset>
        </div>

        <ul className={styles.list}>
          {guides.map((guide) => (
            <li key={guide.title}>
              <GuideCard {...guide} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
