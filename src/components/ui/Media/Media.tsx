import type { CSSProperties } from 'react'

import type { MediaAsset } from '../../../assets/media'
import styles from './Media.module.css'

export type MediaOverlay = 'none' | 'scrim' | 'bottom' | 'left' | 'center'

type MediaProps = {
  /** Slot description from src/assets/media.ts. */
  asset: MediaAsset
  /** Overrides the asset's alt, e.g. when the caller knows the subject. */
  alt?: string
  /** Readability wash drawn over the artwork. */
  overlay?: MediaOverlay
  /** Red tint strength on top of the overlay. */
  tint?: 'none' | 'soft' | 'strong'
  /** Absolutely fills the nearest positioned ancestor (card backgrounds). */
  fill?: boolean
  className?: string
}

const overlayClass: Record<MediaOverlay, string | null> = {
  none: null,
  scrim: styles.overlayScrim,
  bottom: styles.overlayBottom,
  left: styles.overlayLeft,
  center: styles.overlayCenter,
}

/**
 * Image slot. Renders the artwork when the asset has a file and an intentional
 * placeholder surface while it does not, so the layout never shifts.
 */
export default function Media({
  asset,
  alt,
  overlay = 'none',
  tint = 'none',
  fill = false,
  className,
}: MediaProps) {
  const label = alt ?? asset.alt
  const ratio = `${asset.width} / ${asset.height}`
  const imageStyle: CSSProperties = {
    objectFit: asset.fit ?? 'cover',
    objectPosition: asset.position ?? 'center',
    aspectRatio: ratio,
  }

  const classes = [
    styles.media,
    fill ? styles.fill : null,
    overlayClass[overlay],
    tint === 'soft' ? styles.tintSoft : null,
    tint === 'strong' ? styles.tintStrong : null,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (asset.src) {
    return (
      <span className={classes}>
        <img
          className={styles.image}
          src={asset.src}
          alt={label}
          width={asset.width}
          height={asset.height}
          style={imageStyle}
          loading="lazy"
          decoding="async"
        />
      </span>
    )
  }

  return (
    <span
      className={`${classes} ${styles.empty}`}
      style={{ aspectRatio: ratio }}
      role={label ? 'img' : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
    />
  )
}
