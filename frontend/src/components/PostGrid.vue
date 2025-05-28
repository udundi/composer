<template>
  <div class="grid gap-6 sm:grid-cols-1">
    <PostCard v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script setup>
import PostCard from './PostCard.vue'
defineProps(['posts'])
</script>