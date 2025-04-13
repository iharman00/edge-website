// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Header } from './Header/config'
import { Footer } from './Footer/config'
import { Users } from './collections/Users'
import { plugins } from './plugins'
import { DATABASE_URI, PAYLOAD_SECRET, RESEND_API_KEY, RESEND_FROM_ADDRESS } from './environment'
import { Events } from './collections/Events'
import { resendAdapter } from '@payloadcms/email-resend'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  collections: [Users, Media, Pages, Events],
  editor: lexicalEditor(),
  secret: PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: DATABASE_URI,
  }),
  sharp,
  globals: [Header, Footer],
  plugins: [...plugins],
  email: resendAdapter({
    apiKey: RESEND_API_KEY,
    defaultFromAddress: RESEND_FROM_ADDRESS,
    defaultFromName: 'E.D.G.E Website',
  }),
})
