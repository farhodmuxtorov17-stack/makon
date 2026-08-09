<template>
  <div class="relative w-full max-w-lg mx-auto animate-float">
    <svg viewBox="0 0 400 400" class="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Building gradient -->
        <linearGradient id="buildingFront" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#6356f7" />
          <stop offset="100%" stop-color="#4334c0" />
        </linearGradient>
        <linearGradient id="buildingSide" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#5340e3" />
          <stop offset="100%" stop-color="#382e9c" />
        </linearGradient>
        <linearGradient id="buildingTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#7c84fc" />
          <stop offset="100%" stop-color="#6356f7" />
        </linearGradient>
        <linearGradient id="windowGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffc94a" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#f99007" stop-opacity="0.6" />
        </linearGradient>
        <linearGradient id="windowDark" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#1a1d28" />
          <stop offset="100%" stop-color="#0f1117" />
        </linearGradient>
        <linearGradient id="baseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1a1d28" />
          <stop offset="100%" stop-color="#0f1117" />
        </linearGradient>
        <radialGradient id="glowBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#6356f7" stop-opacity="0.3" />
          <stop offset="50%" stop-color="#6356f7" stop-opacity="0.1" />
          <stop offset="100%" stop-color="#6356f7" stop-opacity="0" />
        </radialGradient>
        <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dx="0" dy="8" result="offsetblur" />
          <feComponentTransfer><feFuncA type="linear" slope="0.3" /></feComponentTransfer>
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <!-- Background glow -->
      <circle cx="200" cy="200" r="160" fill="url(#glowBg)" />

      <!-- Floating platform -->
      <ellipse cx="200" cy="290" rx="140" ry="30" fill="url(#baseGradient)" opacity="0.6" />
      <ellipse cx="200" cy="285" rx="130" ry="25" fill="#0f1117" opacity="0.8" />

      <!-- Isometric base -->
      <g transform="translate(200, 280)">
        <!-- Base top (isometric ellipse) -->
        <ellipse cx="0" cy="0" rx="110" ry="22" fill="#1a1d28" />
        <ellipse cx="0" cy="-2" rx="110" ry="22" fill="#241a5c" opacity="0.5" />
      </g>

      <!-- Main Building - Isometric -->
      <g filter="url(#softShadow)">
        <!-- Building shadow on ground -->
        <ellipse cx="200" cy="288" rx="80" ry="14" fill="#000000" opacity="0.3" />

        <!-- Left building (taller) -->
        <!-- Side face -->
        <path d="M 160 120 L 200 100 L 200 280 L 160 300 Z" fill="url(#buildingSide)" />
        <!-- Front face -->
        <path d="M 160 120 L 120 140 L 120 320 L 160 300 Z" fill="url(#buildingFront)" />
        <!-- Top face -->
        <path d="M 160 120 L 200 100 L 160 80 L 120 100 L 160 120 Z" fill="url(#buildingTop)" opacity="0.9" />

        <!-- Windows on front face (left building) -->
        <g v-for="i in 5" :key="'lw' + i">
          <rect
            :x="128 + (i - 1) * 0"
            :y="135 + (i - 1) * 32"
            width="26" height="20"
            fill="url(#windowGlow)"
            :opacity="windowStates[i - 1] ? 0.9 : 0.3"
            rx="2"
            transform="skewY(-20)"
          />
        </g>

        <!-- Right building (shorter, wider) -->
        <!-- Side face -->
        <path d="M 240 160 L 280 140 L 280 280 L 240 300 Z" fill="url(#buildingSide)" />
        <!-- Front face -->
        <path d="M 240 160 L 200 180 L 200 320 L 240 300 Z" fill="url(#buildingFront)" />
        <!-- Top face -->
        <path d="M 240 160 L 280 140 L 240 120 L 200 140 L 240 160 Z" fill="url(#buildingTop)" opacity="0.9" />

        <!-- Windows on front face (right building) -->
        <g v-for="i in 4" :key="'rw' + i">
          <rect
            :x="208 + (i - 1) * 0"
            :y="175 + (i - 1) * 32"
            width="26" height="20"
            fill="url(#windowGlow)"
            :opacity="windowStates[i + 4] ? 0.9 : 0.3"
            rx="2"
            transform="skewY(20)"
          />
        </g>

        <!-- Antenna on left building -->
        <line x1="160" y1="80" x2="160" y2="55" stroke="#7c84fc" stroke-width="2" />
        <circle cx="160" cy="52" r="3" fill="#ffc94a">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
        </circle>

        <!-- Rooftop details -->
        <rect x="145" y="78" width="30" height="4" fill="#4334c0" transform="skewY(-20)" />
        <rect x="225" y="118" width="30" height="4" fill="#4334c0" transform="skewY(20)" />
      </g>

      <!-- Floating particles -->
      <g class="particles">
        <circle cx="80" cy="100" r="2" fill="#7c84fc" opacity="0.6">
          <animate attributeName="cy" values="100;85;100" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="330" cy="150" r="1.5" fill="#ffc94a" opacity="0.5">
          <animate attributeName="cy" values="150;135;150" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.1;0.5" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="200" r="1.5" fill="#7c84fc" opacity="0.4">
          <animate attributeName="cy" values="200;185;200" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="350" cy="220" r="2" fill="#6356f7" opacity="0.5">
          <animate attributeName="cy" values="220;205;220" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="250" r="1" fill="#ffc94a" opacity="0.4">
          <animate attributeName="cy" values="250;235;250" dur="3s" repeatCount="indefinite" />
        </circle>
      </g>

      <!-- Ground reflection grid -->
      <g opacity="0.15">
        <line x1="100" y1="290" x2="160" y2="310" stroke="#7c84fc" stroke-width="0.5" />
        <line x1="140" y1="285" x2="200" y2="305" stroke="#7c84fc" stroke-width="0.5" />
        <line x1="180" y1="290" x2="240" y2="310" stroke="#7c84fc" stroke-width="0.5" />
        <line x1="220" y1="285" x2="280" y2="305" stroke="#7c84fc" stroke-width="0.5" />
        <line x1="260" y1="290" x2="320" y2="310" stroke="#7c84fc" stroke-width="0.5" />
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
// Random window lighting states
const windowStates = ref(
  Array.from({ length: 12 }, () => Math.random() > 0.4)
)
</script>
