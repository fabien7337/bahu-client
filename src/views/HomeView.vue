<template>
  <Navigation />
  <div class="sidebar d-block">
    <RoomList />
  </div>
  <div class="main main-visible d-none d-sm-block">
    TODO: Select a room?
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
