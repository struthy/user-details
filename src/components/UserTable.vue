<template>
  <table role="grid" aria-labelledby="user-list">
    <thead>
      <tr>
        <th class="font-bold cursor-pointer text-blue-600" style="width: 215px">
          <button @click="changeOrder('firstName')" :class="{ active: props.orderBy === 'firstName' }" aria-label="Sort by first name">
            First Name <span v-html="props.orderBy === 'firstName' ? props.orderIcon : ''"></span>
          </button>
        </th>
        <th class="font-bold cursor-pointer text-blue-600" style="width: 215px">
          <button @click="changeOrder('lastName')" :class="{ active: props.orderBy === 'lastName' }" aria-label="Sort by last name">
            Last Name <span v-html="props.orderBy === 'lastName' ? props.orderIcon : ''"></span>
          </button>
        </th>
        <th class="font-bold">Email</th>
        <th class="font-bold">Location</th>
        <th class="font-bold">Avatar</th>
        <th class="font-bold">Actions</th>
      </tr>
    </thead>
    <tbody>
      <UserTableRow v-for="user in props.users" :key="user.id" :user="user" />
    </tbody>
  </table>
</template>

<script setup>
import UserTableRow from './UserTableRow.vue' // Import the UserTableRow component for displaying individual rows
import { defineProps, defineEmits } from 'vue' // Importing functions to define props and emits

// Define props for the component
const props = defineProps({
  users: Array, // Array of user objects to be displayed in the table
  orderBy: String, // The field by which the data is currently ordered
  orderIcon: String // The icon indicating the order direction (e.g., an up or down arrow)
})

// Define emits for the component to allow parent component to listen to events
const emit = defineEmits(['changeOrder'])

// Function to emit the changeOrder event with the given field
const changeOrder = (field) => {
  emit('changeOrder', field)
}
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
</style>
