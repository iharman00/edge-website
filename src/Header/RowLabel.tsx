'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>()

  const labelPrefix = `Nav item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}:`
  const label = `${labelPrefix} ${data.data.type === 'single' ? data?.data?.link?.label : data.data.label}`

  return <div>{label}</div>
}
