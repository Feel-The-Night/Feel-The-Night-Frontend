import StartCard, { type StartCardContent } from './StartCard'
import styles from './Start.module.css'

/* Titles come from the Figma frame. Pass `image` once the original artwork is
   exported into src/assets/images. */
const cards: StartCardContent[] = [
  {
    id: 'select-your-character',
    title: 'Select your character',
    emphasis: 'strong',
  },
  { id: 'understand-your-power', title: 'Understand your power' },
  { id: 'defence-is-an-offence', title: 'Defence is an offence' },
  { id: 'get-out-of-jail', title: 'Get out of jail', emphasis: 'strong' },
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
