import Media from '../../components/ui/Media/Media'
import styles from './CommunityCard.module.css'

export type CommunityEntry = {
  id: string
  name: string
  /** Server: member counts. Social: the account handle. */
  meta: string
  image?: string
}

type CommunityCardProps = CommunityEntry & {
  variant?: 'server' | 'social'
}

export default function CommunityCard({
  name,
  meta,
  image,
  variant = 'server',
}: CommunityCardProps) {
  if (variant === 'social') {
    return (
      <article className={styles.social}>
        <div className={styles.preview}>
          <Media image={image} alt="" />
        </div>
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
        <div className={styles.avatar}>
          <Media image={image} alt="" />
        </div>
        <div className={styles.serverBody}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.meta}>{meta}</p>
        </div>
        <span className={styles.join}>Join</span>
      </div>
    </article>
  )
}
