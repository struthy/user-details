<template>
  <div v-if="users && users.length">
    <h1 class="text-xl font-bold mb-4">User List</h1>
    <div class="flex justify-between mb-0">
      <OrderMessage :field="orderField" :direction="orderDirection" />
      <span class="flex align-middle items-center"> Page {{ currentPage }} of {{ totalPages }}</span>
    </div>
    <UserTable :users="users" :orderBy="orderBy" :orderIcon="orderIcon" @changeOrder="changeOrder" />
    <div v-if="loading">Loading...</div>
    <PaginationControls :currentPage="currentPage" :totalPages="totalPages" :loading="loading" @fetchUserData="fetchUserData" />
  </div>
  <p v-else>No Users Found.</p>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import UserTable from '../components/UserTable.vue'
import PaginationControls from '../components/PaginationControls.vue'
import OrderMessage from '../components/OrderMessage.vue'

// Define reactive state variables
const users = ref([]) // Array to hold the list of users
const currentPage = ref(1) // Current page number
const limit = ref(15) // Number of users per page
const totalPages = ref(0) // Total number of pages
const loading = ref(false) // Loading state
const orderBy = ref('firstName') // Current order by field
const order = ref('asc') // Current order direction

// Computed property to get the current order field in a readable format
const orderField = computed(() => (orderBy.value === 'firstName' ? 'First Name' : 'Last Name'))

// Computed property to get the current order direction in a readable format
const orderDirection = computed(() => (order.value === 'asc' ? 'ascending' : 'descending'))

// Computed property to get the order icon based on the current order direction
const orderIcon = computed(() => {
  return order.value === 'asc' ? '&#9660;' : '&#9650;' // Down arrow for ascending, up arrow for descending
})

// Function to change the order field and direction
const changeOrder = (field) => {
  if (orderBy.value === field) {
    // Toggle the order direction if the field is already the current order field
    order.value = order.value === 'asc' ? 'desc' : 'asc'
  } else {
    // Set the new order field and reset the order direction to ascending
    orderBy.value = field
    order.value = 'asc'
  }
  // Fetch the user data for the current page with the new order
  fetchUserData(currentPage.value)
}

// Function to fetch user data from the API
async function fetchUserData(page) {
  loading.value = true // Set loading state to true when fetching data
  console.log(`Fetching page: ${page}, orderBy: ${orderBy.value}, order: ${order.value}`)
  try {
    // Make an API call to get user data
    const response = await axios.get(`/api/user?page=${page}&limit=${limit.value}&orderBy=${orderBy.value}&order=${order.value}`)
    console.log('API response:', response.data) // Log the API response
    users.value = response.data.results // Update users array with the fetched data
    totalPages.value = response.data.metadata.numPages // Update total pages from the response metadata
    console.log(`Total pages: ${totalPages.value}`)
    currentPage.value = page // Update the current page
    loading.value = false // Set loading state to false after data is fetched
  } catch (error) {
    console.error('Failed to fetch user data:', error)
    loading.value = false // Set loading state to false if there is an error
  }
}

// Fetch user data for the initial page when the component is mounted
onMounted(() => fetchUserData(currentPage.value))
</script>

<style scoped>
/* Global styles for this component */
</style>
