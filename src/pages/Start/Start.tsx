import StartCard from './StartCard'
import styles from './Start.module.css'

const cards = [
  { title: 'Select your\ncharacter' },
  { title: 'Understand your\npower' },
  { title: 'Defence is\nan offence' },
  { title: 'Get out of jail' },
]

export default function Start() {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>survive the night</h1>
      <hr className={styles.divider} />
      <ul className={styles.grid}>
        {cards.map((card) => (
          <li key={card.title}>
            <StartCard title={card.title} />
          </li>
        ))}
      </ul>
    </section>
  )
}
