import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    largePageDataBytes: 128 * 1024,
    instrumentationHook: true,
  },
  serverExternalPackages: ['sharp', 'pg', 'pg-pool', 'drizzle-orm'],
}

export default withPayload(nextConfig)
