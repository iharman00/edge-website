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
      name: 'richText',
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
      label: false,
    },
    {
      name: 'eventsSortingOrder',
      type: 'select',
      options: [
        {
          label: 'Ascending',
          value: 'ascending',
        },
        {
          label: 'Descending',
          value: 'descending',
        },
      ],
      defaultValue: 'ascending',
      required: true,
      admin: {
        description:
          'Sorts events by date, choose ascending when showing future events, choose descending otherwise.',
      },
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
