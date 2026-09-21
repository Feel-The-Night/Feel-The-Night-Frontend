import type { MediaAsset } from '../../assets/media'
import Media from '../../components/ui/Media/Media'
import styles from './StartCard.module.css'

export type StartCardContent = {
  id: string
  title: string
  media: MediaAsset
  /** Cards 01 and 04 carry a heavier red treatment. */
  emphasis?: 'default' | 'strong'
}

export default function StartCard({
  title,
  media,
  emphasis = 'default',
}: StartCardContent) {
  return (
    <article className={styles.card}>
      <Media
        className={styles.media}
        asset={media}
        alt=""
        overlay="center"
        tint={emphasis === 'strong' ? 'strong' : 'soft'}
        fill
      />
      <h2 className={styles.title}>{title}</h2>
    </article>
  )
}
