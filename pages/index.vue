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
          <NuxtLink to="/catalog" class="hero-nav__link">Katalog</NuxtLink>
          <a href="#buildings" class="hero-nav__link">Binolar</a>
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

      <!-- Hero content - CENTERED -->
      <div class="hero-content">
        <div class="hero-content__inner">
          <h1 class="hero-title">
            Binolaring<br>
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
        </div>
      </div>
    </section>

    <!-- ============ BUILDINGS ============ -->
    <section id="buildings" class="buildings-section">
      <div class="section-header">
        <h2 class="section-title">Toshkentning premium obyektlari</h2>
        <p class="section-subtitle">Eng yaxshi biznes markazlari va savdo obyektlari — bitta platformada</p>
      </div>

      <!-- Big featured building -->
      <div class="buildings-featured" @click="navigateTo('/buildings/tashkent-city')">
        <div class="buildings-featured__image">
          <img src="https://media.base44.com/images/public/6a78058ed735adc07d68319d/57f4f22c1_generated_image.png" alt="Tashkent City" />
          <div class="buildings-featured__overlay"></div>
        </div>
        <div class="buildings-featured__content">
          <h3 class="buildings-featured__name">Tashkent City</h3>
          <p class="buildings-featured__address">
            <MapPin :size="14" /> Mirzo Ulug'bek tumani, Toshkent
          </p>
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
          </div>
          <div class="building-card__body">
            <h4 class="building-card__name">{{ b.name }}</h4>
            <p class="building-card__addr">
              <MapPin :size="13" /> {{ b.address }}
            </p>
            <div class="building-card__footer">
              <span class="building-card__price">{{ b.priceMin }}/oy</span>
              <span class="building-card__view">Batafsil <ArrowRight :size="13" /></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ CTA ============ -->
    <section id="contacts" class="cta-section">
      <div class="cta-card">
        <div class="cta-card__glow"></div>
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
import { Search, Building2, ShoppingBag, Warehouse, Store, ArrowRight, MapPin, MessageCircle } from 'lucide-vue-next'

const heroSearch = ref('')
function goToCatalog() {
  navigateTo({ path: '/catalog', query: heroSearch.value ? { q: heroSearch.value } : {} })
}

const otherBuildings = [
  { id: 'b2', name: 'Trillant Tower', slug: 'trillant-tower', address: 'Yashnabad, Toshkent', priceMin: '18M UZS', gallery: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/6daa9acc3_generated_image.png' },
  { id: 'b3', name: 'IT Park', slug: 'it-park', address: 'Yakkasaray, Toshkent', priceMin: '12M UZS', gallery: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/41072e285_generated_image.png' },
  { id: 'b4', name: 'Piramit', slug: 'piramit', address: 'Amir Temur, Toshkent', priceMin: '15M UZS', gallery: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/3075330ac_generated_image.png' },
  { id: 'b5', name: 'Savdo Markaz', slug: 'savdo-markaz', address: 'Sergeli, Toshkent', priceMin: '8M UZS', gallery: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/2292e635f_generated_image.png' },
]
</script>

<style scoped>
.landing-page { overflow-x: hidden; }

/* ============ HERO ============ */
.hero-section {
  position: relative; min-height: 100vh;
  display: flex; flex-direction: column; overflow: hidden;
}
.hero-bg { position: absolute; inset: 0; z-index: 0; }
.hero-bg__img { width: 100%; height: 100%; object-fit: cover; object-position: center; }
.hero-bg__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(9,9,11,0.75) 0%, rgba(9,9,11,0.45) 40%, rgba(9,9,11,0.88) 100%);
}
.hero-bg__grid {
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 64px 64px;
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at center, black 20%, transparent 70%);
  mask-image: radial-gradient(ellipse 80% 60% at center, black 20%, transparent 70%);
}

/* Nav */
.hero-nav {
  position: relative; z-index: 10;
  display: flex; align-items: center; justify-content: space-between;
  padding: 22px 48px; max-width: 1400px; margin: 0 auto; width: 100%;
}
.hero-nav__logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.hero-nav__logo-icon {
  width: 40px; height: 40px; border-radius: 12px;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 18px; color: white;
  box-shadow: 0 4px 20px rgba(99,102,241,0.35);
}
.hero-nav__logo-text { font-weight: 800; font-size: 18px; color: white; letter-spacing: -0.02em; }
.hero-nav__links { display: flex; align-items: center; gap: 32px; }
.hero-nav__link { color: rgba(255,255,255,0.65); text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.25s; }
.hero-nav__link:hover { color: white; }
.hero-nav__actions { display: flex; align-items: center; gap: 14px; }
.hero-nav__login { color: rgba(255,255,255,0.8); text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.25s; }
.hero-nav__login:hover { color: white; }
.hero-nav__cta {
  display: inline-flex; align-items: center; gap: 6px;
  background: white; color: #09090b;
  padding: 10px 20px; border-radius: 12px;
  font-size: 13px; font-weight: 600; text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 12px rgba(255,255,255,0.08);
}
.hero-nav__cta:hover { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(255,255,255,0.15); }

/* Hero content - CENTERED */
.hero-content {
  position: relative; z-index: 5; flex: 1;
  display: flex; align-items: center; justify-content: center;
  text-align: center; padding: 0 48px 100px;
}
.hero-content__inner { max-width: 760px; }
.hero-title {
  font-size: clamp(44px, 6.5vw, 72px);
  font-weight: 800; color: white;
  letter-spacing: -0.04em; line-height: 1.02;
  margin-bottom: 24px;
}
.hero-title__accent {
  background: linear-gradient(135deg, #818cf8 0%, #6366f1 50%, #4f46e5 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-subtitle {
  font-size: 18px; line-height: 1.65;
  color: rgba(255,255,255,0.6); margin-bottom: 40px;
}

/* Search - centered */
.hero-search { max-width: 600px; margin: 0 auto 40px; }
.hero-search__bar {
  display: flex; align-items: center; gap: 10px;
  background: rgba(255,255,255,0.96); border-radius: 16px;
  padding: 7px 7px 7px 20px; margin-bottom: 16px;
  box-shadow: 0 24px 64px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.08);
  backdrop-filter: blur(20px);
}
.hero-search__icon { color: #a1a1aa; flex-shrink: 0; }
.hero-search__bar input {
  flex: 1; border: none; outline: none; background: transparent;
  font-size: 14px; color: #18181b; padding: 11px 0;
}
.hero-search__bar input::placeholder { color: #a1a1aa; }
.hero-search__btn {
  display: inline-flex; align-items: center; gap: 6px;
  background: linear-gradient(135deg, #6366f1, #4f46e5); color: white; border: none;
  padding: 11px 22px; border-radius: 11px;
  font-size: 13px; font-weight: 600; cursor: pointer;
  transition: all 0.25s; box-shadow: 0 2px 8px rgba(99,102,241,0.3);
}
.hero-search__btn:hover {
  background: linear-gradient(135deg, #4f46e5, #4338ca);
  box-shadow: 0 4px 16px rgba(99,102,241,0.4);
}
.hero-chips { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
.hero-chip {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.75); padding: 8px 16px; border-radius: 10px;
  font-size: 12px; font-weight: 500; text-decoration: none;
  transition: all 0.25s; backdrop-filter: blur(12px);
}
.hero-chip:hover { background: rgba(255,255,255,0.14); color: white; border-color: rgba(255,255,255,0.18); }
.hero-chip--accent {
  background: linear-gradient(135deg, rgba(99,102,241,0.9), rgba(79,70,229,0.9));
  border-color: rgba(99,102,241,0.5); color: white;
}
.hero-chip--accent:hover {
  background: linear-gradient(135deg, rgba(79,70,229,0.95), rgba(67,56,202,0.95));
  border-color: rgba(99,102,241,0.7);
}

/* ============ COMMON SECTIONS ============ */
.section-header { text-align: center; max-width: 680px; margin: 0 auto 64px; }
.section-title {
  font-size: clamp(28px, 4vw, 40px); font-weight: 800;
  color: #18181b; letter-spacing: -0.03em; margin-bottom: 14px;
}
:deep(.dark) .section-title { color: white; }
.section-subtitle { font-size: 16px; color: #71717a; line-height: 1.6; }
:deep(.dark) .section-subtitle { color: #a1a1aa; }

/* ============ BUILDINGS ============ */
.buildings-section { padding: 120px 48px; max-width: 1400px; margin: 0 auto; }
.buildings-featured {
  display: grid; grid-template-columns: 1.2fr 1fr; gap: 0;
  border-radius: 28px; overflow: hidden; margin-bottom: 36px;
  background: white;
  box-shadow: 0 4px 32px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04);
  cursor: pointer; transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
:deep(.dark) .buildings-featured {
  background: #18181b;
  box-shadow: 0 4px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06);
}
.buildings-featured:hover {
  box-shadow: 0 32px 80px rgba(0,0,0,0.12), 0 0 0 1px rgba(99,102,241,0.1);
  transform: translateY(-6px);
}
:deep(.dark) .buildings-featured:hover {
  box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.15);
}
.buildings-featured__image { position: relative; aspect-ratio: 16/10; overflow: hidden; }
.buildings-featured__image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
.buildings-featured:hover .buildings-featured__image img { transform: scale(1.05); }
.buildings-featured__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.08) 100%);
}
.buildings-featured__content { padding: 48px; display: flex; flex-direction: column; justify-content: center; }
.buildings-featured__name {
  font-size: 32px; font-weight: 800; color: #18181b;
  margin-bottom: 8px; letter-spacing: -0.025em;
}
:deep(.dark) .buildings-featured__name { color: white; }
.buildings-featured__address { display: flex; align-items: center; gap: 5px; font-size: 14px; color: #71717a; margin-bottom: 32px; }
.buildings-featured__address svg { color: #a1a1aa; }
.buildings-featured__bottom { display: flex; align-items: center; justify-content: space-between; margin-top: auto; }
.buildings-featured__price-label { font-size: 12px; color: #a1a1aa; display: block; margin-bottom: 2px; }
.buildings-featured__price-value { font-size: 28px; font-weight: 800; color: #18181b; letter-spacing: -0.025em; }
:deep(.dark) .buildings-featured__price-value { color: white; }
.buildings-featured__btn {
  display: inline-flex; align-items: center; gap: 6px;
  background: #18181b; color: white;
  padding: 13px 26px; border-radius: 12px;
  font-size: 13px; font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.buildings-featured__btn:hover { background: #6366f1; transform: translateX(2px); }
:deep(.dark) .buildings-featured__btn { background: #6366f1; }
:deep(.dark) .buildings-featured__btn:hover { background: #4f46e5; }

/* Building cards */
.buildings-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.building-card {
  background: white; border-radius: 20px; overflow: hidden;
  box-shadow: 0 2px 16px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.04);
  cursor: pointer; transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
:deep(.dark) .building-card {
  background: #18181b;
  box-shadow: 0 2px 16px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06);
}
.building-card:hover {
  box-shadow: 0 28px 64px rgba(0,0,0,0.12), 0 0 0 1px rgba(99,102,241,0.1);
  transform: translateY(-8px);
}
:deep(.dark) .building-card:hover {
  box-shadow: 0 28px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.15);
}
.building-card__image { position: relative; aspect-ratio: 16/10; overflow: hidden; }
.building-card__image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1); }
.building-card:hover .building-card__image img { transform: scale(1.06); }
.building-card__body { padding: 22px; }
.building-card__name { font-size: 18px; font-weight: 700; color: #18181b; margin-bottom: 5px; letter-spacing: -0.015em; }
:deep(.dark) .building-card__name { color: white; }
.building-card__addr { display: flex; align-items: center; gap: 4px; font-size: 13px; color: #71717a; margin-bottom: 16px; }
.building-card__addr svg { color: #a1a1aa; }
.building-card__footer { display: flex; align-items: center; justify-content: space-between; }
.building-card__price { font-size: 16px; font-weight: 700; color: #18181b; letter-spacing: -0.015em; }
:deep(.dark) .building-card__price { color: white; }
.building-card__view { display: flex; align-items: center; gap: 4px; font-size: 12px; font-weight: 600; color: #6366f1; transition: gap 0.25s; }
.building-card:hover .building-card__view { gap: 7px; }

/* ============ CTA ============ */
.cta-section { padding: 100px 48px; max-width: 1400px; margin: 0 auto; }
.cta-card {
  position: relative;
  background: linear-gradient(135deg, #09090b 0%, #18181b 50%, #1c1c1f 100%);
  border-radius: 32px; padding: 72px 48px; text-align: center;
  overflow: hidden; box-shadow: 0 24px 64px rgba(0,0,0,0.2);
}
:deep(.dark) .cta-card {
  background: linear-gradient(135deg, #18181b 0%, #09090b 50%, #18181b 100%);
  box-shadow: 0 24px 64px rgba(0,0,0,0.5);
}
.cta-card__glow {
  position: absolute; top: -40%; left: 50%; transform: translateX(-50%);
  width: 700px; height: 500px; border-radius: 50%;
  background: radial-gradient(circle, rgba(99,102,241,0.15), transparent 65%);
  pointer-events: none;
}
.cta-card__title {
  position: relative; z-index: 1;
  font-size: clamp(28px, 4vw, 42px); font-weight: 800;
  color: white; letter-spacing: -0.03em; margin-bottom: 16px;
}
.cta-card__text {
  position: relative; z-index: 1;
  font-size: 17px; color: rgba(255,255,255,0.55);
  line-height: 1.6; max-width: 520px; margin: 0 auto 36px;
}
.cta-card__actions {
  position: relative; z-index: 1;
  display: flex; align-items: center; justify-content: center; gap: 14px; flex-wrap: wrap;
}
.cta-card__btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 28px; border-radius: 14px;
  font-size: 14px; font-weight: 600; text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.cta-card__btn--primary {
  background: linear-gradient(135deg, #6366f1, #4f46e5); color: white;
  box-shadow: 0 4px 20px rgba(99,102,241,0.35);
}
.cta-card__btn--primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(99,102,241,0.45); }
.cta-card__btn--secondary {
  background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.9);
  border: 1px solid rgba(255,255,255,0.1);
}
.cta-card__btn--secondary:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.15); }

/* ============ FOOTER ============ */
.landing-footer { background: #09090b; padding: 64px 48px 32px; }
.landing-footer__inner {
  max-width: 1400px; margin: 0 auto;
  display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 48px;
  padding-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.06);
}
.landing-footer__brand { max-width: 400px; }
.landing-footer__desc { font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.6; margin-top: 16px; }
.landing-footer__col { display: flex; flex-direction: column; gap: 12px; }
.landing-footer__heading {
  font-size: 11px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.12em; color: rgba(255,255,255,0.3); margin-bottom: 4px;
}
.landing-footer__link { font-size: 14px; color: rgba(255,255,255,0.55); text-decoration: none; transition: color 0.25s; }
.landing-footer__link:hover { color: white; }
.landing-footer__text { font-size: 14px; color: rgba(255,255,255,0.45); }
.landing-footer__bottom { max-width: 1400px; margin: 0 auto; padding-top: 24px; font-size: 13px; color: rgba(255,255,255,0.3); }

/* ============ RESPONSIVE ============ */
@media (max-width: 1024px) {
  .buildings-grid { grid-template-columns: repeat(2, 1fr); }
  .hero-nav__links { display: none; }
}
@media (max-width: 768px) {
  .buildings-featured { grid-template-columns: 1fr; }
  .buildings-featured__content { padding: 28px; }
  .buildings-featured__name { font-size: 24px; }
  .buildings-grid { grid-template-columns: 1fr; }
  .buildings-section, .cta-section { padding: 64px 20px; }
  .hero-nav { padding: 16px 20px; }
  .hero-content { padding: 0 20px 64px; }
  .landing-footer__inner { grid-template-columns: 1fr; gap: 32px; }
  .landing-footer { padding: 48px 20px 24px; }
  .cta-card { padding: 48px 24px; border-radius: 24px; }
}
</style>
