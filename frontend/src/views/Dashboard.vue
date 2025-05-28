<template>
  <div>
    <h1>Viral LinkedIn Post Generator</h1>
    <div class="mb-6">
      <label>
        Profession/Job Category:
        <input v-model="profession" placeholder="e.g. marketer, engineer, CEO" />
      </label>
      <label>
        Topic:
        <input v-model="topic" placeholder="e.g. AI, leadership, growth" />
      </label>
      <label>
        Tone:
        <select v-model="tone">
          <option>conversational</option>
          <option>inspirational</option>
          <option>humorous</option>
          <option>neutral/informative</option>
        </select>
      </label>
      <button @click="generatePost" :disabled="loading">
        Generate Post
      </button>
    </div>
    <div v-if="loading">Generating...</div>
    <PostGrid :posts="posts" />
    <div v-if="error" style="color: red;">Error: {{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PostGrid from '../components/PostGrid.vue'
import { generateIdea, generateCopy, suggestMedia, scorePost } from '../api/agents'

const profession = ref('')
const topic = ref('')
const tone = ref('conversational')

const posts = ref([])
const loading = ref(false)
const error = ref('')

async function generatePost() {
  loading.value = true
  error.value = ''
  try {
    const idea = await generateIdea({ profession: profession.value, topic: topic.value })
    const text = await generateCopy({ idea, tone: tone.value, jobCategory: profession.value })
    const mediaType = await suggestMedia({ idea, copy: text })
    const score = await scorePost({ idea, copy: text, mediaType })

    posts.value.unshift({
      id: Date.now(),
      idea,
      text,
      mediaType,
      score,
      createdAt: new Date().toISOString()
    })
  } catch (e) {
    error.value = e.message || String(e)
  } finally {
    loading.value = false
  }
}
</script>