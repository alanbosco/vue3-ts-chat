<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
import type { Chat } from '@/socket'

interface Props {
  messages: Chat[]
}

const props = defineProps<Props>()

const chatArea = ref<HTMLElement | null>(null)

watch(
  () => props.messages,
  async () => {
    if (chatArea.value) {
      await setTimeout(() => Promise.resolve(), 0)
      chatArea.value?.scrollTo(0, chatArea.value.scrollHeight)
    }
  },
  { immediate: true, deep: true }
)
</script>

<template>
  <div
    ref="chatArea"
    class="chat-area flex flex-col pt-4 pb-14 pr-4 overflow-y-auto"
    style="height: calc(100vh - 90px)"
  >
    <div
      v-for="(message, index) in messages"
      :key="`message-${index}`"
      class="flex"
      :class="
        message.message.type !== 'info'
          ? { 'self-end': message.sender === 'me', 'self-start': message.sender !== 'me' }
          : {}
      "
    >
      <div
        v-if="message.message.type === 'message' && message.sender !== 'me'"
        class="profile-pic mr-3"
      >
        <img
          src="https://i.pravatar.cc/150?img=3"
          alt="profile-pic"
          width="30"
          height="30"
          class="rounded-full"
        />
      </div>
      <div class="message-details flex-1">
        <p v-if="message.message.type === 'message'" class="text-sm text-gray-400 mb-2">
          {{ message.message.sender }}
        </p>
        <div
          class="p-2 dark:bg-slate-600 rounded-xl mb-2 text-white w-[fit-content] max-w-[330px] break-words"
          :class="{
            'dark:bg-blue-500': message.sender === 'me',
            'dark:bg-slate-500': message.sender !== 'me',
            '!bg-transparent p-0 w-full text-center text-sm max-w-full text-gray-500':
              message.message.type === 'info'
          }"
        >
          <p>{{ message.message.message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
