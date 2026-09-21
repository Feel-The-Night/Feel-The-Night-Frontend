import { charactersMedia } from '../../assets/media'
import Media from '../../components/ui/Media/Media'
import styles from './Characters.module.css'

/* The roster is not in the project yet. The grid matches the two rows of
   twelve portraits in the approved design; fill `image` and `name` per slot
   once the portraits are exported. */
const slots = Array.from({ length: 24 }, (_, index) => ({
  id: `slot-${index + 1}`,
  position: index + 1,
}))

export default function Characters() {
  return (
    <section className={styles.page}>
      <div className={styles.timer}>
        <p className={styles.timerLabel}>Time limit</p>
        <p className={styles.timerValue} aria-label="No time limit">
          &#8734;
        </p>
      </div>

      <header className={styles.header}>
        <span className={styles.player}>Player 1</span>
        <div className={styles.titleBlock}>
          <p className={styles.game}>Under Night In-Birth II Sys:Celes</p>
          <h1 className={styles.title}>Character select</h1>
        </div>
        <span className={styles.player}>Player 2</span>
      </header>

      <hr className={styles.divider} />

      <ul className={styles.grid}>
        {slots.map((slot) => (
          <li key={slot.id}>
            <button
              className={styles.portrait}
              type="button"
              aria-label={`Character slot ${slot.position}`}
            >
              <Media
                className={styles.portraitMedia}
                asset={charactersMedia.portrait}
                alt=""
              />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
