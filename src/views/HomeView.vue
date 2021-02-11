<template>
  <div class="sidebar">
    <RoomList />
  </div>
  <div class="main main-visible">
  </div>
</template>

<script>
import RoomList from '@/components/room/RoomList.vue';

export default {
  components: {
    RoomList,
  },
};
</script>
