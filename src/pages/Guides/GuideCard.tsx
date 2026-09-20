import styles from './GuideCard.module.css'

export type Guide = {
  title: string
  tags: string[]
  author: string
  /** Character thumbnail exported from Figma. See src/assets/README.md. */
  thumbnail?: string
}

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
