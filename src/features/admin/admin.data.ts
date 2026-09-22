/**
 * Demo accounts for the admin panel.
 *
 * These are fictional records used to build and review the interface. There is
 * no admin API yet, so nothing here is fetched, created or persisted.
 */

import { DEFAULT_PERMISSIONS } from './admin.config'
import type { AdminUser } from './admin.types'

export const adminUsers: AdminUser[] = [
  {
    id: 'u-001',
    displayName: 'Kisalto (demo)',
    username: 'kisalto',
    email: 'kisalto@example.invalid',
    role: 'administrator',
    permissions: DEFAULT_PERMISSIONS.administrator,
    status: 'active',
    createdAt: '2026-01-14',
  },
  {
    id: 'u-002',
    displayName: 'Notfoxof (demo)',
    username: 'notfoxof',
    email: 'notfoxof@example.invalid',
    role: 'moderator',
    permissions: DEFAULT_PERMISSIONS.moderator,
    status: 'active',
    createdAt: '2026-02-02',
  },
  {
    id: 'u-003',
    displayName: 'Tsukibito (demo)',
    username: 'tsukibito',
    email: 'tsukibito@example.invalid',
    role: 'editor',
    permissions: DEFAULT_PERMISSIONS.editor,
    status: 'active',
    createdAt: '2026-03-19',
  },
  {
    id: 'u-004',
    displayName: 'Zate (demo)',
    username: 'zate',
    email: 'zate@example.invalid',
    role: 'editor',
    permissions: ['manage_guides'],
    status: 'inactive',
    createdAt: '2026-04-07',
  },
  {
    id: 'u-005',
    displayName: 'Lucsa (demo)',
    username: 'lucsa',
    email: 'lucsa@example.invalid',
    role: 'member',
    permissions: DEFAULT_PERMISSIONS.member,
    status: 'active',
    createdAt: '2026-05-23',
  },
  {
    id: 'u-006',
    displayName: 'Akaza (demo)',
    username: 'akaza',
    email: 'akaza@example.invalid',
    role: 'member',
    permissions: DEFAULT_PERMISSIONS.member,
    status: 'inactive',
    createdAt: '2026-06-11',
  },
]

export function findAdminUser(id: string | undefined): AdminUser | undefined {
  return adminUsers.find((user) => user.id === id)
}
