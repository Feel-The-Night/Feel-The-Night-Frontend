export type NavItem = {
  label: string
  path: string
  /** Highlighted item at the right edge of the top bar (Figma node 106:11). */
  accent?: boolean
}

export const navItems: NavItem[] = [
  { label: 'Start Here', path: '/start' },
  { label: 'Guides', path: '/guides' },
  { label: 'Community', path: '/community' },
  { label: 'Characters', path: '/characters' },
  { label: 'Events', path: '/events' },
  { label: 'Login/Register', path: '/login', accent: true },
]
