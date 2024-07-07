/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'unsplash.com', 'images.unsplash.com', 'plus.unsplash.com', 'media.discordapp.net', 'picsum.photos'],
    },
    env: {
        API_URL: 'https://v8ftmpnc-4040.asse.devtunnels.ms',
      },
};

export default nextConfig;
