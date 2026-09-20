import styles from './NewsCard.module.css'

type NewsCardProps = {
  /** Name of the news item, taken from the Figma layer. */
  name: string
  /** Artwork exported from Figma. See src/assets/README.md. */
  image?: string
  variant?: 'featured' | 'compact'
}

export default function NewsCard({
  name,
  image,
  variant = 'compact',
}: NewsCardProps) {
  const className = `${styles.card} ${variant === 'featured' ? styles.featured : styles.compact}`

  return (
    <article className={className}>
      {image ? (
        <img className={styles.image} src={image} alt={name} />
      ) : (
        <span className={styles.name}>{name}</span>
      )}
    </article>
  )
}
