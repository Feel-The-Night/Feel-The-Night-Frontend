import { NavLink } from 'react-router-dom'

import { navItems, type NavItem } from '../../../routes/navigation'
import styles from './Header.module.css'

function getLinkClassName(item: NavItem, isActive: boolean): string {
  return [
    styles.link,
    item.accent ? styles.linkAccent : null,
    isActive ? styles.linkActive : null,
  ]
    .filter(Boolean)
    .join(' ')
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
                <NavLink
                  to={item.path}
                  className={({ isActive }) => getLinkClassName(item, isActive)}
                >
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
