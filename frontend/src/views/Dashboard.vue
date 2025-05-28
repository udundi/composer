<template>
  <div class="max-w-4xl mx-auto py-10 px-4">
    <h1 class="text-3xl font-bold text-blue-900 mb-6">Viral LinkedIn Post Generator</h1>
    <form @submit.prevent="generatePost" class="flex flex-col md:flex-row gap-4 mb-8 items-end">
      <!-- Profession/Job Category Dropdown Search -->
      <div class="flex flex-col w-full">
        <label class="font-semibold mb-1 text-gray-700">Profession / Job Category</label>
        <!-- <v-select
          :options="professionOptions"
          v-model="profession"
          placeholder="Select or search job category"
          class="input"
          :clearable="true"
        /> -->
        <Vue3Select
          v-model="profession"
          :options="professionOptions"
          placeholder="Select or search job category"
          searchable
          class="input"
        />
      </div>
      <!-- Topic Dropdown -->
      <div class="flex flex-col w-full">
        <label class="font-semibold mb-1 text-gray-700">Topic</label>
        <select v-model="topic" class="input">
          <option v-for="option in topicOptions" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>
      <!-- Tone Dropdown -->
      <div class="flex flex-col w-full">
        <label class="font-semibold mb-1 text-gray-700">Tone</label>
        <select v-model="tone" class="input">
          <option v-for="option in toneOptions" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>
      <button
        :disabled="loading"
        type="submit"
        class="btn-primary mt-4 md:mt-0"
      >{{
        loading ? "Generating..." : "Generate"
      }}</button>
    </form>
    <PostGrid :posts="posts" />
    <div v-if="error" class="text-red-600 mt-4 text-center">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Vue3Select from 'vue3-select'
import 'vue3-select/dist/vue3-select.css'
import PostGrid from '../components/PostGrid.vue'
import { generateIdea, generateCopy, suggestMedia, scorePost } from '../api/agents'

const profession = ref('')
const topic = ref('')
const tone = ref('Conversational')

const posts = ref([])
const loading = ref(false)
const error = ref('')

// Expanded job category/profession options (feel free to add/edit for your market)
const professionOptions = [
  "Marketer", "Engineer", "CEO", "CTO", "Product Manager", "Developer", "Sales Lead",
  "HR Manager", "Designer", "Data Scientist", "Recruiter", "Copywriter", "Entrepreneur",
  "Startup Founder", "Consultant", "Growth Hacker", "Customer Success", "Operations Lead",
  "Business Analyst", "Finance Manager", "Coach", "Investor", "Community Manager", "Brand Strategist"
]

// Expanded topics
const topicOptions = [
  "AI", "Leadership", "Remote Work", "Personal Branding", "Career Growth", "Team Building",
  "Automation", "Work-Life Balance", "Mental Health", "Networking", "Innovation", "Productivity",
  "Startups", "Growth", "Resilience", "Diversity & Inclusion", "Customer Experience", "Sales Strategy",
  "Marketing Trends", "Job Search", "Upskilling", "Mentorship", "Entrepreneurship", "Negotiation",
  "Agile Methodology", "Tech Trends", "Business Strategy"
]

// Expanded tones
const toneOptions = [
  "Conversational", "Inspirational", "Humorous", "Neutral / Informative", "Motivational",
  "Analytical", "Critical", "Empowering", "Storytelling", "Reflective", "Celebratory", "Bold", "Friendly"
]

async function generatePost() {
  loading.value = true
  error.value = ''
  try {
    const idea = await generateIdea({ profession: profession.value, topic: topic.value })
    const text = await generateCopy({ idea, tone: tone.value, jobCategory: profession.value })
    const { mediaType, mediaUrl } = await suggestMedia({ idea, copy: text })
    const score = await scorePost({ idea, copy: text, mediaType })

    posts.value.unshift({
      id: Date.now(),
      idea,
      text,
      mediaType,
      mediaUrl,
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

<style scoped>
.input {
  @apply border border-gray-300 rounded px-3 py-2 w-full bg-white focus:border-blue-500 outline-none transition;
}
.btn-primary {
  @apply px-6 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition;
}
</style>

<!-- Register vue-select component -->
<script>
export default {
  components: { Vue3Select }
}
</script>