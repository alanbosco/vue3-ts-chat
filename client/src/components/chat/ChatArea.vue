<script setup lang="ts">
import { defineProps } from 'vue'
import type { Chat } from '@/socket'

interface Props {
  messages: Chat[]
}

defineProps<Props>()
</script>

<template>
  <div class="chat-area flex flex-col pt-4">
    <div
      v-for="(message, index) in messages"
      :key="`message-${index}`"
      class="p-2 dark:bg-slate-600 rounded-xl mb-2 text-white w-[fit-content] max-w-[330px] break-words"
      :class="
        message.sender === 'me' ? 'dark:bg-blue-500 self-end' : 'dark:bg-slate-500 self-start'
      "
    >
      {{ message.message }}
    </div>
  </div>
</template>
