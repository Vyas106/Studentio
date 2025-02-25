// next.config.js
module.exports = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    images: {
      domains: ['res.cloudinary.com'],
    },
  };