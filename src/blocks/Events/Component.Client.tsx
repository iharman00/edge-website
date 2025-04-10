'use client'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { CalendarDays, MapPin } from 'lucide-react'
import { useState } from 'react'
import { format } from 'date-fns'
import type { Event, EventsBlock } from '@/payload-types'

interface Props {
  events: Event[]
  richText: EventsBlock['richText']
  initialVisibleCount: number
  incrementBy: number
}

const EventsBlockClient = ({ events, richText, initialVisibleCount, incrementBy }: Props) => {
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount)
  const showMore = () => setVisibleCount((prev) => prev + incrementBy)
  const hasMore = visibleCount < events.length

  return (
    <div className="max-xl">
      {/* RichText Block */}
      {richText && (
        <div className="max-w-md mb-10">
          <RichText className="[&>*:first-child]:mb-4" data={richText} enableGutter={false} />
        </div>
      )}

      {events.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.slice(0, visibleCount).map((event) => (
              <div
                key={event.id}
                className="shadow-md hover:shadow-lg transition p-4 gap-2 rounded-2xl bg-white"
              >
                {event.media && typeof event.media === 'object' && (
                  <div className="overflow-auto">
                    <Media
                      className="relative w-full h-48 mb-6 overflow-hidden rounded-xl"
                      imgClassName="object-cover"
                      priority
                      resource={event.media}
                    />
                  </div>
                )}
                <div className="text-foreground">
                  <h3 className="text-3xl font-semibold mb-4">{event.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                    <CalendarDays className="text-primary" />
                    <p>{format(new Date(event.date), 'PPPp')}</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                    <MapPin className="text-primary" />
                    <p>{event.location}</p>
                  </div>
                  <div className="text-sm text-muted-foreground line-clamp-4">
                    <RichText
                      className="[&>*:first-child]:mb-4"
                      data={event.description}
                      enableGutter={false}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-10">
              <Button onClick={showMore} variant="secondary">
                View More
              </Button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">No events found.</p>
      )}
    </div>
  )
}

export default EventsBlockClient
