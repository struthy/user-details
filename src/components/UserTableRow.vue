<template>
  <tr>
    <td>{{ user.firstName }}</td>
    <td>{{ user.lastName }}</td>
    <td>
      <a :href="`mailto:${user.email}`" class="text-blue-600 underline">{{ user.email }}</a>
    </td>
    <td>{{ user.address.city }}</td>
    <td><img :src="user.avatar" :alt="`${user.firstName} ${user.lastName}'s avatar`" /></td>
    <td>
      <router-link class="inline-block px-2 py-1 bg-blue-500 text-white rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-300" :to="'/user/' + user.id">View Details</router-link>
    </td>
  </tr>
</template>

<script setup>
const props = defineProps({
  user: Object
})
</script>

<style scoped>
img {
  width: 30px;
  height: auto;
  border-radius: 100%;
}

td {
  padding: 4px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
</style>
