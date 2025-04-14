import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const ContentWithImage: Block = {
  slug: 'contentWithImage',
  interfaceName: 'ContentWithImageBlock',
  fields: [
    {
      name: 'direction',
      type: 'select',
      defaultValue: 'sideBySide',
      options: [
        {
          label: 'Side by Side',
          value: 'sideBySide',
        },
        {
          label: 'Side by Side Reversed',
          value: 'sideBySideReversed',
        },
      ],
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    {
      name: 'enableLink',
      type: 'checkbox',
      defaultValue: false,
    },
    linkGroup({
      overrides: {
        maxRows: 1,
        admin: {
          condition: (_, { enableLink }) => Boolean(enableLink),
        },
      },
    }),
  ],
}
