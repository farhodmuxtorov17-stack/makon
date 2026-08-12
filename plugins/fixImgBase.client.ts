// Automatically prefixes all image paths with the Nuxt base URL
// Uses MutationObserver to catch dynamically rendered images too

export default defineNuxtPlugin(() => {
  const base = '/makon'
  
  const needsPrefix = (src: string): boolean => {
    return src.startsWith('/buildings/') || src.startsWith('/makon/buildings/') === false && src.match(/^\/[a-z]/) !== null && !src.startsWith('/_nuxt/') && !src.startsWith('/makon/')
  }
  
  const fixSrc = (src: string): string => {
    if (!src) return src
    if (src.startsWith('http') || src.startsWith('data:') || src.startsWith('//')) return src
    if (src.startsWith('/makon/')) return src
    if (src.startsWith('/_nuxt/')) return src
    if (src.startsWith('/buildings/')) return base + src
    return src
  }
  
  const fixElement = (el: Element) => {
    if (el.tagName === 'IMG') {
      const img = el as HTMLImageElement
      const src = img.getAttribute('src')
      if (src && src.startsWith('/buildings/')) {
        img.setAttribute('src', base + src)
      }
    }
    // Fix inline styles with url()
    if (el instanceof HTMLElement) {
      const style = el.getAttribute('style')
      if (style && style.includes('url(/buildings/')) {
        el.setAttribute('style', style.replace(/url\((['"]?)\/buildings\//g, `url($1${base}/buildings/`))
      }
    }
  }
  
  // Fix all existing elements
  const fixAll = () => {
    document.querySelectorAll('img[src^="/buildings/"]').forEach(fixElement)
    document.querySelectorAll('[style*="url(/buildings/"]').forEach(fixElement)
  }
  
  // Run on initial load
  onNuxtReady(() => {
    fixAll()
    
    // Observe DOM changes to catch dynamically rendered images
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as Element
            fixElement(el)
            // Also check children
            el.querySelectorAll?.('img[src^="/buildings/"]').forEach(fixElement)
            el.querySelectorAll?.('[style*="url(/buildings/"]').forEach(fixElement)
          }
        })
      }
    })
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'style']
    })
  })
  
  // Also fix after navigation
  const router = useRouter()
  router.afterEach(() => {
    nextTick(() => setTimeout(fixAll, 50))
  })
})
