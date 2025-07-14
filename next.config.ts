import type { NextConfig } from "next";
// next.config.mjs
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

 const nextConfig: NextConfig = {
   /* config options here */
 };

 if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}

export default nextConfig;
