<template>
  <div class="building-page">
    <!-- Hero with building image -->
    <div class="b-hero">
      <div class="b-hero__bg">
        <img :src="building.image" :alt="building.name" class="b-hero__img" />
        <div class="b-hero__grad"></div>
      </div>
      <nav class="b-nav">
        <NuxtLink to="/" class="b-nav__logo">
          <div class="b-nav__icon">M</div>
          <span>MAKON</span>
        </NuxtLink>
        <div class="b-nav__links">
          <NuxtLink to="/catalog" class="b-nav__link">Katalog</NuxtLink>
          <NuxtLink to="/" class="b-nav__link">Bosh sahifa</NuxtLink>
        </div>
        <div class="b-nav__right">
          <ThemeToggle />
          <NuxtLink to="/login" class="b-nav__link">Kirish</NuxtLink>
          <NuxtLink to="/register/eri" class="b-nav__btn">Ro'yxatdan o'tish <ArrowRight :size="14" /></NuxtLink>
        </div>
      </nav>
      <div class="b-hero__content">
        <div class="b-hero__tag">PREMIUM BIZNES MARKAZ</div>
        <h1 class="b-hero__title">{{ building.name }}</h1>
        <p class="b-hero__addr"><MapPin :size="16" /> {{ building.district }}, Toshkent</p>
        <div class="b-hero__specs">
          <div class="b-hero__spec"><span class="b-hero__spec-n">{{ building.floors }}</span><span class="b-hero__spec-l">Qavat</span></div>
          <div class="b-hero__spec-divider"></div>
          <div class="b-hero__spec"><span class="b-hero__spec-n">{{ building.units }}</span><span class="b-hero__spec-l">Unit</span></div>
          <div class="b-hero__spec-divider"></div>
          <div class="b-hero__spec"><span class="b-hero__spec-n">{{ building.area }}</span><span class="b-hero__spec-l">m² maydon</span></div>
          <div class="b-hero__spec-divider"></div>
          <div class="b-hero__spec"><span class="b-hero__spec-n">{{ building.vacant }}</span><span class="b-hero__spec-l">Bo'sh unit</span></div>
        </div>
      </div>
    </div>

    <!-- Available units -->
    <section class="b-units">
      <div class="b-units__head">
        <h2 class="b-units__title">Bo'sh maydonlar</h2>
        <div class="b-units__filters">
          <button :class="{ active: unitFilter === 'ALL' }" @click="unitFilter = 'ALL'">Barchasi</button>
          <button :class="{ active: unitFilter === 'OFFICE' }" @click="unitFilter = 'OFFICE'">Ofis</button>
          <button :class="{ active: unitFilter === 'RETAIL' }" @click="unitFilter = 'RETAIL'">Savdo</button>
          <button :class="{ active: unitFilter === 'WAREHOUSE' }" @click="unitFilter = 'WAREHOUSE'">Ombor</button>
        </div>
      </div>

      <div class="b-units__grid">
        <div v-for="unit in filteredUnits" :key="unit.id" class="unit-card" @click="navigateTo(`/units/${unit.slug}`)">
          <div class="unit-card__img">
            <img :src="unit.image" :alt="unit.name" />
            <div class="unit-card__badge">{{ unit.type }}</div>
          </div>
          <div class="unit-card__info">
            <div class="unit-card__top">
              <h3 class="unit-card__name">{{ unit.name }}</h3>
              <span class="unit-card__floor">{{ unit.floor }}-qavat</span>
            </div>
            <p class="unit-card__area">{{ unit.area }} m²</p>
            <div class="unit-card__foot">
              <div class="unit-card__price">
                <span class="unit-card__price-l">Oylik</span>
                <span class="unit-card__price-v">{{ unit.price }} UZS</span>
              </div>
              <span class="unit-card__btn">Batafsil <ArrowRight :size="14" /></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="b-cta">
      <div class="b-cta__card">
        <h2 class="b-cta__title">Bu binoda ofis kerakmi?</h2>
        <p class="b-cta__text">Ariza qoldiring — operatorimiz siz bilan bog'lanadi</p>
        <NuxtLink to="/applications/new" class="b-cta__btn">Ariza qoldirish <ArrowRight :size="16" /></NuxtLink>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer__top">
        <div class="footer__brand">
          <div class="b-nav__logo"><div class="b-nav__icon">M</div><span>MAKON</span></div>
          <p class="footer__desc">Toshkentdagi premium ko'chmas mulk obyektlarini boshqarish platformasi.</p>
        </div>
        <div class="footer__cols">
          <div class="footer__col"><h5 class="footer__h">PLATFORMA</h5><NuxtLink to="/catalog" class="footer__link">Katalog</NuxtLink><NuxtLink to="/login" class="footer__link">Kirish</NuxtLink><NuxtLink to="/register/eri" class="footer__link">Ro'yxatdan o'tish</NuxtLink></div>
          <div class="footer__col"><h5 class="footer__h">BOG'LANISH</h5><p class="footer__text">Toshkent, O'zbekiston</p><p class="footer__text">+998 71 200 00 00</p><p class="footer__text">info@makon.uz</p></div>
        </div>
      </div>
      <div class="footer__bottom">© 2026 MAKON — ERI orqali xavfsiz platforma</div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, MapPin } from 'lucide-vue-next'

const route = useRoute()
definePageMeta({ layout: 'blank' })

const building = reactive({
  name: 'Tashkent City',
  district: 'Mirzo Ulug\'bek tumani',
  floors: 12, units: 240, area: '32 000', vacant: 47,
  image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/3b441d5a2_generated_image.png'
})

const unitFilter = ref('ALL')

const units = [
  { id: 1, slug: 'tashkent-city-office-101', name: 'Ofis 101', floor: 1, area: 45, type: 'OFFICE', price: '3 500 000', image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/0d7f1ae52_generated_image.png' },
  { id: 2, slug: 'tashkent-city-office-205', name: 'Ofis 205', floor: 2, area: 78, type: 'OFFICE', price: '6 200 000', image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/0d7f1ae52_generated_image.png' },
  { id: 3, slug: 'tashkent-city-retail-gf', name: 'Savdo maydoni GF', floor: 1, area: 120, type: 'RETAIL', price: '9 800 000', image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/22d244e7f_generated_image.png' },
  { id: 4, slug: 'tashkent-city-office-312', name: 'Ofis 312', floor: 3, area: 55, type: 'OFFICE', price: '4 300 000', image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/0d7f1ae52_generated_image.png' },
  { id: 5, slug: 'tashkent-city-office-408', name: 'Ofis 408', floor: 4, area: 92, type: 'OFFICE', price: '7 400 000', image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/0d7f1ae52_generated_image.png' },
  { id: 6, slug: 'tashkent-city-retail-1f', name: 'Savdo maydoni 1F', floor: 2, area: 85, type: 'RETAIL', price: '6 800 000', image: 'https://media.base44.com/images/public/6a78058ed735adc07d68319d/22d244e7f_generated_image.png' },
]

const filteredUnits = computed(() => unitFilter.value === 'ALL' ? units : units.filter(u => u.type === unitFilter.value))
</script>

<style scoped>
.building-page { overflow-x: hidden; }

/* Hero */
.b-hero { position: relative; height: 520px; overflow: hidden; }
.b-hero__bg { position: absolute; inset: 0; }
.b-hero__img { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; }
.b-hero__grad {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(9,9,11,0.3) 0%, rgba(9,9,11,0.2) 40%, rgba(9,9,11,0.85) 100%),
              radial-gradient(ellipse at 50% 100%, rgba(99,102,241,0.1), transparent 60%);
}
.b-nav {
  position: relative; z-index: 10;
  display: flex; align-items: center; justify-content: space-between;
  padding: 24px 48px; max-width: 1400px; margin: 0 auto; width: 100%;
}
.b-nav__logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.b-nav__icon { width: 38px; height: 38px; border-radius: 11px; background: linear-gradient(135deg, #6366f1, #4f46e5); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 17px; color: white; box-shadow: 0 4px 16px rgba(99,102,241,0.35); }
.b-nav__logo span { font-weight: 800; font-size: 17px; color: white; letter-spacing: -0.02em; }
.b-nav__links { display: flex; gap: 32px; }
.b-nav__link { color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.3s; }
.b-nav__link:hover { color: white; }
.b-nav__right { display: flex; align-items: center; gap: 16px; }
.b-nav__btn { display: inline-flex; align-items: center; gap: 5px; background: white; color: #09090b; padding: 10px 18px; border-radius: 11px; font-size: 13px; font-weight: 600; text-decoration: none; transition: all 0.3s; }
.b-nav__btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(255,255,255,0.15); }

.b-hero__content { position: relative; z-index: 5; max-width: 1400px; margin: 0 auto; padding: 80px 48px 0; }
.b-hero__tag { display: inline-block; background: rgba(99,102,241,0.9); color: white; padding: 6px 14px; border-radius: 8px; font-size: 10px; font-weight: 700; letter-spacing: 0.12em; margin-bottom: 16px; backdrop-filter: blur(10px); }
.b-hero__title { font-size: clamp(36px, 5vw, 56px); font-weight: 800; color: white; letter-spacing: -0.04em; margin: 0 0 10px; }
.b-hero__addr { display: flex; align-items: center; gap: 6px; font-size: 16px; color: rgba(255,255,255,0.6); margin: 0 0 28px; }
.b-hero__specs { display: flex; align-items: center; gap: 24px; }
.b-hero__spec { display: flex; flex-direction: column; gap: 2px; }
.b-hero__spec-n { font-size: 28px; font-weight: 800; color: white; letter-spacing: -0.02em; }
.b-hero__spec-l { font-size: 12px; color: rgba(255,255,255,0.5); font-weight: 500; }
.b-hero__spec-divider { width: 1px; height: 32px; background: rgba(255,255,255,0.12); }

/* Units */
.b-units { max-width: 1400px; margin: 0 auto; padding: 80px 48px; }
.b-units__head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 40px; flex-wrap: wrap; gap: 16px; }
.b-units__title { font-size: 28px; font-weight: 800; color: #18181b; letter-spacing: -0.03em; }
.dark .b-units__title { color: white; }
.b-units__filters { display: flex; gap: 6px; background: rgba(0,0,0,0.04); padding: 4px; border-radius: 12px; }
.dark .b-units__filters { background: rgba(255,255,255,0.04); }
.b-units__filters button { padding: 8px 16px; border-radius: 9px; font-size: 13px; font-weight: 500; color: #71717a; background: none; border: none; cursor: pointer; transition: all 0.25s; }
.dark .b-units__filters button { color: #a1a1aa; }
.b-units__filters button.active { background: white; color: #18181b; box-shadow: 0 1px 3px rgba(0,0,0,0.08); font-weight: 600; }
.dark .b-units__filters button.active { background: rgba(255,255,255,0.08); color: white; }

.b-units__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }

.unit-card { border-radius: 18px; overflow: hidden; background: white; cursor: pointer; box-shadow: 0 2px 16px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.04); transition: all 0.4s cubic-bezier(0.4,0,0.2,1); }
.dark .unit-card { background: #18181b; box-shadow: 0 2px 16px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06); }
.unit-card:hover { box-shadow: 0 24px 56px rgba(0,0,0,0.1), 0 0 0 1px rgba(99,102,241,0.1); transform: translateY(-4px); }
.dark .unit-card:hover { box-shadow: 0 24px 56px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.15); }
.unit-card__img { position: relative; aspect-ratio: 16/10; overflow: hidden; }
.unit-card__img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; }
.unit-card:hover .unit-card__img img { transform: scale(1.05); }
.unit-card__badge { position: absolute; top: 14px; right: 14px; background: rgba(99,102,241,0.9); color: white; padding: 5px 12px; border-radius: 7px; font-size: 10px; font-weight: 700; letter-spacing: 0.05em; backdrop-filter: blur(10px); }
.unit-card__info { padding: 20px; }
.unit-card__top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
.unit-card__name { font-size: 17px; font-weight: 700; color: #18181b; letter-spacing: -0.02em; margin: 0; }
.dark .unit-card__name { color: white; }
.unit-card__floor { font-size: 12px; color: #a1a1aa; font-weight: 500; }
.unit-card__area { font-size: 13px; color: #71717a; margin: 0 0 16px; }
.dark .unit-card__area { color: #a1a1aa; }
.unit-card__foot { display: flex; align-items: center; justify-content: space-between; }
.unit-card__price-l { font-size: 11px; color: #a1a1aa; display: block; margin-bottom: 1px; }
.unit-card__price-v { font-size: 16px; font-weight: 800; color: #18181b; letter-spacing: -0.01em; }
.dark .unit-card__price-v { color: white; }
.unit-card__btn { display: inline-flex; align-items: center; gap: 5px; padding: 10px 18px; border-radius: 10px; background: #18181b; color: white; font-size: 12px; font-weight: 600; border: none; cursor: pointer; transition: all 0.3s; }
.unit-card__btn:hover { background: #6366f1; }
.dark .unit-card__btn { background: #6366f1; }
.dark .unit-card__btn:hover { background: #4f46e5; }

/* CTA */
.b-cta { padding: 0 48px 80px; max-width: 1400px; margin: 0 auto; }
.b-cta__card { background: linear-gradient(135deg, #09090b 0%, #18181b 50%, #1c1c1f 100%); border-radius: 28px; padding: 56px 48px; text-align: center; position: relative; overflow: hidden; }
.b-cta__card::before { content: ''; position: absolute; top: -30%; left: 50%; transform: translateX(-50%); width: 500px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(99,102,241,0.12), transparent 65%); pointer-events: none; }
.b-cta__title { font-size: 28px; font-weight: 800; color: white; letter-spacing: -0.03em; margin: 0 0 10px; position: relative; }
.b-cta__text { font-size: 15px; color: rgba(255,255,255,0.5); margin: 0 0 28px; position: relative; }
.b-cta__btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; border-radius: 12px; background: linear-gradient(135deg, #6366f1, #4f46e5); color: white; font-size: 14px; font-weight: 600; text-decoration: none; transition: all 0.3s; box-shadow: 0 4px 20px rgba(99,102,241,0.3); position: relative; }
.b-cta__btn:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(99,102,241,0.45); }

/* Footer */
.footer { background: #09090b; padding: 64px 48px 28px; }
.footer__top { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1.5fr; gap: 48px; padding-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.footer__desc { font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.6; margin-top: 16px; max-width: 360px; }
.footer__cols { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
.footer__col { display: flex; flex-direction: column; gap: 12px; }
.footer__h { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(255,255,255,0.3); margin: 0 0 4px; }
.footer__link { font-size: 14px; color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.25s; }
.footer__link:hover { color: white; }
.footer__text { font-size: 14px; color: rgba(255,255,255,0.45); margin: 0; }
.footer__bottom { max-width: 1400px; margin: 0 auto; padding-top: 24px; font-size: 13px; color: rgba(255,255,255,0.3); }

@media (max-width: 1024px) { .b-units__grid { grid-template-columns: 1fr 1fr; } .b-nav__links { display: none; } }
@media (max-width: 768px) { .b-units__grid { grid-template-columns: 1fr; } .b-units, .b-cta, .footer { padding-left: 20px; padding-right: 20px; } .b-nav { padding: 16px 20px; } .b-hero__content { padding: 60px 20px 0; } .b-hero__specs { flex-wrap: wrap; gap: 16px; } .b-hero__spec-divider { display: none; } .footer__top { grid-template-columns: 1fr; } }
</style>
