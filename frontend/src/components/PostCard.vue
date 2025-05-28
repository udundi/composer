<template>
  <div class="bg-[#15102a] border border-[#232255] rounded-2xl shadow-xl p-6 flex flex-col gap-2 transition-all duration-300 hover:border-[#4422ff] hover:shadow-2xl">
    <div class="flex items-center justify-between mb-2">
      <div>
        <span class="text-xs text-[#b9b8d3]">
          {{ post.createdAt ? new Date(post.createdAt).toLocaleString() : "" }}
        </span>
      </div>
      <div>
        <span class="bg-gradient-to-r from-green-700 to-blue-700 text-white px-3 py-1 rounded font-bold text-xs shadow">
          Virality Score: {{ post.score ?? "—" }}
        </span>
        <span class="inline-block px-3 py-1 rounded-full bg-[#333] text-white text-xs font-bold">
          {{ post.mediaType ? post.mediaType.toUpperCase() : "TEXT" }}
        </span>
      </div>
    </div>
    <div class="font-bold text-xl mb-1 text-white drop-shadow-sm">{{ post.idea }}</div>
    <div class="text-[#e1e1fb] whitespace-pre-line mb-2 leading-relaxed">{{ post.text }}</div>
    <div v-if="post.mediaUrl" class="mb-2 flex justify-center">
      <img
        v-if="post.mediaType === 'image' || post.mediaType === 'diagram' || post.mediaType === 'meme'"
        :src="post.mediaUrl"
        alt="LinkedIn Post Media"
        class="rounded-lg border-2 border-[#4422ff] max-h-60 object-contain shadow-md"
      />
      <video
        v-else-if="post.mediaType === 'video'"
        :src="post.mediaUrl"
        controls
        class="rounded-lg border-2 border-[#4422ff] max-h-60 w-full shadow-md"
      />
    </div>
    <!-- <div class="flex items-center justify-between mt-2">
      <span class="text-xs text-[#8e95bd] italic">
        #AI #Viral #LinkedIn
      </span>
    </div> -->
  </div>
</template>

<script setup>
defineProps(['post'])
</script>