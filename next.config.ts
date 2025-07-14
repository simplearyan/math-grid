import type { NextConfig } from "next";
import createMDX from "@next/mdx";

 const nextConfig: NextConfig = {
   /* config options here */
 };

// Use ESM import for @next/mdx in TypeScript
// const withMDX = createMDX({
//   extension: /\.mdx?$/,
// });

// const nextConfig: NextConfig = withMDX({
//   pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
//   // Add other Next.js config options here if needed
// });



export default nextConfig;
