
<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold text-white">Sozlamalar</h1>
      <p class="text-ink-400 text-sm mt-1">Ma'lumotnomalar va tizim sozlamalari</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card p-6">
        <h3 class="text-white font-semibold mb-4">ERI sozlamalari</h3>
        <div class="space-y-4">
          <div>
            <label class="label">ERI endpoint URL</label>
            <input class="input font-mono text-xs" value="https://eri.gov.uz/api/v2" readonly />
          </div>
          <div>
            <label class="label">Timeout (soniya)</label>
            <input class="input" type="number" value="30" />
          </div>
          <div>
            <label class="label">Retry count</label>
            <input class="input" type="number" value="3" />
          </div>
        </div>
      </div>

      <div class="card p-6">
        <h3 class="text-white font-semibold mb-4">Fayl limitlari</h3>
        <div class="space-y-4">
          <div>
            <label class="label">Maksimal fayl hajmi (MB)</label>
            <input class="input" type="number" value="50" />
          </div>
          <div>
            <label class="label">3D model formatlari</label>
            <input class="input" value=".glb, .gltf" />
          </div>
          <div>
            <label class="label">Plan formatlari</label>
            <input class="input" value=".svg, .pdf" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
