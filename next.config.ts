import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder photography lives locally under /public/images for now.
    // Add real remote hosts here (e.g. Supabase Storage) once photos are uploaded there.
    remotePatterns: [],
  },
};

export default nextConfig;
