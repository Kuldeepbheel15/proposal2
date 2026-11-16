/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",          // static HTML -> works on Cloudflare Pages, Vercel, GitHub Pages, Netlify
  images: { unoptimized: true }, // next/image optimizer needs a server, so turn it off
  trailingSlash: true,
};

export default nextConfig;
