import { useId, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

import styles from './AdminLayout.module.css'

/**
 * Administration shell.
 *
 * The panel is intentionally not linked from the public navigation and is not
 * protected: there is no authentication yet. The backend must enforce every
 * administrative permission - frontend route guards are UX only.
 */

const sections = [
  { label: 'Dashboard', path: '/admin', end: true },
  { label: 'Users', path: '/admin/users', end: false },
]

export default function AdminLayout() {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const closeMenu = () => setOpen(false)

  return (
    <div className={styles.shell}>
      <a className="skip-link" href="#admin-main">
        Skip to content
      </a>

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <button
            className={styles.toggle}
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? 'Close' : 'Sections'}
          </button>

          <p className={styles.brand}>
            Feel The Night <span className={styles.brandTag}>Administration</span>
          </p>

          <Link className={styles.exit} to="/">
            Back to site
          </Link>
        </div>
      </header>

      <div className={styles.body}>
        <nav
          aria-label="Administration"
          className={`${styles.sidebar} ${open ? styles.sidebarOpen : ''}`}
          id={menuId}
        >
          <ul className={styles.sidebarList}>
            {sections.map((section) => (
              <li key={section.path}>
                <NavLink
                  to={section.path}
                  end={section.end}
                  className={({ isActive }) =>
                    `${styles.sidebarLink} ${isActive ? styles.sidebarLinkActive : ''}`
                  }
                  onClick={closeMenu}
                >
                  {section.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <main className={styles.main} id="admin-main" tabIndex={-1}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
