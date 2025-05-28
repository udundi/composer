<template>
  <div class="border rounded p-4 shadow bg-white">
    <div class="text-sm text-gray-600 mb-1">
      {{ post.createdAt ? new Date(post.createdAt).toLocaleString() : '' }}
    </div>
    <div class="font-bold mb-2">{{ post.idea }}</div>
    <div class="mb-2 whitespace-pre-line">{{ post.text }}</div>
    <div class="flex items-center mb-2">
      <span v-if="post.mediaType" class="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs mr-2">
        Media: {{ post.mediaType }}
      </span>
      <span class="px-2 py-1 rounded bg-green-100 text-green-800 text-xs">
        Score: {{ post.score }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps(['post'])
</script>