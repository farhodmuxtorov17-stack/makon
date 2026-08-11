<template>
  <div class="landing-page">
    <!-- ============ HERO ============ -->
    <section class="hero-section">
      <div class="hero-bg">
        <img src="https://media.base44.com/images/public/6a78058ed735adc07d68319d/57f4f22c1_generated_image.png" alt="Tashkent City" class="hero-bg__img" />
        <div class="hero-bg__overlay"></div>
      </div>

      <!-- Nav -->
      <nav class="hero-nav">
        <NuxtLink to="/" class="hero-nav__logo">
          <div class="hero-nav__logo-icon">M</div>
          <span class="hero-nav__logo-text">MAKON</span>
        </NuxtLink>
        <div class="hero-nav__links">
          <NuxtLink to="/catalog" class="hero-nav__link">Katalog</NuxtLink>
          <a href="#buildings" class="hero-nav__link">Binolar</a>
          <a href="#how-it-works" class="hero-nav__link">Qanday ishlaydi</a>
          <a href="#contacts" class="hero-nav__link">Bog'lanish</a>
        </div>
        <div class="hero-nav__actions">
          <ThemeToggle />
          <NuxtLink to="/login" class="hero-nav__login">Kirish</NuxtLink>
          <NuxtLink to="/register/eri" class="hero-nav__cta">
            Ro'yxatdan o'tish
            <ArrowRight :size="15" />
          </NuxtLink>
        </div>
      </nav>

      <!-- Hero content -->
      <div class="hero-content">
        <div class="hero-content__inner">
          <h1 class="hero-title">
            Binolarning<br>
            <span class="hero-title__accent">raqamli nazarati</span>
          </h1>
          <p class="hero-subtitle">
            Premium binolarda ofis, savdo va ombor maydonlari.<br>
            ERI orqali xavfsiz shartnoma va to'liq boshqaruv — bitta tizimda.
          </p>

          <!-- Search -->
          <div class="hero-search">
            <div class="hero-search__bar">
              <Search :size="20" class="hero-search__icon" />
              <input v-model="heroSearch" type="text" placeholder="Bino, maydon turi yoki manzil bo'yicha qidiring..." @keyup.enter="goToCatalog" />
              <button class="hero-search__btn" @click="goToCatalog">
                Qidirish
                <ArrowRight :size="16" />
              </button>
            </div>
            <div class="hero-chips">
              <NuxtLink to="/catalog?offerType=RENT" class="hero-chip">
                <Building2 :size="15" /> Ijaraga
              </NuxtLink>
              <NuxtLink to="/catalog?offerType=SALE" class="hero-chip">
                <ShoppingBag :size="15" /> Sotuvda
              </NuxtLink>
              <NuxtLink to="/catalog?type=WAREHOUSE" class="hero-chip">
                <Warehouse :size="15" /> Ombor
              </NuxtLink>
              <NuxtLink to="/catalog?type=SHOPPING" class="hero-chip">
                <Store :size="15" /> Savdo
              </NuxtLink>
              <NuxtLink to="/catalog" class="hero-chip hero-chip--accent">
                Barchasi <ArrowRight :size="14" />
              </NuxtLink>
            </div>
          </div>

          <!-- Stats -->
          <div class="hero-stats">
            <div class="hero-stat">
              <div class="hero-stat__num">5</div>
              <div class="hero-stat__label">Premium binolar</div>
            </div>
            <div class="hero-stat__divider"></div>
            <div class="hero-stat">
              <div class="hero-stat__num">960</div>
              <div class="hero-stat__label">Unitlar</div>
            </div>
            <div class="hero-stat__divider"></div>
            <div class="hero-stat">
              <div class="hero-stat__num">118</div>
              <div class="hero-stat__label">Bo'sh maydon</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ BUILDINGS ============ -->
    <section id="buildings" class="buildings-section">
      <div class="section-header">
        <div class="section-eyebrow">TAVSIYA ETILGAN BINOLAR</div>
        <h2 class="section-title">Toshkentning premium obyektlari</h2>
      </div>

      <!-- Big featured building -->
      <div class="buildings-featured" @click="navigateTo('/buildings/tashkent-city')">
        <div class="buildings-featured__image">
          <img src="https://media.base44.com/images/public/6a78058ed735adc07d68319d/57f4f22c1_generated_image.png" alt="Tashkent City" />
          <div class="buildings-featured__badge">
            <div class="buildings-featured__badge-dot"></div>
            A+ SINF
          </div>
        </div>
        <div class="buildings-featured__content">
          <div class="buildings-featured__tag">Biznes markaz</div>
          <h3 class="buildings-featured__name">Tashkent City</h3>
          <p class="buildings-featured__address">
            <MapPin :size="14" /> Mirzo Ulug'bek tumani, Toshkent
          </p>
          <div class="buildings-featured__specs">
            <div class="buildings-featured__spec">
              <Layers :size="16" />
              <div><span>12</span> qavat</div>
            </div>
            <div class="buildings-featured__spec">
              <Building :size="16" />
              <div><span>420</span> unit</div>
            </div>
            <div class="buildings-featured__spec">
              <Ruler :size="16" />
              <div><span>45,000</span> m²</div>
            </div>
            <div class="buildings-featured__spec">
              <TrendingUp :size="16" />
              <div><span>42</span> bo'sh</div>
            </div>
          </div>
          <div class="buildings-featured__bottom">
            <div class="buildings-featured__price">
              <span class="buildings-featured__price-label">Ijaraga</span>
              <span class="buildings-featured__price-value">25M UZS/oy</span>
            </div>
            <span class="buildings-featured__btn">
              Batafsil <ArrowRight :size="16" />
            </span>
          </div>
        </div>
      </div>

      <!-- Building grid -->
      <div class="buildings-grid">
        <div v-for="b in otherBuildings" :key="b.id" class="building-card" @click="navigateTo(`/buildings/${b.slug}`)">
          <div class="building-card__image">
            <img :src="b.gallery" :alt="b.name" loading="lazy" />
            <div class="building-card__vacancy">
              <div class="building-card__vacancy-dot"></div>
              {{ b.vacantUnits }} bo'sh
            </div>
            <div class="building-card__type-badge">{{ b.typeLabel }}</div>
          </div>
          <div class="building-card__body">
            <h4 class="building-card__name">{{ b.name }}</h4>
            <p class="building-card__addr">
              <MapPin :size="13" /> {{ b.address }}
            </p>
            <div class="building-card__specs">
              <div class="building-card__spec"><Layers :size="13" /> {{ b.floorsCount }} qavat</div>
              <div class="building-card__spec"><Building :size="13" /> {{ b.totalUnits }} unit</div>
              <div class="building-card__spec"><Ruler :size="13" /> {{ b.totalArea }} m²</div>
            </div>
            <div class="building-card__footer">
              <span class="building-card__price">{{ b.priceMin }}/oy</span>
              <span class="building-card__view">Batafsil <ArrowRight :size="13" /></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ HOW IT WORKS ============ -->
    <section id="how-it-works" class="how-section">
      <div class="section-header">
        <div class="section-eyebrow">QANDAY ISHLAYDI</div>
        <h2 class="section-title">Katalogdan shartnomagacha — 4 qadam</h2>
      </div>
      <div class="how-steps">
        <div v-for="(step, i) in steps" :key="i" class="how-step">
          <div class="how-step__num">{{ i + 1 }}</div>
          <div class="how-step__icon">
            <component :is="step.icon" :size="24" />
          </div>
          <h4 class="how-step__title">{{ step.title }}</h4>
          <p class="how-step__desc">{{ step.desc }}</p>
          <div v-if="i < steps.length - 1" class="how-step__line"></div>
        </div>
      </div>
    </section>

    <!-- ============ PLATFORM FEATURES ============ -->
    <section class="platform-section">
      <div class="section-header">
        <div class="section-eyebrow">PLATFORMA IMKONIYATLARI</div>
        <h2 class="section-title">Bitta tizimda — 18 modul</h2>
      </div>
      <div class="platform-grid">
        <NuxtLink v-for="(f, i) in features" :key="i" :to="f.to" class="platform-card">
          <div class="platform-card__icon" :style="{ background: f.bg, color: f.color }">
            <component :is="f.icon" :size="20" />
          </div>
          <div class="platform-card__body">
            <h4 class="platform-card__title">{{ f.title }}</h4>
            <p class="platform-card__desc">{{ f.desc }}</p>
          </div>
          <ArrowRight :size="16" class="platform-card__arrow" />
        </NuxtLink>
      </div>
    </section>

    <!-- ============ CTA ============ -->
    <section id="contacts" class="cta-section">
      <div class="cta-card">
        <h2 class="cta-card__title">Binongizni MAKON ga qo'shing</h2>
        <p class="cta-card__text">
          Binongizni raqamlashtiring va ijara jarayonini to'liq boshqaring — ERI orqali xavfsiz shartnoma bilan.
        </p>
        <div class="cta-card__actions">
          <NuxtLink to="/register/eri" class="cta-card__btn cta-card__btn--primary">
            Ro'yxatdan o'tish <ArrowRight :size="16" />
          </NuxtLink>
          <a href="https://t.me/makon_bot" target="_blank" class="cta-card__btn cta-card__btn--secondary">
            <MessageCircle :size="16" /> Bog'lanish
          </a>
        </div>
      </div>
    </section>

    <!-- ============ FOOTER ============ -->
    <footer class="landing-footer">
      <div class="landing-footer__inner">
        <div class="landing-footer__brand">
          <div class="hero-nav__logo">
            <div class="hero-nav__logo-icon">M</div>
            <span>MAKON</span>
          </div>
          <p class="landing-footer__desc">Toshkentdagi premium ko'chmas mulk obyektlarini boshqarish va ijaraga berish uchun yagona raqamli platforma.</p>
        </div>
        <div class="landing-footer__col">
          <h5 class="landing-footer__heading">PLATFORMA</h5>
          <NuxtLink to="/catalog" class="landing-footer__link">Katalog</NuxtLink>
          <NuxtLink to="/login" class="landing-footer__link">Tizimga kirish</NuxtLink>
          <NuxtLink to="/register/eri" class="landing-footer__link">Ro'yxatdan o'tish</NuxtLink>
        </div>
        <div class="landing-footer__col">
          <h5 class="landing-footer__heading">BOG'LANISH</h5>
          <p class="landing-footer__text">Toshkent, O'zbekiston</p>
          <p class="landing-footer__text">+998 71 200 00 00</p>
          <p class="landing-footer__text">info@makon.uz</p>
        </div>
      </div>
      <div class="landing-footer__bottom">
        <span>© 2026 MAKON — ERI orqali xavfsiz platforma</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {
  Search, Building2, ShoppingBag, Warehouse, Store, ArrowRight, Layers, Building,
  ShieldCheck, FileSignature, Receipt, Wrench, Package, Gauge, BarChart3, MapPin,
  Ruler, TrendingUp, MessageCircle, UserRound, LayoutGrid
} from 'lucide-vue-next'

const heroSearch = ref('')
function goToCatalog() {
  navigateTo({ path: '/catalog', query: heroSearch.value ? { q: heroSearch.value } : {} })
}

const otherBuildings = [
  { id: 'b2', name: 'Trillant Tower', slug: 'trillant-tower', typeLabel: 'Biznes markaz', address: 'Yashnabad, Toshkent', floorsCount: 18, totalUnits: 180, totalArea: 28000, vacantUnits: 9, priceMin: '18M UZS', gallery: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/6daa9acc3_generated_image.png' },
  { id: 'b3', name: 'IT Park', slug: 'it-park', typeLabel: 'Ofis binosi', address: 'Yakkasaray, Toshkent', floorsCount: 8, totalUnits: 150, totalArea: 18000, vacantUnits: 27, priceMin: '12M UZS', gallery: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/41072e285_generated_image.png' },
  { id: 'b4', name: 'Piramit', slug: 'piramit', typeLabel: 'Aralash', address: 'Amir Temur, Toshkent', floorsCount: 10, totalUnits: 90, totalArea: 15000, vacantUnits: 20, priceMin: '15M UZS', gallery: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/3075330ac_generated_image.png' },
  { id: 'b5', name: 'Savdo Markaz', slug: 'savdo-markaz', typeLabel: 'Savdo markaz', address: 'Sergeli, Toshkent', floorsCount: 4, totalUnits: 120, totalArea: 12000, vacantUnits: 25, priceMin: '8M UZS', gallery: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/2292e635f_generated_image.png' },
]

const features = [
  { icon: Building2, title: 'Bino boshqaruvi', desc: 'Binolar, qavatlar, unitlar — to\'liq struktura', to: '/management/buildings', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
  { icon: FileSignature, title: 'ERI integratsiyasi', desc: 'Xavfsiz elektron imzo. Onlayn shartnomalar', to: '/eri/signatures', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
  { icon: Receipt, title: 'Moliya boshqaruvi', desc: 'Invoyslar, to\'lovlar, qarzdorlik monitoringi', to: '/finance/invoices', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
  { icon: Wrench, title: 'Xizmat ko\'rsatish', desc: 'Service request\'lar, work order\'lar, SLA', to: '/facility/work-orders', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
  { icon: Package, title: 'Ombor boshqaruvi', desc: 'Materiallar, qoldiqlar, sarflash monitoringi', to: '/finance/inventory', color: '#f97316', bg: 'rgba(249,115,22,0.1)' },
  { icon: Gauge, title: 'Hisoblagichlar', desc: 'Elektr, suv, gaz — avtomatik hisob-kitob', to: '/meters', color: '#06b6d4', bg: 'rgba(6,182,212,0.1)' },
  { icon: BarChart3, title: 'Hisobotlar va analitika', desc: 'Bandlik, daromad, konversiya — real-time', to: '/reports', color: '#ec4899', bg: 'rgba(236,72,153,0.1)' },
  { icon: ShieldCheck, title: 'Rollar va huquqlar', desc: '5 rol: SUPER_HEAD, ACCOUNTANT, FACILITY', to: '/admin/roles', color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
]

const steps = [
  { title: 'Katalogdan qidiring', desc: 'Bo\'sh maydonlarni filtrlash, taqqoslash va tanlash.', icon: Search },
  { title: 'Ariza yuboring', desc: 'ERI orqali ro\'yxatdan o\'tib, onlayn ariza qoldiring.', icon: UserRound },
  { title: 'Shartnoma tuzing', desc: 'Elektron imzo bilan xavfsiz shartnoma tuzing.', icon: FileSignature },
  { title: 'Boshqaring', desc: 'Kabinet orqali to\'lovlar, servislar va hisobotlar.', icon: LayoutGrid },
]
</script>

<style scoped>
.landing-page { overflow-x: hidden; }

/* HERO */
.hero-section { position: relative; min-height: 100vh; display: flex; flex-direction: column; overflow: hidden; }
.hero-bg { position: absolute; inset: 0; z-index: 0; }
.hero-bg__img { width: 100%; height: 100%; object-fit: cover; object-position: center; }
.hero-bg__overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(9,9,11,0.7) 0%, rgba(9,9,11,0.45) 40%, rgba(9,9,11,0.8) 100%); }

/* Nav */
.hero-nav { position: relative; z-index: 10; display: flex; align-items: center; justify-content: space-between; padding: 20px 48px; max-width: 1400px; margin: 0 auto; width: 100%; }
.hero-nav__logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.hero-nav__logo-icon { width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, #6366f1, #4f46e5); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 18px; color: white; box-shadow: 0 4px 20px rgba(99,102,241,0.4); }
.hero-nav__logo-text { font-weight: 800; font-size: 18px; color: white; letter-spacing: -0.02em; }
.hero-nav__links { display: flex; align-items: center; gap: 28px; }
.hero-nav__link { color: rgba(255,255,255,0.7); text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
.hero-nav__link:hover { color: white; }
.hero-nav__actions { display: flex; align-items: center; gap: 14px; }
.hero-nav__login { color: rgba(255,255,255,0.8); text-decoration: none; font-size: 14px; font-weight: 500; }
.hero-nav__login:hover { color: white; }
.hero-nav__cta { display: inline-flex; align-items: center; gap: 6px; background: white; color: #09090b; padding: 9px 18px; border-radius: 10px; font-size: 13px; font-weight: 600; text-decoration: none; transition: all 0.2s; }
.hero-nav__cta:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(255,255,255,0.2); }

/* Hero content */
.hero-content { position: relative; z-index: 5; flex: 1; display: flex; align-items: center; max-width: 1400px; margin: 0 auto; width: 100%; padding: 0 48px 80px; }
.hero-content__inner { flex: 1; max-width: 680px; }
.hero-title { font-size: 60px; font-weight: 800; color: white; letter-spacing: -0.035em; line-height: 1.05; margin-bottom: 20px; }
.hero-title__accent { background: linear-gradient(135deg, #818cf8, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.hero-subtitle { font-size: 17px; line-height: 1.65; color: rgba(255,255,255,0.65); margin-bottom: 36px; max-width: 520px; }

/* Search */
.hero-search { max-width: 560px; margin-bottom: 40px; }
.hero-search__bar { display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.95); border-radius: 14px; padding: 6px 6px 6px 18px; margin-bottom: 14px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
.hero-search__icon { color: #71717a; flex-shrink: 0; }
.hero-search__bar input { flex: 1; border: none; outline: none; background: transparent; font-size: 14px; color: #18181b; padding: 10px 0; }
.hero-search__bar input::placeholder { color: #a1a1aa; }
.hero-search__btn { display: inline-flex; align-items: center; gap: 6px; background: #6366f1; color: white; border: none; padding: 10px 20px; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
.hero-search__btn:hover { background: #4f46e5; }
.hero-chips { display: flex; flex-wrap: wrap; gap: 8px; }
.hero-chip { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.8); padding: 7px 14px; border-radius: 8px; font-size: 12px; font-weight: 500; text-decoration: none; transition: all 0.2s; backdrop-filter: blur(10px); }
.hero-chip:hover { background: rgba(255,255,255,0.2); color: white; }
.hero-chip--accent { background: #6366f1; border-color: #6366f1; color: white; }
.hero-chip--accent:hover { background: #4f46e5; }

/* Hero stats */
.hero-stats { display: flex; align-items: center; gap: 28px; }
.hero-stat__num { font-size: 32px; font-weight: 800; color: white; letter-spacing: -0.03em; line-height: 1; }
.hero-stat__label { font-size: 13px; color: rgba(255,255,255,0.5); margin-top: 4px; }
.hero-stat__divider { width: 1px; height: 36px; background: rgba(255,255,255,0.12); }

/* COMMON SECTIONS */
.section-header { text-align: center; max-width: 640px; margin: 0 auto 48px; }
.section-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.15em; color: #6366f1; margin-bottom: 10px; }
:deep(.dark) .section-eyebrow { color: #818cf8; }
.section-title { font-size: 36px; font-weight: 800; color: #18181b; letter-spacing: -0.025em; margin-bottom: 8px; }
:deep(.dark) .section-title { color: white; }

/* BUILDINGS */
.buildings-section { padding: 100px 48px; max-width: 1400px; margin: 0 auto; }
.buildings-featured { display: grid; grid-template-columns: 1.2fr 1fr; gap: 0; border-radius: 20px; overflow: hidden; margin-bottom: 32px; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.08); cursor: pointer; transition: all 0.3s; border: 1px solid rgba(0,0,0,0.06); }
:deep(.dark) .buildings-featured { background: #18181b; border-color: rgba(255,255,255,0.06); box-shadow: 0 1px 3px rgba(0,0,0,0.3); }
.buildings-featured:hover { box-shadow: 0 20px 60px rgba(0,0,0,0.12); transform: translateY(-2px); }
.buildings-featured__image { position: relative; aspect-ratio: 16/10; overflow: hidden; }
.buildings-featured__image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
.buildings-featured:hover .buildings-featured__image img { transform: scale(1.04); }
.buildings-featured__badge { position: absolute; top: 16px; left: 16px; display: flex; align-items: center; gap: 6px; background: rgba(99,102,241,0.95); color: white; padding: 6px 12px; border-radius: 8px; font-size: 10px; font-weight: 700; letter-spacing: 0.05em; backdrop-filter: blur(10px); }
.buildings-featured__badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #a5b4fc; }
.buildings-featured__content { padding: 36px; display: flex; flex-direction: column; justify-content: center; }
.buildings-featured__tag { display: inline-flex; align-self: flex-start; background: rgba(99,102,241,0.1); color: #6366f1; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; margin-bottom: 12px; }
.buildings-featured__name { font-size: 28px; font-weight: 800; color: #18181b; margin-bottom: 6px; letter-spacing: -0.02em; }
:deep(.dark) .buildings-featured__name { color: white; }
.buildings-featured__address { display: flex; align-items: center; gap: 4px; font-size: 14px; color: #71717a; margin-bottom: 24px; }
.buildings-featured__address svg { color: #a1a1aa; }
.buildings-featured__specs { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 28px; }
.buildings-featured__spec { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #71717a; }
.buildings-featured__spec svg { color: #6366f1; flex-shrink: 0; }
.buildings-featured__spec span { font-weight: 700; color: #18181b; }
:deep(.dark) .buildings-featured__spec span { color: white; }
.buildings-featured__bottom { display: flex; align-items: center; justify-content: space-between; margin-top: auto; }
.buildings-featured__price-label { font-size: 12px; color: #a1a1aa; display: block; }
.buildings-featured__price-value { font-size: 24px; font-weight: 800; color: #18181b; letter-spacing: -0.02em; }
:deep(.dark) .buildings-featured__price-value { color: white; }
.buildings-featured__btn { display: inline-flex; align-items: center; gap: 6px; background: #18181b; color: white; padding: 11px 22px; border-radius: 10px; font-size: 13px; font-weight: 600; transition: all 0.2s; }
.buildings-featured__btn:hover { background: #6366f1; }
:deep(.dark) .buildings-featured__btn { background: #6366f1; }
:deep(.dark) .buildings-featured__btn:hover { background: #4f46e5; }

/* Building cards */
.buildings-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.building-card { background: white; border-radius: 16px; overflow: hidden; border: 1px solid rgba(0,0,0,0.06); cursor: pointer; transition: all 0.3s; }
:deep(.dark) .building-card { background: #18181b; border-color: rgba(255,255,255,0.06); }
.building-card:hover { box-shadow: 0 20px 50px rgba(0,0,0,0.12); transform: translateY(-4px); }
.building-card__image { position: relative; aspect-ratio: 16/10; overflow: hidden; }
.building-card__image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
.building-card:hover .building-card__image img { transform: scale(1.05); }
.building-card__vacancy { position: absolute; top: 10px; right: 10px; display: flex; align-items: center; gap: 5px; background: rgba(255,255,255,0.95); color: #16a34a; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; backdrop-filter: blur(10px); }
.building-card__vacancy-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; }
.building-card__type-badge { position: absolute; bottom: 10px; left: 10px; background: rgba(0,0,0,0.6); color: white; padding: 4px 10px; border-radius: 6px; font-size: 10px; font-weight: 600; backdrop-filter: blur(10px); }
.building-card__body { padding: 18px; }
.building-card__name { font-size: 16px; font-weight: 700; color: #18181b; margin-bottom: 4px; }
:deep(.dark) .building-card__name { color: white; }
.building-card__addr { display: flex; align-items: center; gap: 3px; font-size: 12px; color: #71717a; margin-bottom: 12px; }
.building-card__addr svg { color: #a1a1aa; flex-shrink: 0; }
.building-card__specs { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 14px; }
.building-card__spec { display: flex; align-items: center; gap: 4px; font-size: 11px; color: #71717a; }
.building-card__spec svg { color: #a1a1aa; }
.building-card__footer { display: flex; align-items: center; justify-content: space-between; padding-top: 12px; border-top: 1px solid rgba(0,0,0,0.05); }
:deep(.dark) .building-card__footer { border-color: rgba(255,255,255,0.06); }
.building-card__price { font-size: 14px; font-weight: 700; color: #18181b; }
:deep(.dark) .building-card__price { color: white; }
.building-card__view { display: flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 600; color: #6366f1; }

/* HOW IT WORKS */
.how-section { padding: 80px 48px; max-width: 1400px; margin: 0 auto; }
.how-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; position: relative; }
.how-step { text-align: center; position: relative; }
.how-step__num { width: 32px; height: 32px; border-radius: 50%; background: rgba(99,102,241,0.1); color: #6366f1; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; margin: 0 auto 16px; }
.how-step__icon { width: 56px; height: 56px; border-radius: 16px; background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(99,102,241,0.05)); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: #6366f1; }
:deep(.dark) .how-step__icon { background: rgba(99,102,241,0.15); }
.how-step__title { font-size: 16px; font-weight: 700; color: #18181b; margin-bottom: 6px; }
:deep(.dark) .how-step__title { color: white; }
.how-step__desc { font-size: 13px; color: #71717a; line-height: 1.5; max-width: 220px; margin: 0 auto; }
.how-step__line { position: absolute; top: 16px; right: -12px; width: 24px; height: 1px; background: rgba(99,102,241,0.2); }

/* PLATFORM FEATURES */
.platform-section { padding: 80px 48px 100px; max-width: 1400px; margin: 0 auto; }
.platform-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.platform-card { display: flex; align-items: flex-start; gap: 14px; padding: 22px; background: white; border-radius: 16px; border: 1px solid rgba(0,0,0,0.06); text-decoration: none; transition: all 0.25s cubic-bezier(0.25,0.1,0.25,1); }
:deep(.dark) .platform-card { background: #18181b; border-color: rgba(255,255,255,0.06); }
.platform-card:hover { box-shadow: 0 12px 32px rgba(0,0,0,0.06); transform: translateY(-2px); border-color: rgba(99,102,241,0.15); }
.platform-card__icon { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.platform-card__body { flex: 1; min-width: 0; }
.platform-card__title { font-size: 14px; font-weight: 700; color: #18181b; margin-bottom: 4px; }
:deep(.dark) .platform-card__title { color: white; }
.platform-card__desc { font-size: 12px; color: #71717a; line-height: 1.5; }
.platform-card__arrow { color: #a1a1aa; opacity: 0; transition: opacity 0.2s, transform 0.2s; transform: translateX(-4px); flex-shrink: 0; }
.platform-card:hover .platform-card__arrow { opacity: 1; transform: translateX(0); color: #6366f1; }

/* CTA */
.cta-section { padding: 60px 48px 100px; max-width: 1400px; margin: 0 auto; }
.cta-card { background: linear-gradient(135deg, #18181b 0%, #27272a 100%); border-radius: 24px; padding: 56px 48px; text-align: center; }
.cta-card__title { font-size: 32px; font-weight: 800; color: white; margin-bottom: 12px; letter-spacing: -0.025em; }
.cta-card__text { font-size: 15px; color: rgba(255,255,255,0.6); line-height: 1.6; max-width: 480px; margin: 0 auto 28px; }
.cta-card__actions { display: flex; align-items: center; justify-content: center; gap: 12px; }
.cta-card__btn { display: inline-flex; align-items: center; gap: 6px; padding: 12px 24px; border-radius: 10px; font-size: 14px; font-weight: 600; text-decoration: none; transition: all 0.2s; }
.cta-card__btn--primary { background: white; color: #09090b; }
.cta-card__btn--primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(255,255,255,0.2); }
.cta-card__btn--secondary { background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.15); }
.cta-card__btn--secondary:hover { background: rgba(255,255,255,0.15); }

/* FOOTER */
.landing-footer { background: #09090b; padding: 48px 48px 24px; }
.landing-footer__inner { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 48px; padding-bottom: 32px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.landing-footer__brand { }
.landing-footer__desc { font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.6; margin-top: 14px; max-width: 320px; }
.landing-footer__col { }
.landing-footer__heading { font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.5); letter-spacing: 0.1em; margin-bottom: 14px; }
.landing-footer__link { display: block; font-size: 13px; color: rgba(255,255,255,0.4); text-decoration: none; margin-bottom: 8px; transition: color 0.2s; }
.landing-footer__link:hover { color: white; }
.landing-footer__text { font-size: 13px; color: rgba(255,255,255,0.4); margin-bottom: 8px; }
.landing-footer__bottom { max-width: 1400px; margin: 0 auto; padding-top: 24px; text-align: center; }
.landing-footer__bottom span { font-size: 12px; color: rgba(255,255,255,0.3); }

/* RESPONSIVE */
@media (max-width: 1024px) {
  .hero-nav__links { display: none; }
  .hero-content { padding: 0 24px 60px; }
  .hero-title { font-size: 42px; }
  .buildings-featured { grid-template-columns: 1fr; }
  .buildings-grid { grid-template-columns: repeat(2, 1fr); }
  .how-steps { grid-template-columns: repeat(2, 1fr); gap: 32px; }
  .how-step__line { display: none; }
  .platform-grid { grid-template-columns: repeat(2, 1fr); }
  .landing-footer__inner { grid-template-columns: 1fr; gap: 32px; }
  .buildings-section, .how-section, .platform-section, .cta-section { padding: 60px 24px; }
  .landing-footer { padding: 32px 24px 16px; }
}
@media (max-width: 640px) {
  .hero-nav { padding: 16px 20px; }
  .hero-content { padding: 0 20px 40px; }
  .hero-title { font-size: 32px; }
  .hero-subtitle { font-size: 14px; }
  .hero-stats { gap: 16px; }
  .hero-stat__num { font-size: 24px; }
  .buildings-grid { grid-template-columns: 1fr; }
  .platform-grid { grid-template-columns: 1fr; }
  .how-steps { grid-template-columns: 1fr; }
  .cta-card { padding: 36px 24px; }
  .cta-card__title { font-size: 24px; }
  .cta-card__actions { flex-direction: column; }
  .section-title { font-size: 26px; }
}
</style>
