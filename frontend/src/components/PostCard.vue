<!-- <template>
  <div class="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-2 border border-gray-100 hover:shadow-xl transition">
    <div class="flex items-center mb-2 justify-between">
      <div>
        <span class="text-xs text-gray-500">
          {{ post.createdAt ? new Date(post.createdAt).toLocaleString() : "" }}
        </span>
      </div>
      <div>
        <span class="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
          {{ post.mediaType ? post.mediaType.toUpperCase() : "TEXT" }}
        </span>
        <span class="inline-block px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
          Virality Score: {{ post.score ?? "—" }}
        </span>
      </div>
    </div>
    <div class="mb-2">{{ post.idea }}</div>
    <div v-if="post.mediaUrl" class="mb-2 flex justify-center">
      <img
        v-if="post.mediaType === 'image' || post.mediaType === 'diagram' || post.mediaType === 'meme'"
        :src="post.mediaUrl"
        alt="LinkedIn Post Media"
        class="rounded-lg border border-gray-200 max-h-64 object-contain"
      />
      <video
        v-else-if="post.mediaType === 'video'"
        :src="post.mediaUrl"
        controls
        class="rounded-lg border border-gray-200 max-h-64 w-full"
      />
    </div>
    <div class="text-gray-700 whitespace-pre-line mb-2">{{ post.text }}</div>
  </div>
</template>
<script setup>
defineProps(['post'])
</script> -->

<template>
  <div class="bg-[#15102a] border border-[#232255] rounded-2xl shadow-xl p-6 flex flex-col gap-2 transition-all duration-300 hover:border-[#4422ff] hover:shadow-2xl">
    <div class="flex items-center justify-between mb-2">
      <span class="text-xs text-[#b9b8d3]">
        {{ post.createdAt ? new Date(post.createdAt).toLocaleString() : "" }}
      </span>
      <span
        class="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-blue-700 to-purple-700 text-white text-xs font-bold shadow"
      >
        {{ post.mediaType ? post.mediaType.toUpperCase() : "TEXT" }}
      </span>
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
    <div class="flex items-center justify-between mt-2">
      <span class="bg-gradient-to-r from-green-700 to-blue-700 text-white px-3 py-1 rounded font-bold text-xs shadow">
        Virality Score: {{ post.score ?? "—" }}
      </span>
      <span class="text-xs text-[#8e95bd] italic">
        #AI #Viral #LinkedIn
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps(['post'])
</script>

<!-- <template>
  <div class="border rounded p-4 shadow bg-white">
    <div class="text-sm text-gray-600 mb-1">
      {{ post.createdAt ? new Date(post.createdAt).toLocaleString() : '' }}
    </div>
    <div class="font-bold mb-2">{{ post.idea }}</div>
    <div class="mb-2 whitespace-pre-line">{{ post.text }}</div>
    <div class="flex items-center mb-2">
      <div v-if="post.mediaUrl" class="my-2">
        <img v-if="post.mediaType === 'image' || post.mediaType === 'diagram'"
            :src="post.mediaUrl"
            alt="LinkedIn Post Media"
            style="max-width:100%;border-radius:8px;margin-bottom:8px;" />

        <img v-else-if="post.mediaType === 'meme'"
            :src="post.mediaUrl"
            alt="Meme"
            style="max-width:100%;border-radius:8px;margin-bottom:8px;" />
      </div>
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
</script> -->