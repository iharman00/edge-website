'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { EventsBlock } from '@/payload-types'

const payload = await getPayload({ config: configPromise })

interface FetchEventsArgs extends Pick<EventsBlock, 'showEvents'> {
  pageParam: number
  limit: number
}

const fetchEvents = async ({ pageParam, showEvents, limit }: FetchEventsArgs) =>
  payload.find({
    collection: 'events',
    draft: false,
    limit,
    page: pageParam,
    sort: [showEvents === 'showFutureEvents' ? 'date' : '-date'],
    where: {
      date: {
        ...(showEvents === 'showPastEvents'
          ? { less_than_equal: new Date() }
          : { greater_than: new Date() }),
      },
    },
  })

export default fetchEvents
