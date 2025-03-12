import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import ResponsiveContainer from '@/components/ui/ResponsiveContainer'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText, stats }) => {
  return (
    <div className="overflow-clip">
      <ResponsiveContainer>
        <div className="max-w-[30rem] xl:max-w-[36.5rem] mb-20">
          {/* Content */}
          {richText && <RichText className="mb-8" data={richText} enableGutter={false} />}
          {/* CTA */}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex justify-start gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Mobile Hero Image */}
        {media && typeof media === 'object' && (
          <div className="block lg:hidden relative w-full mb-20">
            <Media
              className="max-w-[20rem] aspect-[3/4] mx-auto object-fit border-2 border-border rounded-md overflow-clip"
              priority
              resource={media}
            />
            <div className="absolute -z-1 -left-[10vw] top-[calc((20rem*1.33)/2-6rem)] block lg:hidden bg-accent w-[999px] h-[12rem]"></div>
          </div>
        )}

        {/* Stats */}
        {stats && (
          <div className="relative lg:w-max pt-16 mr-4 lg:mr-0 pb-14 pr-14 flex flex-wrap gap-20">
            {stats.map((stat) => (
              <div key={stat.id}>
                <p className="text-2xl font-bold mb-2">{stat.metric}</p>
                <p>{stat.description}</p>
              </div>
            ))}
            {/* Solid background */}
            <div className="absolute -z-1 top-0 right-0 w-[9999px] h-full bg-accent rounded-tr-[5rem]" />
          </div>
        )}
      </ResponsiveContainer>

      {/* Desktop Hero Image */}
      {media && typeof media === 'object' && (
        <div className="hidden lg:block absolute -z-1 top-0 right-0 bg-accent min-w-3/12 h-[36rem]">
          <Media
            className="absolute -bottom-[8rem] -left-[12rem] max-w-[24rem] border-2 border-border rounded-md overflow-clip"
            priority
            resource={media}
          />
        </div>
      )}
    </div>
  )
}
