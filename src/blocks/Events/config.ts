import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const EventsBlock: Block = {
  slug: 'eventsBlock',
  interfaceName: 'EventsBlock',
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
      name: 'showEvents',
      label: 'What events to show?',
      type: 'select',
      options: [
        {
          label: 'Show past events',
          value: 'showPastEvents',
        },
        {
          label: 'Show future events',
          value: 'showFutureEvents',
        },
      ],
      defaultValue: 'showFutureEvents',
    },
  ],
}
