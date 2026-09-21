import Media from '../../components/ui/Media/Media'
import { statusLabels, type CommunityEvent } from './events.data'
import styles from './EventCard.module.css'

export default function EventCard({
  name,
  date,
  time,
  type,
  mode,
  status,
  media,
}: CommunityEvent) {
  return (
    <article className={styles.card}>
      <div className={styles.banner}>
        <Media className={styles.bannerMedia} asset={media} alt="" />
        <span className={`${styles.status} ${styles[status]}`}>
          {statusLabels[status]}
        </span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.when}>
          {date} &middot; {time}
        </p>
        <p className={styles.meta}>
          {type} &middot; {mode === 'online' ? 'Online' : 'Offline'}
        </p>
      </div>
    </article>
  )
}
