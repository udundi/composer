<template>
  <!-- <div class="relative min-h-screen overflow-hidden bg-[#080220]"> -->
  <!-- <div class="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0 bg-[#080220]"> -->
  <div class="relative min-h-screen overflow-x-hidden bg-[#080220]">
    <!-- Pass loading to the background animation -->
    <BackgroundAnimation :loading="loading" />
    <!-- Main Content -->
    <div class="relative z-10 max-w-4xl mx-auto py-12 px-4">
      <div class="mb-8 flex flex-col items-center justify-center space-x-4 md:flex-row">
        <h1 class="chat-logo mb-3 text-center font-roboto text-5xl text-white md:mb-0">Composer</h1>
        <div class="beta-icon border-opacity/50 mb-0 rounded-lg border-2 border-solid px-4 py-2 font-roboto text-3xl leading-none text-white">Beta</div>
      </div>
      <form @submit.prevent="generatePost" class="flex flex-col md:flex-row gap-4 mb-8 items-end justify-center">
        <!-- Profession Dropdown -->
        <div class="flex flex-col w-full max-w-xs">
          <label class="font-semibold mb-1 text-gray-300">Profession / Job Category</label>
          <Vue3Select
            v-model="profession"
            :options="professionOptions"
            searchable
            placeholder="Select or search job category"
            class="bg-[#1d1836] text-white border-0 rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
            :styles="selectStyles"
          />
        </div>
        <!-- Topic Dropdown -->
        <div class="flex flex-col w-full max-w-xs">
          <label class="font-semibold mb-1 text-gray-300">Topic</label>
          <select v-model="topic" class="bg-[#1d1836] text-white border-0 rounded-lg px-3 py-2 shadow-md focus:ring-2 focus:ring-blue-500">
            <option v-for="option in topicOptions" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
        <!-- Tone Dropdown -->
        <div class="flex flex-col w-full max-w-xs">
          <label class="font-semibold mb-1 text-gray-300">Tone</label>
          <select v-model="tone" class="bg-[#1d1836] text-white border-0 rounded-lg px-3 py-2 shadow-md focus:ring-2 focus:ring-purple-500">
            <option v-for="option in toneOptions" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
        <!-- Submit Button -->
        <button
          :disabled="loading"
          type="submit"
          class="btn-primary mt-4 md:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-2 rounded-lg shadow hover:from-blue-700 hover:to-purple-700 transition"
        >
          {{ loading ? "Generating..." : "Generate" }}
        </button>
      </form>
      <PostGrid :posts="posts" />
      <div v-if="error" class="text-red-400 mt-4 text-center">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Vue3Select from 'vue3-select'
import 'vue3-select/dist/vue3-select.css'
import PostGrid from '../components/PostGrid.vue'
import BackgroundAnimation from '../components/BackgroundAnimation.vue' // We'll create this below
import { generateIdea, generateCopy, suggestMedia, scorePost } from '../api/agents'

const profession = ref('')
const topic = ref('')
const tone = ref('Conversational')
const posts = ref([])
const loading = ref(false)
const error = ref('')

// Custom dropdown style object if using vue3-select
const selectStyles = {
  input: (provided) => ({ ...provided, background: '#1d1836', color: '#fff' }),
  menu: (provided) => ({ ...provided, background: '#14111e', color: '#fff' }),
  option: (provided, state) => ({
    ...provided,
    background: state.isSelected ? '#4422ff' : (state.isFocused ? '#23255b' : '#1d1836'),
    color: '#fff'
  }),
}

// Options
const professionOptions = [
  "Marketer", "Engineer", "CEO", "CTO", "Product Manager", "Developer", "Sales Lead",
  "HR Manager", "Designer", "Data Scientist", "Recruiter", "Copywriter", "Entrepreneur",
  "Startup Founder", "Consultant", "Growth Hacker", "Customer Success", "Operations Lead",
  "Business Analyst", "Finance Manager", "Coach", "Investor", "Community Manager", "Brand Strategist"
]

const topicOptions = [
  "AI", "Leadership", "Remote Work", "Personal Branding", "Career Growth", "Team Building",
  "Automation", "Work-Life Balance", "Mental Health", "Networking", "Innovation", "Productivity",
  "Startups", "Growth", "Resilience", "Diversity & Inclusion", "Customer Experience", "Sales Strategy",
  "Marketing Trends", "Job Search", "Upskilling", "Mentorship", "Entrepreneurship", "Negotiation",
  "Agile Methodology", "Tech Trends", "Business Strategy"
]

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
.chat-logo {
  font-size: 3.5rem;
  font-weight: 500;
}

.beta-icon {
  border-width: 1px;
  border-color: rgb(255 255 255 / 40%);
}

.btn-primary {
  @apply px-6 py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition;
}
</style>