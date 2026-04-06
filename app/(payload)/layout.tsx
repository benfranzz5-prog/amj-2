import React from 'react'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import config from '../../payload.config'
import { importMap } from './admin/importMap.js'

export { metadata } from '@payloadcms/next/layouts'

const serverFunction = handleServerFunctions({ config, importMap })

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}
