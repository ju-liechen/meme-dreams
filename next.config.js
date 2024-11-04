module.exports = {
  env: {
    SESSION_SECRET: process.env.SESSION_SECRET,
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || 'https://localhost:3000',
  },
  // images: {
  //   domains: [process.env.NEXT_PUBLIC_IMAGE_HOST],
  // },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  /**
   * When working on a package, it is annoying to have to restart
   * nextjs every time you make a change. By default nextjs does not watch
   * the node_modules folder for changes. This update makes it so that if
   * you have the env variable DEV_PACKAGE_MODE set to 'true' then it will
   * watch node_modules for changes to the files.
   * From my experience this works well with the yalc library that you can use
   * in the package you're building.
  **/
  webpack: (config, { dev }) => {
    const DEV_PACKAGE_MODE = process.env.DEV_PACKAGE_MODE == 'true'
    if (dev && DEV_PACKAGE_MODE) {
      config.watchOptions = {
        followSymlinks: true,
      }
      config.snapshot.managedPaths = [];
    }
    return config;
  },

}
