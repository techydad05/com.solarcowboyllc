import { sessionMiddleware, simpleRolesIsAuthorized } from "blitz"
const config = {
  images: {
    // domains: ['picsum.photos', 'https://picsum.photos']
  },
  middleware: [
    sessionMiddleware({
      cookiePrefix: "com-cms-version-1",
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
}
module.exports = config
