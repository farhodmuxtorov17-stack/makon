<template>
  <div class="landing-page">
    <!-- ============ HERO ============ -->
    <section class="hero-section">
      <div class="hero-bg">
        <img src="https://media.base44.com/images/public/6a78058ed735adc07d68319d/57f4f22c1_generated_image.png" alt="Tashkent City" class="hero-bg__img" />
        <div class="hero-bg__overlay"></div>
        <div class="hero-bg__grid"></div>
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
            <span class="hero-title__accent">raqamli nazorati</span>
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
        </div>

        <!-- Hero side panel -->
        <div class="hero-panel">
          <div class="hero-panel__card">
            <div class="hero-panel__header">
              <div class="hero-panel__icon">
                <Building2 :size="18" />
              </div>
              <div>
                <div class="hero-panel__label">TAVSIYA ETILADI</div>
                <div class="hero-panel__title">Tashkent City</div>
              </div>
            </div>
            <div class="hero-panel__gallery">
              <img src="https://media.base44.com/images/public/6a78058ed735adc07d68319d/57f4f22c1_generated_image.png" alt="Tashkent City" />
            </div>
            <div class="hero-panel__specs">
              <div class="hero-panel__spec">
                <Layers :size="14" />
                <span>12 qavat</span>
              </div>
              <div class="hero-panel__spec">
                <Building :size="14" />
                <span>420 unit</span>
              </div>
              <div class="hero-panel__spec">
                <Ruler :size="14" />
                <span>45,000 m²</span>
              </div>
              <div class="hero-panel__spec hero-panel__spec--accent">
                <TrendingUp :size="14" />
                <span>42 bo'sh</span>
              </div>
            </div>
            <NuxtLink to="/buildings/tashkent-city" class="hero-panel__btn">
              Batafsil ko'rish <ArrowRight :size="15" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ TRUST BAR ============ -->
    <section class="trust-bar">
      <div class="trust-bar__inner">
        <div class="trust-item">
          <div class="trust-item__icon"><ShieldCheck :size="18" /></div>
          <span>ERI elektron imzo</span>
        </div>
        <div class="trust-divider"></div>
        <div class="trust-item">
          <div class="trust-item__icon"><FileCheck2 :size="18" /></div>
          <span>Onlayn shartnoma</span>
        </div>
        <div class="trust-divider"></div>
        <div class="trust-item">
          <div class="trust-item__icon"><BarChart3 :size="18" /></div>
          <span>Real-time analitika</span>
        </div>
        <div class="trust-divider"></div>
        <div class="trust-item">
          <div class="trust-item__icon"><Building2 :size="18" /></div>
          <span>A+ sinf binolar</span>
        </div>
      </div>
    </section>

    <!-- ============ FEATURED BUILDINGS ============ -->
    <section id="buildings" class="buildings-section">
      <div class="section-header">
        <div class="section-eyebrow">TAVSIYA ETILGAN BINOLAR</div>
        <h2 class="section-title">Toshkentning premium obyektlari</h2>
        <p class="section-subtitle">Biznes markazlar, ofis binolari va savdo majmualari — eng yuqori darajadagi xizmat</p>
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
              <span class="buildings-featured__price-value">25M so'm/oy</span>
            </div>
            <NuxtLink to="/buildings/tashkent-city" class="buildings-featured__btn" @click.stop>
              Batafsil <ArrowRight :size="16" />
            </NuxtLink>
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

    <!-- ============ FEATURES ============ -->
    <section class="features-section">
      <div class="section-header">
        <div class="section-eyebrow">PLATFORMA IMKONIYATLARI</div>
        <h2 class="section-title">Bitta tizimda — 18 modul</h2>
        <p class="section-subtitle">Binolarni boshqarishdan tortib hisoblagichlargacha — hammasi bitta joyda</p>
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
        <div class="showcase-section__floating">
          <div class="showcase-section__floating-card">
            <div class="showcase-section__floating-icon">
              <Sparkles :size="16" />
            </div>
            <div>
              <div class="showcase-section__floating-label">A+ SINF</div>
              <div class="showcase-section__floating-value">Premium ofis</div>
            </div>
          </div>
        </div>
      </div>
      <div class="showcase-section__content">
        <div class="section-eyebrow">INTERERLAR</div>
        <h2 class="showcase-section__title">Premium ofis maydonlari</h2>
        <p class="showcase-section__text">
          Zamonaviy ofis xonalari — pardali oynalar, dizayner yoritish va panjarali bo'linishlar bilan. Har bir maydon ijaraga beruvchining talablariga moslashtirilgan.
        </p>
        <div class="showcase-section__features">
          <div class="showcase-feature">
            <div class="showcase-feature__icon"><Ruler :size="16" /></div>
            <div>
              <div class="showcase-feature__num">85-200</div>
              <div class="showcase-feature__label">m² maydon</div>
            </div>
          </div>
          <div class="showcase-feature">
            <div class="showcase-feature__icon"><Clock :size="16" /></div>
            <div>
              <div class="showcase-feature__num">24/7</div>
              <div class="showcase-feature__label">Kirish</div>
            </div>
          </div>
          <div class="showcase-feature">
            <div class="showcase-feature__icon"><Award :size="16" /></div>
            <div>
              <div class="showcase-feature__num">A+</div>
              <div class="showcase-feature__label">Sinf</div>
            </div>
          </div>
        </div>
        <NuxtLink to="/catalog?type=OFFICE" class="showcase-section__btn">
          Ofislarni ko'rish <ArrowRight :size="16" />
        </NuxtLink>
      </div>
    </section>

    <!-- ============ HOW IT WORKS ============ -->
    <section id="how-it-works" class="how-section">
      <div class="section-header">
        <div class="section-eyebrow">QANDAY ISHLAYDI</div>
        <h2 class="section-title">Katalogdan shartnomagacha — 4 qadam</h2>
        <p class="section-subtitle">Oddiy va tezkor jarayon — ERI orqali to'liq onlayn</p>
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

    <!-- ============ CTA ============ -->
    <section id="contacts" class="cta-section">
      <div class="cta-card">
        <div class="cta-card__icon">
          <Building2 :size="32" />
        </div>
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
  ShieldCheck, FileCheck2, Receipt, Wrench, Package, Gauge, BarChart3, MapPin,
  Ruler, TrendingUp, Clock, Award, Sparkles, MessageCircle, UserRound, FileSignature, LayoutGrid
} from 'lucide-vue-next'

const heroSearch = ref('')
function goToCatalog() {
  navigateTo({ path: '/catalog', query: heroSearch.value ? { q: heroSearch.value } : {} })
}

const otherBuildings = [
  { id: 'b2', name: 'Trillant Tower', slug: 'trillant-tower', typeLabel: 'Biznes markaz', address: 'Yashnabad, Toshkent', floorsCount: 18, totalUnits: 180, totalArea: 28000, vacantUnits: 9, priceMin: '18M so\'m', gallery: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/6daa9acc3_generated_image.png' },
  { id: 'b3', name: 'IT Park', slug: 'it-park', typeLabel: 'Ofis binosi', address: 'Yakkasaray, Toshkent', floorsCount: 8, totalUnits: 150, totalArea: 18000, vacantUnits: 27, priceMin: '12M so\'m', gallery: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/41072e285_generated_image.png' },
  { id: 'b4', name: 'Piramit', slug: 'piramit', typeLabel: 'Aralash', address: 'Amir Temur, Toshkent', floorsCount: 10, totalUnits: 90, totalArea: 15000, vacantUnits: 20, priceMin: '15M so\'m', gallery: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/3075330ac_generated_image.png' },
  { id: 'b5', name: 'Savdo Markaz', slug: 'savdo-markaz', typeLabel: 'Savdo markaz', address: 'Sergeli, Toshkent', floorsCount: 4, totalUnits: 120, totalArea: 12000, vacantUnits: 25, priceMin: '8M so\'m', gallery: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/2292e635f_generated_image.png' },
]

const features = [
  { icon: Building2, title: 'Bino boshqaruvi', desc: 'Binolar, qavatlar, unitlar — to\'liq struktura. 2D planlar bilan boshqaruv.', color: 'icon-blue' },
  { icon: FileSignature, title: 'ERI integratsiyasi', desc: 'Yuridik shaxslar uchun xavfsiz elektron imzo. Shartnomalarni onlayn imzolang.', color: 'icon-purple' },
  { icon: Receipt, title: 'Moliya boshqaruvi', desc: 'Invoyslar, to\'lovlar, qarzdorlik monitoringi. Avtomatik hisob-kitob va hisobotlar.', color: 'icon-emerald' },
  { icon: Wrench, title: 'Xizmat ko\'rsatish', desc: 'Service request\'lar, work order\'lar, SLA monitoringi. Faol topshiriqlarni boshqaring.', color: 'icon-amber' },
  { icon: Package, title: 'Ombor boshqaruvi', desc: 'Materiallar, qoldiqlar, sarflash monitoringi. Kam qolgan materiallarni avtomatik ogohlantirish.', color: 'icon-orange' },
  { icon: Gauge, title: 'Hisoblagichlar', desc: 'Elektr, suv, gaz ko\'rsatkichlari. Tariflar bo\'yicha avtomatik hisob-kitob.', color: 'icon-cyan' },
  { icon: BarChart3, title: 'Hisobotlar va analitika', desc: 'Bandlik dinamikasi, daromad, konversiya. Real-time dashboard va hisobotlar.', color: 'icon-pink' },
  { icon: ShieldCheck, title: 'Rollar va huquqlar', desc: '5 rol: SUPER_HEAD, BUILDING_MANAGER, ACCOUNTANT, FACILITY, TENANT_OWNER.', color: 'icon-indigo' },
  { icon: LayoutGrid, title: 'Katalog va listinglar', desc: 'Ochiq katalog, listinglar, virtual turlar. Ko\'rishlar statistikasi.', color: 'icon-teal' },
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
.hero-bg__overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(9,9,11,0.75) 0%, rgba(9,9,11,0.5) 40%, rgba(9,9,11,0.85) 100%); }
.hero-bg__grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 60px 60px; pointer-events: none; }

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
.hero-content { position: relative; z-index: 5; flex: 1; display: flex; align-items: center; justify-content: space-between; max-width: 1400px; margin: 0 auto; width: 100%; padding: 0 48px 60px; gap: 60px; }
.hero-content__inner { flex: 1; max-width: 640px; }
.hero-title { font-size: 56px; font-weight: 800; color: white; letter-spacing: -0.03em; line-height: 1.05; margin-bottom: 18px; }
.hero-title__accent { background: linear-gradient(135deg, #818cf8, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.hero-subtitle { font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.6); margin-bottom: 36px; max-width: 520px; }

/* Search */
.hero-search { max-width: 560px; }
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

/* Hero side panel */
.hero-panel { flex-shrink: 0; width: 320px; }
.hero-panel__card { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; padding: 20px; backdrop-filter: blur(20px); }
.hero-panel__header { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
.hero-panel__icon { width: 36px; height: 36px; border-radius: 10px; background: rgba(99,102,241,0.25); color: #a5b4fc; display: flex; align-items: center; justify-content: center; }
.hero-panel__label { font-size: 9px; font-weight: 700; color: rgba(255,255,255,0.5); letter-spacing: 0.1em; }
.hero-panel__title { font-size: 15px; font-weight: 700; color: white; }
.hero-panel__gallery { border-radius: 12px; overflow: hidden; margin-bottom: 14px; aspect-ratio: 16/10; }
.hero-panel__gallery img { width: 100%; height: 100%; object-fit: cover; }
.hero-panel__specs { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px; }
.hero-panel__spec { display: flex; align-items: center; gap: 5px; font-size: 12px; color: rgba(255,255,255,0.6); }
.hero-panel__spec svg { color: rgba(255,255,255,0.4); flex-shrink: 0; }
.hero-panel__spec--accent { color: #a5b4fc; }
.hero-panel__spec--accent svg { color: #818cf8; }
.hero-panel__btn { display: flex; align-items: center; justify-content: center; gap: 6px; background: white; color: #09090b; padding: 10px; border-radius: 10px; font-size: 13px; font-weight: 600; text-decoration: none; transition: all 0.2s; }
.hero-panel__btn:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(255,255,255,0.2); }

/* TRUST BAR */
.trust-bar { background: #09090b; border-bottom: 1px solid rgba(255,255,255,0.05); padding: 18px 0; }
.trust-bar__inner { max-width: 1400px; margin: 0 auto; padding: 0 48px; display: flex; align-items: center; justify-content: center; gap: 40px; }
.trust-item { display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.5); font-size: 13px; }
.trust-item__icon { width: 28px; height: 28px; border-radius: 8px; background: rgba(99,102,241,0.1); color: #818cf8; display: flex; align-items: center; justify-content: center; }
.trust-divider { width: 1px; height: 20px; background: rgba(255,255,255,0.08); }

/* COMMON SECTIONS */
.section-header { text-align: center; max-width: 640px; margin: 0 auto 48px; }
.section-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.15em; color: #6366f1; margin-bottom: 10px; }
:deep(.dark) .section-eyebrow { color: #818cf8; }
.section-title { font-size: 36px; font-weight: 800; color: #18181b; letter-spacing: -0.02em; margin-bottom: 10px; }
:deep(.dark) .section-title { color: white; }
.section-subtitle { font-size: 15px; color: #71717a; line-height: 1.6; }

/* BUILDINGS */
.buildings-section { padding: 80px 48px; max-width: 1400px; margin: 0 auto; }
.buildings-featured { display: grid; grid-template-columns: 1.2fr 1fr; gap: 0; border-radius: 20px; overflow: hidden; margin-bottom: 32px; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.08); cursor: pointer; transition: all 0.3s; border: 1px solid rgba(0,0,0,0.06); }
:deep(.dark) .buildings-featured { background: #18181b; border-color: rgba(255,255,255,0.06); box-shadow: 0 1px 3px rgba(0,0,0,0.3); }
.buildings-featured:hover { box-shadow: 0 20px 60px rgba(0,0,0,0.12); transform: translateY(-2px); }
.buildings-featured__image { position: relative; aspect-ratio: 16/10; overflow: hidden; }
.buildings-featured__image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
.buildings-featured:hover .buildings-featured__image img { transform: scale(1.03); }
.buildings-featured__badge { position: absolute; top: 16px; left: 16px; display: flex; align-items: center; gap: 6px; background: rgba(99,102,241,0.95); color: white; padding: 6px 12px; border-radius: 8px; font-size: 10px; font-weight: 700; letter-spacing: 0.05em; backdrop-filter: blur(10px); }
.buildings-featured__badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #a5b4fc; }
.buildings-featured__content { padding: 32px; display: flex; flex-direction: column; justify-content: center; }
.buildings-featured__tag { display: inline-flex; align-self: flex-start; background: rgba(99,102,241,0.1); color: #6366f1; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; margin-bottom: 12px; }
.buildings-featured__name { font-size: 26px; font-weight: 800; color: #18181b; margin-bottom: 6px; }
:deep(.dark) .buildings-featured__name { color: white; }
.buildings-featured__address { display: flex; align-items: center; gap: 4px; font-size: 14px; color: #71717a; margin-bottom: 20px; }
.buildings-featured__address svg { color: #a1a1aa; }
.buildings-featured__specs { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 24px; }
.buildings-featured__spec { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #71717a; }
.buildings-featured__spec svg { color: #6366f1; flex-shrink: 0; }
.buildings-featured__spec span { font-weight: 700; color: #18181b; }
:deep(.dark) .buildings-featured__spec span { color: white; }
.buildings-featured__bottom { display: flex; align-items: center; justify-content: space-between; margin-top: auto; }
.buildings-featured__price-label { font-size: 12px; color: #a1a1aa; display: block; }
.buildings-featured__price-value { font-size: 22px; font-weight: 800; color: #18181b; }
:deep(.dark) .buildings-featured__price-value { color: white; }
.buildings-featured__btn { display: inline-flex; align-items: center; gap: 6px; background: #18181b; color: white; padding: 10px 20px; border-radius: 10px; font-size: 13px; font-weight: 600; text-decoration: none; transition: all 0.2s; }
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
.building-card__body { padding: 16px; }
.building-card__name { font-size: 16px; font-weight: 700; color: #18181b; margin-bottom: 4px; }
:deep(.dark) .building-card__name { color: white; }
.building-card__addr { display: flex; align-items: center; gap: 3px; font-size: 12px; color: #a1a1aa; margin-bottom: 12px; }
.building-card__addr svg { color: #c4c4c8; flex-shrink: 0; }
.building-card__specs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
.building-card__spec { display: flex; align-items: center; gap: 4px; font-size: 11px; color: #71717a; }
.building-card__spec svg { color: #c4c4c8; }
.building-card__footer { display: flex; align-items: center; justify-content: space-between; padding-top: 12px; border-top: 1px solid rgba(0,0,0,0.05); }
:deep(.dark) .building-card__footer { border-color: rgba(255,255,255,0.05); }
.building-card__price { font-size: 13px; font-weight: 700; color: #18181b; }
:deep(.dark) .building-card__price { color: white; }
.building-card__view { display: flex; align-items: center; gap: 3px; font-size: 12px; color: #6366f1; font-weight: 500; }

/* FEATURES */
.features-section { padding: 80px 48px; max-width: 1400px; margin: 0 auto; }
.features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.feature-card { background: white; border-radius: 16px; padding: 24px; border: 1px solid rgba(0,0,0,0.06); transition: all 0.3s; }
:deep(.dark) .feature-card { background: #18181b; border-color: rgba(255,255,255,0.06); }
.feature-card:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.08); transform: translateY(-2px); }
.feature-card__icon { width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
.icon-blue { background: rgba(59,130,246,0.1); color: #3b82f6; }
.icon-purple { background: rgba(168,85,247,0.1); color: #a855f7; }
.icon-emerald { background: rgba(16,185,129,0.1); color: #10b981; }
.icon-amber { background: rgba(245,158,11,0.1); color: #f59e0b; }
.icon-orange { background: rgba(249,115,22,0.1); color: #f97316; }
.icon-cyan { background: rgba(6,182,212,0.1); color: #06b6d4; }
.icon-pink { background: rgba(236,72,153,0.1); color: #ec4899; }
.icon-indigo { background: rgba(99,102,241,0.1); color: #6366f1; }
.icon-teal { background: rgba(20,184,166,0.1); color: #14b8a6; }
.feature-card__title { font-size: 16px; font-weight: 700; color: #18181b; margin-bottom: 6px; }
:deep(.dark) .feature-card__title { color: white; }
.feature-card__desc { font-size: 13px; color: #71717a; line-height: 1.6; }

/* SHOWCASE */
.showcase-section { display: grid; grid-template-columns: 1fr 1fr; gap: 0; max-width: 1400px; margin: 0 auto; border-radius: 24px; overflow: hidden; }
.showcase-section__image { position: relative; min-height: 500px; }
.showcase-section__image img { width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; }
.showcase-section__overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(9,9,11,0.3) 0%, transparent 50%); }
.showcase-section__floating { position: absolute; bottom: 24px; left: 24px; z-index: 2; }
.showcase-section__floating-card { display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.1); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.15); border-radius: 14px; padding: 12px 18px; }
.showcase-section__floating-icon { width: 36px; height: 36px; border-radius: 10px; background: rgba(99,102,241,0.3); color: #c7d2fe; display: flex; align-items: center; justify-content: center; }
.showcase-section__floating-label { font-size: 9px; font-weight: 700; letter-spacing: 0.1em; color: rgba(255,255,255,0.5); }
.showcase-section__floating-value { font-size: 14px; font-weight: 700; color: white; }
.showcase-section__content { padding: 60px 48px; display: flex; flex-direction: column; justify-content: center; }
.showcase-section__title { font-size: 32px; font-weight: 800; color: #18181b; margin-bottom: 14px; letter-spacing: -0.02em; }
:deep(.dark) .showcase-section__title { color: white; }
.showcase-section__text { font-size: 15px; color: #71717a; line-height: 1.7; margin-bottom: 28px; max-width: 400px; }
.showcase-section__features { display: flex; gap: 24px; margin-bottom: 28px; }
.showcase-feature { display: flex; align-items: center; gap: 10px; }
.showcase-feature__icon { width: 36px; height: 36px; border-radius: 10px; background: rgba(99,102,241,0.1); color: #6366f1; display: flex; align-items: center; justify-content: center; }
.showcase-feature__num { font-size: 20px; font-weight: 800; color: #18181b; }
:deep(.dark) .showcase-feature__num { color: white; }
.showcase-feature__label { font-size: 12px; color: #71717a; }
.showcase-section__btn { display: inline-flex; align-self: flex-start; align-items: center; gap: 6px; background: #18181b; color: white; padding: 12px 24px; border-radius: 12px; font-size: 14px; font-weight: 600; text-decoration: none; transition: all 0.2s; }
.showcase-section__btn:hover { background: #6366f1; transform: translateY(-1px); }
:deep(.dark) .showcase-section__btn { background: #6366f1; }
:deep(.dark) .showcase-section__btn:hover { background: #4f46e5; }

/* HOW IT WORKS */
.how-section { padding: 80px 48px; max-width: 1400px; margin: 0 auto; }
.how-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.how-step { position: relative; text-align: center; padding: 28px 20px; }
.how-step__num { position: absolute; top: 0; left: 50%; transform: translateX(-50%); font-size: 64px; font-weight: 900; color: rgba(99,102,241,0.06); line-height: 1; pointer-events: none; }
.how-step__icon { width: 56px; height: 56px; border-radius: 16px; background: rgba(99,102,241,0.08); color: #6366f1; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; position: relative; z-index: 1; }
.how-step__title { font-size: 16px; font-weight: 700; color: #18181b; margin-bottom: 6px; }
:deep(.dark) .how-step__title { color: white; }
.how-step__desc { font-size: 13px; color: #71717a; line-height: 1.6; }
.how-step__line { position: absolute; top: 56px; right: -12px; width: 24px; height: 2px; background: linear-gradient(90deg, rgba(99,102,241,0.2), transparent); }

/* CTA */
.cta-section { padding: 60px 48px 100px; max-width: 1400px; margin: 0 auto; }
.cta-card { background: linear-gradient(135deg, #18181b 0%, #27272a 100%); border-radius: 24px; padding: 56px 48px; text-align: center; position: relative; overflow: hidden; }
.cta-card::before { content: ''; position: absolute; top: -50%; left: -20%; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%); pointer-events: none; }
.cta-card__icon { width: 64px; height: 64px; border-radius: 18px; background: rgba(99,102,241,0.2); color: #818cf8; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; position: relative; z-index: 1; }
.cta-card__title { font-size: 30px; font-weight: 800; color: white; margin-bottom: 12px; position: relative; z-index: 1; }
.cta-card__text { font-size: 15px; color: rgba(255,255,255,0.5); line-height: 1.6; margin-bottom: 28px; max-width: 440px; margin-left: auto; margin-right: auto; position: relative; z-index: 1; }
.cta-card__actions { display: flex; align-items: center; justify-content: center; gap: 12px; position: relative; z-index: 1; }
.cta-card__btn { display: inline-flex; align-items: center; gap: 6px; padding: 12px 24px; border-radius: 12px; font-size: 14px; font-weight: 600; text-decoration: none; transition: all 0.2s; }
.cta-card__btn--primary { background: #6366f1; color: white; }
.cta-card__btn--primary:hover { background: #4f46e5; transform: translateY(-1px); }
.cta-card__btn--secondary { background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.15); }
.cta-card__btn--secondary:hover { background: rgba(255,255,255,0.15); }

/* FOOTER */
.landing-footer { background: #09090b; padding: 60px 48px 0; }
.landing-footer__inner { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px; padding-bottom: 40px; }
.landing-footer__brand { max-width: 320px; }
.landing-footer__brand .hero-nav__logo { margin-bottom: 14px; }
.landing-footer__desc { font-size: 13px; color: rgba(255,255,255,0.4); line-height: 1.7; }
.landing-footer__heading { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: rgba(255,255,255,0.5); margin-bottom: 14px; }
.landing-footer__link { display: block; font-size: 13px; color: rgba(255,255,255,0.4); text-decoration: none; margin-bottom: 8px; transition: color 0.2s; }
.landing-footer__link:hover { color: white; }
.landing-footer__text { font-size: 13px; color: rgba(255,255,255,0.4); margin-bottom: 6px; }
.landing-footer__bottom { max-width: 1400px; margin: 0 auto; padding: 20px 0; border-top: 1px solid rgba(255,255,255,0.05); }
.landing-footer__bottom span { font-size: 12px; color: rgba(255,255,255,0.3); }

/* RESPONSIVE */
@media (max-width: 1024px) {
  .hero-content { flex-direction: column; padding: 0 32px 40px; }
  .hero-panel { width: 100%; max-width: 360px; }
  .buildings-grid { grid-template-columns: repeat(2, 1fr); }
  .features-grid { grid-template-columns: repeat(2, 1fr); }
  .buildings-featured { grid-template-columns: 1fr; }
  .showcase-section { grid-template-columns: 1fr; }
  .showcase-section__image { min-height: 300px; }
  .how-steps { grid-template-columns: repeat(2, 1fr); }
  .how-step__line { display: none; }
  .landing-footer__inner { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 640px) {
  .hero-nav { padding: 16px 20px; }
  .hero-nav__links { display: none; }
  .hero-content { padding: 0 20px 30px; }
  .hero-title { font-size: 36px; }
  .hero-subtitle { font-size: 14px; }
  .buildings-section, .features-section, .how-section, .cta-section { padding: 40px 20px; }
  .buildings-grid { grid-template-columns: 1fr; }
  .features-grid { grid-template-columns: 1fr; }
  .how-steps { grid-template-columns: 1fr; }
  .showcase-section__content { padding: 40px 24px; }
  .trust-bar__inner { flex-wrap: wrap; gap: 16px; }
  .trust-divider { display: none; }
  .landing-footer__inner { grid-template-columns: 1fr; }
  .cta-card { padding: 40px 24px; }
  .section-title { font-size: 26px; }
}
</style>
