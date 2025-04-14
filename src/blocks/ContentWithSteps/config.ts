import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const ContentWithSteps: Block = {
  slug: 'contentWithSteps',
  interfaceName: 'ContentWithStepsBlock',
  fields: [
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'steps',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'stepTitle',
          type: 'text',
          required: true,
        },
        {
          name: 'stepDescription',
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
          required: true,
        },
        {
          name: 'enableDownloadableResource',
          type: 'checkbox',
          defaultValue: false,
          required: true,
        },
        {
          name: 'resourceLabel',
          type: 'text',
          label: 'Attached Resource Button Label',
          required: false,
          admin: {
            condition: (_, { enableDownloadableResource }) => enableDownloadableResource,
          },
        },
        {
          name: 'downloadableResource',
          type: 'upload',
          relationTo: 'media',
          required: false,
          admin: {
            condition: (_, { enableDownloadableResource }) => enableDownloadableResource,
          },
        },
      ],
    },
  ],
}
