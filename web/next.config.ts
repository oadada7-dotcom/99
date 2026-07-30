import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Hero and section imagery is art-directed and full-bleed; these widths
    // cover the tested breakpoints in spec section 17 without over-generating.
    deviceSizes: [390, 768, 1024, 1280, 1440, 1728, 2048],
    formats: ["image/webp"],
  },
  async headers() {
    return [
      {
        // The hero controller seeks the master file, which requires the host to
        // answer HTTP range requests. Long-lived immutable caching keeps the
        // seek behaviour stable across the pinned scroll.
        source: "/assets/hero/:file*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
