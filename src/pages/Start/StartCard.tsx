import styles from './StartCard.module.css'

type StartCardProps = {
  /** Card heading. Line breaks are preserved, matching the Figma layout. */
  title: string
  /** Background image imported from src/assets. See src/assets/README.md. */
  image?: string
}

export default function StartCard({ title, image }: StartCardProps) {
  return (
    <article
      className={styles.card}
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      <h2 className={styles.title}>{title}</h2>
    </article>
  )
}
