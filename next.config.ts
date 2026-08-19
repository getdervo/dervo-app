import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        // /napkin has no content of its own — the landing page's "What brings
        // you here today?" section is the picker. Temporary (307) rather than
        // permanent so browsers don't cache it if this ever becomes a real
        // page again.
        source: "/napkin",
        destination: "/napkin/idea",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
