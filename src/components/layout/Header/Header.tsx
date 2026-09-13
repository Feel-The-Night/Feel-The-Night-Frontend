import { NavLink } from 'react-router-dom'

import { navItems } from '../../../routes/navigation'
import styles from './Header.module.css'

function navLinkClassName({ isActive }: { isActive: boolean }): string {
  return isActive ? `${styles.link} ${styles.linkActive}` : styles.link
}

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.wordmark}>
          Feel The Night
        </NavLink>

        <nav aria-label="Main">
          <ul className={styles.list}>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} className={navLinkClassName}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
