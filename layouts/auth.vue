<template>
  <div class="auth-page">
    <!-- Left brand panel -->
    <div class="auth-brand">
      <div class="auth-brand__bg">
        <img src="https://media.base44.com/images/public/6a78058ed735adc07d68319d/57f4f22c1_generated_image.png" alt="Tashkent City" />
        <div class="auth-brand__overlay"></div>
        <div class="auth-brand__grid"></div>
      </div>
      <div class="auth-brand__content">
        <NuxtLink to="/" class="auth-brand__logo">
          <div class="auth-brand__logo-icon">M</div>
          <span>MAKON</span>
        </NuxtLink>
        <div class="auth-brand__features">
          <div class="auth-brand__feature">
            <div class="auth-brand__feature-icon"><ShieldCheck :size="18" /></div>
            <div>
              <div class="auth-brand__feature-title">ERI elektron imzo</div>
              <div class="auth-brand__feature-desc">Xavfsiz onlayn shartnoma</div>
            </div>
          </div>
          <div class="auth-brand__feature">
            <div class="auth-brand__feature-icon"><BarChart3 :size="18" /></div>
            <div>
              <div class="auth-brand__feature-title">Real-time dashboard</div>
              <div class="auth-brand__feature-desc">Bandlik, daromad, analitika</div>
            </div>
          </div>
          <div class="auth-brand__feature">
            <div class="auth-brand__feature-icon"><Building2 :size="18" /></div>
            <div>
              <div class="auth-brand__feature-title">18 modul boshqaruvi</div>
              <div class="auth-brand__feature-desc">Binodan hisoblagichgacha</div>
            </div>
          </div>
        </div>
        <div class="auth-brand__quote">
          <p>"MAKON bilan binolarimizni boshqarish 3 marta tezroq va aniqroq bo'ldi."</p>
          <div class="auth-brand__author">— Tashkent City Management</div>
        </div>
      </div>
    </div>

    <!-- Right form panel -->
    <div class="auth-form-side">
      <div class="auth-form-top">
        <ThemeToggle />
      </div>
      <div class="auth-form-wrap">
        <NuxtLink to="/" class="auth-form__logo">
          <div class="auth-form__logo-icon">M</div>
          <div>
            <div class="auth-form__logo-text">MAKON</div>
            <div class="auth-form__logo-sub">Ko'chmas mulk platformasi</div>
          </div>
        </NuxtLink>

        <div class="auth-form__card">
          <slot />
        </div>

        <p class="auth-form__copyright">© 2026 MAKON — ERI orqali xavfsiz platforma</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShieldCheck, BarChart3, Building2 } from 'lucide-vue-next'
</script>

<style scoped>
.auth-page { display: flex; min-height: 100vh; }

/* Left brand panel */
.auth-brand { flex: 1; position: relative; display: flex; flex-direction: column; justify-content: space-between; padding: 40px; min-height: 100vh; }
.auth-brand__bg { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
.auth-brand__bg img { width: 100%; height: 100%; object-fit: cover; }
.auth-brand__overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(9,9,11,0.7) 0%, rgba(9,9,11,0.85) 100%); }
.auth-brand__grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 50px 50px; pointer-events: none; }
.auth-brand__content { position: relative; z-index: 1; display: flex; flex-direction: column; justify-content: space-between; height: 100%; }
.auth-brand__logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.auth-brand__logo-icon { width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #6366f1, #4f46e5); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 20px; color: white; box-shadow: 0 4px 20px rgba(99,102,241,0.4); }
.auth-brand__logo span { font-weight: 800; font-size: 20px; color: white; letter-spacing: -0.02em; }
.auth-brand__features { display: flex; flex-direction: column; gap: 20px; }
.auth-brand__feature { display: flex; align-items: center; gap: 14px; }
.auth-brand__feature-icon { width: 44px; height: 44px; border-radius: 12px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1); color: #a5b4fc; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); }
.auth-brand__feature-title { font-size: 15px; font-weight: 700; color: white; margin-bottom: 2px; }
.auth-brand__feature-desc { font-size: 13px; color: rgba(255,255,255,0.5); }
.auth-brand__quote { max-width: 380px; }
.auth-brand__quote p { font-size: 16px; line-height: 1.6; color: rgba(255,255,255,0.7); font-style: italic; margin-bottom: 8px; }
.auth-brand__author { font-size: 13px; color: rgba(255,255,255,0.4); }

/* Right form panel */
.auth-form-side { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; background: #fafafa; position: relative; }
:deep(.dark) .auth-form-side { background: #09090b; }
.auth-form-top { position: absolute; top: 20px; right: 20px; }
.auth-form-wrap { width: 100%; max-width: 400px; }
.auth-form__logo { display: flex; align-items: center; gap: 12px; margin-bottom: 40px; text-decoration: none; }
.auth-form__logo-icon { width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #6366f1, #4f46e5); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 20px; color: white; box-shadow: 0 4px 20px rgba(99,102,241,0.3); }
.auth-form__logo-text { font-weight: 800; font-size: 18px; color: #18181b; letter-spacing: -0.02em; }
:deep(.dark) .auth-form__logo-text { color: white; }
.auth-form__logo-sub { font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #71717a; }
.auth-form__card { background: white; border-radius: 20px; padding: 36px; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 20px 60px rgba(0,0,0,0.06); }
:deep(.dark) .auth-form__card { background: #18181b; border-color: rgba(255,255,255,0.06); box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
.auth-form__copyright { text-align: center; font-size: 12px; color: #a1a1aa; margin-top: 28px; }

@media (max-width: 900px) {
  .auth-page { flex-direction: column; }
  .auth-brand { min-height: 200px; padding: 24px; }
  .auth-brand__features, .auth-brand__quote { display: none; }
  .auth-form-side { padding: 24px; }
}
</style>
