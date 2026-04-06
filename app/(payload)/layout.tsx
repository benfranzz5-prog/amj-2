'use server'
import React from 'react'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import config from '../../payload.config'
import { importMap } from './admin/importMap.js'

export { metadata } from '@payloadcms/next/layouts'

async function serverFunction(args: Parameters<typeof handleServerFunctions>[0]) {
  'use server'
  return handleServerFunctions({ ...args, config, importMap })
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}
