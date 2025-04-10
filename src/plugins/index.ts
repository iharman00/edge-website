import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { getServerSideURL } from '@/utilities/getURL'
import { Page } from '@/payload-types'
import { admins } from '@/access/admins'
import { RECAPTCHA_SECRET_KEY, BLOB_READ_WRITE_TOKEN } from '@/environment'

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Elmvale Horticulture Society` : 'Elmvale Horticulture Society'
}

const generateURL: GenerateURL<Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  vercelBlobStorage({
    enabled: true, // Optional, defaults to true
    // Specify which collections should use Vercel Blob
    clientUploads: {
      access: ({ req }) => req.user?.role === 'admin',
    },
    collections: {
      media: true,
    },
    // Token provided by Vercel once Blob storage is added to your Vercel project
    token: BLOB_READ_WRITE_TOKEN,
  }),
  redirectsPlugin({
    collections: ['pages'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      access: {
        read: admins,
        update: () => false,
        delete: admins,
      },
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
    formSubmissionOverrides: {
      access: {
        create: async ({ data }) => {
          if (!data?.recaptchaToken) {
            // Stop the form submission if recaptcha token is not provided
            return false
          }

          const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${data.recaptchaToken}`

          const captchaRes = await fetch(verifyURL, {
            method: 'POST',
          })
            .then((res) => res.json())
            .catch((err) => {
              throw new Error(`Recaptcha verification failed: ${err}`)
            })

          if (!captchaRes?.success) {
            // Stop the form submission if recaptcha verification fails
            return false
          }

          // Proceed with form submission if recaptcha verification is successful
          return true
        },
        read: admins,
        update: () => false,
        delete: admins,
      },
    },
  }),
]
