/**
 * Admin panel data model.
 *
 * SECURITY: none of this is a security boundary. The backend must enforce
 * every role and permission on every administrative endpoint. Anything the
 * frontend does with roles or permissions is UX only - a user can change it
 * in the browser.
 */

export type AdminRole = 'administrator' | 'moderator' | 'editor' | 'member'

export type AdminPermission =
  | 'manage_users'
  | 'manage_guides'
  | 'manage_events'
  | 'manage_news'
  | 'manage_community'

export type AccountStatus = 'active' | 'inactive'

export type AdminUser = {
  id: string
  displayName: string
  username: string
  email: string
  role: AdminRole
  permissions: AdminPermission[]
  status: AccountStatus
  /** ISO date (YYYY-MM-DD). */
  createdAt: string
}

/** Values the create and edit forms work with. */
export type AdminUserFormValues = {
  displayName: string
  username: string
  email: string
  password: string
  confirmPassword: string
  role: AdminRole
  status: AccountStatus
  permissions: AdminPermission[]
}

export type AdminUserFormField = keyof Omit<
  AdminUserFormValues,
  'permissions' | 'status'
>
