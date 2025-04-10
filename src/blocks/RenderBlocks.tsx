import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ContentWithImageBlock } from '@/blocks/ContentWithImage/Component'
import { FormBlock } from '@/blocks/Form/Component'
import EventsBlock from './Events/Component'
import ResponsiveContainer from '@/components/ui/ResponsiveContainer'

const blockComponents = {
  contentWithImage: ContentWithImageBlock,
  formBlock: FormBlock,
  eventsBlock: EventsBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <ResponsiveContainer key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </ResponsiveContainer>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
