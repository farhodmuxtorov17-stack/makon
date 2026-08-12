import { useRuntimeConfig } from '#app'

// CDN-hosted image URLs (Base44 public storage)
// GitHub Pages was returning 404 for newer images, so we host them on CDN instead
const CDN_MAP: Record<string, string> = {
  '/buildings/v2_tashkent-tower.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/e64cd03c1_v2_tashkent-tower.jpg',
  '/buildings/v2_commercial-tower-1.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/355ea320f_v2_commercial-tower-1.jpg',
  '/buildings/v2_commercial-tower-2.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/25ab4be09_v2_commercial-tower-2.jpg',
  '/buildings/v2_aerial-city-1.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/b812a342b_v2_aerial-city-1.jpg',
  '/buildings/v2_aerial-city-2.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/162e792c4_v2_aerial-city-2.jpg',
  '/buildings/v2_office-building-1.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/31f064243_v2_office-building-1.jpg',
  '/buildings/v2_office-building-2.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/dbc7ed5c2_v2_office-building-2.jpg',
  '/buildings/v2_office-space-1.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/02e6abd4f_v2_office-space-1.jpg',
  '/buildings/v2_office-space-2.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/e825fa75a_v2_office-space-2.jpg',
  '/buildings/v2_business-center-1.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/ea20673a1_v2_business-center-1.jpg',
  '/buildings/v2_business-center-2.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/e6d810910_v2_business-center-2.jpg',
  '/buildings/v2_modern-facade-1.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/d6713b000_v2_modern-facade-1.jpg',
  '/buildings/v2_modern-facade-2.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/312e1bfa5_v2_modern-facade-2.jpg',
  '/buildings/v2_reception-area.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/d33617cd7_v2_reception-area.jpg',
  '/buildings/v2_meeting-room.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/9b9d8c3e3_v2_meeting-room.jpg',
  '/buildings/v2_warehouse-1.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/11c6eb73b_v2_warehouse-1.jpg',
  '/buildings/v2_warehouse-2.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/91ba66a28_v2_warehouse-2.jpg',
  '/buildings/v2_office-interior-1.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/fd5191495_v2_office-interior-1.jpg',
  '/buildings/v2_office-interior-2.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/d09fa12b8_v2_office-interior-2.jpg',
  '/buildings/v2_coworking-space.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/c0f882865_v2_coworking-space.jpg',
  '/buildings/v2_shopping-center-1.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/3b296f052_v2_shopping-center-1.jpg',
  '/buildings/v2_shopping-center-2.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/71ea3baff_v2_shopping-center-2.jpg',
  '/buildings/v2_night-skyline.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/63c92c228_v2_night-skyline.jpg',
  '/buildings/v2_tashkent-skyline.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/c420b339c_v2_tashkent-skyline.jpg',
  '/buildings/hero-tashkent.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/32dbb5ed7_hero-tashkent.jpg',
  '/buildings/bc-finance.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/559c93b72_bc-finance.jpg',
  '/buildings/bc-navroz.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/fd9563ed4_bc-navroz.jpg',
  '/buildings/bc-city-plaza.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/5400d98e2_bc-city-plaza.jpg',

  // Non-v2 fallback entries (for backward compatibility with store gallery paths)
  '/buildings/commercial-tower-1.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/355ea320f_v2_commercial-tower-1.jpg',
  '/buildings/commercial-tower-2.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/25ab4be09_v2_commercial-tower-2.jpg',
  '/buildings/office-building-1.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/31f064243_v2_office-building-1.jpg',
  '/buildings/office-building-2.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/dbc7ed5c2_v2_office-building-2.jpg',
  '/buildings/office-space-1.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/02e6abd4f_v2_office-space-1.jpg',
  '/buildings/office-space-2.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/e825fa75a_v2_office-space-2.jpg',
  '/buildings/business-center-1.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/ea20673a1_v2_business-center-1.jpg',
  '/buildings/business-center-2.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/e6d810910_v2_business-center-2.jpg',
  '/buildings/modern-facade-1.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/d6713b000_v2_modern-facade-1.jpg',
  '/buildings/modern-facade-2.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/312e1bfa5_v2_modern-facade-2.jpg',
  '/buildings/reception-area.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/d33617cd7_v2_reception-area.jpg',
  '/buildings/meeting-room.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/9b9d8c3e3_v2_meeting-room.jpg',
  '/buildings/warehouse-1.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/11c6eb73b_v2_warehouse-1.jpg',
  '/buildings/warehouse-2.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/91ba66a28_v2_warehouse-2.jpg',
  '/buildings/office-interior-2.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/d09fa12b8_v2_office-interior-2.jpg',
  '/buildings/coworking-space.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/c0f882865_v2_coworking-space.jpg',
  '/buildings/shopping-center-1.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/3b296f052_v2_shopping-center-1.jpg',
  '/buildings/shopping-center-2.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/71ea3baff_v2_shopping-center-2.jpg',
  '/buildings/aerial-city-1.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/b812a342b_v2_aerial-city-1.jpg',
  '/buildings/night-skyline.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/63c92c228_v2_night-skyline.jpg',
  '/buildings/tashkent-skyline.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/c420b339c_v2_tashkent-skyline.jpg',
  '/buildings/office-interior-1.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/fd5191495_v2_office-interior-1.jpg',
  '/buildings/bc-logistics.jpg': 'https://base44.app/api/apps/6a78058ed735adc07d68319d/files/mp/public/6a78058ed735adc07d68319d/bd337e5ce_bc-logistics.jpg',
}

export function useImg() {
  const base = '/makon'
  
  function img(path: string): string {
    if (!path) return ''
    if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('//')) return path
    if (path.startsWith('/makon/')) path = path.slice('/makon'.length)
    // Check CDN map first
    if (CDN_MAP[path]) return CDN_MAP[path]
    if (path.startsWith('/_nuxt/')) return path
    // Fallback to GitHub Pages
    return `${base}${path}`
  }
  
  return { img }
}
