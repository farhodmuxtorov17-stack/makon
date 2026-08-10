<template>
  <div class="landing-page">
    <!-- ============ HERO ============ -->
    <section class="hero-section">
      <!-- Background -->
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
          <a href="#catalog" class="hero-nav__link">Katalog</a>
          <a href="#how" class="hero-nav__link">Imkoniyatlar</a>
          <a href="#buildings" class="hero-nav__link">Binolar</a>
          <a href="#contacts" class="hero-nav__link">Bog'lanish</a>
        </div>
        <div class="hero-nav__actions">
          <ThemeToggle />
          <NuxtLink to="/login" class="hero-nav__login">Kirish</NuxtLink>
          <NuxtLink to="/register/eri" class="hero-nav__cta">Ro'yxatdan o'tish</NuxtLink>
        </div>
      </nav>

      <!-- Hero content -->
      <div class="hero-content">
        <div class="hero-badge">
          <span class="hero-badge__dot"></span>
          Toshkent #1 tijoriy ko'chmas mulk platformasi
        </div>
        <h1 class="hero-title">
          Biznesingiz uchun<br>
          <span class="hero-title__accent">mukammal maydon</span>
        </h1>
        <p class="hero-subtitle">
          Tashkent City, Trillant Tower, IT Park va boshqa premium binolarda ofis, savdo va ombor maydonlari. ERI orqali xavfsiz shartnoma tuzish va to'liq boshqaruv — bitta tizimda.
        </p>

        <!-- Search -->
        <div class="hero-search">
          <div class="hero-search__bar">
            <Search :size="18" class="hero-search__icon" />
            <input v-model="heroSearch" type="text" placeholder="Bino, maydon turi yoki manzil bo'yicha qidiring..." @keyup.enter="goToCatalog" />
            <button class="hero-search__btn" @click="goToCatalog">Qidirish</button>
          </div>
          <div class="hero-chips">
            <NuxtLink to="/catalog?offerType=RENT" class="hero-chip">
              <Building2 :size="14" /> Ijaraga
            </NuxtLink>
            <NuxtLink to="/catalog?offerType=SALE" class="hero-chip">
              <ShoppingBag :size="14" /> Sotuvda
            </NuxtLink>
            <NuxtLink to="/catalog?type=WAREHOUSE" class="hero-chip">
              <Warehouse :size="14" /> Ombor
            </NuxtLink>
            <NuxtLink to="/catalog?type=SHOPPING" class="hero-chip">
              <Store :size="14" /> Savdo
            </NuxtLink>
            <NuxtLink to="/catalog" class="hero-chip hero-chip--accent">
              Barchasi <ArrowRight :size="14" />
            </NuxtLink>
          </div>
        </div>

        <!-- Stats -->
        <div class="hero-stats">
          <div class="hero-stat">
            <div class="hero-stat__num">12</div>
            <div class="hero-stat__label">Premium binolar</div>
          </div>
          <div class="hero-stat__divider"></div>
          <div class="hero-stat">
            <div class="hero-stat__num">47</div>
            <div class="hero-stat__label">Bo'sh maydonlar</div>
          </div>
          <div class="hero-stat__divider"></div>
          <div class="hero-stat">
            <div class="hero-stat__num">420</div>
            <div class="hero-stat__label">Jami unitlar</div>
          </div>
          <div class="hero-stat__divider"></div>
          <div class="hero-stat">
            <div class="hero-stat__num">89%</div>
            <div class="hero-stat__label">Bandlik</div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="hero-scroll">
        <div class="hero-scroll__line"></div>
        <span>Pastga</span>
      </div>
    </section>

    <!-- ============ TRUST BAR ============ -->
    <section class="trust-bar">
      <div class="trust-bar__inner">
        <div class="trust-item">
          <ShieldCheck :size="16" class="trust-item__icon" />
          ERI integratsiyasi
        </div>
        <div class="trust-item">
          <FileCheck2 :size="16" class="trust-item__icon" />
          18 modul
        </div>
        <div class="trust-item">
          <Users :size="16" class="trust-item__icon" />
          5 rol
        </div>
        <div class="trust-item">
          <Building2 :size="16" class="trust-item__icon" />
          322 jadval
        </div>
        <div class="trust-item">
          <Zap :size="16" class="trust-item__icon" />
          Real-time monitoring
        </div>
      </div>
    </section>

    <!-- ============ PREMIUM LISTINGS ============ -->
    <section id="catalog" class="premium-section">
      <div class="premium-section__header">
        <div>
          <div class="premium-section__eyebrow">PREMIUM OB'EKTLAR</div>
          <h2 class="premium-section__title">Bo'sh premium maydonlar</h2>
        </div>
        <NuxtLink to="/catalog" class="premium-section__link">
          To'liq katalog <ArrowRight :size="16" />
        </NuxtLink>
      </div>

      <div class="premium-grid">
        <div v-for="(item, i) in premiumListings" :key="i" class="premium-card" @click="navigateTo(`/listings/${item.id}`)">
          <div class="premium-card__image">
            <img :src="item.photos[0]" :alt="item.titleUz" loading="lazy" />
            <div class="premium-card__badge">{{ item.offerType === 'RENT' ? 'Ijaraga' : 'Sotuvda' }}</div>
            <div class="premium-card__overlay">
              <div class="premium-card__price">{{ formatPrice(item.price) }}</div>
              <div class="premium-card__title">{{ item.titleUz }}</div>
              <div class="premium-card__meta">{{ item.area }} m² · {{ item.building }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ FEATURED BUILDINGS ============ -->
    <section id="buildings" class="buildings-section">
      <div class="buildings-section__header">
        <div class="premium-section__eyebrow">TAVSIYA ETILGAN BINOLAR</div>
        <h2 class="buildings-section__title">Toshkentning premium obyektlari</h2>
        <p class="buildings-section__subtitle">Bo'sh maydonlar mavjud real biznes markazlar</p>
      </div>

      <!-- Big featured building -->
      <div class="buildings-featured" @click="navigateTo('/buildings/tashkent-city')">
        <div class="buildings-featured__image">
          <img src="https://media.base44.com/images/public/6a78058ed735adc07d68319d/57f4f22c1_generated_image.png" alt="Tashkent City" />
        </div>
        <div class="buildings-featured__content">
          <div class="buildings-featured__tag">Biznes markaz</div>
          <h3 class="buildings-featured__name">Tashkent City</h3>
          <p class="buildings-featured__address">Mirzo Ulug'bek tumani, Toshkent</p>
          <div class="buildings-featured__specs">
            <div class="buildings-featured__spec"><span>12</span> qavat</div>
            <div class="buildings-featured__spec"><span>420</span> unit</div>
            <div class="buildings-featured__spec"><span>45,000</span> m²</div>
            <div class="buildings-featured__spec"><span>42</span> bo'sh</div>
          </div>
          <div class="buildings-featured__price">
            <span class="buildings-featured__price-label">Ishlash narxi</span>
            <span class="buildings-featured__price-value">25M so'm/oy</span>
          </div>
          <NuxtLink to="/buildings/tashkent-city" class="buildings-featured__btn">
            Batafsil ko'rish <ArrowRight :size="16" />
          </NuxtLink>
        </div>
      </div>

      <!-- Building grid -->
      <div class="buildings-grid">
        <div v-for="b in otherBuildings" :key="b.id" class="building-card" @click="navigateTo(`/buildings/${b.slug}`)">
          <div class="building-card__image">
            <img :src="b.gallery" :alt="b.name" loading="lazy" />
            <div class="building-card__vacancy">{{ b.vacantUnits }} bo'sh</div>
          </div>
          <div class="building-card__body">
            <div class="building-card__type">{{ b.typeLabel }}</div>
            <h4 class="building-card__name">{{ b.name }}</h4>
            <p class="building-card__addr">{{ b.address }}</p>
            <div class="building-card__specs">
              <span>{{ b.floorsCount }} qavat</span>
              <span>·</span>
              <span>{{ b.totalUnits }} unit</span>
              <span>·</span>
              <span>{{ b.totalArea }} m²</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ FEATURES ============ -->
    <section id="how" class="features-section">
      <div class="features-section__header">
        <div class="premium-section__eyebrow">PLATFORMA IMKONIYATLARI</div>
        <h2 class="features-section__title">18 modul, 322 jadval va 51 yo'nalish</h2>
        <p class="features-section__subtitle">Ko'chmas mulkni boshqarishning to'liq raqamli ekotizimi</p>
      </div>

      <div class="features-grid">
        <div v-for="(f, i) in features" :key="i" class="feature-card">
          <div class="feature-card__icon" :class="f.color">
            <component :is="f.icon" :size="22" />
          </div>
          <h4 class="feature-card__title">{{ f.title }}</h4>
          <p class="feature-card__desc">{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ============ OFFICE SHOWCASE ============ -->
    <section class="showcase-section">
      <div class="showcase-section__image">
        <img src="https://media.base44.com/images/public/6a78058ed735adc07d68319d/337ead24c_generated_image.png" alt="Premium office interior" />
        <div class="showcase-section__overlay"></div>
      </div>
      <div class="showcase-section__content">
        <div class="premium-section__eyebrow">INTERERLAR</div>
        <h2 class="showcase-section__title">Premium ofis maydonlari</h2>
        <p class="showcase-section__text">
          Tashkent City va Trillant Tower'da joylashgan zamonaviy ofis xonalari — pardali oynalar, dizayner yoritish va panjarali bo'linishlar bilan. Har bir maydon biznesingiz uchun mukammal muhit yaratadi.
        </p>
        <div class="showcase-section__features">
          <div class="showcase-feature">
            <div class="showcase-feature__num">85-200</div>
            <div class="showcase-feature__label">m² maydon</div>
          </div>
          <div class="showcase-feature">
            <div class="showcase-feature__num">24/7</div>
            <div class="showcase-feature__label">Kirish</div>
          </div>
          <div class="showcase-feature">
            <div class="showcase-feature__num">A+</div>
            <div class="showcase-feature__label">Sinf</div>
          </div>
        </div>
        <NuxtLink to="/catalog?type=OFFICE" class="showcase-section__btn">
          Ofislarni ko'rish <ArrowRight :size="16" />
        </NuxtLink>
      </div>
    </section>

    <!-- ============ HOW IT WORKS ============ -->
    <section class="how-section">
      <div class="how-section__header">
        <div class="premium-section__eyebrow">QANDAY ISHLAYDI</div>
        <h2 class="how-section__title">Katalogdan shartnomagacha — 4 qadam</h2>
      </div>
      <div class="how-steps">
        <div v-for="(step, i) in steps" :key="i" class="how-step">
          <div class="how-step__num">{{ i + 1 }}</div>
          <h4 class="how-step__title">{{ step.title }}</h4>
          <p class="how-step__desc">{{ step.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ============ STATS ============ -->
    <section class="stats-section">
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-item__num">12</div>
          <div class="stat-item__label">Boshqariladigan binolar</div>
        </div>
        <div class="stat-item">
          <div class="stat-item__num">420</div>
          <div class="stat-item__label">Jami unitlar</div>
        </div>
        <div class="stat-item">
          <div class="stat-item__num">47</div>
          <div class="stat-item__label">Bo'sh maydonlar</div>
        </div>
        <div class="stat-item">
          <div class="stat-item__num">89%</div>
          <div class="stat-item__label">Bandlik darajasi</div>
        </div>
      </div>
    </section>

    <!-- ============ CTA ============ -->
    <section id="contacts" class="cta-section">
      <div class="cta-card">
        <h2 class="cta-card__title">Binongizni MAKON ga qo'shing</h2>
        <p class="cta-card__text">
          Binongizni raqamlashtiring, bo'sh maydonlarni avtomatik katalogga chiqaring va ijara jarayonini to'liq boshqaring — ERI orqali xavfsiz shartnoma tuzish bilan.
        </p>
        <div class="cta-card__actions">
          <NuxtLink to="/register/eri" class="cta-card__btn cta-card__btn--primary">Ro'yxatdan o'tish</NuxtLink>
          <a href="mailto:info@makon.uz" class="cta-card__btn cta-card__btn--secondary">Bog'lanish</a>
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
        <span>© 2026 MAKON. Barcha huquqlar himoyalangan.</span>
        <span class="landing-footer__badge">ERI orqali xavfsiz identifikatsiya</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {
  Building2, ShoppingBag, Warehouse, Store, Briefcase, ShieldCheck,
  FileCheck2, Users, Zap, Search, ArrowRight, Receipt, Wrench,
  BarChart3, Gauge, Package, Building,
} from 'lucide-vue-next'

definePageMeta({ layout: 'public' })

const heroSearch = ref('')
function goToCatalog() {
  const q = heroSearch.value ? `?search=${encodeURIComponent(heroSearch.value)}` : ''
  navigateTo(`/catalog${q}`)
}

const premiumListings = [
  { id: 'l1', titleUz: 'A-301 · 85 m² ofis', building: 'Tashkent City', area: 85, offerType: 'RENT', price: 25000000, currency: 'UZS', photos: ['https://media.base44.com/images/public/6a78058ed735adc07d68319d/337ead24c_generated_image.png'] },
  { id: 'l2', titleUz: 'B-501 · 120 m² premium ofis', building: 'Trillant Tower', area: 120, offerType: 'RENT', price: 35000000, currency: 'UZS', photos: ['https://media.base44.com/images/public/6a78058ed735adc07d68319d/6daa9acc3_generated_image.png'] },
  { id: 'l3', titleUz: 'C-201 · 65 m² savdo maydoni', building: 'IT Park', area: 65, offerType: 'RENT', price: 18000000, currency: 'UZS', photos: ['https://media.base44.com/images/public/6a78058ed735adc07d68319d/41072e285_generated_image.png'] },
  { id: 'l4', titleUz: 'D-102 · 200 m² savdo maydoni', building: 'Piramit', area: 200, offerType: 'RENT', price: 15000000, currency: 'UZS', photos: ['https://media.base44.com/images/public/6a78058ed735adc07d68319d/2292e635f_generated_image.png'] },
  { id: 'l5', titleUz: 'E-301 · 42 m² do\'kon', building: 'Savdo Markaz', area: 42, offerType: 'SALE', price: 450000000, currency: 'UZS', photos: ['https://media.base44.com/images/public/6a78058ed735adc07d68319d/2292e635f_generated_image.png'] },
  { id: 'l6', titleUz: 'A-205 · 50 m² ofis', building: 'Tashkent City', area: 50, offerType: 'RENT', price: 15000000, currency: 'UZS', photos: ['https://media.base44.com/images/public/6a78058ed735adc07d68319d/337ead24c_generated_image.png'] },
]

const otherBuildings = [
  { id: 'b2', name: 'Trillant Tower', slug: 'trillant-tower', typeLabel: 'Biznes markaz', address: 'Yashnabad, Toshkent', floorsCount: 18, totalUnits: 180, totalArea: 28000, vacantUnits: 9, gallery: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/6daa9acc3_generated_image.png' },
  { id: 'b3', name: 'IT Park', slug: 'it-park', typeLabel: 'Ofis binosi', address: 'Yakkasaray, Toshkent', floorsCount: 8, totalUnits: 150, totalArea: 18000, vacantUnits: 27, gallery: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/41072e285_generated_image.png' },
  { id: 'b4', name: 'Piramit', slug: 'piramit', typeLabel: 'Aralash', address: 'Amir Temur, Toshkent', floorsCount: 10, totalUnits: 90, totalArea: 15000, vacantUnits: 20, gallery: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/3075330ac_generated_image.png' },
  { id: 'b5', name: 'Savdo Markaz', slug: 'savdo-markaz', typeLabel: 'Savdo markaz', address: 'Sergeli, Toshkent', floorsCount: 4, totalUnits: 120, totalArea: 12000, vacantUnits: 25, gallery: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/2292e635f_generated_image.png' },
]

const features = [
  { icon: Building2, title: 'Bino boshqaruvi', desc: "Binolar, qavatlar, unitlar — to'liq struktura. 3D ko'rinish va 2D planlar bilan.", color: 'text-brand-500 bg-brand-500/10' },
  { icon: FileCheck2, title: 'ERI integratsiyasi', desc: "Yuridik shaxslar uchun xavfsiz elektron imzo. Shartnomalarni onlayn imzolang.", color: 'text-purple-500 bg-purple-500/10' },
  { icon: Receipt, title: 'Moliya boshqaruvi', desc: "Invoyslar, to'lovlar, qarzdorlik monitoringi. Avtomatik hisob-kitob va hisobotlar.", color: 'text-emerald-500 bg-emerald-500/10' },
  { icon: Wrench, title: "Xizmat ko'rsatish", desc: "Service request'lar, work order'lar, SLA monitoringi. Faol topshiriqlarni boshqaring.", color: 'text-amber-500 bg-amber-500/10' },
  { icon: Package, title: 'Ombor boshqaruvi', desc: "Materiallar, qoldiqlar, sarflash monitoringi. Kam qolgan materiallarni avtomatik ogohlantirish.", color: 'text-orange-500 bg-orange-500/10' },
  { icon: Gauge, title: 'Hisoblagichlar', desc: "Elektr, suv, gaz ko'rsatkichlari. Tariflar bo'yicha avtomatik hisob-kitob.", color: 'text-blue-500 bg-blue-500/10' },
  { icon: BarChart3, title: 'Hisobotlar va analitika', desc: "Bandlik dinamikasi, daromad, konversiya. Real-time dashboard va hisobotlar.", color: 'text-pink-500 bg-pink-500/10' },
  { icon: ShieldCheck, title: 'Rollar va huquqlar', desc: "5 rol: SUPER_HEAD, BUILDING_MANAGER, ACCOUNTANT, FACILITY, TENANT_OWNER.", color: 'text-indigo-500 bg-indigo-500/10' },
  { icon: Building, title: 'Katalog va listinglar', desc: "Ochiq katalog, listinglar, virtual turlar. Ko'rishlar statistikasi.", color: 'text-cyan-500 bg-cyan-500/10' },
]

const steps = [
  { title: 'Katalogdan qidiring', desc: "Bo'sh maydonlarni filtrlash, taqqoslash va tanlash." },
  { title: 'Ariza yuboring', desc: "ERI orqali ro'yxatdan o'tib, onlayn ariza qoldiring." },
  { title: 'Shartnoma tuzing', desc: "Elektron imzo bilan xavfsiz shartnoma tuzing." },
  { title: 'Boshqaring', desc: "Kabinet orqali to'lovlar, servislar va hisobotlar." },
]

function formatPrice(v: number) {
  if (v >= 1_000_000_000) return (v / 1_000_000_000).toFixed(1) + ' mlrd so\'m'
  if (v >= 1_000_000) return (v / 1_000_000).toFixed(0) + 'M so\'m'
  return new Intl.NumberFormat('ru-RU').format(v) + ' so\'m'
}
</script>

<style scoped>
/* ============ HERO ============ */
.landing-page { overflow-x: hidden; }

.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.hero-bg__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.hero-bg__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(9,9,11,0.75) 0%, rgba(9,9,11,0.5) 40%, rgba(9,9,11,0.85) 100%);
}
:deep(.dark) .hero-bg__overlay {
  background: linear-gradient(180deg, rgba(9,9,11,0.85) 0%, rgba(9,9,11,0.6) 40%, rgba(9,9,11,0.95) 100%);
}

/* Nav */
.hero-nav {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 48px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}
.hero-nav__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}
.hero-nav__logo-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 18px;
  color: white;
  box-shadow: 0 4px 20px rgba(99,102,241,0.4);
}
.hero-nav__logo-text {
  font-weight: 800;
  font-size: 18px;
  color: white;
  letter-spacing: -0.02em;
}
.hero-nav__links {
  display: flex;
  align-items: center;
  gap: 28px;
}
.hero-nav__link {
  color: rgba(255,255,255,0.7);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
}
.hero-nav__link:hover { color: white; }
.hero-nav__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
.hero-nav__login {
  color: rgba(255,255,255,0.8);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
}
.hero-nav__login:hover { color: white; }
.hero-nav__cta {
  padding: 8px 18px;
  border-radius: 10px;
  background: rgba(255,255,255,0.95);
  color: #18181b;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s, background 0.2s;
}
.hero-nav__cta:hover {
  background: white;
  transform: translateY(-1px);
}

/* Hero content */
.hero-content {
  position: relative;
  z-index: 5;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 24px;
  max-width: 900px;
  margin: 0 auto;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 16px;
  border-radius: 100px;
  background: rgba(99,102,241,0.15);
  border: 1px solid rgba(99,102,241,0.3);
  color: #a5b4fc;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 24px;
  backdrop-filter: blur(12px);
}
.hero-badge__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #6366f1;
  box-shadow: 0 0 12px #6366f1;
  animation: pulse 2s infinite;
}
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

.hero-title {
  font-size: clamp(36px, 6vw, 64px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: white;
  margin: 0 0 20px;
}
.hero-title__accent {
  background: linear-gradient(135deg, #818cf8, #6366f1, #a78bfa);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero-subtitle {
  font-size: clamp(15px, 2vw, 18px);
  line-height: 1.6;
  color: rgba(255,255,255,0.7);
  max-width: 640px;
  margin: 0 0 36px;
}

/* Search */
.hero-search { width: 100%; max-width: 640px; }
.hero-search__bar {
  display: flex;
  align-items: center;
  gap: 0;
  background: rgba(255,255,255,0.95);
  border-radius: 16px;
  padding: 6px 6px 6px 18px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  backdrop-filter: blur(20px);
}
.hero-search__icon { color: #71717a; flex-shrink: 0; }
.hero-search__bar input {
  flex: 1;
  border: none;
  outline: none;
  padding: 14px 12px;
  font-size: 15px;
  background: transparent;
  color: #18181b;
}
.hero-search__btn {
  padding: 12px 24px;
  border-radius: 12px;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
  white-space: nowrap;
}
.hero-search__btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(99,102,241,0.4);
}
.hero-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
}
.hero-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 100px;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.85);
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
  backdrop-filter: blur(12px);
}
.hero-chip:hover {
  background: rgba(255,255,255,0.2);
  color: white;
  transform: translateY(-1px);
}
.hero-chip--accent {
  background: rgba(99,102,241,0.3);
  border-color: rgba(99,102,241,0.5);
  color: #c7d2fe;
}
.hero-chip--accent:hover {
  background: rgba(99,102,241,0.4);
}

/* Stats */
.hero-stats {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-top: 48px;
}
.hero-stat__num {
  font-size: 36px;
  font-weight: 800;
  color: white;
  letter-spacing: -0.02em;
}
.hero-stat__label {
  font-size: 13px;
  color: rgba(255,255,255,0.5);
  margin-top: 2px;
}
.hero-stat__divider {
  width: 1px;
  height: 40px;
  background: rgba(255,255,255,0.15);
}

/* Scroll indicator */
.hero-scroll {
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding-bottom: 32px;
  color: rgba(255,255,255,0.4);
  font-size: 12px;
}
.hero-scroll__line {
  width: 1px;
  height: 40px;
  background: linear-gradient(180deg, transparent, rgba(255,255,255,0.4));
  animation: scrollLine 2s infinite;
}
@keyframes scrollLine {
  0% { transform: scaleY(0); transform-origin: top; }
  50% { transform: scaleY(1); transform-origin: top; }
  51% { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}

/* ============ TRUST BAR ============ */
.trust-bar {
  padding: 16px 24px;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  background: #ffffff;
}
:deep(.dark) .trust-bar {
  background: #09090b;
  border-color: rgba(255,255,255,0.05);
}
.trust-bar__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
}
.trust-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #71717a;
}
.trust-item__icon { color: #6366f1; }

/* ============ COMMON ============ */
.premium-section__eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #6366f1;
  margin-bottom: 12px;
}

/* ============ PREMIUM LISTINGS ============ */
.premium-section {
  padding: 80px 24px;
  max-width: 1400px;
  margin: 0 auto;
}
.premium-section__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 16px;
}
.premium-section__title {
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #18181b;
}
:deep(.dark) .premium-section__title { color: white; }
.premium-section__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #6366f1;
  text-decoration: none;
  transition: gap 0.2s;
}
.premium-section__link:hover { gap: 10px; }

.premium-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
@media (max-width: 1024px) { .premium-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .premium-grid { grid-template-columns: 1fr; } }

.premium-card {
  cursor: pointer;
  border-radius: 20px;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}
:deep(.dark) .premium-card {
  background: #18181b;
  border-color: rgba(255,255,255,0.05);
}
.premium-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}
.premium-card__image {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
}
.premium-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}
.premium-card:hover .premium-card__image img { transform: scale(1.05); }
.premium-card__badge {
  position: absolute;
  top: 14px;
  left: 14px;
  padding: 5px 12px;
  border-radius: 100px;
  background: rgba(99,102,241,0.95);
  color: white;
  font-size: 11px;
  font-weight: 600;
  backdrop-filter: blur(8px);
}
.premium-card__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(0deg, rgba(0,0,0,0.8), transparent);
}
.premium-card__price {
  font-size: 18px;
  font-weight: 800;
  color: white;
  margin-bottom: 4px;
}
.premium-card__title {
  font-size: 14px;
  color: rgba(255,255,255,0.9);
  font-weight: 600;
  margin-bottom: 2px;
}
.premium-card__meta {
  font-size: 12px;
  color: rgba(255,255,255,0.6);
}

/* ============ BUILDINGS ============ */
.buildings-section {
  padding: 80px 24px;
  background: rgba(99,102,241,0.02);
}
:deep(.dark) .buildings-section { background: rgba(99,102,241,0.05); }
.buildings-section__header {
  text-align: center;
  margin-bottom: 48px;
}
.buildings-section__title {
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #18181b;
  margin: 0 0 8px;
}
:deep(.dark) .buildings-section__title { color: white; }
.buildings-section__subtitle {
  font-size: 15px;
  color: #71717a;
}

/* Featured building */
.buildings-featured {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 0;
  border-radius: 24px;
  overflow: hidden;
  max-width: 1200px;
  margin: 0 auto 40px;
  cursor: pointer;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.05);
  transition: box-shadow 0.3s;
}
:deep(.dark) .buildings-featured {
  background: #18181b;
  border-color: rgba(255,255,255,0.05);
}
.buildings-featured:hover { box-shadow: 0 30px 60px rgba(0,0,0,0.1); }
@media (max-width: 768px) { .buildings-featured { grid-template-columns: 1fr; } }

.buildings-featured__image {
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;
}
.buildings-featured__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.buildings-featured__content {
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.buildings-featured__tag {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #6366f1;
  margin-bottom: 10px;
}
.buildings-featured__name {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #18181b;
  margin: 0 0 6px;
}
:deep(.dark) .buildings-featured__name { color: white; }
.buildings-featured__address {
  font-size: 14px;
  color: #71717a;
  margin: 0 0 24px;
}
.buildings-featured__specs {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 24px;
}
.buildings-featured__spec {
  font-size: 13px;
  color: #71717a;
}
.buildings-featured__spec span {
  font-weight: 800;
  font-size: 18px;
  color: #18181b;
  display: block;
}
:deep(.dark) .buildings-featured__spec span { color: white; }
.buildings-featured__price {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  border-radius: 12px;
  background: rgba(99,102,241,0.06);
  margin-bottom: 20px;
}
.buildings-featured__price-label {
  font-size: 12px;
  color: #71717a;
}
.buildings-featured__price-value {
  font-size: 18px;
  font-weight: 800;
  color: #6366f1;
}
.buildings-featured__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 12px 20px;
  border-radius: 12px;
  background: #18181b;
  color: white;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: gap 0.2s;
  align-self: flex-start;
}
:deep(.dark) .buildings-featured__btn { background: white; color: #18181b; }
.buildings-featured__btn:hover { gap: 10px; }

/* Building grid */
.buildings-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
@media (max-width: 1024px) { .buildings-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .buildings-grid { grid-template-columns: 1fr; } }

.building-card {
  cursor: pointer;
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}
:deep(.dark) .building-card {
  background: #18181b;
  border-color: rgba(255,255,255,0.05);
}
.building-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 32px rgba(0,0,0,0.08);
}
.building-card__image {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
}
.building-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}
.building-card:hover .building-card__image img { transform: scale(1.05); }
.building-card__vacancy {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 10px;
  border-radius: 100px;
  background: rgba(16,185,129,0.95);
  color: white;
  font-size: 11px;
  font-weight: 600;
  backdrop-filter: blur(8px);
}
.building-card__body { padding: 16px; }
.building-card__type {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #6366f1;
  text-transform: uppercase;
  margin-bottom: 6px;
}
.building-card__name {
  font-size: 16px;
  font-weight: 700;
  color: #18181b;
  margin: 0 0 4px;
}
:deep(.dark) .building-card__name { color: white; }
.building-card__addr {
  font-size: 12px;
  color: #71717a;
  margin: 0 0 10px;
}
.building-card__specs {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #a1a1aa;
}

/* ============ FEATURES ============ */
.features-section {
  padding: 80px 24px;
  max-width: 1200px;
  margin: 0 auto;
}
.features-section__header {
  text-align: center;
  margin-bottom: 48px;
}
.features-section__title {
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #18181b;
  margin: 0 0 8px;
}
:deep(.dark) .features-section__title { color: white; }
.features-section__subtitle {
  font-size: 15px;
  color: #71717a;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
@media (max-width: 768px) { .features-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .features-grid { grid-template-columns: 1fr; } }
.feature-card {
  padding: 28px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}
:deep(.dark) .feature-card {
  background: #18181b;
  border-color: rgba(255,255,255,0.05);
}
.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.06);
}
.feature-card__icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}
.feature-card__title {
  font-size: 16px;
  font-weight: 700;
  color: #18181b;
  margin: 0 0 8px;
}
:deep(.dark) .feature-card__title { color: white; }
.feature-card__desc {
  font-size: 13px;
  line-height: 1.5;
  color: #71717a;
  margin: 0;
}

/* ============ SHOWCASE ============ */
.showcase-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 500px;
}
@media (max-width: 768px) { .showcase-section { grid-template-columns: 1fr; } }

.showcase-section__image {
  position: relative;
  overflow: hidden;
}
.showcase-section__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.showcase-section__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(99,102,241,0.1), transparent);
}
.showcase-section__content {
  padding: 64px 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #ffffff;
}
:deep(.dark) .showcase-section__content { background: #09090b; }
.showcase-section__title {
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #18181b;
  margin: 0 0 16px;
}
:deep(.dark) .showcase-section__title { color: white; }
.showcase-section__text {
  font-size: 15px;
  line-height: 1.6;
  color: #71717a;
  margin: 0 0 28px;
}
.showcase-section__features {
  display: flex;
  gap: 32px;
  margin-bottom: 28px;
}
.showcase-feature__num {
  font-size: 24px;
  font-weight: 800;
  color: #6366f1;
}
.showcase-feature__label {
  font-size: 12px;
  color: #71717a;
}
.showcase-section__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 12px 20px;
  border-radius: 12px;
  background: #6366f1;
  color: white;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: gap 0.2s, background 0.2s;
  align-self: flex-start;
}
.showcase-section__btn:hover { gap: 10px; background: #4f46e5; }

/* ============ HOW IT WORKS ============ */
.how-section {
  padding: 80px 24px;
  background: rgba(99,102,241,0.02);
}
:deep(.dark) .how-section { background: rgba(99,102,241,0.05); }
.how-section__header {
  text-align: center;
  margin-bottom: 48px;
}
.how-section__title {
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #18181b;
  margin: 0;
}
:deep(.dark) .how-section__title { color: white; }
.how-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  max-width: 1000px;
  margin: 0 auto;
}
@media (max-width: 768px) { .how-steps { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .how-steps { grid-template-columns: 1fr; } }
.how-step { text-align: center; }
.how-step__num {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  font-size: 20px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  box-shadow: 0 8px 20px rgba(99,102,241,0.3);
}
.how-step__title {
  font-size: 16px;
  font-weight: 700;
  color: #18181b;
  margin: 0 0 6px;
}
:deep(.dark) .how-step__title { color: white; }
.how-step__desc {
  font-size: 13px;
  line-height: 1.5;
  color: #71717a;
  margin: 0;
}

/* ============ STATS ============ */
.stats-section {
  padding: 60px 24px;
  max-width: 1200px;
  margin: 0 auto;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
@media (max-width: 768px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
.stat-item {
  text-align: center;
  padding: 24px;
  border-radius: 16px;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.05);
}
:deep(.dark) .stat-item {
  background: #18181b;
  border-color: rgba(255,255,255,0.05);
}
.stat-item__num {
  font-size: 40px;
  font-weight: 800;
  color: #6366f1;
  letter-spacing: -0.02em;
}
.stat-item__label {
  font-size: 13px;
  color: #71717a;
  margin-top: 4px;
}

/* ============ CTA ============ */
.cta-section {
  padding: 80px 24px;
  max-width: 900px;
  margin: 0 auto;
}
.cta-card {
  padding: 64px 48px;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(99,102,241,0.06), rgba(168,139,250,0.06));
  border: 1px solid rgba(99,102,241,0.15);
  text-align: center;
}
:deep(.dark) .cta-card {
  background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,139,250,0.1));
  border-color: rgba(99,102,241,0.2);
}
.cta-card__title {
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #18181b;
  margin: 0 0 16px;
}
:deep(.dark) .cta-card__title { color: white; }
.cta-card__text {
  font-size: 15px;
  line-height: 1.6;
  color: #71717a;
  max-width: 500px;
  margin: 0 auto 32px;
}
.cta-card__actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}
.cta-card__btn {
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.15s;
}
.cta-card__btn--primary {
  background: #6366f1;
  color: white;
}
.cta-card__btn--primary:hover { transform: translateY(-1px); background: #4f46e5; }
.cta-card__btn--secondary {
  background: transparent;
  border: 1px solid rgba(0,0,0,0.1);
  color: #18181b;
}
:deep(.dark) .cta-card__btn--secondary {
  border-color: rgba(255,255,255,0.1);
  color: white;
}

/* ============ FOOTER ============ */
.landing-footer {
  padding: 48px 24px 24px;
  background: #09090b;
  color: rgba(255,255,255,0.6);
}
.landing-footer__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 40px;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
@media (max-width: 768px) { .landing-footer__inner { grid-template-columns: 1fr; } }
.landing-footer__brand { max-width: 320px; }
.landing-footer__desc {
  font-size: 13px;
  line-height: 1.5;
  margin: 16px 0 0;
  color: rgba(255,255,255,0.4);
}
.landing-footer__heading {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.4);
  margin: 0 0 14px;
}
.landing-footer__link {
  display: block;
  font-size: 13px;
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  margin-bottom: 8px;
  transition: color 0.2s;
}
.landing-footer__link:hover { color: white; }
.landing-footer__text {
  font-size: 13px;
  color: rgba(255,255,255,0.6);
  margin: 0 0 6px;
}
.landing-footer__bottom {
  max-width: 1200px;
  margin: 24px auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: rgba(255,255,255,0.3);
}
@media (max-width: 640px) { .landing-footer__bottom { flex-direction: column; gap: 8px; } }
.landing-footer__badge {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Mobile nav adjustments */
@media (max-width: 768px) {
  .hero-nav { padding: 16px 20px; }
  .hero-nav__links { display: none; }
  .hero-content { padding: 0 20px; }
  .hero-stats { flex-wrap: wrap; justify-content: center; gap: 20px; }
  .hero-stat__divider { display: none; }
}
</style>
