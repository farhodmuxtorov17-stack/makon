<template>
  <div class="landing">
    <!-- ════════ HERO ════════ -->
    <section class="hero">
      <div class="hero__bg">
        <img src="/buildings/3d-tower-1.png" alt="Tashkent City" class="hero__bg-img" />
        <div class="hero__bg-grad"></div>
      </div>

      <nav class="nav">
        <NuxtLink to="/" class="nav__brand">
          <div class="nav__logo">M</div>
          <span>MAKON</span>
        </NuxtLink>
        <div class="nav__links">
          <NuxtLink to="/catalog" class="nav__link">Katalog</NuxtLink>
          <NuxtLink to="/catalog" class="nav__link">Binolar</NuxtLink>
          <a href="mailto:info@makon.uz" class="nav__link">Bog'lanish</a>
        </div>
        <div class="nav__right">
          <ThemeToggle />
          <NuxtLink to="/login" class="nav__link">Kirish</NuxtLink>
          <NuxtLink to="/register/eri" class="nav__btn">
            Ro'yxatdan o'tish <ArrowRight :size="14" />
          </NuxtLink>
        </div>
      </nav>

      <div class="hero__center">
        <div class="hero__content">
          <h1 class="hero__title">
            <span class="hero__title-1">Binolarning</span>
            <span class="hero__title-2">raqamli nazorati</span>
          </h1>
          <p class="hero__lead">
            Premium binolarda ofis, savdo va ombor maydonlari — ERI orqali xavfsiz shartnoma va to'liq boshqaruv bitta tizimda.
          </p>

          <div class="search">
            <div class="search__field">
              <Search :size="19" class="search__icon" />
              <input v-model="heroSearch" type="text" placeholder="Bino, maydon turi yoki manzil bo'yicha qidiring..." @keyup.enter="goToCatalog" />
              <button class="search__submit" @click="goToCatalog">
                Qidirish
              </button>
            </div>
            <div class="search__chips">
              <NuxtLink to="/catalog?offerType=RENT" class="chip"><Building2 :size="14" /> Ijaraga</NuxtLink>
              <NuxtLink to="/catalog?offerType=SALE" class="chip"><ShoppingBag :size="14" /> Sotuvda</NuxtLink>
              <NuxtLink to="/catalog?type=WAREHOUSE" class="chip"><Warehouse :size="14" /> Ombor</NuxtLink>
              <NuxtLink to="/catalog?type=SHOPPING" class="chip"><Store :size="14" /> Savdo</NuxtLink>
              <NuxtLink to="/catalog" class="chip chip--solid">Barchasi <ArrowRight :size="13" /></NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ════════ BUILDINGS ════════ -->
    <section id="buildings" class="buildings">
      <div class="buildings__head">
        <div class="eyebrow">PORTFEL</div>
        <h2 class="buildings__title">Toshkentning premium obyektlari</h2>
        <p class="buildings__sub">Biznes markazlari, savdo obyektlari va logistika markazlari — bitta platformada boshqariladi.</p>
      </div>

      <!-- Featured -->
      <div class="featured" @click="navigateTo('/buildings/tashkent-city')">
        <div class="featured__media">
          <img src="/buildings/3d-tower-1.png" alt="Tashkent City" />
          <div class="featured__media-grad"></div>
          <div class="featured__tag">PREMIUM</div>
        </div>
        <div class="featured__info">
          <div class="featured__num">01</div>
          <h3 class="featured__name">Tashkent City</h3>
          <p class="featured__addr"><MapPin :size="14" /> Mirzo Ulug'bek tumani, Toshkent</p>
          <div class="featured__specs">
            <div class="featured__spec"><span class="featured__spec-n">12</span><span class="featured__spec-l">Qavat</span></div>
            <div class="featured__spec"><span class="featured__spec-n">240</span><span class="featured__spec-l">Unit</span></div>
            <div class="featured__spec"><span class="featured__spec-n">32K</span><span class="featured__spec-l">m² maydon</span></div>
          </div>
          <div class="featured__foot">
            <div class="featured__price">
              <span class="featured__price-l">Ijaraga</span>
              <span class="featured__price-v">25 000 000 UZS<span class="featured__price-u">/oy</span></span>
            </div>
            <NuxtLink to="/buildings/tashkent-city" class="featured__btn">Batafsil <ArrowRight :size="15" /></NuxtLink>
          </div>
        </div>
      </div>

      <!-- Grid: asymmetric editorial layout -->
      <div class="grid">
        <div class="card card--tall" @click="navigateTo('/buildings/trillant-tower')">
          <div class="card__media">
            <img src="/buildings/3d-tower-2.png" alt="Trillant Tower" />
            <div class="card__grad"></div>
          </div>
          <div class="card__overlay">
            <div class="card__num">02</div>
            <h4 class="card__name">Trillant Tower</h4>
            <p class="card__addr"><MapPin :size="12" /> Yashnabad</p>
            <div class="card__price">18 000 000 UZS<span>/oy</span></div>
          </div>
        </div>

        <div class="card" @click="navigateTo('/buildings/it-park')">
          <div class="card__media">
            <img src="/buildings/3d-tower-3.png" alt="IT Park" />
            <div class="card__grad"></div>
          </div>
          <div class="card__overlay">
            <div class="card__num">03</div>
            <h4 class="card__name">Savdo Markaz</h4>
            <p class="card__addr"><MapPin :size="12" /> Yakkasaray</p>
            <div class="card__price">12 000 000 UZS<span>/oy</span></div>
          </div>
        </div>

        <div class="card" @click="navigateTo('/buildings/piramit')">
          <div class="card__media">
            <img src="/buildings/3d-tower-3.png" alt="Piramit" />
            <div class="card__grad"></div>
          </div>
          <div class="card__overlay">
            <div class="card__num">04</div>
            <h4 class="card__name">Logistika Markaz</h4>
            <p class="card__addr"><MapPin :size="12" /> Sergeli</p>
            <div class="card__price">8 000 000 UZS<span>/oy</span></div>
          </div>
        </div>
      </div>

      <div class="buildings__all">
        <NuxtLink to="/catalog" class="btn-all">
          Barcha obyektlarni ko'rish <ArrowRight :size="16" />
        </NuxtLink>
      </div>
    </section>

    <!-- ════════ STATS BAND ════════ -->
    <section class="stats-band">
      <div class="stats-band__inner">
        <div class="stat-item">
          <div class="stat-item__num">12K+</div>
          <div class="stat-item__label">Boshqariladigan unit</div>
        </div>
        <div class="stat-item__sep"></div>
        <div class="stat-item">
          <div class="stat-item__num">98%</div>
          <div class="stat-item__label">Bandlik darajasi</div>
        </div>
        <div class="stat-item__sep"></div>
        <div class="stat-item">
          <div class="stat-item__num">240</div>
          <div class="stat-item__label">Faol shartnoma</div>
        </div>
        <div class="stat-item__sep"></div>
        <div class="stat-item">
          <div class="stat-item__num">5</div>
          <div class="stat-item__label">Premium bino</div>
        </div>
      </div>
    </section>

    <!-- ════════ HOW IT WORKS ════════ -->
    <section class="how">
      <div class="how__head">
        <div class="eyebrow">QANDAY ISHLAYDI</div>
        <h2 class="how__title">To'rt qadam — ofisdan shartnomagacha</h2>
        <p class="how__sub">MAKON imkoniyatlari bilan tanishing — qidirishdan boshlab, ERI orqali shartnoma imzolashgacha.</p>
      </div>
      <div class="how__steps">
        <div class="step">
          <div class="step__num">01</div>
          <div class="step__icon"><Search :size="22" /></div>
          <h4 class="step__title">Qidiring</h4>
          <p class="step__text">Katalogda binoni, qavatni va maydonni tanlang. Interaktiv qavat rejasi orqali bo'sh unitlarni ko'ring.</p>
        </div>
        <div class="step__line"></div>
        <div class="step">
          <div class="step__num">02</div>
          <div class="step__icon"><FileText :size="22" /></div>
          <h4 class="step__title">Ariza qoldiring</h4>
          <p class="step__text">Maydon turini, muddatni va boshlang'ich sanani ko'rsating. Operator 24 soat ichida bog'lanadi.</p>
        </div>
        <div class="step__line"></div>
        <div class="step">
          <div class="step__num">03</div>
          <div class="step__icon"><ShieldCheck :size="22" /></div>
          <h4 class="step__title">ERI orqali imzolang</h4>
          <p class="step__text">Shartnoma ERI ( elektron raqamli imzo) orqali xavfsiz imzolanadi. Hech qanday qog'oz kerak emas.</p>
        </div>
        <div class="step__line"></div>
        <div class="step">
          <div class="step__num">04</div>
          <div class="step__icon"><KeyRound :size="22" /></div>
          <h4 class="step__title">Boshqaring</h4>
          <p class="step__text">Shaxsiy kabinetingizdan invoyslar, xizmat so'rovlari va hisoblagichlarni boshqaring.</p>
        </div>
      </div>
    </section>

    <!-- ════════ FEATURES ════════ -->
    <section class="features">
      <div class="features__head">
        <div class="eyebrow">PLATFORMA IMKONIYATLARI</div>
        <h2 class="features__title">Binolar uchun yagona raqamli ekotizim</h2>
      </div>
      <div class="features__grid">
        <div class="feat">
          <div class="feat__icon feat__icon--teal"><Building2 :size="20" /></div>
          <h4 class="feat__title">3D Bino Modeli</h4>
          <p class="feat__text">Binoning 3D modeli orqali har bir qavat va unitni interaktiv ko'rish va tanlash.</p>
        </div>
        <div class="feat">
          <div class="feat__icon feat__icon--emerald"><FileText :size="20" /></div>
          <h4 class="feat__title">ERI Shartnoma</h4>
          <p class="feat__text">Elektron raqamli imzo orqali qonuniy kuchga ega shartnomalar — qog'azsiz va xavfsiz.</p>
        </div>
        <div class="feat">
          <div class="feat__icon feat__icon--amber"><Wallet :size="20" /></div>
          <h4 class="feat__title">Moliya Boshqaruvi</h4>
          <p class="feat__text">Invoyslar, to'lovlardar va qarzdorliklarni avtomatik hisob-kitob qilish.</p>
        </div>
        <div class="feat">
          <div class="feat__icon feat__icon--violet"><Wrench :size="20" /></div>
          <h4 class="feat__title">Xizmat So'rovlari</h4>
          <p class="feat__text">Texnik xizmatlar, ta'mirlash ishlari va materiallar boshqaruvi bitta tizimda.</p>
        </div>
        <div class="feat">
          <div class="feat__icon feat__icon--sky"><BarChart3 :size="20" /></div>
          <h4 class="feat__title">Dashboard va Hisobotlar</h4>
          <p class="feat__text">Bandlik, daromad va ijara dinamikasini real vaqtda kuzatib boring.</p>
        </div>
        <div class="feat">
          <div class="feat__icon feat__icon--rose"><Users :size="20" /></div>
          <h4 class="feat__title">Rolli Boshqaruv</h4>
          <p class="feat__text">Super admin, bino menejeri, buxgalter, operator va texnik xodimlar uchun rollar.</p>
        </div>
      </div>
    </section>

    <!-- ════════ CTA ════════ -->
    <section id="contacts" class="cta">
      <div class="cta__card">
        <div class="cta__glow"></div>
        <div class="cta__inner">
          <div class="eyebrow eyebrow--dark">ERI SERTIFIKATLANGAN</div>
          <h2 class="cta__title">Binongizni raqamlashtiring</h2>
          <p class="cta__text">Binongizni MAKON platformasiga qo'shing — ijara jarayonini to'liq boshqaring, ERI orqali xavfsiz shartnoma tuzing, to'lovlarni avtomatlashtiring.</p>
          <div class="cta__btns">
            <NuxtLink to="/register/eri" class="cta__btn cta__btn--solid">
              Ro'yxatdan o'tish <ArrowRight :size="16" />
            </NuxtLink>
            <a href="https://t.me/makon_bot" target="_blank" class="cta__btn cta__btn--ghost">
              <MessageCircle :size="16" /> Bog'lanish
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ════════ FOOTER ════════ -->
    <footer class="footer">
      <div class="footer__top">
        <div class="footer__brand">
          <div class="nav__brand">
            <div class="nav__logo">M</div>
            <span>MAKON</span>
          </div>
          <p class="footer__desc">Toshkentdagi premium ko'chmas mulk obyektlarini boshqarish va ijaraga berish uchun yagona raqamli platforma.</p>
        </div>
        <div class="footer__cols">
          <div class="footer__col">
            <h5 class="footer__h">PLATFORMA</h5>
            <NuxtLink to="/catalog" class="footer__link">Katalog</NuxtLink>
            <NuxtLink to="/login" class="footer__link">Tizimga kirish</NuxtLink>
            <NuxtLink to="/register/eri" class="footer__link">Ro'yxatdan o'tish</NuxtLink>
          </div>
          <div class="footer__col">
            <h5 class="footer__h">BOG'LANISH</h5>
            <p class="footer__text">Toshkent, O'zbekiston</p>
            <p class="footer__text">+998 71 200 00 00</p>
            <p class="footer__text">info@makon.uz</p>
          </div>
        </div>
      </div>
      <div class="footer__bottom">© 2026 MAKON — ERI orqali xavfsiz platforma</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Search, Building2, ShoppingBag, Warehouse, Store, ArrowRight, MapPin, MessageCircle, FileText, ShieldCheck, KeyRound, Wallet, Wrench, BarChart3, Users } from 'lucide-vue-next'

const heroSearch = ref('')
function goToCatalog() {
  navigateTo({ path: '/catalog', query: heroSearch.value ? { q: heroSearch.value } : {} })
}
</script>

<style scoped>
/* ════════ GLOBAL ════════ */
.landing { overflow-x: hidden; }
.eyebrow {
  font-size: 11px; font-weight: 700; letter-spacing: 0.18em;
  color: var(--accent); text-transform: uppercase; margin-bottom: 14px;
}
.eyebrow--dark { color: var(--accent); }

/* ════════ HERO ════════ */
.hero {
  position: relative; min-height: 100vh;
  display: flex; flex-direction: column; overflow: hidden;
}
.hero__bg { position: absolute; inset: 0; z-index: 0; }
.hero__bg-img { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; }
.hero__bg-grad {
  position: absolute; inset: 0;
  background:
    linear-gradient(180deg, rgba(9,9,11,0.6) 0%, rgba(9,9,11,0.35) 35%, rgba(9,9,11,0.85) 100%),
    radial-gradient(ellipse 120% 80% at 50% 0%, var(--accent-rgb, 15,118,110,0.08), transparent 50%);
}

/* Nav */
.nav {
  position: relative; z-index: 10;
  display: flex; align-items: center; justify-content: space-between;
  padding: 24px 48px; max-width: 1400px; margin: 0 auto; width: 100%;
}
.nav__brand { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.nav__logo {
  width: 38px; height: 38px; border-radius: 11px;
  background: var(--accent);
  display: flex; align-items: center; justify-content: center;
  font-weight: 800; font-size: 17px; color: white;
  box-shadow: 0 4px 16px var(--accent-rgb, 15,118,110,0.35);
}
.nav__brand span { font-weight: 800; font-size: 17px; color: white; letter-spacing: -0.02em; }
.nav__links { display: flex; gap: 32px; }
.nav__link {
  color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px; font-weight: 500;
  transition: color 0.3s;
}
.nav__link:hover { color: white; }
.nav__right { display: flex; align-items: center; gap: 16px; }
.nav__btn {
  display: inline-flex; align-items: center; gap: 5px;
  background: white; color: #09090b;
  padding: 10px 18px; border-radius: 11px;
  font-size: 13px; font-weight: 600; text-decoration: none;
  transition: all 0.3s; box-shadow: 0 2px 10px rgba(255,255,255,0.08);
}
.nav__btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(255,255,255,0.15); }

/* Hero center content */
.hero__center {
  position: relative; z-index: 5; flex: 1;
  display: flex; align-items: center; justify-content: center;
  text-align: center; padding: 0 48px 120px;
}
.hero__content { max-width: 720px; }
.hero__title {
  margin: 0 0 28px; line-height: 0.98;
}
.hero__title-1 {
  display: block; font-size: clamp(48px, 7vw, 80px);
  font-weight: 800; color: white; letter-spacing: -0.045em;
}
.hero__title-2 {
  display: block; font-size: clamp(48px, 7vw, 80px);
  font-weight: 800; letter-spacing: -0.045em;
  background: var(--accent-subtle);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero__lead {
  font-size: 18px; line-height: 1.6;
  color: rgba(255,255,255,0.55);
  margin: 0 0 44px; max-width: 560px; margin-left: auto; margin-right: auto;
}

/* Search */
.search { max-width: 580px; margin: 0 auto; }
.search__field {
  display: flex; align-items: center; gap: 10px;
  background: rgba(255,255,255,0.95); border-radius: 16px;
  padding: 6px 6px 6px 20px; margin-bottom: 14px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}
.search__icon { color: #a1a1aa; flex-shrink: 0; }
.search__field input {
  flex: 1; border: none; outline: none; background: transparent;
  font-size: 14px; color: #18181b; padding: 12px 0;
}
.search__field input::placeholder { color: #a1a1aa; }
.search__submit {
  background: var(--accent); color: white;
  border: none; padding: 12px 24px; border-radius: 12px;
  font-size: 13px; font-weight: 600; cursor: pointer;
  transition: all 0.25s; box-shadow: 0 2px 8px var(--accent-rgb, 15,118,110,0.3);
}
.search__submit:hover {
  background: var(--accent-hover);
  box-shadow: 0 4px 16px var(--accent-rgb, 15,118,110,0.4);
}
.search__chips { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
.chip {
  display: inline-flex; align-items: center; gap: 5px;
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.7); padding: 8px 15px; border-radius: 10px;
  font-size: 12px; font-weight: 500; text-decoration: none;
  transition: all 0.3s; backdrop-filter: blur(12px);
}
.chip:hover { background: rgba(255,255,255,0.12); color: white; border-color: rgba(255,255,255,0.18); }
.chip--solid {
  background: linear-gradient(135deg, var(--accent));
  border-color: transparent; color: white;
}
.chip--solid:hover {
  background: linear-gradient(135deg, rgba(37,99,235,0.95), rgba(67,56,202,0.95));
}

/* ════════ BUILDINGS ════════ */
.buildings { padding: 120px 48px 100px; max-width: 1400px; margin: 0 auto; }
.buildings__head { text-align: center; max-width: 640px; margin: 0 auto 72px; }
.buildings__title {
  font-size: clamp(30px, 4.5vw, 44px); font-weight: 800;
  color: #18181b; letter-spacing: -0.035em; margin: 0 0 14px;
}
:deep(.dark) .buildings__title { color: white; }
.buildings__sub { font-size: 16px; color: #71717a; line-height: 1.6; }
:deep(.dark) .buildings__sub { color: #a1a1aa; }

/* Featured */
.featured {
  display: grid; grid-template-columns: 1.3fr 1fr; gap: 0;
  border-radius: 28px; overflow: hidden; margin-bottom: 28px;
  background: white;
  box-shadow: 0 4px 32px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.04);
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
:deep(.dark) .featured {
  background: #18181b;
  box-shadow: 0 4px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06);
}
.featured:hover {
  box-shadow: 0 32px 80px rgba(0,0,0,0.1), 0 0 0 1px var(--accent-rgb, 15,118,110,0.1);
  transform: translateY(-4px);
}
:deep(.dark) .featured:hover {
  box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px var(--accent-rgb, 15,118,110,0.15);
}
.featured__media { position: relative; aspect-ratio: 16/10; overflow: hidden; }
.featured__media img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s; }
.featured:hover .featured__media img { transform: scale(1.05); }
.featured__media-grad {
  position: absolute; inset: 0;
  background: linear-gradient(90deg, transparent 60%, rgba(0,0,0,0.05) 100%);
}
.featured__tag {
  position: absolute; top: 20px; left: 20px;
  background: var(--accent-rgb, 15,118,110,0.9); color: white;
  padding: 6px 14px; border-radius: 8px;
  font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
  backdrop-filter: blur(10px);
}
.featured__info { padding: 52px 48px; display: flex; flex-direction: column; justify-content: center; }
.featured__num {
  font-size: 13px; font-weight: 700; color: #a1a1aa;
  letter-spacing: 0.05em; margin-bottom: 12px;
}
.featured__name {
  font-size: 34px; font-weight: 800; color: #18181b;
  letter-spacing: -0.03em; margin: 0 0 8px;
}
:deep(.dark) .featured__name { color: white; }
.featured__addr {
  display: flex; align-items: center; gap: 5px;
  font-size: 14px; color: #71717a; margin: 0 0 32px;
}
.featured__addr svg { color: #a1a1aa; }
.featured__specs { display: flex; gap: 32px; margin-bottom: 36px; }
.featured__spec { display: flex; flex-direction: column; gap: 2px; }
.featured__spec-n { font-size: 20px; font-weight: 800; color: #18181b; letter-spacing: -0.02em; }
:deep(.dark) .featured__spec-n { color: white; }
.featured__spec-l { font-size: 11px; color: #a1a1aa; font-weight: 500; }
.featured__foot { display: flex; align-items: flex-end; justify-content: space-between; margin-top: auto; }
.featured__price-l { font-size: 12px; color: #a1a1aa; display: block; margin-bottom: 2px; }
.featured__price-v {
  font-size: 24px; font-weight: 800; color: #18181b; letter-spacing: -0.02em;
}
:deep(.dark) .featured__price-v { color: white; }
.featured__price-u { font-size: 13px; font-weight: 500; color: #a1a1aa; }
.featured__btn {
  display: inline-flex; align-items: center; gap: 6px;
  background: #18181b; color: white;
  padding: 13px 24px; border-radius: 12px;
  font-size: 13px; font-weight: 600; border: none; cursor: pointer;
  transition: all 0.3s;
}
.featured__btn:hover { background: var(--accent); transform: translateX(3px); }
:deep(.dark) .featured__btn { background: var(--accent); }
:deep(.dark) .featured__btn:hover { background: var(--accent-hover); }

/* Editorial grid - asymmetric */
.grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 24px; }
.card {
  position: relative; border-radius: 22px; overflow: hidden; cursor: pointer;
  background: #18181b;
  box-shadow: 0 2px 16px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.04);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
:deep(.dark) .card {
  box-shadow: 0 2px 16px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06);
}
.card:hover {
  box-shadow: 0 28px 64px rgba(0,0,0,0.12), 0 0 0 1px var(--accent-rgb, 15,118,110,0.1);
  transform: translateY(-6px);
}
:deep(.dark) .card:hover {
  box-shadow: 0 28px 64px rgba(0,0,0,0.5), 0 0 0 1px var(--accent-rgb, 15,118,110,0.15);
}
.card--tall { grid-row: span 2; }
.card__media { position: relative; width: 100%; height: 100%; aspect-ratio: 4/3; overflow: hidden; }
.card--tall .card__media { aspect-ratio: 3/5; }
.card__media img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s; }
.card:hover .card__media img { transform: scale(1.06); }
.card__grad {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.9) 100%);
}
.card__overlay {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 24px;
}
.card__num {
  font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.4);
  letter-spacing: 0.05em; margin-bottom: 6px;
}
.card__name {
  font-size: 20px; font-weight: 700; color: white;
  letter-spacing: -0.02em; margin: 0 0 4px;
}
.card--tall .card__name { font-size: 26px; }
.card__addr {
  display: flex; align-items: center; gap: 4px;
  font-size: 13px; color: rgba(255,255,255,0.6); margin: 0 0 12px;
}
.card__price {
  font-size: 15px; font-weight: 700; color: white;
}
.card--tall .card__price { font-size: 17px; }
.card__price span { font-size: 12px; font-weight: 400; color: rgba(255,255,255,0.5); }

/* All button */
.buildings__all { text-align: center; margin-top: 48px; }
.btn-all {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 28px; border-radius: 14px;
  background: var(--accent-rgb, 15,118,110,0.06); color: var(--accent);
  font-size: 14px; font-weight: 600; text-decoration: none;
  border: 1px solid var(--accent-rgb, 15,118,110,0.12);
  transition: all 0.3s;
}
.btn-all:hover {
  background: var(--accent); color: white; border-color: var(--accent);
  transform: translateY(-2px); box-shadow: 0 8px 24px var(--accent-rgb, 15,118,110,0.25);
}

/* ════════ CTA ════════ */
.cta { padding: 100px 48px; max-width: 1400px; margin: 0 auto; }
.cta__card {
  position: relative;
  background: linear-gradient(135deg, #09090b 0%, #18181b 50%, #1c1c1f 100%);
  border-radius: 32px; overflow: hidden;
  box-shadow: 0 24px 64px rgba(0,0,0,0.2);
}
.cta__glow {
  position: absolute; top: -30%; left: 50%; transform: translateX(-50%);
  width: 700px; height: 500px; border-radius: 50%;
  background: radial-gradient(circle, var(--accent-rgb, 15,118,110,0.15), transparent 65%);
  pointer-events: none;
}
.cta__inner { position: relative; z-index: 1; padding: 80px 48px; text-align: center; }
.cta__title {
  font-size: clamp(30px, 4.5vw, 46px); font-weight: 800;
  color: white; letter-spacing: -0.035em; margin: 0 0 18px;
}
.cta__text {
  font-size: 17px; color: rgba(255,255,255,0.5);
  line-height: 1.6; max-width: 520px; margin: 0 auto 40px;
}
.cta__btns { display: flex; align-items: center; justify-content: center; gap: 14px; flex-wrap: wrap; }
.cta__btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 15px 30px; border-radius: 14px;
  font-size: 14px; font-weight: 600; text-decoration: none;
  transition: all 0.3s;
}
.cta__btn--solid {
  background: var(--accent); color: white;
  box-shadow: 0 4px 20px var(--accent-rgb, 15,118,110,0.35);
}
.cta__btn--solid:hover { transform: translateY(-2px); box-shadow: 0 8px 32px var(--accent-rgb, 15,118,110,0.45); }
.cta__btn--ghost {
  background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.9);
  border: 1px solid rgba(255,255,255,0.1);
}
.cta__btn--ghost:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.15); }

/* ════════ FOOTER ════════ */
.footer { background: #09090b; padding: 64px 48px 28px; }
.footer__top {
  max-width: 1400px; margin: 0 auto;
  display: grid; grid-template-columns: 2fr 1.5fr; gap: 48px;
  padding-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.06);
}
.footer__desc { font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.6; margin-top: 16px; max-width: 360px; }
.footer__cols { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
.footer__col { display: flex; flex-direction: column; gap: 12px; }
.footer__h {
  font-size: 11px; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.12em; color: rgba(255,255,255,0.3); margin: 0 0 4px;
}
.footer__link { font-size: 14px; color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.25s; }
.footer__link:hover { color: white; }
.footer__text { font-size: 14px; color: rgba(255,255,255,0.45); margin: 0; }
.footer__bottom { max-width: 1400px; margin: 0 auto; padding-top: 24px; font-size: 13px; color: rgba(255,255,255,0.3); }

/* ════════ RESPONSIVE ════════ */
@media (max-width: 1024px) {
  .grid { grid-template-columns: 1fr 1fr; }
  .card--tall { grid-row: span 1; }
  .card--tall .card__media { aspect-ratio: 4/3; }
  .nav__links { display: none; }
  .featured { grid-template-columns: 1fr; }
  .featured__info { padding: 36px 28px; }
  .featured__name { font-size: 26px; }
}
@media (max-width: 768px) {
  .grid { grid-template-columns: 1fr; }
  .buildings, .cta { padding: 64px 20px; }
  .nav { padding: 16px 20px; }
  .hero__center { padding: 0 20px 80px; }
  .footer__top { grid-template-columns: 1fr; gap: 32px; }
  .footer__cols { grid-template-columns: 1fr 1fr; }
  .footer { padding: 48px 20px 24px; }
  .cta__inner { padding: 48px 24px; }
  .cta__card { border-radius: 24px; }
  .featured__specs { flex-wrap: wrap; gap: 20px; }
}

/* ════════ STATS BAND ════════ */
.stats-band { background: var(--accent); padding: 32px 48px; }
.stats-band__inner { max-width: 1400px; margin: 0 auto; display: flex; align-items: center; justify-content: space-around; gap: 16px; }
.stat-item { text-align: center; }
.stat-item__num { font-size: clamp(32px, 4vw, 44px); font-weight: 800; color: white; letter-spacing: -0.03em; }
.stat-item__label { font-size: 13px; color: rgba(255,255,255,0.7); font-weight: 500; margin-top: 4px; }
.stat-item__sep { width: 1px; height: 48px; background: rgba(255,255,255,0.15); }

/* ════════ HOW IT WORKS ════════ */
.how { max-width: 1400px; margin: 0 auto; padding: 100px 48px; }
.how__head { text-align: center; margin-bottom: 60px; }
.how__title { font-size: clamp(28px, 4vw, 40px); font-weight: 800; color: #18181b; letter-spacing: -0.035em; margin: 0 0 12px; }
.dark .how__title { color: white; }
.how__sub { font-size: 16px; color: #71717a; max-width: 560px; margin: 0 auto; line-height: 1.6; }
.dark .how__sub { color: #a1a1aa; }
.how__steps { display: flex; align-items: flex-start; justify-content: space-between; gap: 0; }
.step { flex: 1; text-align: center; padding: 0 16px; position: relative; }
.step__num { font-size: 13px; font-weight: 800; color: var(--accent); letter-spacing: 0.1em; margin-bottom: 16px; }
.step__icon { width: 56px; height: 56px; border-radius: 16px; background: var(--accent); color: white; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 8px 24px rgba(37,99,235,0.2); transition: transform 0.3s; }
.step:hover .step__icon { transform: translateY(-4px) scale(1.05); }
.step__title { font-size: 18px; font-weight: 700; color: #18181b; margin: 0 0 8px; letter-spacing: -0.02em; }
.dark .step__title { color: white; }
.step__text { font-size: 14px; color: #71717a; line-height: 1.6; margin: 0; }
.dark .step__text { color: #a1a1aa; }
.step__line { flex: 0 0 60px; height: 2px; background: linear-gradient(90deg, var(--accent), rgba(37,99,235,0.2)); margin-top: 44px; border-radius: 1px; }
.dark .step__line { background: linear-gradient(90deg, var(--accent), rgba(96,165,250,0.1)); }

/* ════════ FEATURES ════════ */
.features { max-width: 1400px; margin: 0 auto; padding: 0 48px 100px; }
.features__head { text-align: center; margin-bottom: 56px; }
.features__title { font-size: clamp(28px, 4vw, 40px); font-weight: 800; color: #18181b; letter-spacing: -0.035em; margin: 0; }
.dark .features__title { color: white; }
.features__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.feat { padding: 32px; border-radius: 20px; background: white; border: 1px solid rgba(0,0,0,0.05); transition: all 0.4s cubic-bezier(0.4,0,0.2,1); }
.dark .feat { background: #18181b; border: 1px solid rgba(255,255,255,0.06); }
.feat:hover { transform: translateY(-4px); box-shadow: 0 20px 48px rgba(0,0,0,0.08); border-color: rgba(37,99,235,0.15); }
.dark .feat:hover { box-shadow: 0 20px 48px rgba(0,0,0,0.3); border-color: rgba(37,99,235,0.2); }
.feat__icon { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; color: white; }
.feat__icon--teal { background: linear-gradient(135deg, #2563EB, #3B82F6); }
.feat__icon--emerald { background: linear-gradient(135deg, #059669, #10b981); }
.feat__icon--amber { background: linear-gradient(135deg, #d97706, #f59e0b); }
.feat__icon--violet { background: linear-gradient(135deg, #7c3aed, #8b5cf6); }
.feat__icon--sky { background: linear-gradient(135deg, #0284c7, #0ea5e9); }
.feat__icon--rose { background: linear-gradient(135deg, #e11d48, #f43f5e); }
.feat__title { font-size: 17px; font-weight: 700; color: #18181b; margin: 0 0 8px; letter-spacing: -0.02em; }
.dark .feat__title { color: white; }
.feat__text { font-size: 14px; color: #71717a; line-height: 1.6; margin: 0; }
.dark .feat__text { color: #a1a1aa; }

/* ════════ RESPONSIVE ════════ */
@media (max-width: 1024px) {
  .features__grid { grid-template-columns: 1fr 1fr; }
  .how__steps { flex-wrap: wrap; justify-content: center; }
  .step { flex: 0 0 45%; margin-bottom: 32px; }
  .step__line { display: none; }
}
@media (max-width: 768px) {
  .stats-band { padding: 24px 20px; }
  .stats-band__inner { flex-wrap: wrap; gap: 20px; }
  .stat-item__sep { display: none; }
  .how { padding: 60px 20px; }
  .how__steps { flex-direction: column; align-items: center; }
  .step { flex: 1 1 100%; max-width: 320px; margin-bottom: 40px; }
  .step__line { display: none; }
  .features { padding: 0 20px 60px; }
  .features__grid { grid-template-columns: 1fr; }
}
</style>
