// All images are served locally from /buildings/
// Prepend base URL for GitHub Pages deployment
export function useImg() {
  const config = useRuntimeConfig()
  const base = (import.meta.env.BASE_URL || '/makon/').replace(/\/$/, '')
  const img = (path: string): string => {
    if (path.startsWith('http')) return path
    // Remove leading slash, then prepend base
    const clean = path.replace(/^\//, '')
    return `${base}/${clean}`
  }
  return { img }
}
