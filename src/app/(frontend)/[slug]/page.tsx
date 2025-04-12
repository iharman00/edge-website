import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode, headers } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import ResponsiveContainer from '@/components/ui/ResponsiveContainer'
import Link from 'next/link'
import { cn } from '@/utilities/ui'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import EmptySite from '@/components/EmptySite'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: true,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const { slug = 'home' } = await paramsPromise
  const url = '/' + slug

  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({
    slug,
  })

  // If page is not found, and the slug is 'home', show a message
  if (!page && slug === 'home') return <EmptySite />

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const headersList = await headers()
  // Current user's auth context
  const auth = await payload.auth({ headers: headersList })

  const { hero, layout } = page

  // Only shows page if it's not protected or user is logged in
  return (
    <article className="mt-10 mb-24">
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {(page.isProtected && auth.user) || !page.isProtected ? (
        <>
          <RenderHero {...hero} />
          <RenderBlocks blocks={layout} />
        </>
      ) : (
        <ResponsiveContainer className="flex items-start justify-center pt-16 pb-24">
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <CardTitle>Access Restricted</CardTitle>
              <CardDescription className="sr-only">
                Access restricted, this page is for members only.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <p>
                  This page is for members only! Please log in to access this exclusive content.
                </p>
                <Link href={`/login?callbackUrl=${url}`} className={cn(buttonVariants(), 'mt-6')}>
                  Log In <ArrowRight />
                </Link>
              </div>
            </CardContent>
          </Card>
        </ResponsiveContainer>
      )}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: true,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
