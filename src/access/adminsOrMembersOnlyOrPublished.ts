import { Page } from '@/payload-types'
import type { Access } from 'payload'

export const adminsOrMembersOnlyOrPublished: Access<Page> = async ({ req, id }) => {
  // Admins can see all pages
  if (req.user?.role === 'admin') {
    return true
  }

  // Members can only see published pages (protected or not)
  if (req.user?.role === 'member') {
    return {
      _status: {
        equals: 'published',
      },
    }
  }

  if (!id) {
    return false
  }

  const page = await req.payload.findByID({
    collection: 'pages',
    id: id,
  })

  // Guests can only view published and unprotected pages
  if (page._status === 'published' && !page.isProtected) {
    return true
  }

  return false
}
