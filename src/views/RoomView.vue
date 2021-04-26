<template>
  <div class="row g-0">
    <div class="room-list col-lg-3">
      <RoomList />
      <Navigation />
    </div>

    <!-- Room -->
    <Room :roomId="id" :key="id" />
  </div>
</template>

<script>
import Navigation from '@/components/layout/Navigation.vue'
import RoomList from '@/components/room/RoomList.vue'
import Room from '@/components/room/Room.vue'

export default {
  props: ['id'],
  components: {
    Navigation,
    RoomList,
    Room,
  },
}
</script>
