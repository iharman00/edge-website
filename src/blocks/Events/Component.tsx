import type { EventsBlock as EventsBlockType } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import EventsBlockClient from './Component.Client'

const EventsBlock = async ({ richText, showEvents, eventsSortingOrder }: EventsBlockType) => {
  const payload = await getPayload({ config: configPromise })

  const events = await payload.find({
    collection: 'events',
    draft: false,
    limit: 1000,
    pagination: true,
    sort: [eventsSortingOrder === 'ascending' ? 'date' : '-date'],
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
      events={events.docs}
      richText={richText}
      initialVisibleCount={6}
      incrementBy={6}
    />
  )
}

export default EventsBlock
