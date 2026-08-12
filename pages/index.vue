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
          <NuxtLink to="/login" class="nav__link">Kirish</NuxtLink>
          <NuxtLink to="/login" class="nav__btn-try">
            Kabinetga kirish <ArrowRight :size="14" />
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
          Davlat standartlariga muvofiq · Raqamli shartnoma
        </div>
        <h1 class="hero__title font-heading animate-fade-up" style="animation-delay: 0.2s;">
          Binolarning<br/><span class="hero__title-accent">raqamli boshqaruvi</span>
        </h1>
        <p class="hero__lead">
          Premium biznes markazlarida ofis, savdo va ombor maydonlari.<br/>
          Raqamli shartnoma, to'lovlarga to'liq nazorat — bitta tizimda.
        </p>



        <div class="hero__try animate-fade-up" style="animation-delay: 0.4s;">
          <NuxtLink to="/login" class="hero__try-btn">
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
              <p class="b-card__addr"><MapPin :size="12" /> Yashnabad, Toshkent</p>
              <div class="b-card__specs">
                <span>14 qavat</span><span class="dot">·</span><span>180 unit</span><span class="dot">·</span><span>24K m²</span>
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
                <span>9 qavat</span><span class="dot">·</span><span>120 unit</span><span class="dot">·</span><span>15K m²</span>
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
              <h4 class="b-card__name font-heading">Logistika Markaz</h4>
              <p class="b-card__addr"><MapPin :size="12" /> Sergeli, Toshkent</p>
              <div class="b-card__specs">
                <span>2 qavat</span><span class="dot">·</span><span>60 unit</span><span class="dot">·</span><span>18K m²</span>
              </div>
              <div class="b-card__price">8 000 000 UZS<span>/oy</span></div>
            </div>
          </div>
          <div class="b-card" @click="navigateTo('/catalog')">
            <div class="b-card__media">
              <img src="/buildings/hero-tashkent.jpg" alt="Business Tower" />
              <div class="b-card__overlay"></div>
              <div class="b-card__badge">A-CLASS</div>
            </div>
            <div class="b-card__info">
              <div class="b-card__num">05</div>
              <h4 class="b-card__name font-heading">Business Tower</h4>
              <p class="b-card__addr"><MapPin :size="12" /> Yunusobod, Toshkent</p>
              <div class="b-card__specs">
                <span>16 qavat</span><span class="dot">·</span><span>200 unit</span><span class="dot">·</span><span>28K m²</span>
              </div>
              <div class="b-card__price">22 000 000 UZS<span>/oy</span></div>
            </div>
          </div>
          <div class="b-card" @click="navigateTo('/catalog')">
            <div class="b-card__media">
              <img src="/buildings/bc-finance.jpg" alt="Finance Center" />
              <div class="b-card__overlay"></div>
              <div class="b-card__badge">PREMIUM</div>
            </div>
            <div class="b-card__info">
              <div class="b-card__num">06</div>
              <h4 class="b-card__name font-heading">Finance Center</h4>
              <p class="b-card__addr"><MapPin :size="12" /> Shayxontohur, Toshkent</p>
              <div class="b-card__specs">
                <span>11 qavat</span><span class="dot">·</span><span>150 unit</span><span class="dot">·</span><span>19K m²</span>
              </div>
              <div class="b-card__price">15 000 000 UZS<span>/oy</span></div>
            </div>
          </div>
          <div class="b-card" @click="navigateTo('/catalog')">
            <div class="b-card__media">
              <img src="/buildings/bc-city-plaza.jpg" alt="Olympus Plaza" />
              <div class="b-card__overlay"></div>
              <div class="b-card__badge">B-CLASS</div>
            </div>
            <div class="b-card__info">
              <div class="b-card__num">07</div>
              <h4 class="b-card__name font-heading">Olympus Plaza</h4>
              <p class="b-card__addr"><MapPin :size="12" /> Chilonzor, Toshkent</p>
              <div class="b-card__specs">
                <span>8 qavat</span><span class="dot">·</span><span>96 unit</span><span class="dot">·</span><span>12K m²</span>
              </div>
              <div class="b-card__price">10 000 000 UZS<span>/oy</span></div>
            </div>
          </div>
          <div class="b-card" @click="navigateTo('/catalog')">
            <div class="b-card__media">
              <img src="/buildings/bc-logistics.jpg" alt="Eco Business Park" />
              <div class="b-card__overlay"></div>
              <div class="b-card__badge">ECO</div>
            </div>
            <div class="b-card__info">
              <div class="b-card__num">08</div>
              <h4 class="b-card__name font-heading">Eco Business Park</h4>
              <p class="b-card__addr"><MapPin :size="12" /> Bektemir, Toshkent</p>
              <div class="b-card__specs">
                <span>5 qavat</span><span class="dot">·</span><span>80 unit</span><span class="dot">·</span><span>14K m²</span>
              </div>
              <div class="b-card__price">7 000 000 UZS<span>/oy</span></div>
            </div>
          </div>
          <div class="b-card" @click="navigateTo('/catalog')">
            <div class="b-card__media">
              <img src="/buildings/hero-tashkent.jpg" alt="Grand Avenue" />
              <div class="b-card__overlay"></div>
              <div class="b-card__badge">A-CLASS</div>
            </div>
            <div class="b-card__info">
              <div class="b-card__num">09</div>
              <h4 class="b-card__name font-heading">Grand Avenue</h4>
              <p class="b-card__addr"><MapPin :size="12" /> Mirobod, Toshkent</p>
              <div class="b-card__specs">
                <span>13 qavat</span><span class="dot">·</span><span>165 unit</span><span class="dot">·</span><span>22K m²</span>
              </div>
              <div class="b-card__price">19 000 000 UZS<span>/oy</span></div>
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
    <section id="how" class="how reveal">
      <div class="container">
        <div class="how__head">
          <div class="eyebrow">JARAYON</div>
          <h2 class="section-title font-heading">To'rt qadam — ofisdan shartnomagacha</h2>
          <p class="section-sub">Qidirishdan boshlab, shartnoma imzolashgacha — barchasi onlayn.</p>
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
            <h4 class="step__title font-heading">Raqamli imzo</h4>
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
    <section id="features" class="features reveal">
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
            <h4 class="feat__title font-heading">Raqamli shartnoma</h4>
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
              <NuxtLink to="/catalog">Binolar</NuxtLink>
              <a href="#how">Jarayon</a>
              <a href="#features">Imkoniyatlar</a>
            </div>
            <div class="footer__col">
              <div class="footer__col-title">Tizim</div>
              <NuxtLink to="/login">Kirish</NuxtLink>
              <NuxtLink to="/register">Ro'yxatdan o'tish</NuxtLink>
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
.b-card { position: relative; border-radius: 18px; overflow: hidden; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); transition: all 0.4s cubic-bezier(0.16,1,0.3,1); cursor: pointer; }
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
  padding: 96px 0;
  background: var(--bg-subtle);
}
.how__head {
  text-align: center;
  margin-bottom: 48px;
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
  padding: 32px 24px;
  border-radius: 20px;
  background: var(--bg-card, rgba(255,255,255,0.03));
  border: 1px solid var(--border);
  transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
}
.step:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.06);
  border-color: var(--border-accent);
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
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(37,99,235,0.02));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  box-shadow: 0 4px 16px rgba(37,99,235,0.08);
  border: 1px solid var(--border-accent);
  transition: all 0.3s;
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
  padding: 96px 0;
}
.features__head {
  text-align: center;
  margin-bottom: 48px;
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
.feat { position: relative; padding: 32px 28px; border-radius: 20px; background: var(--bg-card, rgba(255,255,255,0.03)); border: 1px solid var(--border); transition: all 0.4s cubic-bezier(0.16,1,0.3,1); overflow: hidden; }
.feat::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--accent), transparent); opacity: 0; transition: opacity 0.3s; }
.feat:hover::before { opacity: 1; }
.feat:hover {
  border-color: var(--border-accent);
  box-shadow: 0 8px 32px rgba(37,99,235,0.06);
  transform: translateY(-2px);
}
.feat__icon { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; transition: all 0.35s cubic-bezier(0.4,0,0.2,1); }
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
/* ═══ Contact Section ═══ */
.contact-section { padding: 96px 0 64px; background: var(--bg-subtle); }
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
@media (max-width: 880px) { .contact-grid { grid-template-columns: 1fr; gap: 40px; } }

.contact-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.18em; color: var(--accent); text-transform: uppercase; margin-bottom: 12px; }
.contact-title { font-size: clamp(28px, 3.5vw, 38px); font-weight: 800; letter-spacing: -0.03em; color: var(--text); margin-bottom: 12px; }
.contact-sub { font-size: 16px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 36px; max-width: 420px; }

.contact-items { display: flex; flex-direction: column; gap: 20px; }
.contact-item { display: flex; align-items: flex-start; gap: 16px; transition: transform 0.2s ease; }
.contact-item:hover { transform: translateX(4px); }
.contact-item__icon { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; background: var(--accent-subtle); color: var(--accent); border: 1px solid rgba(37,99,235,0.15); }
.contact-item__label { font-size: 12px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
.contact-item__value { font-size: 16px; font-weight: 500; color: var(--text); text-decoration: none; }
a.contact-item__value:hover { color: var(--accent); }

.contact-form-wrap { position: relative; }
.contact-form-card { border-radius: 24px; padding: 40px; box-shadow: 0 20px 60px -12px rgba(15,23,42,0.12); border: 1px solid var(--border); }
@media (max-width: 880px) { .contact-form-card { padding: 28px; } }
.contact-form-head { margin-bottom: 28px; }
.contact-form-title { font-size: 22px; font-weight: 700; color: var(--text); margin-bottom: 6px; }
.contact-form-sub { font-size: 14px; color: var(--text-secondary); }

.contact-form { display: flex; flex-direction: column; gap: 18px; }
.contact-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media (max-width: 560px) { .contact-form-row { grid-template-columns: 1fr; } }
.contact-field { display: flex; flex-direction: column; }
.contact-field__label { font-size: 13px; font-weight: 600; color: var(--text-secondary); margin-bottom: 7px; }
.contact-field__input, .contact-field__textarea { width: 100%; padding: 13px 16px; border-radius: 12px; border: 1.5px solid var(--border); background: var(--bg-card); color: var(--text); font-size: 15px; font-family: inherit; transition: all 0.2s ease; outline: none; }
.contact-field__input:focus, .contact-field__textarea:focus { border-color: var(--accent); box-shadow: 0 0 0 4px rgba(37,99,235,0.1); }
.contact-field__textarea { resize: vertical; min-height: 100px; }
.contact-field__input::placeholder, .contact-field__textarea::placeholder { color: var(--text-faint); }

.contact-form__btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 15px 24px; border-radius: 14px; border: none; background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%); color: white; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.3s cubic-bezier(0.22,1,0.36,1); box-shadow: 0 8px 24px -6px rgba(37,99,235,0.4); }
.contact-form__btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px -6px rgba(37,99,235,0.5); }
.contact-form__btn--sent { background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%) !important; box-shadow: 0 8px 24px -6px rgba(34,197,94,0.4) !important; }


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

/* Tablet */
@media (max-width: 1024px) {
  .portfolio__grid { grid-template-columns: 1fr 1fr; }
  .features__grid { grid-template-columns: 1fr 1fr; }
  .how__steps { gap: 20px; }
  .hero__title { font-size: 44px; }
  .search-band__inner { flex-direction: column; }
  .search-band__field { width: 100%; }
  .search-band__sep { width: 100%; height: 1px; }
  .search-band__field--type { max-width: 100%; }
}

/* Small mobile */
@media (max-width: 480px) {
  .hero__title { font-size: 30px; }
  .hero__lead { font-size: 14px; }
  .hero__badge { backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); font-size: 11px; padding: 6px 12px; }
  .hero__stat-n { font-size: 22px; }
  .hero__stat-l { font-size: 10px; }
  .section-title { font-size: 22px; }
  .section-sub { font-size: 13px; }
  .portfolio__featured-num { font-size: 28px; }
  .portfolio__featured-name { font-size: 20px; }
  .b-card__name { font-size: 15px; }
  .portfolio__grid, .portfolio__grid--wide { grid-template-columns: repeat(2, 1fr) !important; }
  .feat__title { font-size: 14px; }
  .nav__brand-text { font-size: 14px; }
  .search-band__chips { gap: 6px; }
  .search-band__chip { font-size: 12px; padding: 7px 12px; }
  .cta-box__title { font-size: 20px; }
  .cta-box__content { padding: 24px; }
  .footer__col { width: 100%; }
  .step__title { font-size: 15px; }
  .step__desc { font-size: 13px; }
}


/* ═══ REVEAL ANIMATION ═══ */
.reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1); }
.reveal.is-visible { opacity: 1; transform: translateY(0); }

/* ═══ PREMIUM REFINEMENTS ═══ */
.hero__badge { backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); animation-duration: 0.8s; animation-fill-mode: both; }
.hero__title { animation-duration: 0.8s; animation-fill-mode: both; }
.hero__sub { animation-duration: 0.8s; animation-fill-mode: both; }
.hero__try { animation-duration: 0.8s; animation-fill-mode: both; }
.hero__stats { animation-duration: 0.8s; animation-fill-mode: both; }

/* Premium glass cards */
.b-card:hover .b-card__media img { transform: scale(1.08); }
.b-card__media { overflow: hidden; }

/* Premium step connectors */
.step__icon { transition: transform 0.3s, box-shadow 0.3s; }
.step:hover .step__icon { transform: scale(1.08) rotate(-3deg); box-shadow: 0 8px 24px rgba(37,99,235,0.18); }
.step__num { transition: all 0.3s; }
.step:hover .step__num { color: var(--accent); }

/* Premium feature cards */
.feat { transition: all 0.4s cubic-bezier(0.4,0,0.2,1); }
.feat:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.06); border-color: var(--border-accent); }
.feat__icon { transition: transform 0.3s; }
.feat:hover .feat__icon { transform: scale(1.12) rotate(-5deg); }

/* Premium search band */
.search-band__inner { transition: box-shadow 0.3s, transform 0.3s; }
.search-band__inner:focus-within { box-shadow: 0 16px 48px rgba(37,99,235,0.12), 0 4px 16px rgba(0,0,0,0.04); transform: translateY(-1px); }
.search-band__btn { transition: transform 0.2s, box-shadow 0.2s; }
.search-band__btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(37,99,235,0.25); }

/* Premium CTA */
.cta-box { transition: transform 0.4s, box-shadow 0.4s; }
.cta-box:hover { transform: translateY(-3px); box-shadow: 0 24px 64px rgba(0,0,0,0.12); }


/* ═══ STATS BAND ═══ */
.stats-band { padding: 96px 0; background: var(--bg-subtle); }
.stats-band__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.stats-band__item { text-align: center; padding: 28px 16px; background: var(--bg-card); border-radius: 20px; border: 1px solid var(--border); transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
.stats-band__item:hover { transform: translateY(-4px); box-shadow: 0 16px 48px -8px rgba(15,23,42,0.1); border-color: var(--border-accent); }
.stats-band__icon { width: 48px; height: 48px; margin: 0 auto 14px; border-radius: 16px; background: var(--accent-subtle); display: flex; align-items: center; justify-content: center; color: var(--accent); }
.stats-band__num { font-size: 32px; font-weight: 800; letter-spacing: -0.03em; color: var(--text); margin-bottom: 4px; }
.stats-band__label { font-size: 13px; color: var(--text-muted); font-weight: 500; }

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
.footer { padding: 64px 0 32px !important; }
.footer__col a { transition: all 0.2s ease !important; }
.footer__col a:hover { color: var(--accent) !important; padding-left: 4px !important; }

</style>

.feat::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, rgba(37,99,235,0.4), transparent); transform: translateX(-100%); transition: transform 0.6s; }
.feat:hover { border-color: rgba(37,99,235,0.12); background: rgba(255,255,255,0.05); transform: translateY(-4px); box-shadow: 0 20px 40px -12px rgba(0,0,0,0.3); }
.feat:hover::before { transform: translateX(100%); }

.feat:hover .feat__icon { transform: scale(1.1) rotate(-3deg); }
