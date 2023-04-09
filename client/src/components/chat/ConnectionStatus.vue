<template>
  <p
    class="px-2 py-1 bg-slate-700 rounded-lg text-sm"
    :class="{ 'text-green-600': connected, 'text-red-600': !connected }"
  >
    Connected: {{ connected }}
  </p>
</template>

<script>
import { state } from '@/socket'

export default {
  name: 'ConnectionState',

  computed: {
    connected() {
      return state.connected
    }
  }
}
</script>
