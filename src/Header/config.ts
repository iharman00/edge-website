import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
import { admins } from '@/access/admins'
import { linkGroup } from '@/fields/linkGroup'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    update: admins,
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Single Link', value: 'single' },
            { label: 'Link Group', value: 'group' },
          ],
          defaultValue: 'single',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            condition: (_, { type } = {}) => type === 'group',
          },
        },
        linkGroup({
          appearances: false,
          overrides: {
            minRows: 1,
            maxRows: 8,
            admin: {
              condition: (_, { type } = {}) => type === 'group',
            },
            required: true,
          },
        }),
        link({
          overrides: {
            admin: {
              condition: (_, { type } = {}) => type === 'single',
            },
          },
        }),
      ],
      maxRows: 5,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
