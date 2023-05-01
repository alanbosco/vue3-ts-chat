<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import ChatItem from '@/components/chat/ChatItem.vue'
import ConnectionStatus from '@/components/chat/ConnectionStatus.vue'
import ConnectionManager from '@/components/chat/ConnectionManager.vue'
import ChatInput from '@/components/chat/ChatInput.vue'
import ChatArea from '@/components/chat/ChatArea.vue'

import { state, join } from '@/socket'

const route = useRoute()
let username = route.query.username as string

const chatsData = [
  {
    message: 'Send me a message',
    sender: 'John',
    time: '20:10',
    id: 1
  }
]

watch(
  () => state.connected,
  (connected) => {
    if (connected) {
      join(username)
    } else {
      console.log('disconnected')
    }
  }
)
</script>

<template>
  <main class="px-4 mx-auto">
    <div class="grid grid-cols-5 gap-4 min-h-screen max-h-screen">
      <div class="col-span-1 p-4">
        <div class="chat-list">
          <chat-item
            v-for="chat in chatsData"
            :key="chat.id"
            :message="chat.message"
            :sender="chat.sender"
            :time="chat.time"
          />
        </div>
      </div>
      <div class="col-span-4 dark:bg-dark-bg-200 p-4 flex flex-col">
        <h5>Chat Details</h5>
        <div class="relative flex-1">
          <div class="chat-head flex justify-between items-center">
            <connection-status />
            <div>
              <connection-manager />
            </div>
          </div>
          <chat-area :messages="state.chats" />
          <chat-input class="absolute w-full bottom-0" />
        </div>
      </div>
    </div>
  </main>
</template>
