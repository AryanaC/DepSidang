/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'unsplash.com', 'images.unsplash.com', 'plus.unsplash.com', 'media.discordapp.net', 'picsum.photos'],
    },
    env: {
        API_URL: 'http://localhost:8000',
      },
};

export default nextConfig;
