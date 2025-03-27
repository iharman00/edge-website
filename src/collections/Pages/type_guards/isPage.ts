import { Page } from '@/payload-types'

function isPage(val: Page | string | number | undefined): val is Page {
  return (val as Page)?.id !== undefined
}

export default isPage
