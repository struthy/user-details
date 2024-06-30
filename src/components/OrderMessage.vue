<template>
  <p v-html="message"></p>
</template>

<script setup>
import { computed } from 'vue' // Importing the computed function from Vue to create reactive computed properties

// Define props for the component
const props = defineProps({
  field: String, // The field by which the data is currently ordered (e.g., 'firstName', 'lastName')
  direction: String // The direction of the order (e.g., 'asc', 'desc')
})

// Define a computed property that returns a message based on the order field and direction
const message = computed(() => {
  // The message includes the order field and direction in bold
  return `Currently ordered by <strong>${props.field}</strong> in <strong>${props.direction}</strong> order`
})
</script>

<style scoped>
p {
  margin-bottom: 1rem;
}
</style>
