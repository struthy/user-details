<template>
  <div v-if="user" class="p-4 bg-white rounded shadow-lg relative">
    <div class="flex flex-wrap w-full">
      <div class="w-full sm:w-1/4 mb-4 sm:mb-0">
        <img :src="user.avatar" :alt="`${user.firstName} ${user.lastName}'s avatar`" class="w-32 h-32 mx-auto" />
      </div>

      <div class="w-full sm:w-1/4 mb-4 sm:mb-0">
        <h3 class="text-lg font-semibold mb-2">Personal Details:</h3>
        <p><span class="font-semibold">Name:</span> {{ user.firstName }} {{ user.lastName }}</p>
        <p>
          <span class="font-semibold">Email:</span> <a :href="`mailto:${user.email}`" class="text-blue-600 underline">{{ user.email }}</a>
        </p>
        <p>
          <span class="font-semibold">Phone:</span> <a :href="`tel:${user.phoneNumber}`" class="text-blue-600 underline">{{ user.phoneNumber }}</a>
        </p>
        <p><span class="font-semibold">Date of Birth:</span> {{ user.dateOfBirth }}</p>
        <p><span class="font-semibold">NI Number:</span> {{ obfuscate(user.nino) }}</p>
      </div>

      <div class="w-full sm:w-1/4 mb-4 sm:mb-0">
        <h3 class="text-lg font-semibold mb-2">Address:</h3>
        <p>{{ user.address.addressLine1 }}</p>
        <p>{{ user.address.city }}</p>
        <p>{{ user.address.postCode }}</p>
        <p>{{ user.address.country }}</p>
      </div>

      <div class="w-full sm:w-1/4">
        <h3 class="text-lg font-semibold mb-2">Payment Details:</h3>
        <p><span class="font-semibold">Account Name:</span> {{ obfuscate(user.paymentDetails.accountName) }}</p>
        <p><span class="font-semibold">Account Number:</span> {{ obfuscate(user.paymentDetails.accountNumber) }}</p>
        <p><span class="font-semibold">Sort Code:</span> {{ obfuscate(user.paymentDetails.sortCode) }}</p>
        <p><span class="font-semibold">Account Type:</span> {{ user.paymentDetails.accountType }}</p>
      </div>

      <div class="w-full flex justify-end">
        <router-link to="/" class="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-300"> Back to User List </router-link>
      </div>
    </div>
  </div>
  <p v-else class="absolute top-0 left-0 h-full w-full bg-white opacity-40 flex justify-center items-center text-gray-900">Loading user details...</p>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const user = ref(null)
const route = useRoute()

const obfuscate = (value) => {
  if (!value) return ''
  const visibleChars = 2
  const obfuscationLength = value.length - visibleChars
  return value.substring(0, visibleChars) + '*'.repeat(obfuscationLength)
}

onMounted(async () => {
  const userId = route.params.id
  console.log('Fetching details for user ID:', userId)
  try {
    const response = await axios.get(`/api/user/${userId}`) // Use the proxied path
    user.value = response.data
    console.log('Fetched user data:', response.data)
  } catch (error) {
    console.error('Failed to fetch user details:', error)
  }
})
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

th {
  cursor: pointer;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:nth-child(odd) {
  background-color: #ffffff;
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

button.active {
  font-weight: bold;
  color: #ff0000; /* Example color for the active button */
}

a:focus,
button:focus,
.router-link:focus {
  outline: 2px solid #4a90e2; /* Example focus outline color */
  outline-offset: 2px;
}
</style>
