'use client'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { CalendarDays, MapPin } from 'lucide-react'
import { format } from 'date-fns'
import { useInfiniteQuery } from '@tanstack/react-query'
import LoadingSpinner from '@/components/LoadingSpinner'
import fetchEvents from '@/actions/fetchEvents'
import { Event, EventsBlock } from '@/payload-types'
import { PaginatedDocs } from 'payload'

interface EventsBlockClientProps extends Pick<EventsBlock, 'content' | 'showEvents'> {
  initialEvents: PaginatedDocs<Event>
  limit: number
}

const EventsBlockClient = ({
  showEvents,
  content,
  initialEvents,
  limit,
}: EventsBlockClientProps) => {
  const queryEvents = async ({ pageParam }: { pageParam: number }) =>
    fetchEvents({ pageParam, showEvents, limit })

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, refetch } =
    useInfiniteQuery({
      queryKey: ['events', showEvents],
      queryFn: queryEvents,
      initialPageParam: initialEvents.page || 1,
      getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.nextPage : undefined),
      initialData: {
        pages: [initialEvents],
        pageParams: [initialEvents.page || 1],
      },
    })

  const pages = data?.pages || []

  return (
    <div>
      {/* RichText Block */}
      {content && (
        <div className="max-w-md mb-10">
          <RichText className="[&>*:first-child]:mb-4" data={content} enableGutter={false} />
        </div>
      )}

      {/* No Events */}
      {pages.length === 0 && (
        <p className="text-center text-xl text-muted-foreground my-8">No events found.</p>
      )}

      {/* Events Grid */}
      {pages.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map((page) =>
            page.docs.map((event) => (
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
            )),
          )}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="flex flex-col items-center justify-center my-10 gap-4">
          <p className="text-destructive text-center text-xl">
            Oops! Something went wrong while fetching events.
          </p>
          <Button onClick={() => refetch()} variant="secondary">
            Try Again
          </Button>
        </div>
      )}

      {/* Load More Button */}
      {hasNextPage && !isError && (
        <div className="flex justify-center mt-10">
          <Button onClick={() => fetchNextPage()} variant="secondary">
            {isFetchingNextPage ? (
              <>
                <LoadingSpinner className="mr-2 size-5" />
                Loading more...
              </>
            ) : (
              'View More'
            )}
          </Button>
        </div>
      )}
    </div>
  )
}

export default EventsBlockClient
