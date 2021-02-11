<template>
  <Navigation />
  <div class="sidebar">
    <RoomList />
  </div>
  <div class="main main-visible">
    <Room :roomId="id" :key="id" />
  </div>
</template>

<script>
import Navigation from '@/components/layout/Navigation.vue';
import RoomList from '@/components/room/RoomList.vue';
import Room from '@/components/room/Room.vue';

export default {
  props: ['id'],
  components: {
    Navigation,
    RoomList,
    Room,
  },
};
</script>
