import React from 'react'

interface LogoProps extends React.HtmlHTMLAttributes<HTMLImageElement> {
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: LogoProps) => {
  const { loading: loadingFromProps, priority: priorityFromProps } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="E.D.G.E Logo"
      width={193}
      height={34}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      src="Logo-and-wordmark.svg"
      {...props}
    />
  )
}
