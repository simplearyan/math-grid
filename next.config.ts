import type { NextConfig } from 'next';
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';

const nextConfig: NextConfig | ((phase: string) => Promise<NextConfig>) = async (
  phase: string
) => {
  // Define your base Next.js configuration options here
  const config: NextConfig = {
    // Example: Add your webpack configuration if needed for experiments like topLevelAwait
    // webpack: (cfg) => {
    //   cfg.experiments = { ...cfg.experiments, topLevelAwait: true };
    //   return cfg;
    // },
    // Other Next.js configuration options go here
    // For example:
    // reactStrictMode: true,
    // swcMinify: true,
    output: 'export'
  };

  // Only call setupDevPlatform in development phase to allow bindings access
  if (phase === PHASE_DEVELOPMENT_SERVER && process.env.NODE_ENV === 'development') {
    await setupDevPlatform(); //
  }

  return config;
};

export default nextConfig;