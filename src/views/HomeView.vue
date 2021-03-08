<template>
  <div class="row g-0">
    <div class="room-list col-lg-3">
      <RoomList />
      <Navigation />
    </div>

    <!-- Room -->
    <div class="room col-lg-9 border-start">
      TODO: Select a room?
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/layout/Navigation.vue'
import RoomList from '@/components/room/RoomList.vue'

export default {
  components: {
    Navigation,
    RoomList,
  },
}
</script>
