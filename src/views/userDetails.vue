<template>
  <div v-if="user" class="p-4 bg-white rounded shadow-lg">
    <div class="flex flex-wrap w-full">
      <div class="w-full sm:w-1/4 mb-4 sm:mb-0">
        <img :src="user.avatar" alt="User avatar" class="rounded-full w-32 h-32 mx-auto" />
      </div>

      <div class="w-full sm:w-1/4 mb-4 sm:mb-0">
        <h3 class="text-lg font-semibold mb-2">Personal Details:</h3>
        <p><span class="font-semibold">Name:</span> {{ user.firstName }} {{ user.lastName }}</p>
        <p><span class="font-semibold">Email:</span> {{ user.email }}</p>
        <p><span class="font-semibold">Phone:</span> {{ user.phoneNumber }}</p>
        <p><span class="font-semibold">Date of Birth:</span> {{ user.dateOfBirth }}</p>
        <p><span class="font-semibold">NI Number:</span> {{ user.nino }}</p>
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
        <p>
          <span class="font-semibold">Account Name:</span> {{ user.paymentDetails.accountName }}
        </p>
        <p>
          <span class="font-semibold">Account Number:</span> {{ user.paymentDetails.accountNumber }}
        </p>
        <p><span class="font-semibold">Sort Code:</span> {{ user.paymentDetails.sortCode }}</p>
        <p>
          <span class="font-semibold">Account Type:</span> {{ user.paymentDetails.accountType }}
        </p>
      </div>
    </div>
  </div>
  <p v-else class="p-4 text-gray-600">Loading user details...</p>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const user = ref(null)
const route = useRoute()

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
