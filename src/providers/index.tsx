import React from 'react'

import { ThemeProvider } from './Theme'
import { AuthProvider } from './Auth'
import { Toaster } from '@/components/ui/sonner'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <AuthProvider>
      <ThemeProvider>{children}</ThemeProvider>
      <Toaster />
    </AuthProvider>
  )
}
