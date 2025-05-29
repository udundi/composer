<script setup>
import { ref, computed } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOptions, ListboxOption } from '@headlessui/vue'

const props = defineProps({
  modelValue: { type: String, required: true },
  options: { type: Array, required: true },
  label: { type: String, default: '' },
  placeholder: { type: String, default: 'Select an option' }
})
const emit = defineEmits(['update:modelValue'])

const selected = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
</script>

<template>
  <div class="w-full max-w-xs">
    <Listbox v-model="selected">
      <ListboxLabel v-if="label" class="block text-sm font-medium text-gray-300 mb-1">{{ label }}</ListboxLabel>
      <div class="relative w-full">
        <ListboxButton class="relative w-full cursor-pointer rounded-md bg-[#161629] py-2 pl-3 pr-10 text-left text-white shadow-md outline outline-1 outline-[#232255] focus:outline focus:outline-2 focus:outline-[#8423ff] transition">
          <span class="block truncate">{{ selected || placeholder }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg class="h-5 w-5 text-[#8e95bd]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M6 8l4 4 4-4" />
            </svg>
          </span>
        </ListboxButton>
        <Transition
          enter="transition ease-out duration-100"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition ease-in duration-75"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <ListboxOptions class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#161629] py-1 text-base shadow-lg ring-1 ring-black/70 focus:outline-none">
            <ListboxOption
              v-for="option in options"
              :key="option"
              :value="option"
              v-slot="{ selected, active }"
              :class="[
                'relative cursor-pointer select-none py-2 pl-3 pr-9 transition-all duration-300 ease-in-out rounded',
                active
                  ? 'bg-[#232255] text-white'
                  : 'text-white hover:bg-[#24244a] hover:text-white'
              ]"
            >
              <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                {{ option }}
              </span>
              <span v-if="selected" class="absolute inset-y-0 right-0 flex items-center pr-4 text-[#8423ff]">
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                </svg>
              </span>
            </ListboxOption>
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  </div>
</template>