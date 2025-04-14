import { admins } from '@/access/admins'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    // CRUD operations are only allowed to users with role 'admin'
    create: admins,
    read: ({ req }) => (req.user?.role === 'admin' ? true : { id: { equals: req.user?.id } }),
    update: admins,
    delete: admins,

    // Admin panel ui is only accessible to users with role 'admin'
    // This is a bit of a hack, but it works
    admin: (...args) => Boolean(admins(...args)),
    // Only admin can force unlock accounts
    unlock: admins,
  },
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // _id, email, salt, hash, timestamps, loginAttempts, __v added by default
    {
      name: 'firstName',
      type: 'text',
      required: true,
      maxLength: 64,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      maxLength: 64,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Member', value: 'member' },
      ],
      defaultValue: 'member',
    },
  ],
}
