<template>
  <div v-if="users && users.length">
    <h1>User Details</h1>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Location</th>
          <th>Avatar</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.firstName }} {{ user.lastName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.address.city }}</td>
          <td><img :src="user.avatar" alt="User avatar" /></td>
          <td><router-link :to="'/user/' + user.id">View Details</router-link></td>
        </tr>
      </tbody>
    </table>
    <div v-if="loading">Loading...</div>
    <div>
      <button @click="changePage(-1)" :disabled="isPreviousDisabled">Previous</button>
      <button @click="changePage(1)" :disabled="isNextDisabled">Next</button>
    </div>
    <p>Page {{ currentPage }} of {{ totalPages }}</p>
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

button {
  margin: 5px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
}
</style>
