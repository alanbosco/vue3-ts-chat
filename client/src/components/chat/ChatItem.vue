<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'

interface Props {
  message: string
  sender: string
  time: string
}

withDefaults(defineProps<Props>(), {
  message: '',
  sender: '',
  time: ''
})
</script>

<template>
  <div class="chat-item">
    <div class="chat-item__sender">
      {{ sender }}
    </div>
    <div class="chat-item__message">
      {{ message }}
    </div>
    <div class="chat-item__time">
      {{ time }}
    </div>
  </div>
</template>
