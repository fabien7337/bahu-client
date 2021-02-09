<template>
  <div class="sidebar">
    <Rooms />
  </div>
  <div class="main main-visible">
    <Chat :id="id" :key="id" />
  </div>
</template>

<script>
/* import Chat from '@/components/Chat.vue'; */
import Rooms from '@/components/Rooms.vue';
import Chat from '@/components/Chat.vue';

export default {
  props: ['id'],
  components: {
    Rooms,
    Chat,
  },
};
</script>
