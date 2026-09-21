import type { MediaAsset } from '../../assets/media'
import Media from '../../components/ui/Media/Media'
import styles from './NewsCard.module.css'

export type NewsItem = {
  id: string
  name: string
  media: MediaAsset
  /** Lines printed on the featured card in the design. */
  tagline?: string
  date?: string
  time?: string
  channel?: string
}

type NewsCardProps = NewsItem & {
  variant?: 'featured' | 'compact'
}

export default function NewsCard({
  name,
  media,
  tagline,
  date,
  time,
  channel,
  variant = 'compact',
}: NewsCardProps) {
  if (variant === 'compact') {
    /* The banner artwork carries the title, so no text is drawn over it. The
       name only shows while the artwork is missing. */
    return (
      <article className={`${styles.card} ${styles.compact}`}>
        <Media className={styles.media} asset={media} alt={name} fill />
        <span className={styles.fallback} aria-hidden="true">
          {name}
        </span>
      </article>
    )
  }

  return (
    <article className={`${styles.card} ${styles.featured}`}>
      <Media
        className={styles.media}
        asset={media}
        alt=""
        overlay="center"
        fill
      />
      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        {tagline ? <p className={styles.tagline}>{tagline}</p> : null}
        <div className={styles.when}>
          {date ? <p className={styles.date}>{date}</p> : null}
          {time ? (
            <p className={styles.time}>
              <time>{time}</time>
            </p>
          ) : null}
        </div>
        {channel ? <p className={styles.channel}>{channel}</p> : null}
      </div>
    </article>
  )
}
