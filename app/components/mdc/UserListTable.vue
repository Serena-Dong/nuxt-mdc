<script setup lang="ts">
type UserData = {
  name: string
  username: string
  email: string
}

const { data: users } = await useFetch<UserData[]>(
  'https://jsonplaceholder.typicode.com/users'
)
</script>

<template>
  <table v-if="users?.length" class="w-full">
    <tr v-for="user in users" :key="user.username">
      <td class="border-b-2 border-gray-400 py-2">
        <p class="text-bold text-black">{{ user.name }}</p>
      </td>
      <td class="border-b-2 border-gray-400 py-2">
        <p class="text-bold text-black">{{ user.username }}</p>
      </td>
      <td class="border-b-2 border-gray-400 py-2">
        <p class="text-bold text-black">{{ user.email }}</p>
      </td>
    </tr>
  </table>
  <div v-else><p>UserListTable contains no users</p></div>
</template>
