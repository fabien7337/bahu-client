<template>
  <div class="sidebar">
    <RoomList />
  </div>
  <div class="main main-visible">
    <Room :roomId="id" :key="id" />
  </div>
</template>

<script>
import RoomList from '@/components/room/RoomList.vue';
import Room from '@/components/room/Room.vue';

export default {
  props: ['id'],
  components: {
    RoomList,
    Room,
  },
};
</script>
