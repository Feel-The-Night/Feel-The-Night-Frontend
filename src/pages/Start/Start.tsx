import { startMedia } from '../../assets/media'
import StartCard, { type StartCardContent } from './StartCard'
import styles from './Start.module.css'

/* Titles come from the design file. The artwork arrives through
   src/assets/media.ts - see src/assets/README.md. */
const cards: StartCardContent[] = [
  {
    id: 'select-your-character',
    title: 'Select your character',
    media: startMedia.selectYourCharacter,
    emphasis: 'strong',
  },
  {
    id: 'understand-your-power',
    title: 'Understand your power',
    media: startMedia.understandYourPower,
  },
  {
    id: 'defence-is-an-offence',
    title: 'Defence is an offence',
    media: startMedia.defenceIsAnOffence,
  },
  {
    id: 'get-out-of-jail',
    title: 'Get out of jail',
    media: startMedia.getOutOfJail,
    emphasis: 'strong',
  },
]

export default function Start() {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Survive the night</h1>
      <hr className={styles.divider} />

      <ul className={styles.grid}>
        {cards.map((card) => (
          <li key={card.id}>
            <StartCard {...card} />
          </li>
        ))}
      </ul>
    </section>
  )
}
