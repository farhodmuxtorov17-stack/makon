// All images are served locally from /buildings/
// Hardcode base URL for GitHub Pages — import.meta.env.BASE_URL resolves to "./" which breaks
export function useImg() {
  const base = '/makon'
  const img = (path: string): string => {
    if (!path) return ''
    if (path.startsWith('http') || path.startsWith('data:')) return path
    if (path.startsWith(base + '/')) return path
    // Remove leading slash, then prepend base
    const clean = path.replace(/^\//, '')
    return `${base}/${clean}`
  }
  return { img }
}
