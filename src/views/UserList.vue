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

const users = ref([])
const currentPage = ref(1)
const limit = ref(15)
const totalPages = ref(0)
const loading = ref(false)
const orderBy = ref('firstName')
const order = ref('asc')

const orderField = computed(() => (orderBy.value === 'firstName' ? 'First Name' : 'Last Name'))
const orderDirection = computed(() => (order.value === 'asc' ? 'ascending' : 'descending'))

const orderIcon = computed(() => {
  return order.value === 'asc' ? '&#9660;' : '&#9650;' // Down arrow for ascending, up arrow for descending
})

// const changePage = (increment) => {
//   const newPage = currentPage.value + increment
//   if (newPage > 0 && newPage <= totalPages.value) {
//     fetchUserData(newPage)
//   }
// }

const changeOrder = (field) => {
  if (orderBy.value === field) {
    order.value = order.value === 'asc' ? 'desc' : 'asc'
  } else {
    orderBy.value = field
    order.value = 'asc'
  }
  fetchUserData(currentPage.value)
}

async function fetchUserData(page) {
  loading.value = true
  console.log(`Fetching page: ${page}, orderBy: ${orderBy.value}, order: ${order.value}`)
  try {
    const response = await axios.get(`/api/user?page=${page}&limit=${limit.value}&orderBy=${orderBy.value}&order=${order.value}`)
    console.log('API response:', response.data) // Log the entire response
    users.value = response.data.results
    totalPages.value = response.data.metadata.numPages // Use numPages from the response metadata
    console.log(`Total pages: ${totalPages.value}`)
    currentPage.value = page
    loading.value = false
  } catch (error) {
    console.error('Failed to fetch user data:', error)
    loading.value = false
  }
}

onMounted(() => fetchUserData(currentPage.value))
</script>

<style scoped>
/* Global styles for this component */
</style>
