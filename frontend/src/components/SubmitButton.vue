<template>
  <button
    :disabled="loading"
    type="submit"
    class="flex items-center justify-center w-48 h-12 mb-3 self-end rounded-lg bg-[#232255] text-white shadow-lg hover:bg-[#313168] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
  >
    <span v-if="loading" class="flex items-center justify-center w-12">
      <svg class="w-9 h-9 animate-spin text-indigo-300" viewBox="0 0 50 50" fill="none">
        <circle class="opacity-25" cx="25" cy="25" r="17" stroke="currentColor" stroke-width="6"/>
        <path class="opacity-90" fill="currentColor" d="M25 5a20 20 0 0120 20h-6a14 14 0 00-14-14V5z"/>
      </svg>
    </span>
    <span v-else class="flex items-center justify-center">
      <svg class="w-8 h-8 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
      </svg>
    </span>
  </button>
</template>
<script setup>
defineProps({ loading: Boolean })
</script>