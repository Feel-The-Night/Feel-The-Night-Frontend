import styles from './Media.module.css'

type MediaProps = {
  /** Artwork exported into src/assets/images. Omit while it is missing. */
  image?: string
  /** Empty string for decorative artwork. */
  alt?: string
  className?: string
}

/**
 * Image slot used across the site. Renders the artwork when it exists and a
 * neutral placeholder surface while it does not, so layouts hold their shape.
 */
export default function Media({ image, alt = '', className }: MediaProps) {
  const combined = [styles.media, className].filter(Boolean).join(' ')

  if (image) {
    return <img className={combined} src={image} alt={alt} />
  }

  return <div className={`${combined} ${styles.empty}`} aria-hidden="true" />
}
