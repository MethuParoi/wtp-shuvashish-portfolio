/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
    
      {
        protocol: "https",
        hostname: "https://fra.cloud.appwrite.io/v1",
        port: "",
        pathname: "/storage/buckets/**",
      },
   
    ],
  },
};

export default nextConfig;
