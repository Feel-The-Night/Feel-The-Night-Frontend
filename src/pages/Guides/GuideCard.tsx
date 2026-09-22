import { guidesMedia } from '../../assets/media'
import Media from '../../components/ui/Media/Media'
import type { Guide } from './guides.data'
import styles from './GuideCard.module.css'

export default function GuideCard({ title, tags, author, thumbnail }: Guide) {
  const asset = thumbnail
    ? { ...guidesMedia.thumbnail, src: thumbnail }
    : guidesMedia.thumbnail

  return (
    <article className={styles.card}>
      <Media className={styles.thumbnail} asset={asset} alt="" />

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.tags}>{tags.join(' | ')}</p>
        <p className={styles.author}>{author}</p>
      </div>
    </article>
  )
}
