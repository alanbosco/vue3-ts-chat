<script lang="ts" setup>
import { ref } from 'vue'
import { socket, state, sendChat } from '@/socket'

const isLoading = ref(false)
const value = ref('')

const onSubmit = () => {
  isLoading.value = true

  sendChat(value.value, () => {
    console.log('Message sent', value.value)
    isLoading.value = false
    value.value = ''
  })
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="flex mt-2">
      <input
        v-model="value"
        :disabled="isLoading || !state.connected"
        type="text"
        placeholder="Type your message here"
        class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
      <button type="submit" :disabled="isLoading">Submit</button>
    </div>
  </form>
</template>
