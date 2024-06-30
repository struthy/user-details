<template>
  <div class="mt-8 flex justify-center content-center align-middle">
    <button class="pagination-btn bg-blue-500" @click="previousPage" :disabled="isPreviousDisabled">Previous</button>
    <span class="flex mx-8 align-middle items-center"> Page {{ props.currentPage }} of {{ props.totalPages }}</span>
    <button class="pagination-btn bg-blue-500" @click="nextPage" :disabled="isNextDisabled">Next</button>
  </div>
  <ul role="list" class="flex mt-8 flex justify-center content-center align-middle">
    <li v-for="page in pages" :key="page" class="m-0 p-0">
      <button
        @click="fetchUserData(page)"
        :class="{ 'bg-blue-500 text-white p-2': props.currentPage === page, 'bg-white text-blue-500 p-2': props.currentPage !== page }"
        class="border rounded border-blue-500 text-xs m-0 mr-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
        :aria-label="'Page ' + page"
      >
        {{ page }}
      </button>
    </li>
  </ul>
</template>

<script setup>
import { computed } from 'vue' // Importing ref and computed from Vue for reactive state and computed properties

// Define props for the component
const props = defineProps({
  currentPage: Number, // The current page number
  totalPages: Number, // The total number of pages
  loading: Boolean // Boolean indicating whether data is loading
})

// Define emits for the component to allow parent component to listen to events
const emit = defineEmits(['fetchUserData'])

// Computed property to generate an array of page numbers
const pages = computed(() => {
  const pageNumbers = []
  // Loop through the total number of pages and push each page number into the array
  for (let i = 1; i <= props.totalPages; i++) {
    pageNumbers.push(i)
  }
  return pageNumbers // Return the array of page numbers
})

// Computed property to check if the Previous button should be disabled
const isPreviousDisabled = computed(() => props.currentPage <= 1 || props.loading)

// Computed property to check if the Next button should be disabled
const isNextDisabled = computed(() => props.currentPage >= props.totalPages || props.loading)

// Function to emit the fetchUserData event with the given page number
const fetchUserData = (page) => {
  emit('fetchUserData', page)
}

// Function to navigate to the previous page
const previousPage = () => {
  if (props.currentPage > 1) {
    fetchUserData(props.currentPage - 1) // Fetch data for the previous page
  }
}

// Function to navigate to the next page
const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    fetchUserData(props.currentPage + 1) // Fetch data for the next page
  }
}
</script>

<style scoped>
button.pagination-btn {
  padding: 5px 10px;
  color: #fff;

  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
}
</style>
