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
          <a href="#buildings" class="hero-nav__link">Binolar</a>
          <a href="#how-it-works" class="hero-nav__link">Qanday ishlaydi</a>
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
          Toshkent tijoriy ko'chmas mulk platformasi
        </div>
        <h1 class="hero-title">
          Binolarning<br>
          <span class="hero-title__accent">raqamli nazorati</span>
        </h1>
        <p class="hero-subtitle">
          Premium binolarda ofis, savdo va ombor maydonlari. ERI orqali xavfsiz shartnoma va to'liq boshqaruv — bitta tizimda.
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
    <section class="features-section">
      <div class="features-section__header">
        <div class="premium-section__eyebrow">PLATFORMA IMKONIYATLARI</div>
        <h2 class="features-section__title">Bitta tizimda — 18 modul</h2>
        <p class="features-section__subtitle">Binolarni boshqarishdan tortib hisoblagichlargacha — hammasi bitta joyda.</p>
      </div>
      <div class="features-grid">
        <div v-for="(f, i) in features" :key="i" class="feature-card">
          <div class="feature-card__icon" :class="f.color">
            <component :is="f.icon" :size="20" />
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
          Zamonaviy ofis xonalari — pardali oynalar, dizayner yoritish va panjarali bo'linishlar bilan.
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
    <section id="how-it-works" class="how-section">
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

    <!-- ============ METRICS ============ -->
    <section class="metrics-section">
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-card__icon icon-3d icon-3d-blue"><Building2 :size="20" /></div>
          <div class="metric-card__num">12</div>
          <div class="metric-card__label">Boshqariladigan binolar</div>
        </div>
        <div class="metric-card">
          <div class="metric-card__icon icon-3d icon-3d-green"><Layers :size="20" /></div>
          <div class="metric-card__num">420</div>
          <div class="metric-card__label">Jami unitlar</div>
        </div>
        <div class="metric-card">
          <div class="metric-card__icon icon-3d icon-3d-amber"><TrendingUp :size="20" /></div>
          <div class="metric-card__num">47</div>
          <div class="metric-card__label">Bo'sh maydonlar</div>
        </div>
        <div class="metric-card">
          <div class="metric-card__icon icon-3d icon-3d-purple"><Gauge :size="20" /></div>
          <div class="metric-card__num">89%</div>
          <div class="metric-card__label">Bandlik darajasi</div>
        </div>
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

    <!-- ============ MAKON AI ASSISTANT ============ -->
    <div class="makon-ai-widget" :class="{ 'makon-ai-widget--open': aiOpen }">
      <!-- Chat Panel -->
      <transition name="ai-panel">
        <div v-if="aiOpen" class="makon-ai-panel">
          <div class="makon-ai-panel__header">
            <div class="makon-ai-panel__avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L3 7v6c0 5 3.5 9 9 10 5.5-1 9-5 9-10V7l-9-5z" stroke="white" stroke-width="1.8" stroke-linejoin="round"/>
                <path d="M8.5 12.5l2.5 2.5 4.5-4.5" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div>
              <div class="makon-ai-panel__name">Makon AI</div>
              <div class="makon-ai-panel__status">
                <span class="makon-ai-panel__dot"></span> Onlayn
              </div>
            </div>
            <button class="makon-ai-panel__close" @click="aiOpen = false">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>
          </div>

          <div class="makon-ai-panel__body" ref="aiBody">
            <div v-for="(msg, i) in aiMessages" :key="i" class="makon-ai-msg" :class="`makon-ai-msg--${msg.role}`">
              <div class="makon-ai-msg__bubble">{{ msg.text }}</div>
            </div>
            <div v-if="aiTyping" class="makon-ai-msg makon-ai-msg--assistant">
              <div class="makon-ai-typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>

          <div class="makon-ai-panel__quick">
            <button v-for="(q, i) in aiQuickActions" :key="i" @click="sendQuick(q)" class="makon-ai-chip">{{ q.label }}</button>
          </div>

          <div class="makon-ai-panel__input">
            <input
              v-model="aiInput"
              @keyup.enter="sendAi"
              type="text"
              placeholder="Savolingizni yozing..."
              class="makon-ai-input"
            />
            <button class="makon-ai-send" @click="sendAi" :disabled="!aiInput.trim()">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="white" stroke-width="1.8" stroke-linejoin="round"/></svg>
            </button>
          </div>
        </div>
      </transition>

      <!-- Floating Button -->
      <button class="makon-ai-fab" @click="aiOpen = !aiOpen">
        <transition name="ai-fab-icon" mode="out-in">
          <svg v-if="!aiOpen" key="open" width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8 2 5 5 5 9c0 2 1 3.5 2.5 5L7 17l3-1c.7.2 1.3.3 2 .3 4 0 7-3 7-7s-3-7-7-7z" stroke="white" stroke-width="1.6" stroke-linejoin="round"/>
            <circle cx="9" cy="9" r="1" fill="white"/>
            <circle cx="12" cy="9" r="1" fill="white"/>
            <circle cx="15" cy="9" r="1" fill="white"/>
          </svg>
          <svg v-else key="close" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="white" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </transition>
        <span v-if="!aiOpen" class="makon-ai-fab__badge">AI</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Building2, ShoppingBag, Warehouse, Store, Briefcase, ShieldCheck,
  FileCheck2, Users, Zap, Search, ArrowRight, Receipt, Wrench,
  BarChart3, Gauge, Package, Building, Layers, TrendingUp,
} from 'lucide-vue-next'

definePageMeta({ layout: 'blank' })

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
  { icon: Building2, title: 'Bino boshqaruvi', desc: "Binolar, qavatlar, unitlar — to'liq struktura. 2D planlar bilan boshqaruv.", color: 'text-brand-500 bg-brand-500/10' },
  { icon: FileCheck2, title: 'ERI integratsiyasi', desc: "Yuridik shaxslar uchun xavfsiz elektron imzo. Shartnomalarni onlayn imzolang.", color: 'text-purple-500 bg-purple-500/10' },
  { icon: Receipt, title: 'Moliya boshqaruvi', desc: "Invoyslar, to'lovlar, qarzdorlik monitoringi. Avtomatik hisob-kitob va hisobotlar.", color: 'text-emerald-500 bg-emerald-500/10' },
  { icon: Wrench, title: "Xizmat ko'rsatish", desc: "Service request'lar, work order'lar, SLA monitoringi. Faol topshiriqlarni boshqaring.", color: 'text-amber-500 bg-amber-500/10' },
  { icon: Package, title: 'Ombor boshqaruvi', desc: "Materiallar, qoldiqlar, sarflash monitoringi. Kam qolgan materiallarni avtomatik ogohlantirish.", color: 'text-orange-500 bg-orange-500/10' },
  { icon: Gauge, title: 'Hisoblagichlar', desc: "Elektr, suv, gaz ko'rsatkichlari. Tariflar bo'yicha avtomatik hisob-kitob.", color: 'text-blue-500 bg-blue-500/10' },
  { icon: BarChart3, title: 'Hisobotlar va analitika', desc: "Bandlik dinamikasi, daromad, konversiya. Real-time dashboard va hisobotlar.", color: 'text-pink-500 bg-pink-500/10' },
  { icon: ShieldCheck, title: 'Rollar va huquqlar', desc: "5 rol: SUPER_HEAD, BUILDING_MANAGER, ACCOUNTANT, FACILITY, TENANT_OWNER.", color: 'text-indigo-500 bg-indigo-500/10' },
  { icon: Building, title: 'Katalog va listinglar', desc: "Ochiq katalog, listinglar, virtual turlar. Ko'rishlar statistikasi.", color: 'text-cyan-500 bg-cyan-500/10' },
]

// === Makon AI Assistant ===
const aiOpen = ref(false)
const aiInput = ref('')
const aiTyping = ref(false)
const aiBody = ref<HTMLElement | null>(null)
const aiMessages = ref([
  { role: 'assistant', text: 'Salom! Men Makon AI yordamchisiman. Sizga ofis, ombor yoki savdo maydoni topishda yordam beraman. Nimadan boshlaymiz?' }
])
const aiQuickActions = [
  { label: 'Ofis qidiryapman', query: 'ofis' },
  { label: 'Narxlar qancha?', query: 'narx' },
  { label: 'Qanday ro\'yxatdan o\'tish?', query: 'register' },
  { label: 'Bino joylashtirish', query: 'building' },
]

const sendQuick = (q) => {
  aiInput.value = q.label
  sendAi()
}

const sendAi = () => {
  const text = aiInput.value.trim()
  if (!text) return
  aiMessages.value.push({ role: 'user', text })
  aiInput.value = ''
  aiTyping.value = true

  setTimeout(() => {
    const lower = text.toLowerCase()
    let reply = ''
    if (lower.includes('ofis') || lower.includes('офис')) {
      reply = 'Tashkent City va Trillant Tower\'da 85-200 m² ofis maydonlari mavjud. Katalog bo\'limiga o\'tib, o\'zingizga mos ofisni tanlang. Narxlar oyiga 15-25 mln so\'\'mdan boshlanadi.'
    } else if (lower.includes('narx') || lower.includes('цена') || lower.includes('price')) {
      reply = 'Ijara narxlari joylashuv va maydonga qarab: ofislar uchun 15-25 mln so\'\'m/oy, savdo maydonlari uchun 8-18 mln so\'\'m/oy, omborlar uchun 5-12 mln so\'\'m/oy. Aniq narxlar katalogda ko\'rsatilgan.'
    } else if (lower.includes('ro\'yxat') || lower.includes('registr') || lower.includes('register')) {
      reply = 'Ro\'yxatdan o\'tish ERI orqali amalga oshiriladi. "Ro\'yxatdan o\'tish" tugmasini bosing — ERI identifikatsiyasidan o\'ting va shaxsiy kabinetingizga kiring. Jarayon 2-3 daqiqa oladi.'
    } else if (lower.includes('bino') || lower.includes('building') || lower.includes('joylashtir')) {
      reply = 'Bino joylashtirish uchun avval ro\'yxatdan o\'ting. Keyin shaxsiy kabinetda "Bino qo\'shish" bo\'limidan binongiz ma\'lumotlarini kiriting — avtomatik katalogga chiqariladi.'
    } else if (lower.includes('salom') || lower.includes('hello') || lower.includes('assalom')) {
      reply = 'Assalomu alaykum! MAKON platformasiga xush kelibsiz. Sizga ofis, ombor yoki savdo maydoni topishda yordam bera olaman.'
    } else {
      reply = 'Tushundim! Bu masala bo\'yicha menejerimiz sizga batafsil maslahat bera oladi. Telefon: +998 71 200 00 00 yoki info@makon.uz ga yozing.'
    }
    aiMessages.value.push({ role: 'assistant', text: reply })
    aiTyping.value = false
    nextTick(() => {
      if (aiBody.value) aiBody.value.scrollTop = aiBody.value.scrollHeight
    })
  }, 1200 + Math.random() * 600)
}

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

/* ============ FEATURES ============ */
.features-section {
  padding: 80px 24px;
  background: #fafafa;
}
:deep(.dark) .features-section { background: #0f0f12; }
.features-section__header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 48px;
}
.features-section__title {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #18181b;
  margin: 8px 0 12px;
}
:deep(.dark) .features-section__title { color: white; }
.features-section__subtitle {
  font-size: 15px;
  color: #71717a;
  line-height: 1.5;
}
:deep(.dark) .features-section__subtitle { color: rgba(255,255,255,0.5); }
.features-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
@media (max-width: 768px) { .features-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .features-grid { grid-template-columns: 1fr; } }
.feature-card {
  padding: 28px 24px;
  border-radius: 20px;
  background: white;
  border: 1px solid rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}
:deep(.dark) .feature-card { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.06); }
.feature-card:hover {
  border-color: rgba(99,102,241,0.2);
  box-shadow: 0 12px 40px rgba(0,0,0,0.06);
  transform: translateY(-2px);
}
:deep(.dark) .feature-card:hover {
  border-color: rgba(99,102,241,0.2);
  box-shadow: 0 12px 40px rgba(0,0,0,0.3);
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
  font-size: 15px;
  font-weight: 700;
  color: #18181b;
  margin: 0 0 8px;
  letter-spacing: -0.01em;
}
:deep(.dark) .feature-card__title { color: white; }
.feature-card__desc {
  font-size: 13.5px;
  line-height: 1.5;
  color: #71717a;
}
:deep(.dark) .feature-card__desc { color: rgba(255,255,255,0.5); }

/* ============ METRICS ============ */
.metrics-section {
  padding: 64px 24px;
  background: white;
  border-top: 1px solid rgba(0,0,0,0.04);
  border-bottom: 1px solid rgba(0,0,0,0.04);
}
:deep(.dark) .metrics-section { background: #09090b; border-color: rgba(255,255,255,0.04); }
.metrics-grid {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
@media (max-width: 768px) { .metrics-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; } }
.metric-card {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
.metric-card__num {
  font-size: clamp(32px, 4vw, 44px);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #18181b;
  line-height: 1;
  margin-top: 10px;
}
:deep(.dark) .metric-card__num { color: white; }
.metric-card__label {
  font-size: 13px;
  color: #71717a;
  font-weight: 500;
}
:deep(.dark) .metric-card__label { color: rgba(255,255,255,0.5); }

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

/* ============ MAKON AI WIDGET ============ */
.makon-ai-widget {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
}

/* FAB Button */
.makon-ai-fab {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.35), 0 0 0 0 rgba(99, 102, 241, 0.4);
  animation: ai-pulse-ring 2.5s ease-out infinite;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.makon-ai-fab:hover { transform: scale(1.08); }
.makon-ai-fab:active { transform: scale(0.95); }

@keyframes ai-pulse-ring {
  0% { box-shadow: 0 8px 24px rgba(99, 102, 241, 0.35), 0 0 0 0 rgba(99, 102, 241, 0.5); }
  70% { box-shadow: 0 8px 24px rgba(99, 102, 241, 0.35), 0 0 0 18px rgba(99, 102, 241, 0); }
  100% { box-shadow: 0 8px 24px rgba(99, 102, 241, 0.35), 0 0 0 0 rgba(99, 102, 241, 0); }
}

.makon-ai-fab__badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #f59e0b;
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 8px;
  line-height: 1;
  letter-spacing: 0.5px;
}

.ai-fab-icon-enter-active, .ai-fab-icon-leave-active { transition: all 0.2s; }
.ai-fab-icon-enter-from { opacity: 0; transform: rotate(-90deg) scale(0.5); }
.ai-fab-icon-leave-to { opacity: 0; transform: rotate(90deg) scale(0.5); }

/* Chat Panel */
.ai-panel-enter-active { transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
.ai-panel-leave-active { transition: all 0.2s ease; }
.ai-panel-enter-from, .ai-panel-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}

.makon-ai-panel {
  position: absolute;
  bottom: 76px;
  right: 0;
  width: 380px;
  max-width: calc(100vw - 48px);
  height: 520px;
  max-height: calc(100vh - 120px);
  background: transparent;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.dark .makon-ai-panel { background: transparent; }

/* Header */
.makon-ai-panel__header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
}
.makon-ai-panel__avatar {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.makon-ai-panel__name { font-weight: 700; font-size: 15px; }
.makon-ai-panel__status {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  opacity: 0.85;
}
.makon-ai-panel__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 0 2px rgba(52, 211, 153, 0.3);
}
.makon-ai-panel__close {
  margin-left: auto;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: white;
  border-radius: 10px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}
.makon-ai-panel__close:hover { background: rgba(255, 255, 255, 0.25); }

/* Body */
.makon-ai-panel__body {
  flex: 1;
  overflow-y: auto;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: transparent;
}
.dark .makon-ai-panel__body { background: transparent; }

/* Messages */
.makon-ai-msg { display: flex; }
.makon-ai-msg--user { justify-content: flex-end; }
.makon-ai-msg__bubble {
  max-width: 80%;
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.5;
}
.makon-ai-msg--assistant .makon-ai-msg__bubble {
  background: white;
  color: #1f2937;
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.06);
}
.dark .makon-ai-msg--assistant .makon-ai-msg__bubble { background: #27272a; color: #f4f4f5; }
.makon-ai-msg--user .makon-ai-msg__bubble {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  border-bottom-right-radius: 4px;
}

/* Typing indicator */
.makon-ai-typing { display: flex; gap: 4px; padding: 10px 14px; background: white; border-radius: 16px; border-bottom-left-radius: 4px; box-shadow: 0 1px 2px rgba(0,0,0,0.06); }
.dark .makon-ai-typing { background: #27272a; }
.makon-ai-typing span {
  width: 8px; height: 8px; border-radius: 50%; background: #9ca3af;
  animation: ai-typing-bounce 1.4s ease-in-out infinite;
}
.makon-ai-typing span:nth-child(2) { animation-delay: 0.2s; }
.makon-ai-typing span:nth-child(3) { animation-delay: 0.4s; }
@keyframes ai-typing-bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-6px); opacity: 1; }
}

/* Quick actions */
.makon-ai-panel__quick {
  display: flex;
  gap: 8px;
  padding: 10px 18px;
  flex-wrap: wrap;
  border-top: none;
  background: transparent;
}
.dark .makon-ai-panel__quick { border-top: none; }
.makon-ai-chip {
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  font-size: 12px;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.2s;
}
.dark .makon-ai-chip { background: rgba(39, 39, 42, 0.7); backdrop-filter: blur(8px); border-color: rgba(255, 255, 255, 0.15); color: #d4d4d8; }
.makon-ai-chip:hover {
  border-color: #6366f1;
  color: #6366f1;
  background: #eef2ff;
}
.dark .makon-ai-chip:hover { background: rgba(99,102,241,0.1); }

/* Input */
.makon-ai-panel__input {
  display: flex;
  gap: 8px;
  padding: 12px 14px;
  border-top: none;
}
.dark .makon-ai-panel__input { border-top: none; }
.makon-ai-input {
  flex: 1;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 10px 14px;
  font-size: 14px;
  outline: none;
  background: #f9fafb;
  color: #1f2937;
  transition: border-color 0.2s;
}
.dark .makon-ai-input { background: #0f0f12; border-color: #3f3f46; color: #f4f4f5; }
.makon-ai-input:focus { border-color: #6366f1; }
.makon-ai-send {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: opacity 0.2s;
}
.makon-ai-send:disabled { opacity: 0.4; cursor: not-allowed; }
.makon-ai-send:not(:disabled):hover { opacity: 0.9; }

@media (max-width: 640px) {
  .makon-ai-panel { width: calc(100vw - 32px); height: calc(100vh - 100px); }
  .makon-ai-widget { bottom: 16px; right: 16px; }
  .makon-ai-fab { width: 52px; height: 52px; }
}

/* ============ GLOWING CTA BUTTON ============ */
.btn-glow {
  position: relative;
  animation: btn-glow-pulse 2s ease-in-out infinite;
}
@keyframes btn-glow-pulse {
  0%, 100% {
    box-shadow: 0 1px 3px rgba(79,70,229,0.4), 0 0 0 0 rgba(99,102,241,0.5), 0 0 0 0 rgba(99,102,241,0.3);
  }
  50% {
    box-shadow: 0 1px 3px rgba(79,70,229,0.4), 0 0 0 6px rgba(99,102,241,0.15), 0 0 20px 4px rgba(99,102,241,0.25);
  }
}
.btn-glow::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: inherit;
  background: linear-gradient(135deg, #6366f1, #a855f7, #6366f1);
  opacity: 0;
  z-index: -1;
  border-radius: 12px;
  animation: btn-glow-shimmer 3s linear infinite;
  background-size: 200% 100%;
}
@keyframes btn-glow-shimmer {
  0% { opacity: 0; background-position: 0% 0%; }
  50% { opacity: 0.4; background-position: 100% 0%; }
  100% { opacity: 0; background-position: 200% 0%; }
}

</style>
