import { NextConfig } from 'next'
import checkEnvVariables from './check-env-variables'
import createNextIntlPlugin from 'next-intl/plugin';

checkEnvVariables()

/**
* Next.js configuration
*/
const nextConfig: NextConfig = {
 reactStrictMode: true,
 logging: {
   fetches: {
     fullUrl: true,
   },
 },
 eslint: {
   ignoreDuringBuilds: true,
 },
 typescript: {
   ignoreBuildErrors: true,
 },
 images: {
   remotePatterns: [
     {
       protocol: "http",
       hostname: "localhost",
     },
     {
       protocol: "https",
       hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
     },
     {
       protocol: "https",
       hostname: "medusa-server-testing.s3.amazonaws.com",
     },
     {
       protocol: "https",
       hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
     },
   ],
 },
}

// export default nextConfig

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);