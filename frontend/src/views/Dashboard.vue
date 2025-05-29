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
      
      <div class="fixed bottom-8 right-8 w-48 h-auto z-50 hover:opacity-80 opacity-100 transition">
        <a href="https://compose.co" target="_blank">
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1093.37 164.99'>
            <g fill='#fff'>
              <path d='M245.27,81V78c0-31.2,18.4-52.4,49.8-52.4,25.79,0,42.79,15.2,45.59,39h-21.6c-2.2-13-9.79-21.2-24.39-21.2-17.8,0-27,12.4-27,34.6v3c0,22.2,9.2,34.8,27,34.8,14.6,0,22.39-8.6,24.6-21.6h21.79c-3.4,24.2-20.39,39.4-46.19,39.4C263.67,133.59,245.27,112.19,245.27,81Z'/>
              <path d='M357.27,81V78c0-31.4,20-52.4,50.79-52.4,31,0,51,21,51,52.4v3c0,31.4-20,52.6-51,52.6C377.26,133.59,357.27,112.39,357.27,81Zm79.39,0V78c0-22.2-9.8-34.6-28.6-34.6-18.6,0-28.4,12.4-28.4,34.6v3c0,22.2,9.8,34.8,28.4,34.8C426.86,115.79,436.66,103.19,436.66,81Z'/>
              <path d='M479.06,131V28h21.2l.6,16c5.2-9.8,15.6-18.4,31.8-18.4,15.4,0,26,7,30.8,20,7.2-12.6,18.8-20,34-20,23.6,0,34.4,15.2,34.4,39V131h-22V69c0-17-6.2-25.2-19.8-25.2-14.8,0-23.4,11-23.4,30V131h-22V69.19c0-16.8-6-25.4-19.6-25.4-14.8,0-24,10.8-24,30.2v57Z'/>
              <path d='M657.26,165V28h20.6l.6,17c5-9.8,17-19.4,34.6-19.4,27,0,44,21.6,44,52.4v3c0,30.8-17.4,52.6-44.6,52.6-16,0-27.4-8.4-33-18.2V165Zm77.4-84V78c0-22.2-10-35-27.6-35-18.4,0-28.4,12.8-28.4,35v3c0,22.2,10,34.8,28.4,34.8C724.66,115.79,734.66,103.19,734.66,81Z'/>
              <path d='M776.06,81V78c0-31.4,20-52.4,50.8-52.4,31,0,51,21,51,52.4v3c0,31.4-20,52.6-51,52.6C796.06,133.59,776.06,112.39,776.06,81Zm79.4,0V78c0-22.2-9.8-34.6-28.6-34.6-18.6,0-28.4,12.4-28.4,34.6v3c0,22.2,9.8,34.8,28.4,34.8C845.66,115.79,855.46,103.19,855.46,81Z'/>
              <path d='M890.26,99h21.2c1.8,12.2,10.6,18,24.2,18,12.4,0,20.8-5,20.8-14.2,0-8.2-5.8-12.2-25.4-15.8-25-4.2-37.2-12.2-37.2-30.6s16.6-30.8,40.2-30.8c24.8,0,40.2,11.8,42.2,32.2h-21c-1.6-10.4-9.6-16-21.4-16-11.4,0-18.8,5-18.8,13.4,0,8,5.8,11.8,24.6,14.8,26,4.2,38.6,12.8,38.6,30.8,0,19.6-17,32.8-42.8,32.8C908.86,133.59,892.26,121,890.26,99Z'/>
              <path d='M993.66,81V78c0-31.2,19.4-52.4,51-52.4,33.8,0,50.2,23.6,48.6,58.8h-77c1,20.6,11,31.6,28.4,31.6,14.4,0,23-6.8,26-17.2h22c-5,21.6-22.2,34.8-48,34.8C1012.66,133.59,993.66,112.19,993.66,81Zm77-12.4c-1.6-16-10-25.6-26.2-25.6-16,0-25.4,8.8-27.8,25.6Z'/>
              <g fill='#5524e5'>
                <path d='M225.71,30.89l-90-29.52a27.58,27.58,0,0,0-26.18,5L72.44,37,176.9,71.24Z'/>
                <path d='M72.44,84.68V37L31.29,71.43,6,92.6a16.55,16.55,0,0,0,5.47,28.51L113.18,154a27.62,27.62,0,0,0,26.06-5l37.15-30.72Z'/>
              </g>
              <polygon fill='#0e0533' opacity='0.5' points='72.44 36.99 45.76 59.32 72.44 84.68 72.44 36.99'/>
            </g>
          </svg>
        </a>
      </div>
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