<template>
  <div class="relative min-h-screen overflow-x-hidden bg-[#080220]">
    <!-- Pass loading to the background animation -->
    <BackgroundAnimation :loading="loading" />
    <!-- Main Content -->
    <div class="relative z-10 max-w-4xl mx-auto py-12 px-4">
      <div class="mb-8 flex flex-col items-center justify-center space-x-4 md:flex-row">
        <h1 class="chat-logo mb-3 text-center font-roboto text-5xl text-white md:mb-0">Composer</h1>
        <div class="beta-icon border-opacity/50 mb-0 rounded-lg border-2 border-solid px-4 py-2 font-roboto text-3xl leading-none text-white">LinkedIn</div>
      </div>
      <form @submit.prevent="generatePost" class="flex flex-col md:flex-row gap-4 mb-8 items-end justify-center">
        <Selector v-model="profession" :options="professionOptions" label="Job Category" placeholder="Select a category..." class="mb-4"/>
        <Selector v-model="topic" :options="topicOptions" label="Topic" placeholder="Select a topic..." class="mb-4"/>
        <Selector v-model="tone" :options="toneOptions" label="Tone" placeholder="Select a tone..." class="mb-4"/>
        <SubmitButton :loading="loading" class="w-full max-w-xs self-end" />
      </form>
      
      <ul v-if="loading" class="mb-4 w-full max-w-xs self-end space-y-2">
        <li v-for="step in progressSteps" :key="step.label" class="flex items-center space-x-2">
          <span v-if="step.status === 'pending'">
            <svg class="w-4 h-4 animate-spin text-blue-300" fill="none" viewBox="0 0 16 16">
              <circle class="opacity-25" cx="8" cy="8" r="5" stroke="currentColor" stroke-width="3"/>
              <path class="opacity-90" fill="currentColor" d="M8 2a6 6 0 016 6h-2a4 4 0 00-4-4V2z"/>
            </svg>
          </span>
          <span v-else-if="step.status === 'success'">
            <svg class="w-4 h-4 text-green-400" fill="none" viewBox="0 0 16 16">
              <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4 8l3 3 5-5"/>
            </svg>
          </span>
          <span v-else-if="step.status === 'error'">
            <svg class="w-4 h-4 text-red-400" fill="none" viewBox="0 0 16 16">
              <path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M8 4v4m0 4h.01"/>
            </svg>
          </span>
          <span
            :class="[
              'text-sm',
              step.status === 'pending' ? 'text-blue-300' : step.status === 'success' ? 'text-green-400' : 'text-red-400'
            ]"
          >
            {{ step.label }}
          </span>
        </li>
      </ul>

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
import BackgroundAnimation from '../components/BackgroundAnimation.vue'
import Selector from '../components/Selector.vue'
import SubmitButton from '../components/SubmitButton.vue'
import { generateIdea, generateCopy, suggestMedia, scorePost } from '../api/agents'
import { Listbox, ListboxButton, ListboxLabel, ListboxOptions, ListboxOption } from '@headlessui/vue'


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

const progressSteps = ref([]) // [{ label: "Generating idea...", status: "pending/success/error" }, ...]

async function generatePost() {
  loading.value = true
  error.value = ''
  progressSteps.value = [
    { label: "Generating post idea", status: "pending" },
    { label: "Writing LinkedIn copy", status: "pending" },
    { label: "Suggesting media", status: "pending" },
    { label: "Scoring virality", status: "pending" }
  ]
  try {
    // 1. Idea
    let idx = 0
    const idea = await generateIdea({ profession: profession.value, topic: topic.value })
    progressSteps.value[idx].status = "success"

    // 2. Copy
    idx = 1
    const text = await generateCopy({ idea, tone: tone.value, jobCategory: profession.value })
    progressSteps.value[idx].status = "success"

    // 3. Media
    idx = 2
    const { mediaType, mediaUrl } = await suggestMedia({ idea, copy: text })
    progressSteps.value[idx].status = "success"

    // 4. Score
    idx = 3
    const score = await scorePost({ idea, copy: text, mediaType })
    progressSteps.value[idx].status = "success"

    // Add post
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
    // Optionally, set current step to error
    for (const step of progressSteps.value) {
      if (step.status === "pending") step.status = "error"
    }
  } finally {
    loading.value = false
    // Optionally, hide progress after a second
    setTimeout(() => { progressSteps.value = [] }, 1200)
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