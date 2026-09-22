/**
 * Single source of truth for admin roles and permissions.
 *
 * SECURITY: the defaults below are convenience for the form. They are NOT an
 * authorization model. The backend must enforce roles and permissions on
 * every administrative endpoint; frontend route guards are UX only.
 */

import type {
  AccountStatus,
  AdminPermission,
  AdminRole,
  AdminUser,
  AdminUserFormValues,
} from './admin.types'

export const ADMIN_ROLES: { value: AdminRole; label: string }[] = [
  { value: 'administrator', label: 'Administrator' },
  { value: 'moderator', label: 'Moderator' },
  { value: 'editor', label: 'Editor' },
  { value: 'member', label: 'Member' },
]

export const ADMIN_PERMISSIONS: { value: AdminPermission; label: string }[] = [
  { value: 'manage_users', label: 'Manage users' },
  { value: 'manage_guides', label: 'Manage guides' },
  { value: 'manage_events', label: 'Manage events' },
  { value: 'manage_news', label: 'Manage news' },
  { value: 'manage_community', label: 'Manage community' },
]

export const ACCOUNT_STATUSES: { value: AccountStatus; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

/** Permissions pre-selected when a role is chosen. The admin can still change
    each one before saving. */
export const DEFAULT_PERMISSIONS: Record<AdminRole, AdminPermission[]> = {
  administrator: [
    'manage_users',
    'manage_guides',
    'manage_events',
    'manage_news',
    'manage_community',
  ],
  moderator: ['manage_guides', 'manage_events', 'manage_news', 'manage_community'],
  editor: ['manage_guides', 'manage_events', 'manage_news'],
  member: [],
}

/** Starting point for the create form. */
export const EMPTY_ADMIN_USER: AdminUserFormValues = {
  displayName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'member',
  status: 'active',
  permissions: DEFAULT_PERMISSIONS.member,
}

export function roleLabel(role: AdminRole): string {
  return ADMIN_ROLES.find((entry) => entry.value === role)?.label ?? role
}

export function permissionLabel(permission: AdminPermission): string {
  return (
    ADMIN_PERMISSIONS.find((entry) => entry.value === permission)?.label ?? permission
  )
}

export function statusLabel(status: AccountStatus): string {
  return ACCOUNT_STATUSES.find((entry) => entry.value === status)?.label ?? status
}

/**
 * Convenience check for rendering decisions only - never for access control.
 * A future <RequirePermission> wrapper would build on this, and would still be
 * UX: the backend must enforce every administrative permission.
 */
export function hasPermission(
  user: Pick<AdminUser, 'permissions'>,
  permission: AdminPermission,
): boolean {
  return user.permissions.includes(permission)
}

/** Same caveat as hasPermission: presentation only. */
export function hasRole(user: Pick<AdminUser, 'role'>, role: AdminRole): boolean {
  return user.role === role
}
