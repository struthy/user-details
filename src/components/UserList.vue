<template>
  <div v-if="users && users.length">
    <h1 class="text-xl font-bold mb-8">User List</h1>
    <table>
      <thead>
        <tr>
          <th class="font-bold">First Name</th>
          <th class="font-bold">Last Name</th>
          <th class="font-bold">Email</th>
          <th class="font-bold">Location</th>
          <th class="font-bold">Avatar</th>
          <th class="font-bold">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.address.city }}</td>
          <td><img :src="user.avatar" alt="User avatar" /></td>
          <td>
            <router-link class="inline-block px-4 py-2 bg-blue-500 text-white rounded text-xs" :to="'/user/' + user.id">View Details</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="loading">Loading...</div>
    <div class="mt-8 flex justify-center content-center align-middle">
      <button class="pagination-btn" @click="changePage(-1)" :disabled="isPreviousDisabled">Previous</button>
      <span class="flex mx-8 align-middle items-center"> Page {{ currentPage }} of {{ totalPages }}</span>
      <button class="pagination-btn" @click="changePage(1)" :disabled="isNextDisabled">Next</button>
    </div>
    <div class="mt-8 flex justify-center content-center align-middle">
      <ul class="flex">
        <li v-for="page in pages" :key="page" class="m-0 p-0">
          <button
            @click="fetchUserData(page)"
            :class="{ 'bg-blue-500 text-white p-2': currentPage === page, 'bg-white text-blue-500 p-2': currentPage !== page }"
            class="border rounded border-blue-500 bg-blue-500 text-xs m-0 mr-1"
          >
            {{ page }}
          </button>
        </li>
      </ul>
    </div>
  </div>
  <p v-else>No Users Found.</p>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])
const currentPage = ref(1)
const limit = ref(15)
const totalPages = ref(0)
const loading = ref(false)

const pages = computed(() => {
  const pageNumbers = []
  for (let i = 1; i <= totalPages.value; i++) {
    pageNumbers.push(i)
  }
  return pageNumbers
})

const isPreviousDisabled = computed(() => currentPage.value <= 1 || loading.value)
const isNextDisabled = computed(() => currentPage.value >= totalPages.value || loading.value)

const changePage = (increment) => {
  const newPage = currentPage.value + increment
  if (newPage > 0 && newPage <= totalPages.value) {
    fetchUserData(newPage)
  }
}

async function fetchUserData(page) {
  loading.value = true
  console.log(`Fetching page: ${page}`)
  try {
    const response = await axios.get(`/api/user?page=${page}&limit=${limit.value}`)
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
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:nth-child(odd) {
  background-color: #ffffff;
}

img {
  width: 50px;
  height: auto;
  border-radius: 50%;
}

button.pagination-btn {
  padding: 5px 10px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline;
}

.bg-gray-300 {
  background-color: #e2e8f0;
}

.bg-white {
  background-color: #ffffff;
}
</style>
