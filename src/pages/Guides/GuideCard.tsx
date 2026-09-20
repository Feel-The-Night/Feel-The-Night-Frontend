import type { Guide } from './guides.data'
import styles from './GuideCard.module.css'

export default function GuideCard({ title, tags, author, thumbnail }: Guide) {
  return (
    <article className={styles.card}>
      <div className={styles.thumbnail}>
        {thumbnail ? (
          <img className={styles.thumbnailImage} src={thumbnail} alt="" />
        ) : null}
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.tags}>{tags.join(' | ')}</p>
        <p className={styles.author}>{author}</p>
      </div>
    </article>
  )
}
