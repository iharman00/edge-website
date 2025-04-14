import type { EventsBlock } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import EventsBlockClient from './Component.Client'

const payload = await getPayload({ config: configPromise })

const EventsBlock = async ({ content, showEvents }: EventsBlock) => {
  const limit = 6 // Set the limit for the number of events to fetch per request

  // Fetch the initial events on the server to avoid loading state on the client
  const docs = await payload.find({
    collection: 'events',
    draft: false,
    limit,
    page: 1, // Fetch the first page for the initial request
    sort: [showEvents === 'showFutureEvents' ? 'date' : '-date'],
    where: {
      date: {
        ...(showEvents === 'showPastEvents'
          ? { less_than_equal: new Date() }
          : { greater_than: new Date() }),
      },
    },
  })

  return (
    <EventsBlockClient
      content={content}
      showEvents={showEvents}
      initialEvents={docs}
      limit={limit}
    />
  )
}

export default EventsBlock
