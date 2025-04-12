import React from 'react'

import { ThemeProvider } from './Theme'
import { AuthProvider } from './Auth'
import { Toaster } from '@/components/ui/sonner'
import ClientProviders from './ClientProviders'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ClientProviders>{children}</ClientProviders>
      </ThemeProvider>
      <Toaster />
    </AuthProvider>
  )
}
