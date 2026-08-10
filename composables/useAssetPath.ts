// Prepends the app's baseURL (e.g. "/makon/") to a root-relative asset path.
// Needed because GitHub Pages serves the site from a subpath, and plain
// <img src="/foo.jpg"> tags are NOT rewritten by Nuxt's router base automatically.
export const useAssetPath = () => {
  const config = useRuntimeConfig()
  const base = (config.app.baseURL || '/').replace(/\/$/, '')
  return (path: string) => {
    if (/^https?:\/\//.test(path)) return path
    return `${base}${path.startsWith('/') ? path : '/' + path}`
  }
}
