<template>
  <div v-if="user">
    <h1 class="text-xl font-bold mb-4">{{ user.firstName }} {{ user.lastName }}</h1>
    <div class="p-4 bg-white shadow-md border-t relative mb-4 pb-12">
      <div class="flex flex-wrap w-full">
        <div class="w-full mb-8 sm:mb-8flex justify-star">
          <img :src="user.avatar" :alt="`${user.firstName} ${user.lastName}'s avatar`" class="w-32 h-32" />
        </div>

        <div class="w-full sm:w-1/4 mb-4 sm:mb-0 sm:pr-16 sm:flex-1">
          <h3 class="text-lg font-semibold mb-2">Personal Details:</h3>
          <table class="w-full">
            <tbody>
              <tr class="bg-gray-100">
                <td class="font-semibold p-2">Name:</td>
                <td class="p-2">{{ user.firstName }} {{ user.lastName }}</td>
              </tr>
              <tr>
                <td class="font-semibold p-2">Email:</td>
                <td class="p-2">
                  <a :href="`mailto:${user.email}`" class="text-blue-600 underline">{{ user.email }}</a>
                </td>
              </tr>
              <tr class="bg-gray-100">
                <td class="font-semibold p-2">Phone:</td>
                <td class="p-2">
                  <a :href="`tel:${user.phoneNumber}`" class="text-blue-600 underline">{{ user.phoneNumber }}</a>
                </td>
              </tr>
              <tr>
                <td class="font-semibold p-2">Date of Birth:</td>
                <td class="p-2">{{ user.dateOfBirth }}</td>
              </tr>
              <tr class="bg-gray-100">
                <td class="font-semibold p-2">NI Number:</td>
                <td class="p-2">{{ obfuscate(user.nino) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="w-full sm:w-1/4 mb-4 sm:mb-0 sm:pr-16 sm:flex-1">
          <h3 class="text-lg font-semibold mb-2">Address:</h3>
          <table class="w-full">
            <tbody>
              <tr class="bg-gray-100">
                <td class="font-semibold p-2">Address Line 1:</td>
                <td class="p-2">{{ user.address.addressLine1 }}</td>
              </tr>
              <tr>
                <td class="font-semibold p-2">City:</td>
                <td class="p-2">{{ user.address.city }}</td>
              </tr>
              <tr class="bg-gray-100">
                <td class="font-semibold p-2">Post Code:</td>
                <td class="p-2">{{ user.address.postCode }}</td>
              </tr>
              <tr>
                <td class="font-semibold p-2">Country:</td>
                <td class="p-2">{{ user.address.country }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="w-full sm:w-1/4 flex-1">
          <h3 class="text-lg font-semibold mb-2">Payment Details:</h3>
          <table class="w-full">
            <tbody>
              <tr class="bg-gray-100">
                <td class="font-semibold p-2">Account Name:</td>
                <td class="p-2">{{ obfuscate(user.paymentDetails.accountName) }}</td>
              </tr>
              <tr>
                <td class="font-semibold p-2">Account Number:</td>
                <td class="p-2">{{ obfuscate(user.paymentDetails.accountNumber) }}</td>
              </tr>
              <tr class="bg-gray-100">
                <td class="font-semibold p-2">Sort Code:</td>
                <td class="p-2">{{ obfuscate(user.paymentDetails.sortCode) }}</td>
              </tr>
              <tr>
                <td class="font-semibold p-2">Account Type:</td>
                <td class="p-2">{{ user.paymentDetails.accountType }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-start">
      <router-link to="/" class="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-300"> Back to User List </router-link>
    </div>
  </div>
  <p v-else class="absolute top-0 left-0 h-full w-full bg-white opacity-40 flex justify-center items-center text-gray-900">Loading user details...</p>
</template>

<script setup>
import { ref, onMounted } from 'vue' // Importing ref and onMounted from Vue for reactive state and lifecycle hooks
import { useRoute } from 'vue-router' // Importing useRoute from vue-router to access route parameters
import axios from 'axios' // Importing axios for making HTTP requests

// Define a reactive variable to store user data
const user = ref(null)

// Get the current route to access route parameters
const route = useRoute()

// Function to obfuscate sensitive information
const obfuscate = (value) => {
  if (!value) return '' // If value is null or undefined, return an empty string
  const visibleChars = 2 // Number of visible characters at the start of the string
  const obfuscationLength = value.length - visibleChars // Length of the obfuscated part of the string
  // Return the obfuscated string with the visible characters at the start and the rest replaced by '*'
  return value.substring(0, visibleChars) + '*'.repeat(obfuscationLength)
}

// Lifecycle hook that runs when the component is mounted
onMounted(async () => {
  const userId = route.params.id // Get the user ID from the route parameters
  console.log('Fetching details for user ID:', userId) // Log the user ID being fetched
  try {
    // Make an HTTP GET request to fetch the user data by user ID
    const response = await axios.get(`/api/user/${userId}`)
    user.value = response.data // Store the fetched user data in the reactive user variable
    console.log('Fetched user data:', response.data) // Log the fetched user data
  } catch (error) {
    console.error('Failed to fetch user details:', error) // Log any error that occurs during the fetch operation
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
