import type { MediaAsset } from '../../assets/media'
import Media from '../../components/ui/Media/Media'
import styles from './CommunityCard.module.css'

export type CommunityEntry = {
  id: string
  name: string
  /** Server: member counts. Social: the account handle. */
  meta: string
  media: MediaAsset
}

type CommunityCardProps = CommunityEntry & {
  variant?: 'server' | 'social'
}

export default function CommunityCard({
  name,
  meta,
  media,
  variant = 'server',
}: CommunityCardProps) {
  if (variant === 'social') {
    return (
      <article className={styles.social}>
        <Media className={styles.preview} asset={media} alt="" />
        <div className={styles.socialBody}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.meta}>{meta}</p>
        </div>
      </article>
    )
  }

  return (
    <article className={styles.server}>
      <p className={styles.invite}>You have been invited to join a server</p>
      <div className={styles.serverRow}>
        <Media className={styles.avatar} asset={media} alt="" />
        <div className={styles.serverBody}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.meta}>{meta}</p>
        </div>
        <span className={styles.join}>Join</span>
      </div>
    </article>
  )
}
