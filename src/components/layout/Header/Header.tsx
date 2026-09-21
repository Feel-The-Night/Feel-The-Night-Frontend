import { useId, useState } from 'react'
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
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const closeMenu = () => setOpen(false)

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.wordmark} onClick={closeMenu}>
          Feel The Night
        </NavLink>

        <button
          className={styles.toggle}
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Close' : 'Menu'}
        </button>

        <nav
          aria-label="Main"
          className={`${styles.nav} ${open ? styles.navOpen : ''}`}
          id={menuId}
        >
          <ul className={styles.list}>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => getLinkClassName(item, isActive)}
                  onClick={closeMenu}
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
