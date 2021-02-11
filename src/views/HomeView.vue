<template>
  <Navigation />
  <div class="sidebar">
    <RoomList />
  </div>
  <div class="main main-visible">
  </div>
</template>

<script>
import Navigation from '@/components/layout/Navigation.vue';
import RoomList from '@/components/room/RoomList.vue';

export default {
  components: {
    Navigation,
    RoomList,
  },
};
</script>
