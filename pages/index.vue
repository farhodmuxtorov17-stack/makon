<template>
  <div class="landing">
    <!-- ═══ NAV ═══ -->
    <nav class="nav" :class="{ 'nav--scrolled': scrolled }">
      <div class="nav__inner">
        <NuxtLink to="/" class="nav__brand">
          <div class="nav__logo">M</div>
          <span class="nav__brand-text">MAKON</span>
        </NuxtLink>
        <div class="nav__links">
          <NuxtLink to="/catalog" class="nav__link">Katalog</NuxtLink>
          <a href="#buildings" class="nav__link">Binolar</a>
          <a href="#how" class="nav__link">Jarayon</a>
          <a href="#features" class="nav__link">Imkoniyatlar</a>
          <a href="mailto:info@makon.uz" class="nav__link">Bog'lanish</a>
        </div>
        <div class="nav__right">
          <ThemeToggle />
          <NuxtLink to="/login" class="nav__link">Kirish</NuxtLink>
          <NuxtLink to="/dashboard/executive" class="nav__btn-try">
            Tizimni sinab ko'rish <ArrowRight :size="14" />
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- ═══ HERO ═══ -->
    <section class="hero">
      <div class="hero__bg">
        <img :src="img('/buildings/real_tashkent-night.jpg')" alt="Tashkent City" class="hero__bg-img" />
        <div class="hero__overlay"></div>
        <div class="hero__grain"></div>
      </div>

      <div class="hero__content">
        <div class="hero__badge">
          <span class="hero__badge-dot"></span>
          Davlat standartlariga muvofiq · ERI integratsiyasi
        </div>
        <h1 class="hero__title font-heading">
          Binolarning<br/><span class="hero__title-accent">raqamli boshqaruvi</span>
        </h1>
        <p class="hero__lead">
          Premium biznes markazlarida ofis, savdo va ombor maydonlari.<br/>
          ERI orqali xavfsiz shartnoma, to'lovlarga to'liq nazorat — bitta tizimda.
        </p>



        <div class="hero__try">
          <NuxtLink to="/dashboard/executive" class="hero__try-btn">
            <span>Tizimni sinab ko'rish</span>
            <ArrowRight :size="20" />
          </NuxtLink>
          <span class="hero__try-hint">Demo rejim — ro'yxatdan o'tmasdan</span>
        </div>


      </div>

      <div class="hero__stats">
        <div class="hero__stat">
          <div class="hero__stat-n">12K+</div>
          <div class="hero__stat-l">m² Boshqariladigan</div>
        </div>
        <div class="hero__stat-sep"></div>
        <div class="hero__stat">
          <div class="hero__stat-n">98%</div>
          <div class="hero__stat-l">O'rtacha bandlik</div>
        </div>
        <div class="hero__stat-sep"></div>
        <div class="hero__stat">
          <div class="hero__stat-n">240+</div>
          <div class="hero__stat-l">Faol shartnoma</div>
        </div>
      </div>
    </section>

    <!-- ═══ SEARCH BAND ═══ -->
    <section class="search-band">
      <div class="container">
        <div class="search-band__inner">
          <div class="search-band__field">
            <Search :size="18" class="search-band__icon" />
            <input
              v-model="searchQuery"
              type="text"
              class="search-band__input"
              placeholder="Ofis, savdo, ombor qidirish..."
              @keyup.enter="doSearch"
            />
          </div>
          <div class="search-band__sep"></div>
          <div class="search-band__field search-band__field--type">
            <Building2 :size="18" class="search-band__icon" />
            <select v-model="searchType" class="search-band__select">
              <option value="">Barcha turlari</option>
              <option value="office">Ofis</option>
              <option value="retail">Savdo</option>
              <option value="warehouse">Ombor</option>
            </select>
          </div>
          <button class="search-band__btn" @click="doSearch">
            Qidirish <Search :size="16" />
          </button>
        </div>
        <div class="search-band__chips">
          <button class="search-band__chip" @click="navigateTo('/catalog?type=office')">Ofis</button>
          <button class="search-band__chip" @click="navigateTo('/catalog?type=retail')">Savdo</button>
          <button class="search-band__chip" @click="navigateTo('/catalog?type=warehouse')">Ombor</button>
          <button class="search-band__chip search-band__chip--accent" @click="navigateTo('/catalog?offer=rent')">
            Ijaraga <ArrowRight :size="12" />
          </button>
        </div>
      </div>
    </section>

    <!-- ═══ PORTFOLIO ═══ -->
    <section id="buildings" class="portfolio">
      <div class="container">
        <div class="portfolio__head">
          <div class="eyebrow">PORTFEL</div>
          <h2 class="section-title font-heading">Premium obyektlar portfeli</h2>
          <p class="section-sub">Toshkentning yetakchi biznes markazlari — bitta platformada boshqariladi.</p>
        </div>

        <div class="portfolio__featured" @click="navigateTo('/buildings/tashkent-city')">
          <div class="portfolio__featured-media">
            <img src="/buildings/hero-tashkent.jpg" alt="Tashkent City" />
            <div class="portfolio__featured-overlay"></div>
            <div class="portfolio__featured-badge">PREMIUM</div>
          </div>
          <div class="portfolio__featured-info">
            <div class="portfolio__featured-num">01</div>
            <h3 class="portfolio__featured-name font-heading">Tashkent City</h3>
            <p class="portfolio__featured-addr"><MapPin :size="14" /> Mirzo Ulug'bek tumani, Toshkent</p>
            <div class="portfolio__featured-specs">
              <div class="portfolio__featured-spec"><span class="n">12</span><span class="l">Qavat</span></div>
              <div class="portfolio__featured-spec"><span class="n">240</span><span class="l">Unit</span></div>
              <div class="portfolio__featured-spec"><span class="n">32K</span><span class="l">m²</span></div>
            </div>
            <div class="portfolio__featured-price">
              <span class="l">Ijaraga</span>
              <span class="v">25 000 000 UZS<span class="u">/oy</span></span>
            </div>
            <button class="portfolio__featured-btn">
              Batafsil <ArrowRight :size="15" />
            </button>
          </div>
        </div>

        <div class="portfolio__grid">
          <div class="b-card" @click="navigateTo('/buildings/trillant-tower')">
            <div class="b-card__media">
              <img src="/buildings/bc-finance.jpg" alt="Trillant Tower" />
              <div class="b-card__overlay"></div>
            </div>
            <div class="b-card__info">
              <div class="b-card__num">02</div>
              <h4 class="b-card__name font-heading">Trillant Tower</h4>
              <p class="b-card__addr"><MapPin :size="12" /> Yashnabad</p>
              <div class="b-card__price">18 000 000 UZS<span>/oy</span></div>
            </div>
          </div>
          <div class="b-card" @click="navigateTo('/buildings/city-plaza')">
            <div class="b-card__media">
              <img src="/buildings/bc-city-plaza.jpg" alt="City Plaza" />
              <div class="b-card__overlay"></div>
            </div>
            <div class="b-card__info">
              <div class="b-card__num">03</div>
              <h4 class="b-card__name font-heading">City Plaza</h4>
              <p class="b-card__addr"><MapPin :size="12" /> Yakkasaray</p>
              <div class="b-card__price">12 000 000 UZS<span>/oy</span></div>
            </div>
          </div>
          <div class="b-card" @click="navigateTo('/buildings/green-park-office')">
            <div class="b-card__media">
              <img src="/buildings/bc-logistics.jpg" alt="Logistics Center" />
              <div class="b-card__overlay"></div>
            </div>
            <div class="b-card__info">
              <div class="b-card__num">04</div>
              <h4 class="b-card__name font-heading">Logistika Markaz</h4>
              <p class="b-card__addr"><MapPin :size="12" /> Sergeli</p>
              <div class="b-card__price">8 000 000 UZS<span>/oy</span></div>
            </div>
          </div>
        </div>

        <div class="portfolio__all">
          <NuxtLink to="/catalog" class="btn-all">
            Barcha obyektlarni ko'rish <ArrowRight :size="16" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ═══ HOW IT WORKS ═══ -->
    <section id="how" class="how">
      <div class="container">
        <div class="how__head">
          <div class="eyebrow">JARAYON</div>
          <h2 class="section-title font-heading">To'rt qadam — ofisdan shartnomagacha</h2>
          <p class="section-sub">Qidirishdan boshlab, ERI orqali shartnoma imzolashgacha — barchasi onlayn.</p>
        </div>
        <div class="how__steps">
          <div class="step">
            <div class="step__top">
              <div class="step__num">01</div>
              <div class="step__icon"><Search :size="22" /></div>
            </div>
            <h4 class="step__title font-heading">Qidirish</h4>
            <p class="step__text">Katalogda binoni, qavatni va maydonni tanlang. Interaktiv qavat rejasi orqali bo'sh unitlarni ko'ring.</p>
          </div>
          <div class="step__connector"></div>
          <div class="step">
            <div class="step__top">
              <div class="step__num">02</div>
              <div class="step__icon"><FileText :size="22" /></div>
            </div>
            <h4 class="step__title font-heading">Ariza</h4>
            <p class="step__text">Maydon turini, muddatni va boshlang'ich sanani ko'rsating. Operator 24 soat ichida javob beradi.</p>
          </div>
          <div class="step__connector"></div>
          <div class="step">
            <div class="step__top">
              <div class="step__num">03</div>
              <div class="step__icon"><ShieldCheck :size="22" /></div>
            </div>
            <h4 class="step__title font-heading">ERI imzo</h4>
            <p class="step__text">Shartnoma elektron raqamli imzo orqali xavfsiz imzolanadi. Qog'oz hujjatlar kerak emas.</p>
          </div>
          <div class="step__connector"></div>
          <div class="step">
            <div class="step__top">
              <div class="step__num">04</div>
              <div class="step__icon"><KeyRound :size="22" /></div>
            </div>
            <h4 class="step__title font-heading">Boshqaruv</h4>
            <p class="step__text">Shaxsiy kabinetingizdan invoyslar, xizmat so'rovlari va hisoblagichlarni boshqaring.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ FEATURES ═══ -->
    <section id="features" class="features">
      <div class="container">
        <div class="features__head">
          <div class="eyebrow">PLATFORMA</div>
          <h2 class="section-title font-heading">Binolar uchun yagona ekotizim</h2>
          <p class="section-sub">Boshqaruv, moliya, texnik xizmat va hisobotlar — bitta platformada.</p>
        </div>
        <div class="features__grid">
          <div class="feat">
            <div class="feat__icon feat__icon--navy"><Building2 :size="20" /></div>
            <h4 class="feat__title font-heading">Bino boshqaruvi</h4>
            <p class="feat__text">Binolar, qavatlar va unitlarning to'liq katalogi. Interaktiv rejalar va gallereyalar.</p>
          </div>
          <div class="feat">
            <div class="feat__icon feat__icon--blue"><FileText :size="20" /></div>
            <h4 class="feat__title font-heading">ERI shartnoma</h4>
            <p class="feat__text">Elektron raqamli imzo orqali qonuniy kuchga ega shartnomalar — qog'azsiz va xavfsiz.</p>
          </div>
          <div class="feat">
            <div class="feat__icon feat__icon--green"><Wallet :size="20" /></div>
            <h4 class="feat__title font-heading">Moliyaviy boshqaruv</h4>
            <p class="feat__text">Invoyslar, to'lovlar, qarzdorlik va moliyaviy davrlarni avtomatlashtirilgan boshqaruv.</p>
          </div>
          <div class="feat">
            <div class="feat__icon feat__icon--amber"><Wrench :size="20" /></div>
            <h4 class="feat__title font-heading">Texnik xizmat</h4>
            <p class="feat__text">Xizmat so'rovlari, ish buyruqlari va materiallar boshqaruvi — SLA nazorati bilan.</p>
          </div>
          <div class="feat">
            <div class="feat__icon feat__icon--purple"><BarChart3 :size="20" /></div>
            <h4 class="feat__title font-heading">Hisobotlar</h4>
            <p class="feat__text">Ish stoli, moliyaviy va operatsion hisobotlar — real vaqtda tahlil.</p>
          </div>
          <div class="feat">
            <div class="feat__icon feat__icon--rose"><Bell :size="20" /></div>
            <h4 class="feat__title font-heading">Bildirishnomalar</h4>
            <p class="feat__text">Avtomatik eslatmalar, push-xabarnomalar va SLA monitoringi.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CTA ═══ -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-box">
          <div class="cta-box__bg">
            <img :src="img('/buildings/real_tashkent-night.jpg')" alt="" class="cta-box__img" />
            <div class="cta-box__overlay"></div>
          </div>
          <div class="cta-box__content">
            <h2 class="cta-box__title font-heading">Boshqaruvni boshlang</h2>
            <p class="cta-box__text">Binolaringizni MAKON platformasida birlashtiring. Demo versiyani bepul sinab ko'ring.</p>
            <div class="cta-box__actions">
              <NuxtLink to="/register/eri" class="cta-box__btn">
                Ro'yxatdan o'tish <ArrowRight :size="16" />
              </NuxtLink>
              <a href="mailto:info@makon.uz" class="cta-box__link">Bog'lanish</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ FOOTER ═══ -->
    <footer class="footer">
      <div class="container">
        <div class="footer__top">
          <div class="footer__brand">
            <div class="footer__logo">
              <div class="nav__logo">M</div>
              <span>MAKON</span>
            </div>
            <p class="footer__tag">Toshkentning premium ko'chmas mulk boshqaruv platformasi.</p>
          </div>
          <div class="footer__cols">
            <div class="footer__col">
              <div class="footer__col-title">Platforma</div>
              <NuxtLink to="/catalog">Katalog</NuxtLink>
              <NuxtLink to="/catalog">Binolar</NuxtLink>
              <a href="#how">Jarayon</a>
              <a href="#features">Imkoniyatlar</a>
            </div>
            <div class="footer__col">
              <div class="footer__col-title">Tizim</div>
              <NuxtLink to="/login">Kirish</NuxtLink>
              <NuxtLink to="/register/eri">Ro'yxatdan o'tish</NuxtLink>
              <NuxtLink to="/dashboard/executive">Dashboard</NuxtLink>
            </div>
            <div class="footer__col">
              <div class="footer__col-title">Aloqa</div>
              <a href="mailto:info@makon.uz">info@makon.uz</a>
              <a href="tel:+998712008090">+998 71 200 80 90</a>
            </div>
          </div>
        </div>
        <div class="footer__bottom">
          <div>© 2026 MAKON. Barcha huquqlar himoyalangan.</div>
          <div class="footer__badges">
            <span>Raqamli imzo integratsiyasi</span>
            <span>·</span>
            <span>Davlat standarti</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { img } = useImg()
import { ref, onMounted, onUnmounted } from 'vue'
import {
  ArrowRight, MapPin, Search, FileText, ShieldCheck, KeyRound,
  Building2, Wallet, Wrench, BarChart3, Bell
} from 'lucide-vue-next'

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

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
/* ═══ BASE ═══ */
.landing {
  scroll-behavior: smooth;
  background: var(--bg);
  overflow-x: hidden;
}
.container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
}
.font-heading {
  font-family: 'Sora', 'Inter', system-ui, sans-serif;
  letter-spacing: -0.025em;
}
.eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--accent);
  text-transform: uppercase;
  margin-bottom: 12px;
}
.section-title {
  font-size: 40px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 12px;
  line-height: 1.1;
}
.section-sub {
  font-size: 16px;
  color: var(--text-secondary);
  max-width: 540px;
  line-height: 1.6;
}

/* ═══ NAV ═══ */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 18px 0;
  transition: all 0.3s ease;
}
.nav--scrolled {
  padding: 12px 0;
  background: rgba(8, 12, 24, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.nav__inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}
.nav__logo {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, #2563EB, #60A5FA);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 800;
  color: white;
  font-family: 'Sora', sans-serif;
  box-shadow: 0 4px 12px rgba(37,99,235,0.3);
}
.nav__brand-text {
  color: white;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.02em;
  font-family: 'Sora', sans-serif;
}
.nav__links {
  display: flex;
  align-items: center;
  gap: 32px;
}
.nav__link {
  color: rgba(255,255,255,0.7);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
}
.nav__link:hover {
  color: white;
}
.nav--scrolled .nav__link {
  color: rgba(255,255,255,0.7);
}
.nav__right {
  display: flex;
  align-items: center;
  gap: 20px;
}
.nav__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border-radius: 10px;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.15);
  color: white;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}
.nav__btn:hover {
  background: rgba(255,255,255,0.18);
  border-color: rgba(255,255,255,0.25);
}
.nav__btn-try {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 20px;
  border-radius: 10px;
  background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
  color: white;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  box-shadow: 0 4px 14px rgba(37,99,235,0.35);
  border: none;
}
.nav__btn-try:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(37,99,235,0.45);
  background: linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%);
}

/* ═══ HERO ═══ */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 24px 40px;
  text-align: center;
}
.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}
.hero__bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.05);
}
.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(8,12,24,0.65) 0%, rgba(8,12,24,0.45) 40%, rgba(8,12,24,0.75) 100%);
}
.hero__grain {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
  pointer-events: none;
}
.hero__content {
  position: relative;
  z-index: 1;
  max-width: 760px;
  width: 100%;
}
.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 16px;
  border-radius: 100px;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.9);
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 28px;
}
.hero__badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #4ADE80;
  box-shadow: 0 0 8px rgba(74,222,128,0.6);
}
.hero__title {
  font-size: 64px;
  font-weight: 800;
  color: white;
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin-bottom: 24px;
}
.hero__title-accent {
  background: linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero__lead {
  font-size: 18px;
  line-height: 1.6;
  color: rgba(255,255,255,0.7);
  margin-bottom: 36px;
}

/* ═══ HERO SEARCH ═══ */
.hero__search {
  display: flex;
  align-items: stretch;
  background: rgba(255,255,255,0.96);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.25), 0 4px 16px rgba(0,0,0,0.08);
  border: 1px solid rgba(255,255,255,0.2);
}
.hero__search-field {
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0 18px;
  min-width: 0;
}
.hero__search-field--type {
  max-width: 200px;
}
.hero__search-icon {
  color: #94A3B8;
  flex-shrink: 0;
}
.hero__search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 18px 14px;
  font-size: 15px;
  background: transparent;
  color: #0F172A;
  min-width: 0;
  font-family: 'Inter', sans-serif;
}
.hero__search-input::placeholder {
  color: #94A3B8;
}
.hero__search-select {
  border: none;
  outline: none;
  padding: 18px 28px 18px 8px;
  font-size: 15px;
  background: transparent;
  color: #0F172A;
  cursor: pointer;
  width: 100%;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 6px center;
  font-family: 'Inter', sans-serif;
}
.hero__search-sep {
  width: 1px;
  background: #E2E8F0;
  flex-shrink: 0;
}
.hero__search-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}
.hero__search-btn:hover {
  background: linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%);
}

/* ═══ SEARCH BAND ═══ */
.search-band {
  padding: 0 24px 48px;
  position: relative;
  z-index: 5;
  margin-top: -20px;
}
.search-band__inner {
  display: flex;
  align-items: stretch;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04);
  border: 1px solid var(--border);
  max-width: 760px;
  margin: 0 auto;
}
.search-band__field {
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0 18px;
  min-width: 0;
}
.search-band__field--type {
  max-width: 200px;
}
.search-band__icon {
  color: var(--text-muted);
  flex-shrink: 0;
}
.search-band__input {
  flex: 1;
  border: none;
  outline: none;
  padding: 18px 14px;
  font-size: 15px;
  background: transparent;
  color: var(--text);
  min-width: 0;
  font-family: 'Inter', sans-serif;
}
.search-band__input::placeholder {
  color: var(--text-muted);
}
.search-band__select {
  border: none;
  outline: none;
  padding: 18px 28px 18px 8px;
  font-size: 15px;
  background: transparent;
  color: var(--text);
  cursor: pointer;
  width: 100%;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 6px center;
  font-family: 'Inter', sans-serif;
}
.search-band__sep {
  width: 1px;
  background: var(--border);
  flex-shrink: 0;
}
.search-band__btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 24px;
  background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  font-weight: 600;
}
.search-band__btn:hover {
  background: linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%);
}
.search-band__chips {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 16px;
  flex-wrap: wrap;
  max-width: 760px;
  margin-left: auto;
  margin-right: auto;
}
.search-band__chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 7px 16px;
  border-radius: 100px;
  background: var(--bg-subtle);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
.search-band__chip:hover {
  background: var(--accent-subtle);
  border-color: var(--border-accent);
  color: var(--accent);
}
.search-band__chip--accent {
  background: var(--accent);
  border-color: var(--accent);
  color: white;
}
.search-band__chip--accent:hover {
  background: var(--accent-hover);
}

/* ═══ HERO TRY BUTTON ═══ */
.hero__try {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 28px;
}
.hero__try-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 18px 48px;
  border-radius: 16px;
  background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%);
  color: white;
  font-size: 18px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s;
  box-shadow: 0 12px 36px rgba(37,99,235,0.45), 0 4px 12px rgba(37,99,235,0.25);
  border: none;
  font-family: 'Sora', sans-serif;
  letter-spacing: -0.01em;
}
.hero__try-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 48px rgba(37,99,235,0.55), 0 6px 18px rgba(37,99,235,0.35);
  background: linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%);
}
.hero__try-hint {
  font-size: 12px;
  color: rgba(255,255,255,0.5);
  font-weight: 500;
}

/* ═══ HERO CHIPS ═══ */
.hero__chips {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  flex-wrap: wrap;
}
.hero__chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border-radius: 100px;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.8);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}
.hero__chip:hover {
  background: rgba(255,255,255,0.15);
  border-color: rgba(255,255,255,0.2);
  color: white;
}
.hero__chip--accent {
  background: rgba(96,165,250,0.15);
  border-color: rgba(96,165,250,0.3);
  color: #93C5FD;
}
.hero__chip--accent:hover {
  background: rgba(96,165,250,0.25);
  color: #BFDBFE;
}

/* ═══ HERO STATS ═══ */
.hero__stats {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  margin-top: 48px;
}
.hero__stat-n {
  font-size: 28px;
  font-weight: 800;
  color: white;
  font-family: 'Sora', sans-serif;
  letter-spacing: -0.02em;
}
.hero__stat-l {
  font-size: 12px;
  color: rgba(255,255,255,0.5);
  margin-top: 2px;
  font-weight: 500;
}
.hero__stat-sep {
  width: 1px;
  height: 36px;
  background: rgba(255,255,255,0.12);
}

/* ═══ PORTFOLIO ═══ */
.portfolio {
  padding: 100px 0;
}
.portfolio__head {
  text-align: center;
  margin-bottom: 48px;
}
.portfolio__head .eyebrow,
.portfolio__head .section-title,
.portfolio__head .section-sub {
  margin-left: auto;
  margin-right: auto;
}
.portfolio__featured {
  display: flex;
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 24px;
  cursor: pointer;
  box-shadow: 0 8px 32px rgba(0,0,0,0.06);
  border: 1px solid var(--border);
  transition: all 0.3s;
}
.portfolio__featured:hover {
  box-shadow: 0 16px 48px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}
.portfolio__featured-media {
  width: 55%;
  position: relative;
  overflow: hidden;
}
.portfolio__featured-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}
.portfolio__featured:hover .portfolio__featured-media img {
  transform: scale(1.04);
}
.portfolio__featured-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(8,12,24,0.1) 0%, transparent 50%);
}
.portfolio__featured-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 5px 12px;
  border-radius: 100px;
  background: rgba(8,12,24,0.8);
  backdrop-filter: blur(8px);
  color: #FCD34D;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
}
.portfolio__featured-info {
  width: 45%;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.portfolio__featured-num {
  font-size: 12px;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.1em;
}
.portfolio__featured-name {
  font-size: 28px;
  font-weight: 700;
  color: var(--text);
  margin: 8px 0 6px;
}
.portfolio__featured-addr {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 20px;
}
.portfolio__featured-specs {
  display: flex;
  gap: 24px;
  margin-bottom: 20px;
}
.portfolio__featured-spec .n {
  display: block;
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
  font-family: 'Sora', sans-serif;
}
.portfolio__featured-spec .l {
  font-size: 12px;
  color: var(--text-muted);
}
.portfolio__featured-price {
  margin-bottom: 20px;
}
.portfolio__featured-price .l {
  display: block;
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 4px;
}
.portfolio__featured-price .v {
  font-size: 22px;
  font-weight: 700;
  color: var(--text);
  font-family: 'Sora', sans-serif;
}
.portfolio__featured-price .u {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
}
.portfolio__featured-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border-radius: 10px;
  background: var(--accent);
  color: white;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  width: fit-content;
}
.portfolio__featured-btn:hover {
  background: var(--accent-hover);
  transform: translateY(-1px);
}
.portfolio__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.b-card {
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  border: 1px solid var(--border);
  transition: all 0.3s;
}
.b-card:hover {
  box-shadow: 0 12px 40px rgba(0,0,0,0.08);
  transform: translateY(-3px);
}
.b-card__media {
  position: relative;
  height: 200px;
  overflow: hidden;
}
.b-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}
.b-card:hover .b-card__media img {
  transform: scale(1.06);
}
.b-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 60%, rgba(8,12,24,0.4) 100%);
}
.b-card__info {
  padding: 20px;
}
.b-card__num {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.1em;
}
.b-card__name {
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
  margin: 4px 0 4px;
}
.b-card__addr {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 12px;
}
.b-card__price {
  font-size: 16px;
  font-weight: 700;
  color: var(--accent);
  font-family: 'Sora', sans-serif;
}
.b-card__price span {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
}
.portfolio__all {
  text-align: center;
  margin-top: 40px;
}
.btn-all {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  border-radius: 12px;
  background: var(--text);
  color: white;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}
.btn-all:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

/* ═══ HOW IT WORKS ═══ */
.how {
  padding: 100px 0;
  background: var(--bg-subtle);
}
.how__head {
  text-align: center;
  margin-bottom: 56px;
}
.how__head .section-title,
.how__head .section-sub {
  margin-left: auto;
  margin-right: auto;
}
.how__steps {
  display: flex;
  align-items: stretch;
  gap: 0;
}
.step {
  flex: 1;
  padding: 0 20px;
}
.step__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.step__num {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  font-family: 'Sora', sans-serif;
}
.step__icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  box-shadow: 0 4px 16px rgba(37,99,235,0.08);
  border: 1px solid var(--border-accent);
}
.step__title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 8px;
}
.step__text {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}
.step__connector {
  width: 40px;
  display: flex;
  align-items: flex-start;
  padding-top: 24px;
  flex-shrink: 0;
}
.step__connector::after {
  content: '';
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--border-strong), var(--border));
}

/* ═══ FEATURES ═══ */
.features {
  padding: 100px 0;
}
.features__head {
  text-align: center;
  margin-bottom: 56px;
}
.features__head .section-title,
.features__head .section-sub {
  margin-left: auto;
  margin-right: auto;
}
.features__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.feat {
  padding: 28px;
  border-radius: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  transition: all 0.3s;
}
.feat:hover {
  border-color: var(--border-accent);
  box-shadow: 0 8px 32px rgba(37,99,235,0.06);
  transform: translateY(-2px);
}
.feat__icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}
.feat__icon--navy { background: rgba(37,99,235,0.08); color: #2563EB; }
.feat__icon--blue { background: rgba(59,130,246,0.08); color: #3B82F6; }
.feat__icon--green { background: rgba(5,150,105,0.08); color: #059669; }
.feat__icon--amber { background: rgba(217,119,6,0.08); color: #D97706; }
.feat__icon--purple { background: rgba(139,92,246,0.08); color: #8B5CF6; }
.feat__icon--rose { background: rgba(244,63,94,0.08); color: #F43F5E; }
.feat__title {
  font-size: 17px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 8px;
}
.feat__text {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* ═══ CTA ═══ */
.cta-section {
  padding: 60px 0 100px;
}
.cta-box {
  position: relative;
  border-radius: 28px;
  overflow: hidden;
  min-height: 340px;
  display: flex;
  align-items: center;
}
.cta-box__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.cta-box__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cta-box__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(8,12,24,0.85) 0%, rgba(8,12,24,0.65) 100%);
}
.cta-box__content {
  position: relative;
  z-index: 1;
  padding: 48px;
  max-width: 560px;
}
.cta-box__title {
  font-size: 36px;
  font-weight: 700;
  color: white;
  margin-bottom: 12px;
  line-height: 1.1;
}
.cta-box__text {
  font-size: 16px;
  color: rgba(255,255,255,0.7);
  margin-bottom: 28px;
  line-height: 1.6;
}
.cta-box__actions {
  display: flex;
  align-items: center;
  gap: 20px;
}
.cta-box__btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 12px;
  background: white;
  color: #0F172A;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
}
.cta-box__btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(255,255,255,0.2);
}
.cta-box__link {
  color: rgba(255,255,255,0.7);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.3);
  padding-bottom: 2px;
  transition: all 0.2s;
}
.cta-box__link:hover {
  color: white;
  border-bottom-color: white;
}

/* ═══ FOOTER ═══ */
.footer {
  padding: 64px 0 32px;
  border-top: 1px solid var(--border);
  background: var(--bg-subtle);
}
.footer__top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 48px;
}
.footer__brand {
  max-width: 280px;
}
.footer__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}
.footer__logo span {
  font-weight: 700;
  font-size: 18px;
  color: var(--text);
  font-family: 'Sora', sans-serif;
}
.footer__tag {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}
.footer__cols {
  display: flex;
  gap: 64px;
}
.footer__col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.footer__col-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--text);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 4px;
}
.footer__col a {
  font-size: 14px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}
.footer__col a:hover {
  color: var(--accent);
}
.footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 28px;
  border-top: 1px solid var(--border);
  font-size: 13px;
  color: var(--text-muted);
}
.footer__badges {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* ═══ RESPONSIVE ═══ */
@media (max-width: 768px) {
  .hero__title { font-size: 38px; }
  .hero__lead { font-size: 16px; }
  .hero__search { flex-direction: column; border-radius: 20px; }
  .hero__search-sep { width: 100%; height: 1px; }
  .hero__search-field--type { max-width: 100%; }
  .hero__search-btn { padding: 16px; }
  .hero__stats { flex-wrap: wrap; gap: 16px; }
  .hero__stat-sep { display: none; }
  .section-title { font-size: 28px; }
  .portfolio__featured { flex-direction: column; }
  .portfolio__featured-media, .portfolio__featured-info { width: 100%; }
  .portfolio__grid { grid-template-columns: 1fr; }
  .features__grid { grid-template-columns: 1fr; }
  .how__steps { flex-direction: column; gap: 24px; }
  .step__connector { display: none; }
  .footer__top { flex-direction: column; gap: 32px; }
  .footer__cols { flex-wrap: wrap; gap: 32px; }
  .nav__links { display: none; }
  .cta-box__content { padding: 32px; }
  .cta-box__title { font-size: 26px; }
}
</style>
