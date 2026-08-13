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
          <a href="#contact" class="nav__link">Bog'lanish</a>
        </div>
        <div class="nav__right">
          <ThemeToggle />
          <NuxtLink to="/register" class="nav__btn-try">
            Ro'yxatdan o'tish <ArrowRight :size="14" />
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
        <div class="hero__badge animate-fade-up" style="animation-delay: 0.1s;">
          <span class="hero__badge-dot"></span>
          Raqamli shartnoma · Online boshqaruv
        </div>
        <h1 class="hero__title font-heading animate-fade-up" style="animation-delay: 0.2s;">
          Binolarning<br/><span class="hero__title-accent">raqamli boshqaruvi</span>
        </h1>
        <p class="hero__lead">
          Premium biznes markazlarida ofis, savdo va ombor maydonlari.<br/>
          Raqamli shartnoma, to'lovlarga to'liq nazorat — bitta tizimda.
        </p>



        <div class="hero__try animate-fade-up" style="animation-delay: 0.4s;">
          <NuxtLink to="/register" class="hero__try-btn">
            <span>Boshlash</span>
            <ArrowRight :size="20" />
          </NuxtLink>
          <span class="hero__try-hint">Premium platforma — to'liq boshqaruv</span>
        </div>


      </div>

      <div class="hero__stats animate-fade-up" style="animation-delay: 0.5s;">
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
    <section id="buildings" class="portfolio reveal">
      <div class="container">
        <div class="portfolio__head">
          <div class="eyebrow">PORTFEL</div>
          <h2 class="section-title font-heading">Premium obyektlar portfeli</h2>
          <p class="section-sub">Toshkentning yetakchi biznes markazlari — bitta platformada boshqariladi.</p>
        </div>

        <div class="portfolio__featured" @click="navigateTo('/buildings/tashkent-city-financial-hub')">
          <div class="portfolio__featured-media">
            <img src="/buildings/hero-tashkent.jpg" alt="Tashkent City" />
            <div class="portfolio__featured-overlay"></div>
            <div class="portfolio__featured-badge">PREMIUM</div>
          </div>
          <div class="portfolio__featured-info">
            <div class="portfolio__featured-num">01</div>
            <h3 class="portfolio__featured-name font-heading">Tashkent City Financial Hub</h3>
            <p class="portfolio__featured-addr"><MapPin :size="14" /> Shayxontohur, Toshkent</p>
            <div class="portfolio__featured-specs">
              <div class="portfolio__featured-spec"><span class="n">24</span><span class="l">Qavat</span></div>
              <div class="portfolio__featured-spec"><span class="n">210</span><span class="l">Unit</span></div>
              <div class="portfolio__featured-spec"><span class="n">42K</span><span class="l">m²</span></div>
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

        <div class="portfolio__grid portfolio__grid--wide">
          <div class="b-card" @click="navigateTo('/buildings/trillant-tower-a')">
            <div class="b-card__media">
              <img src="/buildings/bc-finance.jpg" alt="Trillant Tower" />
              <div class="b-card__overlay"></div>
              <div class="b-card__badge">A-CLASS</div>
            </div>
            <div class="b-card__info">
              <div class="b-card__num">02</div>
              <h4 class="b-card__name font-heading">Trillant Tower</h4>
              <p class="b-card__addr"><MapPin :size="12" /> Mirobod, Toshkent</p>
              <div class="b-card__specs">
                <span>18 qavat</span><span class="dot">·</span><span>140 unit</span><span class="dot">·</span><span>28K m²</span>
              </div>
              <div class="b-card__price">18 000 000 UZS<span>/oy</span></div>
            </div>
          </div>
          <div class="b-card" @click="navigateTo('/buildings/center-point-plaza')">
            <div class="b-card__media">
              <img src="/buildings/bc-city-plaza.jpg" alt="City Plaza" />
              <div class="b-card__overlay"></div>
              <div class="b-card__badge">B-CLASS</div>
            </div>
            <div class="b-card__info">
              <div class="b-card__num">03</div>
              <h4 class="b-card__name font-heading">City Plaza</h4>
              <p class="b-card__addr"><MapPin :size="12" /> Yakkasaray, Toshkent</p>
              <div class="b-card__specs">
                <span>5 qavat</span><span class="dot">·</span><span>60 unit</span><span class="dot">·</span><span>12K m²</span>
              </div>
              <div class="b-card__price">12 000 000 UZS<span>/oy</span></div>
            </div>
          </div>
          <div class="b-card" @click="navigateTo('/buildings/novza-business-park')">
            <div class="b-card__media">
              <img src="/buildings/bc-logistics.jpg" alt="Logistika Markaz" />
              <div class="b-card__overlay"></div>
              <div class="b-card__badge">LOGISTICS</div>
            </div>
            <div class="b-card__info">
              <div class="b-card__num">04</div>
              <h4 class="b-card__name font-heading">Novza Business Park</h4>
              <p class="b-card__addr"><MapPin :size="12" /> Yakkasaray, Toshkent</p>
              <div class="b-card__specs">
                <span>8 qavat</span><span class="dot">·</span><span>64 unit</span><span class="dot">·</span><span>14K m²</span>
              </div>
              <div class="b-card__price">8 000 000 UZS<span>/oy</span></div>
            </div>
          </div>
          <div class="b-card" @click="navigateTo('/buildings/silk-road-galleria')">
            <div class="b-card__media">
              <img src="/buildings/hero-tashkent.jpg" alt="Silk Road Galleria" />
              <div class="b-card__overlay"></div>
              <div class="b-card__badge">A-CLASS</div>
            </div>
            <div class="b-card__info">
              <div class="b-card__num">05</div>
              <h4 class="b-card__name font-heading">Silk Road Galleria</h4>
              <p class="b-card__addr"><MapPin :size="12" /> Yunusobod, Toshkent</p>
              <div class="b-card__specs">
                <span>5 qavat</span><span class="dot">·</span><span>80 unit</span><span class="dot">·</span><span>22K m²</span>
              </div>
              <div class="b-card__price">22 000 000 UZS<span>/oy</span></div>
            </div>
          </div>
          <div class="b-card" @click="navigateTo('/buildings/it-park-innovation-plaza')">
            <div class="b-card__media">
              <img src="/buildings/bc-finance.jpg" alt="IT Park Innovation Plaza" />
              <div class="b-card__overlay"></div>
              <div class="b-card__badge">PREMIUM</div>
            </div>
            <div class="b-card__info">
              <div class="b-card__num">06</div>
              <h4 class="b-card__name font-heading">IT Park Innovation Plaza</h4>
              <p class="b-card__addr"><MapPin :size="12" /> Yakkasaray, Toshkent</p>
              <div class="b-card__specs">
                <span>12 qavat</span><span class="dot">·</span><span>95 unit</span><span class="dot">·</span><span>18K m²</span>
              </div>
              <div class="b-card__price">15 000 000 UZS<span>/oy</span></div>
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

    <!-- ═══ HOW IT WORKS — Premium Timeline ═══ -->
    <section id="how" class="how reveal">
      <div class="container">
        <div class="how__head">
          <div class="eyebrow">JARAYON</div>
          <h2 class="section-title font-heading">Ofisdan shartnomagacha — to'rt qadamda</h2>
          <p class="section-sub">Qidirishdan boshlab, shartnoma imzolashgacha — barchasi onlayn, qog'azsiz.</p>
        </div>
        <div class="how__timeline">
          <div class="tl-item">
            <div class="tl-item__marker">
              <div class="tl-item__num">01</div>
              <div class="tl-item__icon"><Search :size="20" /></div>
            </div>
            <div class="tl-item__body">
              <h4 class="tl-item__title font-heading">Qidirish va tanlash</h4>
              <p class="tl-item__text">Katalogda binoni, qavatni va maydonni tanlang. Interaktiv qavat rejasi orqali bo'sh unitlarni real vaqtda ko'ring — maydon, narx va holat bir nigohda.</p>
              <div class="tl-item__meta">
                <span class="tl-item__tag">Interaktiv qavat rejasi</span>
                <span class="tl-item__tag">Real-time holat</span>
              </div>
            </div>
          </div>
          <div class="tl-line"></div>
          <div class="tl-item">
            <div class="tl-item__marker">
              <div class="tl-item__num">02</div>
              <div class="tl-item__icon"><FileText :size="20" /></div>
            </div>
            <div class="tl-item__body">
              <h4 class="tl-item__title font-heading">Ariza topshirish</h4>
              <p class="tl-item__text">Maydon turini, ijaraga muddatini va boshlang'ich sanani ko'rsating. Operator 24 soat ichida ko'rib chiqadi va javob beradi.</p>
              <div class="tl-item__meta">
                <span class="tl-item__tag">24 soat KPI</span>
                <span class="tl-item__tag">Avtomatik bildirishnoma</span>
              </div>
            </div>
          </div>
          <div class="tl-line"></div>
          <div class="tl-item">
            <div class="tl-item__marker">
              <div class="tl-item__num">03</div>
              <div class="tl-item__icon"><ShieldCheck :size="20" /></div>
            </div>
            <div class="tl-item__body">
              <h4 class="tl-item__title font-heading">Raqamli shartnoma</h4>
              <p class="tl-item__text">Shartnoma avtomatik generatsiyalanadi va Didox orqali elektron imzo bilan xavfsiz imzolanadi. Qog'oz hujjatlar kerak emas.</p>
              <div class="tl-item__meta">
                <span class="tl-item__tag">Didox integratsiyasi</span>
                <span class="tl-item__tag">DOCX avtomatik</span>
              </div>
            </div>
          </div>
          <div class="tl-line"></div>
          <div class="tl-item">
            <div class="tl-item__marker">
              <div class="tl-item__num">04</div>
              <div class="tl-item__icon"><KeyRound :size="20" /></div>
            </div>
            <div class="tl-item__body">
              <h4 class="tl-item__title font-heading">Shaxsiy kabinet</h4>
              <p class="tl-item__text">Shartnoma aktivlashuvi bilan ijarachi kabineti avtomatik yaratiladi. Invoyslar, xizmat so'rovlari va hisoblagichlarni boshqaring.</p>
              <div class="tl-item__meta">
                <span class="tl-item__tag">Avtomatik onboarding</span>
                <span class="tl-item__tag">To'liq nazorat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ FEATURES — Bento Grid ═══ -->
    <section id="features" class="features reveal">
      <div class="container">
        <div class="features__head">
          <div class="eyebrow">PLATFORMA</div>
          <h2 class="section-title font-heading">Binolar uchun yagona ekotizim</h2>
          <p class="section-sub">Boshqaruv, moliya, texnik xizmat va hisobotlar — bitta platformada.</p>
        </div>
        <div class="bento">
          <div class="bento__card bento__card--lg">
            <div class="bento__icon bento__icon--navy"><Building2 :size="24" /></div>
            <h4 class="bento__title font-heading">Bino boshqaruvi</h4>
            <p class="bento__text">Binolar, qavatlar va unitlarning to'liq katalogi. Interaktiv 3D-rejalar, gallereyalar va digital matryoshka kabi hierarchy.</p>
            <div class="bento__stats">
              <div class="bento__stat"><span class="n">9</span><span class="l">Bino</span></div>
              <div class="bento__stat"><span class="n">919</span><span class="l">Unit</span></div>
              <div class="bento__stat"><span class="n">42K</span><span class="l">m²</span></div>
            </div>
          </div>
          <div class="bento__card">
            <div class="bento__icon bento__icon--blue"><FileText :size="22" /></div>
            <h4 class="bento__title font-heading">Raqamli shartnoma</h4>
            <p class="bento__text">Didox orqali qonuniy kuchga ega shartnomalar — qog'azsiz va xavfsiz.</p>
          </div>
          <div class="bento__card">
            <div class="bento__icon bento__icon--green"><Wallet :size="22" /></div>
            <h4 class="bento__title font-heading">Moliyaviy boshqaruv</h4>
            <p class="bento__text">Invoyslar, to'lovlar, qarzdorlik va davrlar — avtomatlashtirilgan.</p>
          </div>
          <div class="bento__card bento__card--wide">
            <div class="bento__icon bento__icon--amber"><Wrench :size="22" /></div>
            <h4 class="bento__title font-heading">Texnik xizmat</h4>
            <p class="bento__text">Xizmat so'rovlari, ish buyruqlari va materiallar boshqaruvi — SLA nazorati bilan. Work order lifecycle — dan yopilishgacha.</p>
          </div>
          <div class="bento__card">
            <div class="bento__icon bento__icon--purple"><BarChart3 :size="22" /></div>
            <h4 class="bento__title font-heading">Hisobotlar</h4>
            <p class="bento__text">Ish stoli, moliyaviy va operatsion hisobotlar — real vaqtda.</p>
          </div>
          <div class="bento__card">
            <div class="bento__icon bento__icon--rose"><Bell :size="22" /></div>
            <h4 class="bento__title font-heading">Bildirishnomalar</h4>
            <p class="bento__text">Avtomatik eslatmalar, push-xabarnomalar va SLA monitoringi.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ STATS BAND ═══ -->
    <section class="stats-band reveal">
      <div class="container">
        <div class="stats-band__grid">
          <div class="stats-band__item">
            <div class="stats-band__icon"><Building2 :size="20" /></div>
            <div class="stats-band__num">12</div>
            <div class="stats-band__label">Boshqariladigan bino</div>
          </div>
          <div class="stats-band__item">
            <div class="stats-band__icon"><Home :size="20" /></div>
            <div class="stats-band__num">340+</div>
            <div class="stats-band__label">Faol unitlar</div>
          </div>
          <div class="stats-band__item">
            <div class="stats-band__icon"><Users :size="20" /></div>
            <div class="stats-band__num">280+</div>
            <div class="stats-band__label">Ijarachilar</div>
          </div>
          <div class="stats-band__item">
            <div class="stats-band__icon"><TrendingUp :size="20" /></div>
            <div class="stats-band__num">98.5%</div>
            <div class="stats-band__label">Bandlik darajasi</div>
          </div>
        </div>
      </div>
    </section>
    <!-- ═══ CONTACT ═══ -->
    <section id="contact" class="contact-section reveal">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <div class="contact-eyebrow">BOGLANISH</div>
            <h2 class="contact-title font-heading">Biz bilan bog'laning</h2>
            <p class="contact-sub">Savollaringiz bormi? Konsultatsiya yoki integratsiya bo'yicha yordam kerakmi — jamoamiz tayyor.</p>
            <div class="contact-items">
              <div class="contact-item">
                <div class="contact-item__icon"><Mail :size="20" /></div>
                <div class="contact-item__body">
                  <div class="contact-item__label">Email</div>
                  <a href="mailto:info@makon.uz" class="contact-item__value">info@makon.uz</a>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-item__icon"><Phone :size="20" /></div>
                <div class="contact-item__body">
                  <div class="contact-item__label">Telefon</div>
                  <a href="tel:+998712008090" class="contact-item__value">+998 71 200 80 90</a>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-item__icon"><MapPin :size="20" /></div>
                <div class="contact-item__body">
                  <div class="contact-item__label">Manzil</div>
                  <div class="contact-item__value">Tashkent City, Amir Temur ko'chasi 108, Toshkent</div>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-item__icon"><Clock :size="20" /></div>
                <div class="contact-item__body">
                  <div class="contact-item__label">Ish vaqti</div>
                  <div class="contact-item__value">Dushanba — Juma, 09:00 — 18:00</div>
                </div>
              </div>
            </div>
          </div>
          <div class="contact-form-wrap">
            <div class="contact-form-card glass">
              <div class="contact-form-head">
                <h3 class="contact-form-title font-heading">Xabar qoldiring</h3>
                <p class="contact-form-sub">Tez orada jamoamiz siz bilan bog'lanadi.</p>
              </div>
              <form class="contact-form" @submit.prevent="submitContact">
                <div class="contact-form-row">
                  <div class="contact-field">
                    <label class="contact-field__label">Ismingiz</label>
                    <input v-model="contactForm.name" type="text" class="contact-field__input" placeholder="Ism Familiya" />
                  </div>
                  <div class="contact-field">
                    <label class="contact-field__label">Telefon</label>
                    <input v-model="contactForm.phone" type="tel" class="contact-field__input" placeholder="+998 90 123 45 67" />
                  </div>
                </div>
                <div class="contact-field">
                  <label class="contact-field__label">Email</label>
                  <input v-model="contactForm.email" type="email" class="contact-field__input" placeholder="email@example.com" />
                </div>
                <div class="contact-field">
                  <label class="contact-field__label">Xabar</label>
                  <textarea v-model="contactForm.message" rows="4" class="contact-field__textarea" placeholder="Savolingizni yozing..."></textarea>
                </div>
                <button type="submit" class="contact-form__btn" :class="{ 'contact-form__btn--sent': contactSent }">
                  <template v-if="!contactSent">Yuborish <Send :size="16" /></template>
                  <template v-else>Yuborildi ✓</template>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ CTA ═══ -->
    <section class="cta-section reveal">
      <div class="container">
        <div class="cta-box">
          <div class="cta-box__bg">
            <img :src="img('/buildings/real_tashkent-night.jpg')" alt="" class="cta-box__img" />
            <div class="cta-box__overlay"></div>
          </div>
          <div class="cta-box__content">
            <h2 class="cta-box__title font-heading">Boshqaruvni boshlang</h2>
            <p class="cta-box__text">Binolaringizni MAKON platformasida birlashtiring — birinchi obyektni ulang.</p>
            <div class="cta-box__actions">
              <NuxtLink to="/register" class="cta-box__btn">
                Ro'yxatdan o'tish <ArrowRight :size="16" />
              </NuxtLink>
              <a href="#contact" class="cta-box__link">Bog'lanish</a>
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
              <a href="#buildings">Binolar</a>
              <a href="#how">Jarayon</a>
              <a href="#features">Imkoniyatlar</a>
            </div>
            <div class="footer__col">
              <div class="footer__col-title">Tizim</div>
              <NuxtLink to="/login">Tizimga kirish</NuxtLink>
              <NuxtLink to="/register">Ro'yxatdan o'tish</NuxtLink>
              <NuxtLink to="/catalog">Katalog</NuxtLink>
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
          
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { img } = useImg()
import { ref, onMounted, onUnmounted } from 'vue'
import {
  ArrowRight, MapPin, Search, FileText, ShieldCheck, KeyRound, Mail, Phone, Clock, Send,
  Building2, Wallet, Wrench, BarChart3, Bell, Home, Users, TrendingUp
} from 'lucide-vue-next'

const scrolled = ref(false)
const searchQuery = ref('')
const contactForm = ref({ name: "", phone: "", email: "", message: "" })
const contactSent = ref(false)
function submitContact() { contactSent.value = true; setTimeout(() => { contactSent.value = false; contactForm.value = { name: "", phone: "", email: "", message: "" } }, 3000) }
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
  // Scroll reveal observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' })
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
/* Reveal Animation */
.reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1); }
.reveal.is-visible { opacity: 1; transform: translateY(0); }
@media (prefers-reduced-motion: reduce) { .reveal { opacity: 1; transform: none; } }
/* ═══ BASE ═══ */
.landing {
  scroll-behavior: smooth;
  background: var(--bg);
  overflow-x: hidden;
}
.container {
  max-width: 1200px;
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
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 800;
  color: var(--text);
  margin-bottom: 16px;
  line-height: 1.08;
  letter-spacing: -0.035em;
  font-family: 'Sora', sans-serif;
}
.section-sub {
  font-size: 18px;
  color: var(--text-secondary);
  max-width: 620px;
  line-height: 1.65;
  margin: 0 auto;
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
  .nav { height: 64px; }
  .nav__inner {
  max-width: 1200px;
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
  padding: 96px 24px 48px;
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
.hero__badge { backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
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
  font-size: 72px;
  font-weight: 800;
  color: white;
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin-bottom: 24px;
}
.hero__title-accent { background: linear-gradient(135deg, #60A5FA 0%, #818CF8 50%, #A78BFA 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
  background: linear-gradient(135deg, #60A5FA 0%, #A78BFA 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero__lead {
  font-size: 20px;
  line-height: 1.6;
  color: rgba(255,255,255,0.7);
  margin-bottom: 40px;
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
  gap: 48px;
  margin-top: 56px;
  padding: 24px 48px;
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 24px;
}
.hero__stat-n {
  font-size: 42px !important;
  font-size: 28px;
  font-weight: 800;
  color: white;
  font-family: 'Sora', sans-serif;
  letter-spacing: -0.02em;
}
@media (max-width: 768px) {
  .hero__stats { gap: 20px; padding: 16px 20px; flex-wrap: wrap; }
  .hero__stat-n { font-size: 24px !important; }
}
@media (max-width: 480px) {
  .hero__stats { gap: 12px; padding: 12px 16px; flex-direction: column; }
}
.hero__stat-l {
  font-size: 13px;
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
  padding: 96px 0;
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
  transform: scale(1.06);
}
.portfolio__featured:hover {
  box-shadow: 0 32px 80px -20px rgba(0,0,0,0.15);
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
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.portfolio__grid--wide {
  grid-template-columns: repeat(4, 1fr);
}
@media (max-width: 1280px) {
  .portfolio__grid--wide { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 900px) {
  .portfolio__grid--wide { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 560px) {
  .portfolio__grid--wide { grid-template-columns: 1fr; }
}
.b-card__badge {
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 5px 12px;
  border-radius: 100px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  background: rgba(37,99,235,0.9);
  color: white;
  backdrop-filter: blur(8px);
  z-index: 2;
}
.b-card__specs {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 12px;
}
.b-card__specs .dot { opacity: 0.4; }
.b-card { position: relative; border-radius: 20px; overflow: hidden; background: var(--bg-card); border: 1px solid var(--border); transition: all 0.5s cubic-bezier(0.16,1,0.3,1); cursor: pointer; box-shadow: 0 2px 12px -2px rgba(15,23,42,0.04); }
.b-card:hover {
  box-shadow: 0 24px 64px -12px rgba(15,23,42,0.15), 0 0 0 1px rgba(37,99,235,0.15);
  transform: translateY(-6px);
  border-color: var(--border-accent);
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
  transition: transform 0.4s;
}
.b-card:hover .b-card__media img {
  transform: scale(1.06);
}
.b-card__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(8,12,24,0.5) 100%);
}
.b-card__info {
  padding: 24px 22px 26px;
}
.b-card__num {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.1em;
}
.b-card__name {
  font-size: 20px;
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

/* ═══ HOW IT WORKS — Timeline ═══ */
.how {
  padding: 120px 0;
  background: var(--bg);
}
.how__head {
  text-align: center;
  margin-bottom: 64px;
}
.how__timeline {
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.tl-item {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  padding: 24px 0;
}
.tl-item__marker {
  flex-shrink: 0;
  width: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.tl-item__num {
  font-size: 13px;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.06em;
  font-family: 'Sora', sans-serif;
}
.tl-item__icon {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: linear-gradient(135deg, #EFF6FF, #DBEAFE);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2563EB;
  box-shadow: 0 4px 12px rgba(37,99,235,0.12);
  border: 1px solid rgba(37,99,235,0.1);
}
.tl-item__body {
  flex: 1;
  padding-top: 4px;
}
.tl-item__title {
  font-size: 22px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 10px;
  letter-spacing: -0.02em;
}
.tl-item__text {
  font-size: 16px;
  line-height: 1.65;
  color: var(--text-secondary);
  margin-bottom: 14px;
}
.tl-item__meta {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.tl-item__tag {
  display: inline-flex;
  align-items: center;
  padding: 5px 14px;
  border-radius: 100px;
  background: var(--bg-subtle);
  border: 1px solid var(--border);
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
}
.tl-line {
  width: 2px;
  height: 32px;
  background: linear-gradient(180deg, var(--border), transparent);
  margin-left: 31px;
}

/* ═══ FEATURES — Bento Grid ═══ */
.features {
  padding: 120px 0;
  background: var(--bg-subtle);
}
.features__head {
  text-align: center;
  margin-bottom: 64px;
}
.bento {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
  gap: 20px;
}
@media (max-width: 1024px) {
  .bento { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .bento { grid-template-columns: 1fr; grid-auto-rows: auto; }
}
.bento__card {
  background: white;
  border-radius: 20px;
  padding: 32px;
  border: 1px solid var(--border);
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  display: flex;
  flex-direction: column;
}
.bento__card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.03);
  border-color: rgba(37,99,235,0.2);
}
.bento__card--lg {
  grid-row: span 2;
  grid-column: span 1;
  background: linear-gradient(135deg, #0F172A, #1E293B);
  border-color: transparent;
  color: white;
}
.bento__card--lg:hover {
  border-color: rgba(96,165,250,0.3);
}
.bento__card--wide {
  grid-column: span 2;
}
.bento__card--lg .bento__title { color: white; }
.bento__card--lg .bento__text { color: rgba(255,255,255,0.65); }
.bento__icon {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.bento__icon--navy { background: rgba(96,165,250,0.15); color: #60A5FA; }
.bento__icon--blue { background: #EFF6FF; color: #2563EB; }
.bento__icon--green { background: #ECFDF5; color: #059669; }
.bento__icon--amber { background: #FFFBEB; color: #D97706; }
.bento__icon--purple { background: #FAF5FF; color: #7C3AED; }
.bento__icon--rose { background: #FFF1F2; color: #E11D48; }
.bento__card--lg .bento__icon--navy { background: rgba(96,165,250,0.2); }
.bento__title {
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 10px;
  letter-spacing: -0.02em;
}
.bento__text {
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-secondary);
  flex: 1;
}
.bento__stats {
  display: flex;
  gap: 24px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(255,255,255,0.08);
}
.bento__stat {
  display: flex;
  flex-direction: column;
}
.bento__stat .n {
  font-size: 24px;
  font-weight: 800;
  color: white;
  font-family: 'Sora', sans-serif;
}
.bento__stat .l {
  font-size: 11px;
  color: rgba(255,255,255,0.5);
  margin-top: 2px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ═══ STATS BAND ═══ */
.stats-band { padding: 100px 0; background: linear-gradient(135deg, #0a1128 0%, #111b3a 50%, #0a1128 100%); position: relative; overflow: hidden; }
.stats-band::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 60% 50% at 50% 50%, rgba(37,99,235,0.08) 0%, transparent 60%); pointer-events: none; }
.stats-band__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; position: relative; z-index: 1; }
.stats-band__item { text-align: center; padding: 36px 20px; background: rgba(255,255,255,0.03); border-radius: 20px; border: 1px solid rgba(255,255,255,0.08); transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1); backdrop-filter: blur(12px); }
.stats-band__item:hover { transform: translateY(-6px); background: rgba(255,255,255,0.06); border-color: rgba(96,165,250,0.3); box-shadow: 0 20px 60px -12px rgba(0,0,0,0.4), 0 0 0 1px rgba(96,165,250,0.1); }
.stats-band__icon { width: 52px; height: 52px; margin: 0 auto 16px; border-radius: 16px; background: linear-gradient(135deg, rgba(96,165,250,0.15), rgba(37,99,235,0.08)); display: flex; align-items: center; justify-content: center; color: #60a5fa; border: 1px solid rgba(96,165,250,0.15); }
.stats-band__num { font-size: 36px; font-weight: 800; letter-spacing: -0.03em; color: #f1f5f9; margin-bottom: 6px; font-family: 'Sora', sans-serif; }
.stats-band__label { font-size: 13px; color: rgba(148,163,184,0.8); font-weight: 500; letter-spacing: 0.02em; }

@media (max-width: 768px) {
  .stats-band__grid { grid-template-columns: repeat(2, 1fr); }
  .stats-band__item { padding: 20px 12px; }
  .stats-band__num { font-size: 26px; }
}

/* ═══ ENHANCED HERO ═══ */
.hero__content { max-width: 720px; padding: 0 24px; }
.hero__lead { font-size: clamp(16px, 2vw, 19px) !important; line-height: 1.65 !important; max-width: 560px; margin: 0 auto 36px !important; }
.hero__try { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.hero__try-btn { padding: 16px 36px !important; border-radius: 16px !important; font-size: 16px !important; font-weight: 600 !important; }

/* ═══ ENHANCED NAV ═══ */
.nav--scrolled { box-shadow: 0 4px 24px -4px rgba(0,0,0,0.08) !important; }
.nav__btn-try { padding: 9px 18px !important; border-radius: 12px !important; font-size: 13.5px !important; font-weight: 600 !important; transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1) !important; }
.nav__btn-try:hover { transform: translateY(-1px) !important; box-shadow: 0 8px 20px -4px rgba(37,99,235,0.4) !important; }

/* ═══ ENHANCED SEARCH BAND ═══ */
.search-band { margin-top: -40px; position: relative; z-index: 10; padding: 0 0 40px; }
.search-band__inner { background: var(--bg-card) !important; border-radius: 20px !important; box-shadow: 0 16px 48px -8px rgba(15,23,42,0.12) !important; border: 1px solid var(--border) !important; padding: 8px !important; }
.search-band__btn { padding: 12px 28px !important; border-radius: 14px !important; font-weight: 600 !important; font-size: 14px !important; }
.search-band__chip { padding: 7px 16px !important; border-radius: 100px !important; font-size: 13px !important; font-weight: 500 !important; transition: all 0.25s ease !important; }
.search-band__chip:hover { transform: translateY(-1px) !important; }

/* ═══ ENHANCED PORTFOLIO ═══ */
.portfolio__featured { border-radius: 28px !important; overflow: hidden; border: 1px solid var(--border) !important; box-shadow: 0 16px 48px -8px rgba(15,23,42,0.1) !important; transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1) !important; }
.portfolio__featured:hover { box-shadow: 0 24px 64px -12px rgba(15,23,42,0.15) !important; transform: translateY(-3px) !important; }
.portfolio__featured-btn { padding: 12px 24px !important; border-radius: 14px !important; font-weight: 600 !important; font-size: 14px !important; transition: all 0.3s ease !important; }
.portfolio__featured-btn:hover { transform: translateX(4px) !important; }

/* ═══ ENHANCED HOW IT WORKS ═══ */
.step { transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1) !important; }
.step:hover { transform: translateY(-4px) !important; }
.step__icon { transition: all 0.3s ease !important; }
.step:hover .step__icon { transform: scale(1.1) !important; }

/* ═══ ENHANCED FEATURES ═══ */
.feat { transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1) !important; }
.feat:hover { transform: translateY(-4px) !important; }
.feat__icon { transition: all 0.3s ease !important; }
.feat:hover .feat__icon { transform: scale(1.1) rotate(-5deg) !important; }

/* ═══ ENHANCED FOOTER ═══ */
/* ═══ CTA BOX ═══ */
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
  flex-wrap: wrap;
  gap: 32px;
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
  flex-wrap: wrap;
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
  flex-wrap: wrap;
  gap: 12px;
}
.footer__badges {
  display: flex;
  align-items: center;
  gap: 8px;
}
@media (max-width: 768px) {
  .footer__top { flex-direction: column; }
  .footer__cols { gap: 32px; }
  .footer__bottom { flex-direction: column; text-align: center; }
}

.footer { padding: 64px 0 32px !important; }
.footer__col a { transition: all 0.2s ease !important; }
.footer__col a:hover { color: var(--accent) !important; padding-left: 4px !important; }


/* ═══ PREMIUM ANIMATIONS ═══ */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-up { animation: fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both; }

.hero__overlay {
  background: linear-gradient(180deg, rgba(8,12,24,0.75) 0%, rgba(8,12,24,0.5) 30%, rgba(8,12,24,0.45) 50%, rgba(8,12,24,0.8) 100%) !important;
}
.hero__bg-img { animation: heroZoom 20s ease-out infinite alternate; }
@keyframes heroZoom { from { transform: scale(1.08); } to { transform: scale(1.15); } }

.b-card { border-radius: 20px !important; background: var(--bg-card) !important; border: 1px solid var(--border) !important; box-shadow: 0 4px 20px -4px rgba(15,23,42,0.04); }
.b-card:hover { box-shadow: 0 24px 60px -12px rgba(15,23,42,0.15) !important; transform: translateY(-6px) !important; border-color: rgba(37,99,235,0.2) !important; }
.b-card__media { height: 200px !important; }
.b-card__info { padding: 20px 20px 22px !important; }
.b-card__name { font-size: 17px !important; font-weight: 700 !important; font-family: 'Sora', sans-serif !important; letter-spacing: -0.02em; }

.portfolio { padding: 100px 0 !important; }
.features { padding: 100px 0 !important; }
.how { padding: 100px 0 !important; }
.stats-band { padding: 100px 0 !important; }

.hero__title { font-size: clamp(40px, 6vw, 64px) !important; line-height: 1.06 !important; letter-spacing: -0.035em !important; }
.section-title { font-size: clamp(28px, 4.5vw, 44px) !important; letter-spacing: -0.03em !important; }
.section-sub { font-size: 17px !important; line-height: 1.65 !important; }

.feat { border-radius: 20px !important; padding: 32px 28px !important; }
.feat::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, rgba(37,99,235,0.4), transparent); transform: translateX(-100%); transition: transform 0.6s; }
.feat:hover { border-color: rgba(37,99,235,0.12) !important; transform: translateY(-4px) !important; box-shadow: 0 20px 40px -12px rgba(0,0,0,0.08) !important; }
.feat:hover::before { transform: translateX(100%); }
.feat:hover .feat__icon { transform: scale(1.1) rotate(-3deg); }

.step { border-radius: 20px !important; padding: 32px 28px !important; }
.stats-band__item { border-radius: 20px !important; padding: 32px 20px !important; }
.stats-band__num { font-family: 'Sora', sans-serif !important; font-size: 36px !important; letter-spacing: -0.03em !important; }
.cta-box { border-radius: 28px !important; }
.cta-box__title { font-family: 'Sora', sans-serif !important; letter-spacing: -0.025em; }
.contact-form-card { border-radius: 24px !important; padding: 40px !important; }


/* ═══ CONTACT SECTION ═══ */
.contact-section { padding: 100px 0; background: var(--bg); position: relative; }
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; max-width: 1200px; margin: 0 auto; }
.contact-info { display: flex; flex-direction: column; }
.contact-eyebrow { color: var(--accent); font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 12px; }
.contact-title { font-family: 'Sora', sans-serif; font-size: clamp(32px, 4vw, 44px); font-weight: 800; letter-spacing: -0.03em; color: var(--text); margin-bottom: 16px; line-height: 1.1; }
.contact-sub { font-size: 17px; line-height: 1.6; color: var(--text-secondary); margin-bottom: 40px; }
.contact-items { display: flex; flex-direction: column; gap: 24px; }
.contact-item { display: flex; align-items: flex-start; gap: 16px; }
.contact-item__icon { width: 48px; height: 48px; border-radius: 14px; background: linear-gradient(135deg, rgba(37,99,235,0.1), rgba(37,99,235,0.05)); border: 1px solid rgba(37,99,235,0.15); display: flex; align-items: center; justify-content: center; color: var(--accent); flex-shrink: 0; }
.contact-item__body { display: flex; flex-direction: column; }
.contact-item__label { font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 4px; }
.contact-item__value { font-size: 16px; font-weight: 500; color: var(--text); text-decoration: none; line-height: 1.4; }
a.contact-item__value:hover { color: var(--accent); }
.contact-form-wrap { display: flex; align-items: center; }
.contact-form-card { background: #fff; border: 1px solid var(--border); border-radius: 24px; padding: 40px; box-shadow: 0 12px 40px rgba(15,23,42,0.06); width: 100%; }
.contact-form-head { margin-bottom: 28px; }
.contact-form-title { font-family: 'Sora', sans-serif; font-size: 24px; font-weight: 800; letter-spacing: -0.02em; color: var(--text); margin-bottom: 8px; }
.contact-form-sub { font-size: 15px; color: var(--text-secondary); }
.contact-form { display: flex; flex-direction: column; gap: 18px; }
.contact-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.contact-field { display: flex; flex-direction: column; }
.contact-field__label { font-size: 13px; font-weight: 600; color: var(--text); margin-bottom: 6px; }
.contact-field__input { padding: 12px 16px; border: 1px solid var(--border); border-radius: 12px; font-size: 15px; font-family: 'Inter', sans-serif; color: var(--text); background: var(--bg-subtle); outline: none; transition: all 0.2s; }
.contact-field__input:focus { border-color: var(--accent); background: #fff; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
.contact-field__textarea { padding: 12px 16px; border: 1px solid var(--border); border-radius: 12px; font-size: 15px; font-family: 'Inter', sans-serif; color: var(--text); background: var(--bg-subtle); outline: none; transition: all 0.2s; resize: vertical; }
.contact-field__textarea:focus { border-color: var(--accent); background: #fff; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
.contact-form__btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 14px 28px; background: linear-gradient(135deg, #2563eb, #1d4ed8); color: #fff; border: none; border-radius: 14px; font-size: 15px; font-weight: 600; font-family: 'Inter', sans-serif; cursor: pointer; transition: all 0.3s; margin-top: 4px; }
.contact-form__btn:hover { background: linear-gradient(135deg, #1d4ed8, #1e40af); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(37,99,235,0.3); }
.contact-form__btn--sent { background: #10b981; }

@media (max-width: 768px) {
  .contact-grid { grid-template-columns: 1fr; gap: 40px; }
  .contact-section { padding: 60px 0; }
  .contact-form-row { grid-template-columns: 1fr; }
  .contact-form-card { padding: 28px; border-radius: 20px; }
}

</style>