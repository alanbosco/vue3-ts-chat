<template>
  <button @click="connect()">Connect</button>
  <button class="ml-2 btn-danger" @click="disconnect()">Disconnect</button>
</template>

<script>
import { socket } from '@/socket'

export default {
  name: 'ConnectionManager',

  methods: {
    connect() {
      socket.connect()
    },
    disconnect() {
      socket.disconnect()
    }
  }
}
</script>
