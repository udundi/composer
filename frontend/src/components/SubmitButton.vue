<template>
  <button
    :disabled="loading"
    type="submit"
    class="flex items-center justify-center w-14 h-14 rounded-full bg-[#232255] text-white shadow-lg hover:bg-[#313168] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
  >
    <span v-if="loading" class="flex items-center">
      <!-- SVG spinner (modern, centered) -->
      <svg class="mr-0 w-6 h-6 animate-spin text-indigo-100" viewBox="0 0 24 24" fill="none">
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
    </span>
    <span v-else class="flex items-center justify-center">
      <!-- Right arrow icon (Heroicons solid arrow-right) -->
      <svg class="w-8 h-8 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
      </svg>
    </span>
  </button>
</template>

<script setup>
defineProps({ loading: Boolean })
</script>