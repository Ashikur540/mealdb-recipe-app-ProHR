/** @type {import('next').NextConfig} */
const nextConfig = {
  output:"export",
  
  images: {
    domains: ["www.themealdb.com"],
    unoptimized:true,
  },
};

export default nextConfig;
