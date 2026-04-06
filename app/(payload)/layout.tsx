import React from 'react'
import { RootLayout } from '@payloadcms/next/layouts'
import config from '../../payload.config'
import { importMap } from './admin/importMap.js'

export { metadata } from '@payloadcms/next/layouts'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout config={config} importMap={importMap}>
      {children}
    </RootLayout>
  )
}
