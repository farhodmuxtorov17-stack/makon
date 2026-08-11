<template>
  <div class="landing">
    <!-- ════════ NAV ════════ -->
    <nav class="nav" :class="{ 'nav--scrolled': scrolled }">
      <div class="nav__inner">
        <NuxtLink to="/" class="nav__brand">
          <div class="nav__logo">M</div>
          <span>MAKON</span>
        </NuxtLink>
        <div class="nav__links">
          <NuxtLink to="/catalog" class="nav__link">Katalog</NuxtLink>
          <NuxtLink to="/catalog" class="nav__link">Binolar</NuxtLink>
          <a href="#how" class="nav__link">Jarayon</a>
          <a href="#features" class="nav__link">Imkoniyatlar</a>
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

    <!-- ════════ HERO ════════ -->
    <section class="hero">
      <div class="hero__bg">
        <img src="/buildings/hero-tashkent.jpg" alt="Tashkent City" class="hero__bg-img" />
        <div class="hero__overlay"></div>
      </div>
      <div class="hero__center">
        <div class="hero__badge">
          <ShieldCheck :size="13" /> Davlat standartlariga muvofiq · ERI integratsiyasi
        </div>
        <h1 class="hero__title">
          Binolarning raqamli boshqaruvi
        </h1>
        <p class="hero__lead">
          Premium biznes markazlarida ofis, savdo va ombor maydonlari.<br/>
          ERI orqali xavfsiz shartnoma, to'lovlarga to'liq nazorat — bitta tizimda.
        </p>
        <div class="hero__actions">
          <NuxtLink to="/catalog" class="hero__cta">
            Katalogga kirish <ArrowRight :size="16" />
          </NuxtLink>
          <a href="#how" class="hero__link">Jarayonni ko'rish</a>
        </div>
        <div class="hero__trust">
          <div class="hero__trust-item"><div class="hero__trust-n">12K+</div><div class="hero__trust-l">Boshqariladigan maydon</div></div>
          <div class="hero__trust-line"></div>
          <div class="hero__trust-item"><div class="hero__trust-n">98%</div><div class="hero__trust-l">O'rtacha bandlik</div></div>
          <div class="hero__trust-line"></div>
          <div class="hero__trust-item"><div class="hero__trust-n">240+</div><div class="hero__trust-l">Faol shartnoma</div></div>
        </div>
      </div>
      <div class="hero__scroll">
        <ChevronDown :size="20" />
      </div>
    </section>

    <!-- ════════ BUILDINGS PORTFOLIO ════════ -->
    <section id="buildings" class="portfolio">
      <div class="container">
        <div class="portfolio__head">
          <div class="eyebrow">PORTFEL</div>
          <h2 class="section-title">Premium obyektlar portfeli</h2>
          <p class="section-sub">Toshkentning yetakchi biznes markazlari, savdo obyektlari va logistika markazlari — bitta platformada boshqariladi.</p>
        </div>

        <div class="portfolio__featured" @click="navigateTo('/buildings/tashkent-city')">
          <div class="portfolio__featured-media">
            <img src="/buildings/hero-tashkent.jpg" alt="Tashkent City" />
            <div class="portfolio__featured-overlay"></div>
            <div class="portfolio__featured-badge">PREMIUM</div>
          </div>
          <div class="portfolio__featured-info">
            <div class="portfolio__featured-num">01</div>
            <h3 class="portfolio__featured-name">Tashkent City</h3>
            <p class="portfolio__featured-addr"><MapPin :size="14" /> Mirzo Ulug'bek tumani, Toshkent</p>
            <div class="portfolio__featured-specs">
              <div class="portfolio__featured-spec"><span class="n">12</span><span class="l">Qavat</span></div>
              <div class="portfolio__featured-spec"><span class="n">240</span><span class="l">Unit</span></div>
              <div class="portfolio__featured-spec"><span class="n">32K</span><span class="l">m² maydon</span></div>
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
              <h4 class="b-card__name">Trillant Tower</h4>
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
              <h4 class="b-card__name">City Plaza</h4>
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
              <h4 class="b-card__name">Logistika Markaz</h4>
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

    <!-- ════════ HOW IT WORKS ════════ -->
    <section id="how" class="how">
      <div class="container">
        <div class="how__head">
          <div class="eyebrow">JARAYON</div>
          <h2 class="section-title">To'rt qadam — ofisdan shartnomagacha</h2>
          <p class="section-sub">Qidirishdan boshlab, ERI orqali shartnoma imzolashgacha — barchasi onlayn.</p>
        </div>
        <div class="how__steps">
          <div class="step">
            <div class="step__top">
              <div class="step__num">01</div>
              <div class="step__icon"><Search :size="22" /></div>
            </div>
            <h4 class="step__title">Qidirish</h4>
            <p class="step__text">Katalogda binoni, qavatni va maydonni tanlang. Interaktiv qavat rejasi orqali bo'sh unitlarni ko'ring.</p>
          </div>
          <div class="step__connector"></div>
          <div class="step">
            <div class="step__top">
              <div class="step__num">02</div>
              <div class="step__icon"><FileText :size="22" /></div>
            </div>
            <h4 class="step__title">Ariza</h4>
            <p class="step__text">Maydon turini, muddatni va boshlang'ich sanani ko'rsating. Operator 24 soat ichida javob beradi.</p>
          </div>
          <div class="step__connector"></div>
          <div class="step">
            <div class="step__top">
              <div class="step__num">03</div>
              <div class="step__icon"><ShieldCheck :size="22" /></div>
            </div>
            <h4 class="step__title">ERI imzo</h4>
            <p class="step__text">Shartnoma elektron raqamli imzo orqali xavfsiz imzolanadi. Qog'oz hujjatlar kerak emas.</p>
          </div>
          <div class="step__connector"></div>
          <div class="step">
            <div class="step__top">
              <div class="step__num">04</div>
              <div class="step__icon"><KeyRound :size="22" /></div>
            </div>
            <h4 class="step__title">Boshqaruv</h4>
            <p class="step__text">Shaxsiy kabinetingizdan invoyslar, xizmat so'rovlari va hisoblagichlarni boshqaring.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ════════ FEATURES ════════ -->
    <section id="features" class="features">
      <div class="container">
        <div class="features__head">
          <div class="eyebrow">PLATFORMA</div>
          <h2 class="section-title">Binolar uchun yagona ekotizim</h2>
          <p class="section-sub">Boshqaruv, moliya, texnik xizmat va hisobotlar — bitta platformada.</p>
        </div>
        <div class="features__grid">
          <div class="feat">
            <div class="feat__icon"><Building2 :size="20" /></div>
            <h4 class="feat__title">Bino boshqaruvi</h4>
            <p class="feat__text">Binolar, qavatlar va unitlarning to'liq katalogi. Interaktiv rejalar va gallereyalar.</p>
          </div>
          <div class="feat">
            <div class="feat__icon"><FileText :size="20" /></div>
            <h4 class="feat__title">ERI shartnoma</h4>
            <p class="feat__text">Elektron raqamli imzo orqali qonuniy kuchga ega shartnomalar — qog'azsiz va xavfsiz.</p>
          </div>
          <div class="feat">
            <div class="feat__icon"><Wallet :size="20" /></div>
            <h4 class="feat__title">Moliyaviy boshqaruv</h4>
            <p class="feat__text">Invoyslar, to'lovlar, qarzdorlik va moliyaviy davrlarni avtomatlashtirilgan boshqaruv.</p>
          </div>
          <div class="feat">
            <div class="feat__icon"><Wrench :size="20" /></div>
            <h4 class="feat__title">Texnik xizmat</h4>
            <p class="feat__text">Xizmat so'rovlari, ish buyruqlari va materiallar bilan to'liq ekspluatatsiya sikli.</p>
          </div>
          <div class="feat">
            <div class="feat__icon"><BarChart3 :size="20" /></div>
            <h4 class="feat__title">Analitika</h4>
            <p class="feat__text">Ijrochi va bino darajasidagi dashbordlar. Bandlik, daromad va qarzdorlik monitoringi.</p>
          </div>
          <div class="feat">
            <div class="feat__icon"><Bell :size="20" /></div>
            <h4 class="feat__title">Bildirishnomalar</h4>
            <p class="feat__text">Avtomatik xabarnoma tizimi — ariza holati, to'lov muddati va xizmat yangiliklari.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ════════ CTA ════════ -->
    <section class="cta">
      <div class="container">
        <div class="cta__inner">
          <h2 class="cta__title">Obyektingizni MAKON ga qo'shing</h2>
          <p class="cta__sub">Binolaringizni raqamli boshqaruvga o'tkazing — onboarding, integratsiya va qo'llab-quvvatlash bizdan.</p>
          <div class="cta__actions">
            <NuxtLink to="/register/eri" class="cta__btn">
              Ro'yxatdan o'tish <ArrowRight :size="16" />
            </NuxtLink>
            <a href="mailto:info@makon.uz" class="cta__link">Biz bilan bog'lanish</a>
          </div>
        </div>
      </div>
    </section>

    <!-- ════════ FOOTER ════════ -->
    <footer class="footer">
      <div class="container">
        <div class="footer__top">
          <div class="footer__brand">
            <div class="footer__logo">M</div>
            <div>
              <div class="footer__name">MAKON</div>
              <div class="footer__tag">Binolarning raqamli boshqaruvi</div>
            </div>
          </div>
          <div class="footer__links">
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
            <span>ERI integratsiyasi</span>
            <span>·</span>
            <span>Davlat standarti</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, Search, MapPin, ShieldCheck, FileText, KeyRound, Building2, Wallet, Wrench, BarChart3, Bell, ChevronDown, Store, ShoppingBag, Warehouse } from 'lucide-vue-next'

const heroSearch = ref('')
const scrolled = ref(false)

function goToCatalog() {
  navigateTo('/catalog')
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    scrolled.value = window.scrollY > 40
  })
})
</script>

<style scoped>
/* ════════ BASE ════════ */
.landing {
  background: var(--bg);
  overflow-x: hidden;
}
.container {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 24px;
}
.eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--accent);
  text-transform: uppercase;
  margin-bottom: 12px;
}
.section-title {
  font-size: 38px;
  font-weight: 800;
  letter-spacing: -0.035em;
  color: var(--text);
  line-height: 1.15;
  margin-bottom: 14px;
  text-align: center;
}
.section-sub {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.6;
  text-align: center;
  max-width: 560px;
  margin: 0 auto;
}

/* ════════ NAV ════════ */
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  transition: all 0.3s;
}
.nav--scrolled {
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(0,0,0,0.05);
}
.dark .nav--scrolled {
  background: rgba(10,15,30,0.92);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.nav__inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: white;
  font-weight: 800;
  font-size: 18px;
  letter-spacing: -0.02em;
}
.nav--scrolled .nav__brand { color: var(--text); }
.nav__logo {
  width: 32px; height: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, #0066FF 0%, #3B82F6 100%);
  display: flex; align-items: center; justify-content: center;
  color: white; font-weight: 800; font-size: 16px;
  box-shadow: 0 2px 8px rgba(0,102,255,0.3);
}
.nav__links {
  display: flex;
  align-items: center;
  gap: 28px;
}
.nav__link {
  color: rgba(255,255,255,0.85);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: opacity 0.2s;
}
.nav--scrolled .nav__link { color: var(--text-secondary); }
.nav__link:hover { opacity: 0.7; }
.nav__right {
  display: flex;
  align-items: center;
  gap: 16px;
}
.nav__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 9px 18px;
  border-radius: 10px;
  background: linear-gradient(135deg, #0066FF 0%, #3B82F6 100%);
  color: white;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 2px 12px rgba(0,102,255,0.3);
  transition: all 0.2s;
}
.nav__btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0,102,255,0.4);
}

/* ════════ HERO ════════ */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.hero__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.hero__bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,12,30,0.55) 0%, rgba(0,12,30,0.35) 50%, rgba(0,12,30,0.7) 100%);
}
.hero__center {
  position: relative;
  z-index: 1;
  max-width: 760px;
  padding: 0 24px;
}
.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 100px;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.9);
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 24px;
}
.hero__title {
  font-size: 60px;
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.05;
  color: white;
  margin-bottom: 20px;
  text-shadow: 0 2px 30px rgba(0,0,0,0.2);
}
.hero__lead {
  font-size: 18px;
  line-height: 1.6;
  color: rgba(255,255,255,0.85);
  margin-bottom: 36px;
}
.hero__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 48px;
}
.hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 12px;
  background: linear-gradient(135deg, #0066FF 0%, #3B82F6 100%);
  color: white;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  box-shadow: 0 4px 20px rgba(0,102,255,0.35);
  transition: all 0.2s;
}
.hero__cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 28px rgba(0,102,255,0.45);
}
.hero__link {
  color: rgba(255,255,255,0.8);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  border-bottom: 1px solid rgba(255,255,255,0.3);
  padding-bottom: 2px;
  transition: all 0.2s;
}
.hero__link:hover { color: white; border-bottom-color: white; }
.hero__trust {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
}
.hero__trust-item {
  text-align: center;
}
.hero__trust-n {
  font-size: 28px;
  font-weight: 800;
  color: white;
  letter-spacing: -0.03em;
}
.hero__trust-l {
  font-size: 12px;
  color: rgba(255,255,255,0.6);
  margin-top: 2px;
}
.hero__trust-line {
  width: 1px;
  height: 36px;
  background: rgba(255,255,255,0.15);
}
.hero__scroll {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  color: rgba(255,255,255,0.4);
  animation: bounce 2s infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(8px); }
}

/* ════════ PORTFOLIO ════════ */
.portfolio {
  padding: 100px 0;
}
.portfolio__head {
  text-align: center;
  margin-bottom: 56px;
}
.portfolio__featured {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 0;
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 32px;
  cursor: pointer;
  box-shadow: var(--shadow-lg);
  transition: all 0.3s;
}
.portfolio__featured:hover {
  box-shadow: var(--shadow-xl);
  transform: translateY(-3px);
}
.portfolio__featured-media {
  position: relative;
  height: 420px;
  overflow: hidden;
}
.portfolio__featured-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s;
}
.portfolio__featured:hover .portfolio__featured-media img {
  transform: scale(1.05);
}
.portfolio__featured-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 60%, rgba(0,0,0,0.1) 100%);
}
.portfolio__featured-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 5px 12px;
  border-radius: 6px;
  background: linear-gradient(135deg, #0066FF 0%, #3B82F6 100%);
  color: white;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
}
.portfolio__featured-info {
  padding: 40px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-left: none;
  border-radius: 0 24px 24px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.portfolio__featured-num {
  font-size: 13px;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.1em;
  margin-bottom: 8px;
}
.portfolio__featured-name {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text);
  margin-bottom: 8px;
}
.portfolio__featured-addr {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 24px;
}
.portfolio__featured-specs {
  display: flex;
  gap: 28px;
  margin-bottom: 24px;
  padding: 16px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.portfolio__featured-spec .n {
  display: block;
  font-size: 22px;
  font-weight: 700;
  color: var(--text);
}
.portfolio__featured-spec .l {
  font-size: 12px;
  color: var(--text-muted);
}
.portfolio__featured-price {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 20px;
}
.portfolio__featured-price .l {
  font-size: 12px;
  color: var(--text-muted);
}
.portfolio__featured-price .v {
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
}
.portfolio__featured-price .u {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 400;
}
.portfolio__featured-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 12px 22px;
  border-radius: 10px;
  background: linear-gradient(135deg, #0066FF 0%, #3B82F6 100%);
  color: white;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  align-self: flex-start;
  box-shadow: 0 2px 12px rgba(0,102,255,0.25);
  transition: all 0.2s;
}
.portfolio__featured-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0,102,255,0.35);
}

.portfolio__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 48px;
}
.b-card {
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  background: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s;
}
.b-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
  border-color: var(--accent-border);
}
.b-card__media {
  position: relative;
  height: 240px;
  overflow: hidden;
}
.b-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}
.b-card:hover .b-card__media img {
  transform: scale(1.06);
}
.b-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.3) 100%);
}
.b-card__info {
  padding: 20px 24px 24px;
}
.b-card__num {
  font-size: 11px;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.1em;
  margin-bottom: 6px;
}
.b-card__name {
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 4px;
  letter-spacing: -0.02em;
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
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
}
.b-card__price span {
  font-size: 12px;
  font-weight: 400;
  color: var(--text-muted);
}
.portfolio__all {
  text-align: center;
}
.btn-all {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  border-radius: 12px;
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  color: var(--text);
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s;
}
.btn-all:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-1px);
}

/* ════════ HOW ════════ */
.how {
  padding: 100px 0;
  background: var(--bg-subtle);
}
.how__head {
  text-align: center;
  margin-bottom: 56px;
}
.how__steps {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 0;
}
.step {
  flex: 1;
  max-width: 240px;
  text-align: center;
  padding: 0 16px;
}
.step__top {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
}
.step__num {
  font-size: 12px;
  font-weight: 700;
  color: var(--accent);
  background: var(--accent-subtle);
  padding: 4px 10px;
  border-radius: 6px;
  letter-spacing: 0.08em;
}
.step__icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  box-shadow: var(--shadow-sm);
}
.step__title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}
.step__text {
  font-size: 14px;
  line-height: 1.55;
  color: var(--text-secondary);
}
.step__connector {
  flex: 0 0 40px;
  height: 2px;
  background: linear-gradient(90deg, var(--accent-border), transparent);
  margin-top: 24px;
}

/* ════════ FEATURES ════════ */
.features {
  padding: 100px 0;
}
.features__head {
  text-align: center;
  margin-bottom: 56px;
}
.features__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.feat {
  padding: 32px 28px;
  border-radius: 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  transition: all 0.3s;
}
.feat:hover {
  border-color: var(--accent-border);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
.feat__icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--accent-subtle);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}
.feat__title {
  font-size: 17px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}
.feat__text {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary);
}

/* ════════ CTA ════════ */
.cta {
  padding: 80px 0;
}
.cta__inner {
  text-align: center;
  padding: 64px 40px;
  border-radius: 28px;
  background: linear-gradient(135deg, #0066FF 0%, #3B82F6 100%);
  border-radius: 28px;
  position: relative;
  overflow: hidden;
}
.cta__inner::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 100% at 50% 0%, rgba(255,255,255,0.12) 0%, transparent 50%);
}
.cta__title {
  font-size: 36px;
  font-weight: 800;
  color: white;
  letter-spacing: -0.03em;
  margin-bottom: 12px;
  position: relative;
}
.cta__sub {
  font-size: 17px;
  color: rgba(255,255,255,0.85);
  margin-bottom: 32px;
  position: relative;
}
.cta__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  position: relative;
}
.cta__btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: 12px;
  background: white;
  color: #0066FF;
  text-decoration: none;
  font-size: 15px;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  transition: all 0.2s;
}
.cta__btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}
.cta__link {
  color: rgba(255,255,255,0.9);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  border-bottom: 1px solid rgba(255,255,255,0.3);
  padding-bottom: 2px;
}
.cta__link:hover { color: white; border-bottom-color: white; }

/* ════════ FOOTER ════════ */
.footer {
  padding: 64px 0 32px;
  border-top: 1px solid var(--border);
  background: var(--bg-subtle);
}
.footer__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
}
.footer__brand {
  display: flex;
  align-items: center;
  gap: 12px;
}
.footer__logo {
  width: 40px; height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #0066FF 0%, #3B82F6 100%);
  display: flex; align-items: center; justify-content: center;
  color: white; font-weight: 800; font-size: 18px;
}
.footer__name {
  font-weight: 800;
  font-size: 18px;
  color: var(--text);
  letter-spacing: -0.02em;
}
.footer__tag {
  font-size: 13px;
  color: var(--text-muted);
}
.footer__links {
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
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 4px;
}
.footer__col a {
  font-size: 14px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}
.footer__col a:hover { color: var(--accent); }
.footer__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 1px solid var(--border);
  font-size: 13px;
  color: var(--text-muted);
}
.footer__badges {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* ════════ RESPONSIVE ════════ */
@media (max-width: 900px) {
  .hero__title { font-size: 42px; }
  .portfolio__featured { grid-template-columns: 1fr; }
  .portfolio__featured-info { border-radius: 0 0 24px 24px; border: 1px solid var(--border); }
  .portfolio__grid { grid-template-columns: 1fr; }
  .features__grid { grid-template-columns: 1fr; }
  .how__steps { flex-direction: column; gap: 32px; }
  .step__connector { display: none; }
  .footer__top { flex-direction: column; gap: 32px; }
  .footer__links { flex-wrap: wrap; gap: 32px; }
  .nav__links { display: none; }
  .section-title { font-size: 28px; }
  .cta__title { font-size: 26px; }
}
</style>
