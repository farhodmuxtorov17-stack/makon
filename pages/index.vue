<template>
  <div class="landing">
    <!-- NAV -->
    <nav class="nav" :class="{ 'nav--scrolled': scrolled }">
      <div class="nav__inner">
        <NuxtLink to="/" class="nav__brand">
          <div class="nav__logo">M</div>
          <span>MAKON</span>
        </NuxtLink>
        <div class="nav__links">
          <NuxtLink to="/catalog" class="nav__link">Katalog</NuxtLink>
          <a href="#buildings" class="nav__link">Binolar</a>
          <a href="mailto:info@makon.uz" class="nav__link">Bog'lanish</a>
        </div>
        <div class="nav__right">
          <ThemeToggle />
          <NuxtLink to="/login" class="nav__link">Kirish</NuxtLink>
          <NuxtLink to="/register/eri" class="nav__btn">
            Ro'yxatdan o'tish <ArrowRight :size="14" />
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- HERO -->
    <section class="hero">
      <div class="hero__bg">
        <img src="/buildings/hero-tashkent.jpg" alt="Tashkent City" class="hero__bg-img" />
        <div class="hero__overlay"></div>
      </div>
      <div class="hero__center">
        <h1 class="hero__title">Binolarning raqamli boshqaruvi</h1>
        <p class="hero__lead">
          Biznes markazlarida ofis, savdo va ombor maydonlari. ERI orqali xavfsiz shartnoma — bitta tizimda.
        </p>
        <div class="hero-search">
          <div class="hero-search__inner">
            <Search :size="18" class="hero-search__icon" />
            <input
              v-model="searchQuery"
              type="text"
              class="hero-search__input"
              placeholder="Ofis, savdo, ombor qidirish..."
              @keyup.enter="doSearch"
            />
            <select v-model="searchType" class="hero-search__select">
              <option value="">Barcha turlari</option>
              <option value="office">Ofis</option>
              <option value="retail">Savdo</option>
              <option value="warehouse">Ombor</option>
            </select>
            <button class="hero-search__btn" @click="doSearch">
              Qidirish <ArrowRight :size="15" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- BUILDINGS PORTFOLIO -->
    <section id="buildings" class="portfolio">
      <div class="container">
        <div class="portfolio__head">
          <h2 class="section-title">Biznes markazlar</h2>
        </div>
        <div class="portfolio__grid">
          <div class="b-card" v-for="b in buildings" :key="b.slug" @click="navigateTo('/buildings/' + b.slug)">
            <div class="b-card__media">
              <img :src="b.img" :alt="b.name" />
              <div class="b-card__overlay"></div>
            </div>
            <div class="b-card__info">
              <h4 class="b-card__name">{{ b.name }}</h4>
              <p class="b-card__addr"><MapPin :size="12" /> {{ b.district }}</p>
              <div class="b-card__price">{{ b.price }} UZS<span>/oy</span></div>
            </div>
          </div>
        </div>
        <div class="portfolio__all">
          <NuxtLink to="/catalog" class="btn-all">
            Barcha obyektlar <ArrowRight :size="16" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__col">
            <NuxtLink to="/" class="footer__brand">
              <div class="nav__logo">M</div>
              <span>MAKON</span>
            </NuxtLink>
            <p class="footer__text">Binolarning raqamli boshqaruv tizimi</p>
          </div>
          <div class="footer__col">
            <h5 class="footer__h">Platforma</h5>
            <NuxtLink to="/catalog" class="footer__link">Katalog</NuxtLink>
            <NuxtLink to="/login" class="footer__link">Tizimga kirish</NuxtLink>
          </div>
          <div class="footer__col">
            <h5 class="footer__h">Bog'lanish</h5>
            <a href="mailto:info@makon.uz" class="footer__link">info@makon.uz</a>
            <a href="tel:+998712008090" class="footer__link">+998 71 200 80 90</a>
          </div>
        </div>
        <div class="footer__bottom">(c) 2026 MAKON</div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowRight, MapPin, Search } from 'lucide-vue-next'

const scrolled = ref(false)
const searchQuery = ref('')
const searchType = ref('')

function doSearch() {
  const params = new URLSearchParams()
  if (searchQuery.value) params.set('q', searchQuery.value)
  if (searchType.value) params.set('type', searchType.value)
  navigateTo('/catalog' + (params.toString() ? '?' + params.toString() : ''))
}

let ticking = false
function onScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      scrolled.value = window.scrollY > 30
      ticking = false
    })
    ticking = true
  }
}

const buildings = [
  { slug: 'tashkent-city', name: 'Tashkent City', district: "Mirzo Ulug'bek", price: '25 000 000', img: '/buildings/hero-tashkent.jpg' },
  { slug: 'trillant-tower', name: 'Trillant Tower', district: 'Yashnabad', price: '18 000 000', img: '/buildings/bc-finance.jpg' },
  { slug: 'city-plaza', name: 'City Plaza', district: 'Yakkasaray', price: '12 000 000', img: '/buildings/bc-city-plaza.jpg' },
  { slug: 'green-park-office', name: 'Logistika Markaz', district: 'Sergeli', price: '8 000 000', img: '/buildings/bc-logistics.jpg' },
]

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

/* NAV */
.nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; transition: all 0.3s ease; }
.nav--scrolled { background: rgba(255,255,255,0.92); backdrop-filter: blur(16px); border-bottom: 1px solid var(--ink-100); }
.nav__inner { max-width: 1200px; margin: 0 auto; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; }
.nav__brand { display: flex; align-items: center; gap: 10px; text-decoration: none; color: var(--ink-900); font-weight: 800; font-size: 18px; letter-spacing: -0.02em; }
.nav__logo { width: 32px; height: 32px; border-radius: 9px; background: var(--blue-600); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 16px; }
.nav__links { display: flex; gap: 28px; }
.nav__link { text-decoration: none; color: var(--ink-500); font-size: 14px; font-weight: 500; transition: color 0.2s; }
.nav__link:hover { color: var(--ink-900); }
.nav__right { display: flex; align-items: center; gap: 16px; }
.nav__btn { display: flex; align-items: center; gap: 6px; background: var(--blue-600); color: white; padding: 8px 16px; border-radius: 10px; font-size: 13px; font-weight: 600; text-decoration: none; transition: background 0.2s; }
.nav__btn:hover { background: var(--blue-700); }

/* HERO */
.hero { position: relative; min-height: 90vh; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.hero__bg { position: absolute; inset: 0; z-index: 0; }
.hero__bg-img { width: 100%; height: 100%; object-fit: cover; }
.hero__overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(8,15,30,0.75) 0%, rgba(8,15,30,0.6) 100%); }
.hero__center { position: relative; z-index: 1; text-align: center; max-width: 640px; padding: 0 24px; }
.hero__title { font-size: clamp(32px, 5vw, 52px); font-weight: 800; color: white; line-height: 1.1; letter-spacing: -0.03em; margin-bottom: 16px; }
.hero__lead { font-size: 17px; color: rgba(255,255,255,0.75); line-height: 1.6; margin-bottom: 36px; }

.hero-search { max-width: 560px; margin: 0 auto; }
.hero-search__inner { display: flex; align-items: center; background: white; border-radius: 14px; padding: 6px; gap: 4px; box-shadow: 0 20px 60px rgba(0,0,0,0.25); }
.hero-search__icon { color: var(--ink-300); margin-left: 12px; flex-shrink: 0; }
.hero-search__input { flex: 1; border: none; outline: none; font-size: 15px; padding: 10px 8px; background: transparent; color: var(--ink-900); }
.hero-search__select { border: none; outline: none; font-size: 14px; padding: 10px 8px; background: var(--ink-50); border-radius: 10px; color: var(--ink-600); cursor: pointer; }
.hero-search__btn { display: flex; align-items: center; gap: 6px; background: var(--blue-600); color: white; border: none; padding: 10px 18px; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; white-space: nowrap; transition: background 0.2s; }
.hero-search__btn:hover { background: var(--blue-700); }

/* PORTFOLIO */
.portfolio { padding: 80px 0 100px; }
.portfolio__head { text-align: center; margin-bottom: 48px; }
.section-title { font-size: 32px; font-weight: 800; color: var(--ink-900); letter-spacing: -0.02em; }
.portfolio__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.b-card { border-radius: 16px; overflow: hidden; cursor: pointer; transition: transform 0.3s, box-shadow 0.3s; background: white; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
.b-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
.b-card__media { position: relative; aspect-ratio: 4/3; overflow: hidden; }
.b-card__media img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
.b-card:hover .b-card__media img { transform: scale(1.05); }
.b-card__overlay { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.5) 100%); }
.b-card__info { padding: 16px; }
.b-card__name { font-size: 16px; font-weight: 700; color: var(--ink-900); margin-bottom: 4px; }
.b-card__addr { display: flex; align-items: center; gap: 4px; font-size: 13px; color: var(--ink-400); margin-bottom: 12px; }
.b-card__price { font-size: 15px; font-weight: 600; color: var(--blue-600); }
.b-card__price span { font-size: 12px; color: var(--ink-400); font-weight: 400; }
.portfolio__all { text-align: center; margin-top: 40px; }
.btn-all { display: inline-flex; align-items: center; gap: 8px; padding: 12px 28px; border: 1.5px solid var(--ink-200); border-radius: 12px; font-size: 14px; font-weight: 600; color: var(--ink-700); text-decoration: none; transition: all 0.2s; }
.btn-all:hover { border-color: var(--blue-600); color: var(--blue-600); }

/* FOOTER */
.footer { background: var(--ink-900); color: var(--ink-300); padding: 60px 0 30px; }
.footer__grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 48px; margin-bottom: 40px; }
.footer__brand { display: flex; align-items: center; gap: 10px; text-decoration: none; color: white; font-weight: 800; font-size: 18px; margin-bottom: 12px; }
.footer__text { font-size: 13px; color: var(--ink-400); }
.footer__h { color: white; font-size: 13px; font-weight: 700; margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.05em; }
.footer__link { display: block; font-size: 14px; color: var(--ink-400); text-decoration: none; margin-bottom: 8px; transition: color 0.2s; }
.footer__link:hover { color: white; }
.footer__bottom { padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.08); font-size: 13px; color: var(--ink-500); }

/* RESPONSIVE */
@media (max-width: 1024px) { .portfolio__grid { grid-template-columns: repeat(2, 1fr); } .nav__links { display: none; } }
@media (max-width: 640px) { .portfolio__grid { grid-template-columns: 1fr; } .hero-search__inner { flex-wrap: wrap; } .hero-search__select { display: none; } .footer__grid { grid-template-columns: 1fr; gap: 24px; } }
</style>
