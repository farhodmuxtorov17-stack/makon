<template>
  <div
    class="min-h-screen bg-white text-slate-900"
    style="font-family: 'Satoshi', 'Inter', system-ui, sans-serif"
  >
    <!-- Header -->
    <header class="sticky top-0 z-50 bg-white border-b border-slate-100">
      <div class="max-w-[1200px] mx-auto px-4 h-14 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <button class="lg:hidden text-slate-500 text-xl">☰</button>
          <NuxtLink to="/" class="flex items-center gap-2">
            <div
              class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center"
            >
              <span class="text-white text-sm font-bold">M</span>
            </div>
            <span
              class="font-bold text-base tracking-tight"
              style="font-family: 'Clash Display', sans-serif"
            >MAKON</span>
            <span class="text-slate-300 text-sm hidden sm:inline">| Ko'chmulk</span>
          </NuxtLink>
        </div>
        <div class="flex items-center gap-2">
          <button
            class="hidden md:flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <span>📍</span> Toshkent
          </button>
          <button
            class="hidden sm:flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <span>♡</span>
          </button>
          <button
            class="hidden sm:block text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Mening e'lonlarim
          </button>
          <button
            class="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
          >
            E'lon joylash
          </button>
          <NuxtLink
            to="/login"
            class="text-sm font-semibold text-white px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            Kirish
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Hero search -->
    <section class="py-10 px-4">
      <div class="max-w-[840px] mx-auto text-center">
        <h1
          class="text-3xl md:text-4xl font-bold tracking-tight mb-2 px-4"
          style="font-family: 'Clash Display', sans-serif; letter-spacing: -0.03em"
        >
          Toshkentda ko'chmulk topish — endi bir necha daqiqada
        </h1>
        <p class="text-slate-400 text-sm mb-8">
          Minglab e'lonlar, yangi binolar va ishonchli egalari — bitta platformada
        </p>

        <!-- Search bar -->
        <div
          class="bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-100 p-2 text-left"
        >
          <!-- Deal type tabs -->
          <div class="flex gap-1 mb-2 px-1">
            <button
              v-for="t in dealTabs"
              :key="t.id"
              class="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              :class="
                activeDeal === t.id
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-500 hover:bg-slate-100'
              "
              @click="activeDeal = t.id"
            >
              {{ t.label }}
            </button>
          </div>

          <!-- Search row -->
          <div class="flex flex-col md:flex-row gap-2">
            <div class="flex-1 relative">
              <select
                v-model="propertyType"
                class="w-full appearance-none text-sm font-medium text-slate-700 bg-slate-50 rounded-xl px-4 py-3.5 pr-10 outline-none cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <option v-for="o in propertyTypes" :key="o" :value="o">{{ o }}</option>
              </select>
              <span
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs"
              >▼</span>
            </div>

            <div class="flex gap-1.5 bg-slate-50 rounded-xl p-1.5">
              <button
                v-for="r in roomOptions"
                :key="r"
                class="px-3 py-2 rounded-lg text-sm font-medium transition-all min-w-[36px]"
                :class="
                  selectedRooms.includes(r)
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-400 hover:text-slate-600'
                "
                @click="toggleRoom(r)"
              >
                {{ r === 'studio' ? 'St' : r === '5+' ? '5+' : r }}
              </button>
            </div>

            <input
              type="text"
              :placeholder="activeDeal === 'rent' ? 'Narxgacha, soʼm/oy' : 'Narxgacha, soʼm'"
              class="text-sm bg-slate-50 rounded-xl px-4 py-3.5 outline-none w-full md:w-40 placeholder:text-slate-400 focus:bg-slate-100 transition-colors"
            />

            <input
              type="text"
              placeholder="Metro yoki tuman"
              class="text-sm bg-slate-50 rounded-xl px-4 py-3.5 outline-none w-full md:w-44 placeholder:text-slate-400 focus:bg-slate-100 transition-colors"
            />

            <button
              class="flex items-center justify-center gap-1.5 text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl px-4 py-3.5 transition-colors whitespace-nowrap"
            >
              📍 Xaritada
            </button>

            <button
              class="text-sm font-semibold text-white px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 transition-all whitespace-nowrap"
            >
              Ko'rsatish · {{ totalCount }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick categories -->
    <section class="max-w-[1200px] mx-auto px-4 py-6">
      <h2 class="text-lg font-bold mb-4" style="font-family: 'Clash Display', sans-serif">
        Tez-tez qidiriladi
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        <NuxtLink
          v-for="c in quickCategories"
          :key="c.title"
          :to="c.link"
          class="group bg-slate-50 hover:bg-slate-100 rounded-2xl p-4 transition-colors cursor-pointer"
        >
          <div class="text-2xl mb-2">{{ c.icon }}</div>
          <div class="font-semibold text-sm group-hover:text-blue-600 transition-colors">
            {{ c.title }}
          </div>
          <div class="text-slate-400 text-xs mt-0.5">{{ c.count }} e'lon</div>
        </NuxtLink>
      </div>
    </section>

    <!-- New buildings -->
    <section class="max-w-[1200px] mx-auto px-4 py-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold" style="font-family: 'Clash Display', sans-serif">
          Yangi binolar
        </h2>
        <NuxtLink
          to="/"
          class="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Hammasini ko'rish →
        </NuxtLink>
      </div>
      <div class="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4" style="scrollbar-width: thin">
        <div
          v-for="b in newBuildings"
          :key="b.name"
          class="flex-shrink-0 w-[280px] bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-100 transition-all cursor-pointer group"
        >
          <NuxtLink :to="`/catalog/${b.id}`">
            <div class="relative h-40 overflow-hidden">
              <img
                :src="asset(b.img)"
                :alt="b.name"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span
                class="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/90 text-slate-700 backdrop-blur-sm"
              >Yangi</span>
            </div>
          </NuxtLink>
          <div class="p-4">
            <NuxtLink :to="`/catalog/${b.id}`">
              <h3 class="font-bold text-sm mb-1 group-hover:text-blue-600 transition-colors">
                {{ b.name }}
              </h3>
            </NuxtLink>
            <p class="text-slate-400 text-xs mb-2">📍 {{ b.location }}</p>
            <p class="text-slate-400 text-xs mb-3">{{ b.commute }}</p>
            <div class="flex items-baseline justify-between mb-3">
              <div>
                <span class="text-xs text-slate-400">dan</span>
                <div class="font-bold text-base text-blue-600">{{ b.price }}</div>
              </div>
              <div class="text-xs text-slate-400">{{ b.developer }}</div>
            </div>
            <NuxtLink
              :to="`/catalog/${b.id}`"
              class="block text-center text-sm font-semibold text-blue-600 hover:text-blue-700 py-2.5 rounded-xl border border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
            >
              Batafsil →
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Buy listings -->
    <section class="max-w-[1200px] mx-auto px-4 py-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold" style="font-family: 'Clash Display', sans-serif">
          Sotib olish
        </h2>
        <NuxtLink
          to="/"
          class="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Hammasini ko'rish →
        </NuxtLink>
      </div>
      <div class="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4" style="scrollbar-width: thin">
        <div
          v-for="p in buyListings"
          :key="p.id"
          class="flex-shrink-0 w-[260px] bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-100 transition-all cursor-pointer group"
        >
          <NuxtLink :to="`/catalog/${p.id}`">
            <div class="relative h-36 overflow-hidden">
              <img
                :src="asset(p.img)"
                :alt="p.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div
                class="absolute top-2 right-2 text-xs font-medium text-white bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full"
              >
                {{ p.photos }} foto
              </div>
            </div>
            <div class="p-3.5">
              <div class="font-bold text-base mb-1">{{ p.price }}</div>
              <p class="text-slate-500 text-xs mb-1.5">{{ p.area }} · {{ p.rooms }}</p>
              <p class="text-slate-400 text-xs flex items-center gap-1">
                📍 {{ p.metro }} · {{ p.commute }}
              </p>
            </div>
          </NuxtLink>
          <div class="px-3.5 pb-3.5">
            <NuxtLink
              :to="`/catalog/${p.id}`"
              class="block text-center text-sm font-semibold text-slate-700 hover:text-blue-600 py-2.5 rounded-xl border border-slate-200 hover:border-blue-300 transition-all"
            >
              Batafsil →
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Rent listings -->
    <section class="max-w-[1200px] mx-auto px-4 py-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold" style="font-family: 'Clash Display', sans-serif">
          Ijaraga olish
        </h2>
        <NuxtLink
          to="/"
          class="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Hammasini ko'rish →
        </NuxtLink>
      </div>
      <div class="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4" style="scrollbar-width: thin">
        <div
          v-for="p in rentListings"
          :key="p.id"
          class="flex-shrink-0 w-[260px] bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-100 transition-all cursor-pointer group"
        >
          <NuxtLink :to="`/catalog/${p.id}`">
            <div class="relative h-36 overflow-hidden">
              <img
                :src="asset(p.img)"
                :alt="p.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div
                class="absolute top-2 right-2 text-xs font-medium text-white bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full"
              >
                {{ p.photos }} foto
              </div>
            </div>
            <div class="p-3.5">
              <div class="font-bold text-base mb-1">
                {{ p.price }}<span class="text-xs font-normal text-slate-400 ml-1">/oy</span>
              </div>
              <p class="text-slate-500 text-xs mb-1.5">{{ p.area }} · {{ p.rooms }}</p>
              <p class="text-slate-400 text-xs flex items-center gap-1">
                📍 {{ p.metro }} · {{ p.commute }}
              </p>
            </div>
          </NuxtLink>
          <div class="px-3.5 pb-3.5 flex gap-2">
            <NuxtLink
              :to="`/catalog/${p.id}`"
              class="flex-1 text-center text-sm font-semibold text-slate-700 hover:text-blue-600 py-2.5 rounded-xl border border-slate-200 hover:border-blue-300 transition-all"
            >
              Batafsil →
            </NuxtLink>
            <button
              class="flex-1 text-sm font-semibold text-white py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm"
              @click="openApplication(p)"
            >
              Ijaraga olish
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Promo banner -->
    <section class="max-w-[1200px] mx-auto px-4 py-8">
      <div
        class="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-600 to-blue-700 p-10 md:p-14"
      >
        <div
          class="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4"
        ></div>
        <div class="relative z-10 max-w-lg">
          <h3
            class="text-white text-2xl md:text-3xl font-bold mb-3"
            style="font-family: 'Clash Display', sans-serif"
          >
            Mulkingizni boshqarish — oson va qulay
          </h3>
          <p class="text-blue-100 text-sm mb-6 leading-relaxed">
            MAKON platformasi orqali binolar, shartnomalar, to'lovlar va xizmatlarni
            avtomatlashtiring. 16+ modul, real vaqt rejimida boshqaruv.
          </p>
          <button
            class="bg-white text-blue-700 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-blue-50 transition-colors shadow-lg"
          >
            Batafsil →
          </button>
        </div>
      </div>
    </section>

    <!-- Journal -->
    <section class="max-w-[1200px] mx-auto px-4 py-8">
      <h2 class="text-xl font-bold mb-4" style="font-family: 'Clash Display', sans-serif">
        Jurnal
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <article v-for="a in articles" :key="a.title" class="group cursor-pointer">
          <div class="relative h-40 rounded-2xl overflow-hidden mb-3">
            <img
              :src="asset(a.img)"
              :alt="a.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <span
              class="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full bg-white/90 text-slate-700 backdrop-blur-sm"
            >{{ a.tag }}</span>
          </div>
          <h3
            class="font-semibold text-sm leading-snug group-hover:text-blue-600 transition-colors"
          >
            {{ a.title }}
          </h3>
          <p class="text-slate-400 text-xs mt-1">{{ a.date }}</p>
        </article>
      </div>
    </section>

    <!-- App download -->
    <section class="max-w-[1200px] mx-auto px-4 py-8">
      <div
        class="bg-slate-50 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div>
          <h3 class="text-lg font-bold mb-1" style="font-family: 'Clash Display', sans-serif">
            Ilovada qidirish qulayroq
          </h3>
          <p class="text-slate-400 text-sm">MAKON mobil ilovasini yuklab oling</p>
          <div class="flex items-center gap-3 mt-4">
            <button
              class="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors"
            >
              App Store
            </button>
            <button
              class="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors"
            >
              ▶ Google Play
            </button>
          </div>
          <div class="flex items-center gap-4 mt-4 text-xs text-slate-400">
            <span>★ 4.8 App Store</span>
            <span>★ 4.6 Google Play</span>
          </div>
        </div>
        <div
          class="w-32 h-32 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-5xl"
        >
          📱
        </div>
      </div>
    </section>

    <!-- SEO footer -->
    <footer class="border-t border-slate-100 mt-8">
      <div class="max-w-[1200px] mx-auto px-4 py-10">
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-10">
          <div>
            <h4 class="font-semibold text-sm mb-3">Sotib olish</h4>
            <ul class="space-y-2 text-xs text-slate-400">
              <li><a class="hover:text-slate-700 transition-colors cursor-pointer">Kvartira</a></li>
              <li><a class="hover:text-slate-700 transition-colors cursor-pointer">1-xonali</a></li>
              <li><a class="hover:text-slate-700 transition-colors cursor-pointer">2-xonali</a></li>
              <li><a class="hover:text-slate-700 transition-colors cursor-pointer">3-xonali</a></li>
              <li><a class="hover:text-slate-700 transition-colors cursor-pointer">Studiya</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-sm mb-3">Ijaraga olish</h4>
            <ul class="space-y-2 text-xs text-slate-400">
              <li>
                <a class="hover:text-slate-700 transition-colors cursor-pointer">Uzoq muddatga</a>
              </li>
              <li><a class="hover:text-slate-700 transition-colors cursor-pointer">Kunlik</a></li>
              <li><a class="hover:text-slate-700 transition-colors cursor-pointer">1-xonali</a></li>
              <li><a class="hover:text-slate-700 transition-colors cursor-pointer">2-xonali</a></li>
              <li><a class="hover:text-slate-700 transition-colors cursor-pointer">Studiya</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-sm mb-3">Yangi binolar</h4>
            <ul class="space-y-2 text-xs text-slate-400">
              <li>
                <a class="hover:text-slate-700 transition-colors cursor-pointer">Tashkent City</a>
              </li>
              <li>
                <a class="hover:text-slate-700 transition-colors cursor-pointer">Business class</a>
              </li>
              <li>
                <a class="hover:text-slate-700 transition-colors cursor-pointer">Metro yaqinida</a>
              </li>
              <li>
                <a class="hover:text-slate-700 transition-colors cursor-pointer">Nasiya bilan</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-sm mb-3">Kommersiya</h4>
            <ul class="space-y-2 text-xs text-slate-400">
              <li>
                <a class="hover:text-slate-700 transition-colors cursor-pointer">Ofis ijaraga</a>
              </li>
              <li>
                <a class="hover:text-slate-700 transition-colors cursor-pointer">Savdo maydoni</a>
              </li>
              <li><a class="hover:text-slate-700 transition-colors cursor-pointer">Ombor</a></li>
              <li>
                <a class="hover:text-slate-700 transition-colors cursor-pointer">Ofis sotib olish</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-sm mb-3">Xizmatlar</h4>
            <ul class="space-y-2 text-xs text-slate-400">
              <li>
                <a class="hover:text-slate-700 transition-colors cursor-pointer">Boshqaruv</a>
              </li>
              <li><a class="hover:text-slate-700 transition-colors cursor-pointer">Servis</a></li>
              <li>
                <a class="hover:text-slate-700 transition-colors cursor-pointer">Shartnomalar</a>
              </li>
              <li>
                <a class="hover:text-slate-700 transition-colors cursor-pointer">Hisobotlar</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-sm mb-3">Kompaniya</h4>
            <ul class="space-y-2 text-xs text-slate-400">
              <li>
                <a class="hover:text-slate-700 transition-colors cursor-pointer">Haqimizda</a>
              </li>
              <li>
                <a class="hover:text-slate-700 transition-colors cursor-pointer">Maxfiylik</a>
              </li>
              <li><a class="hover:text-slate-700 transition-colors cursor-pointer">Shartlar</a></li>
              <li><a class="hover:text-slate-700 transition-colors cursor-pointer">Aloqa</a></li>
            </ul>
          </div>
        </div>
        <div
          class="pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div class="flex items-center gap-2">
            <div
              class="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center"
            >
              <span class="text-white text-xs font-bold">M</span>
            </div>
            <span class="font-bold text-sm">MAKON</span>
            <span class="text-slate-400 text-xs ml-2">© 2026 · Toshkent, O'zbekiston</span>
          </div>
          <div class="flex items-center gap-6 text-xs text-slate-400">
            <span>info@makon.uz</span>
            <span>+998 71 123 45 67</span>
          </div>
        </div>
      </div>
    </footer>

    <!-- Application Modal -->
    <div v-if="showAppModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        @click="showAppModal = false"
      ></div>
      <div
        class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <!-- Success state -->
        <div v-if="appSubmitted" class="p-8 text-center">
          <div
            class="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4"
          >
            <svg
              class="w-8 h-8 text-emerald-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2">Arizangiz qabul qilindi!</h3>
          <p class="text-slate-500 text-sm mb-1">Arizangiz ko'rib chiqish uchun yuborildi.</p>
          <p class="text-slate-500 text-sm mb-6">Tez orada operatorimiz siz bilan bog'lanadi.</p>
          <p class="text-slate-400 text-xs mb-6">Davom etish uchun tizimga kirishingiz kerak.</p>
          <NuxtLink
            to="/login"
            class="block text-center text-sm font-semibold text-white py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            Tizimga kirish →
          </NuxtLink>
          <button
            class="mt-3 text-sm text-slate-400 hover:text-slate-600"
            @click="
              showAppModal = false
              appSubmitted = false
            "
          >
            Yopish
          </button>
        </div>

        <!-- Form state -->
        <div v-else>
          <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div>
              <h3 class="text-lg font-bold">Ijara arizasi</h3>
              <p v-if="selectedProperty" class="text-xs text-slate-400 mt-0.5">
                {{ selectedProperty.title }}
              </p>
            </div>
            <button
              class="text-slate-400 hover:text-slate-600 text-2xl leading-none"
              @click="showAppModal = false"
            >
              ×
            </button>
          </div>
          <div class="p-6 space-y-4">
            <div>
              <label class="text-sm font-medium text-slate-700 mb-1.5 block">F.I.Sh. <span class="text-rose-500">*</span></label>
              <input
                v-model="appForm.name"
                type="text"
                placeholder="Ism Familiya Sharifingiz"
                class="w-full text-sm bg-slate-50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label class="text-sm font-medium text-slate-700 mb-1.5 block">Telefon raqam <span class="text-rose-500">*</span></label>
              <input
                v-model="appForm.phone"
                type="tel"
                placeholder="+998 90 123 45 67"
                class="w-full text-sm bg-slate-50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label class="text-sm font-medium text-slate-700 mb-1.5 block">Email</label>
              <input
                v-model="appForm.email"
                type="email"
                placeholder="email@example.com"
                class="w-full text-sm bg-slate-50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label class="text-sm font-medium text-slate-700 mb-1.5 block">Tashkilot nomi</label>
              <input
                v-model="appForm.company"
                type="text"
                placeholder="MCHJ / LLC / Yakka tartibdagi tadbirkor"
                class="w-full text-sm bg-slate-50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
              />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="text-sm font-medium text-slate-700 mb-1.5 block">Ijara muddati</label>
                <select
                  v-model="appForm.duration"
                  class="w-full appearance-none text-sm bg-slate-50 rounded-xl px-4 py-3 outline-none cursor-pointer focus:ring-2 focus:ring-blue-500/20"
                >
                  <option>3 oy</option>
                  <option>6 oy</option>
                  <option>1 yil</option>
                  <option>2 yildan ortiq</option>
                </select>
              </div>
              <div>
                <label class="text-sm font-medium text-slate-700 mb-1.5 block">Boshlash sanasi</label>
                <input
                  v-model="appForm.startDate"
                  type="date"
                  class="w-full text-sm bg-slate-50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
                />
              </div>
            </div>
            <div>
              <label class="text-sm font-medium text-slate-700 mb-1.5 block">Qo'shimcha izoh</label>
              <textarea
                v-model="appForm.notes"
                rows="3"
                placeholder="Ijara shartlari, qo'shimcha talablar..."
                class="w-full text-sm bg-slate-50 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all resize-none"
              ></textarea>
            </div>
            <button
              :disabled="!appForm.name || !appForm.phone"
              class="w-full text-sm font-semibold text-white py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25"
              @click="submitApplication"
            >
              Arizani yuborish
            </button>
            <p class="text-xs text-slate-400 text-center">
              Yuborish orqali siz foydalanuvchi shartnomasiga rozilik bildirasiz
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'public' })
import { useAssetPath } from '~~/composables/useAssetPath'
const asset = useAssetPath()
const router = useRouter()

const activeDeal = ref('buy')
const propertyType = ref('Kvartira')
const selectedRooms = ref<string[]>([])

// Application modal
const showAppModal = ref(false)
const appSubmitted = ref(false)
const selectedProperty = ref<any>(null)
const appForm = reactive({
  name: '',
  phone: '',
  email: '',
  company: '',
  duration: '1 yil',
  startDate: '',
  notes: '',
})

function openApplication(property: any) {
  selectedProperty.value = property
  appSubmitted.value = false
  appForm.name = ''
  appForm.phone = ''
  appForm.email = ''
  appForm.company = ''
  appForm.duration = '1 yil'
  appForm.startDate = ''
  appForm.notes = ''
  showAppModal.value = true
}

function submitApplication() {
  appSubmitted.value = true
}

const dealTabs = [
  { id: 'buy', label: 'Sotib olish' },
  { id: 'rent', label: 'Ijaraga' },
  { id: 'daily', label: 'Kunlik' },
  { id: 'new', label: 'Yangi binolar' },
]
const propertyTypes = ['Kvartira', 'Ofis', "Do'kon", 'Ombor', 'Turar joy', 'Yer uchastkasi']
const roomOptions = ['studio', '1', '2', '3', '5+']
const totalCount = computed(() => {
  if (activeDeal.value === 'buy') return '5 300+'
  if (activeDeal.value === 'rent') return '3 200+'
  if (activeDeal.value === 'daily') return '320+'
  return '490'
})
const toggleRoom = (r: string) => {
  const i = selectedRooms.value.indexOf(r)
  if (i > -1) selectedRooms.value.splice(i, 1)
  else selectedRooms.value.push(r)
}

const quickCategories = [
  { title: 'Yangi binolar', count: '490', icon: '🏗️', link: '/' },
  { title: 'Sotib olish', count: '5 300+', icon: '🔑', link: '/' },
  { title: 'Ijaraga', count: '3 200+', icon: '🏠', link: '/' },
  { title: 'Kunlik', count: '320+', icon: '⏱️', link: '/' },
  { title: 'Kommersiya', count: '890+', icon: '🏢', link: '/' },
]

const newBuildings = [
  {
    id: 1,
    name: 'Nest One',
    location: 'Yashnabad, Tashkent City',
    commute: 'Metro 5 daqiqa',
    price: "850 mln so'm",
    developer: 'BI Group',
    img: '/tashkent/nest-one.jpg',
  },
  {
    id: 2,
    name: 'Finance Center',
    location: 'Mirobad, Amir Temur',
    commute: 'Metro 8 daqiqa',
    price: "420 mln so'm",
    developer: 'Murad Buildings',
    img: '/tashkent/finance-center.jpg',
  },
  {
    id: 3,
    name: 'Mall Towers',
    location: 'Chilonzor, Bunyodkor',
    commute: 'Metro 3 daqiqa',
    price: "380 mln so'm",
    developer: 'Akay',
    img: '/tashkent/mall-towers.jpg',
  },
  {
    id: 4,
    name: 'Business Park',
    location: 'Yakkasaroy, Bobur',
    commute: 'Metro 12 daqiqa',
    price: "520 mln so'm",
    developer: 'Universal',
    img: '/tashkent/new-business.jpg',
  },
  {
    id: 5,
    name: 'City Towers',
    location: 'Yashnabad, Tashkent City',
    commute: 'Metro 5 daqiqa',
    price: "680 mln so'm",
    developer: 'Tashkent City',
    img: '/tashkent/city-2025.jpg',
  },
  {
    id: 6,
    name: 'Skyline Plaza',
    location: 'Sergeli, Yangi Toshkent',
    commute: 'Metro 15 daqiqa',
    price: "290 mln so'm",
    developer: 'Gross',
    img: '/tashkent/aerial.jpg',
  },
]
const buyListings = [
  {
    id: 1,
    title: 'Nest One',
    price: "1 250 mln so'm",
    area: '120 m²',
    rooms: '4-xonali',
    metro: 'Amir Temur',
    commute: '5 daq',
    photos: 12,
    img: '/tashkent/finance-center.jpg',
  },
  {
    id: 2,
    title: 'Mall Towers',
    price: "980 mln so'm",
    area: '89 m²',
    rooms: '3-xonali',
    metro: 'Bunyodkor',
    commute: '3 daq',
    photos: 8,
    img: '/tashkent/mall-towers.jpg',
  },
  {
    id: 3,
    title: 'Finance Center',
    price: "1 450 mln so'm",
    area: '139 m²',
    rooms: '4-xonali',
    metro: 'Tashkent City',
    commute: '5 daq',
    photos: 15,
    img: '/tashkent/nest-one.jpg',
  },
  {
    id: 4,
    title: 'Business Park',
    price: "670 mln so'm",
    area: '65 m²',
    rooms: '2-xonali',
    metro: 'Bobur',
    commute: '12 daq',
    photos: 6,
    img: '/tashkent/new-business.jpg',
  },
  {
    id: 5,
    title: 'City Towers',
    price: "2 100 mln so'm",
    area: '180 m²',
    rooms: '5-xonali',
    metro: 'Minor',
    commute: '7 daq',
    photos: 18,
    img: '/tashkent/city-night.jpg',
  },
  {
    id: 6,
    title: 'Skyline Plaza',
    price: "540 mln so'm",
    area: '45 m²',
    rooms: 'Studiya',
    metro: 'Sergeli',
    commute: '15 daq',
    photos: 4,
    img: '/tashkent/city-2025.jpg',
  },
]
const rentListings = [
  {
    id: 1,
    title: 'Green Business Center',
    price: "18 mln so'm",
    area: '120 m²',
    rooms: 'Ofis 3-xona',
    metro: 'Amir Temur',
    commute: '5 daq',
    photos: 12,
    img: '/tashkent/finance-center.jpg',
  },
  {
    id: 2,
    title: 'Mall Towers Ofis',
    price: "12 mln so'm",
    area: '85 m²',
    rooms: 'Savdo maydoni',
    metro: 'Bunyodkor',
    commute: '3 daq',
    photos: 8,
    img: '/tashkent/mall-towers.jpg',
  },
  {
    id: 3,
    title: 'Nest One Ofis',
    price: "25 mln so'm",
    area: '139 m²',
    rooms: 'Ofis 4-xona',
    metro: 'Tashkent City',
    commute: '5 daq',
    photos: 15,
    img: '/tashkent/nest-one.jpg',
  },
  {
    id: 4,
    title: 'City Towers Studio',
    price: "7 mln so'm",
    area: '45 m²',
    rooms: 'Studiya',
    metro: 'Minor',
    commute: '7 daq',
    photos: 6,
    img: '/tashkent/city-2025.jpg',
  },
  {
    id: 5,
    title: 'Warehouse Sergeli',
    price: "24 mln so'm",
    area: '450 m²',
    rooms: 'Ombor',
    metro: 'Sergeli',
    commute: '15 daq',
    photos: 4,
    img: '/tashkent/new-business.jpg',
  },
  {
    id: 6,
    title: 'Business Park Loft',
    price: "9 mln so'm",
    area: '60 m²',
    rooms: 'Studiya',
    metro: 'Oybek',
    commute: '8 daq',
    photos: 9,
    img: '/tashkent/city-night.jpg',
  },
]
const articles = [
  {
    title: "Tashkent City: 2026-yilda narxlar qanday o'zgardi",
    tag: 'Tahlil',
    date: '10 avg 2026',
    img: '/tashkent/city-2025.jpg',
  },
  {
    title: 'Ofis ijaraga olish: qanday shartnomalar foydali',
    tag: 'Maslahat',
    date: '8 avg 2026',
    img: '/tashkent/finance-center.jpg',
  },
  {
    title: 'Yangi biznes-markazlar ichidan eng yaxshilari',
    tag: 'Reyting',
    date: '5 avg 2026',
    img: '/tashkent/nest-one.jpg',
  },
  {
    title: "Kommersiya ko'chmulki: investitsiya qayerda foydali",
    tag: 'Investitsiya',
    date: '2 avg 2026',
    img: '/tashkent/aerial.jpg',
  },
]
</script>
