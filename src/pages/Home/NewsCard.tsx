import Media from '../../components/ui/Media/Media'
import styles from './NewsCard.module.css'

export type NewsItem = {
  id: string
  name: string
  /** Lines printed on the featured card in the design. */
  tagline?: string
  date?: string
  time?: string
  channel?: string
  image?: string
}

type NewsCardProps = NewsItem & {
  variant?: 'featured' | 'compact'
}

export default function NewsCard({
  name,
  tagline,
  date,
  time,
  channel,
  image,
  variant = 'compact',
}: NewsCardProps) {
  const className = `${styles.card} ${variant === 'featured' ? styles.featured : styles.compact}`

  if (variant === 'compact') {
    /* The banner artwork carries the title, so no text is drawn on top of it.
       The name only shows while the artwork is missing. */
    return (
      <article className={className} aria-label={name}>
        <Media className={styles.media} image={image} alt={name} />
        {image ? null : <span className={styles.fallback}>{name}</span>}
      </article>
    )
  }

  return (
    <article className={className}>
      <Media className={styles.media} image={image} alt="" />
      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        {tagline ? <p className={styles.tagline}>{tagline}</p> : null}
        <div className={styles.when}>
          {date ? <p className={styles.date}>{date}</p> : null}
          {time ? <p className={styles.time}>{time}</p> : null}
        </div>
        {channel ? <p className={styles.channel}>{channel}</p> : null}
      </div>
    </article>
  )
}
