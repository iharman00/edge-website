import type { Access } from 'payload'

export const admins: Access = ({ req: { user } }) => {
  return user?.role === 'admin'
}
