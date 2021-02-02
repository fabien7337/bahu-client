<template>
  <div class="sidebar">
  </div>
  <div class="main main-visible">
    <Chat />
  </div>
</template>

<script>
import Chat from '../components/Chat.vue';

export default {
  components: {
    Chat,
  },
};
</script>
