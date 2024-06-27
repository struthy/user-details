<template>
  <div v-if="user">
    <h1>{{ user.firstName }} {{ user.lastName }}</h1>
    <img :src="user.avatar" alt="User avatar" />
    <p>Email: {{ user.email }}</p>
    <p>Phone: {{ user.phoneNumber }}</p>
    <p>Date of Birth: {{ user.dateOfBirth }}</p>
    <p>NI Number: {{ user.nino }}</p>
    <div>
      <h3>Address:</h3>
      <p>{{ user.address.addressLine1 }}</p>
      <p>{{ user.address.city }}</p>
      <p>{{ user.address.postCode }}</p>
      <p>{{ user.address.country }}</p>
    </div>
    <div>
      <h3>Payment Details:</h3>
      <p>Account Name: {{ user.paymentDetails.accountName }}</p>
      <p>Account Number: {{ user.paymentDetails.accountNumber }}</p>
      <p>Sort Code: {{ user.paymentDetails.sortCode }}</p>
      <p>Account Type: {{ user.paymentDetails.accountType }}</p>
    </div>
  </div>
  <p v-else>Loading user details...</p>
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
