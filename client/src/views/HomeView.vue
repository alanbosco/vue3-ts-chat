<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')

const onSubmit = () => {
  if (!username.value) {
    return
  }

  router.push({ name: 'chat', query: { username: username.value } })
}
</script>

<template>
  <main class="h-screen w-full flex items-center justify-center">
    <div class="card">
      <h6 class="text-xl">Welcome</h6>
      <p class="text-sm text-gray-400">Please enter a username to join the chat.</p>
      <form class="flex mt-10" @submit.prevent="onSubmit">
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          class="rounded-md text-slate-950 p-3"
        />
        <button class="w-24 ml-3 bg-blue-700 hover:bg-blue-600" type="submit">Join</button>
      </form>
    </div>
  </main>
</template>
