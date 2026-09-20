import Media from '../../components/ui/Media/Media'
import styles from './StartCard.module.css'

export type StartCardContent = {
  id: string
  title: string
  /** Original Figma artwork. See src/assets/README.md. */
  image?: string
  /** Cards 01 and 04 carry a heavier red treatment. */
  emphasis?: 'default' | 'strong'
}

export default function StartCard({
  title,
  image,
  emphasis = 'default',
}: StartCardContent) {
  const className = [
    styles.card,
    emphasis === 'strong' ? styles.strong : null,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <article className={className}>
      <Media className={styles.media} image={image} alt="" />
      <div className={styles.overlay}>
        <h2 className={styles.title}>{title}</h2>
      </div>
    </article>
  )
}
