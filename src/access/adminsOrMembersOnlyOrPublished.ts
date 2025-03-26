import { Page } from '@/payload-types'
import type { Access } from 'payload'

export const adminsOrMembersOnlyOrPublished: Access = async ({ req: { user } }) => {
  // Admins can see all pages
  if (user?.role === 'admin') {
    return true
  }

  // Members can only see published pages, this includes protected pages
  if (user?.role === 'member') {
    return {
      _status: {
        equals: 'published',
      },
    }
  }

  // Guests can only see published, public pages
  return {
    and: [
      {
        _status: {
          equals: 'published',
        },
      },
      {
        isProtected: {
          equals: false,
        },
      },
    ],
  }
}
