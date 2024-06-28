<template>
  <p v-html="message"></p>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  field: String,
  direction: String
})

const message = computed(() => {
  return `Currently ordered by <strong>${props.field}</strong> in <strong>${props.direction}</strong> order`
})
</script>

<style scoped>
p {
  margin-bottom: 1rem;
}
</style>
