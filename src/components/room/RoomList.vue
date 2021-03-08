<template>
  <!-- Nav Top -->
  <div class="room-list-header" >
    <div class="p-3 d-flex justify-content-between border-bottom" style="height: 66px;">
      <form class="search">
        <div class="input-group">
          <span class="input-group-text fe fe-search"></span>
          <input type="search" class="form-control" placeholder="Search" />
        </div>
      </form>
      <div class="icon-new-message">
      </div>
    </div>
  </div>
  <div class="room-list-content hide-scrollbar">
    <div class="list-group list-group-flush" v-for="(room, index) in rooms" :key="index">
      <!-- Chat -->
      <router-link :to="{ name: 'Room', params: { id: room.id } }" class="list-group-item p-3">
        <div class="row align-items-center">
          <div class="col-auto">
            <a href="#TODO" class="avatar avatar-lg">
              <img :src="room.avatar" alt="..." class="avatar-img rounded-circle" width="64">
            </a>
          </div>
          <div class="col ms-n3">
            <div class="d-flex align-items-center mb-1">
              <h4 class="text-truncate mb-0 me-auto">{{ room.name }}</h4>
              <p class="mb-0 small text-muted text-nowrap ml-4">{{ formatTime(room.lastMessageSentAt)  }}</p>
            </div>
            <p class="small text-muted mb-1">{{ room.status }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import RoomService from '@/services/RoomService'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      rooms: null,
    }
  },
  computed: {
    ...mapGetters(['getSocket']),
  },
  methods: {
    formatTime(date) {
      if (moment(date) >= moment().subtract(1, 'days')) {
        return moment(date).format('LT')
      }
      if (moment(date) >= moment().subtract(7, 'days')) {
        return moment(date).format('ddd')
      }
      return moment(date).format('L')
    },
  },
  async created() {
    const response = await RoomService.getRooms()
    const rooms = []
    response.data.forEach((room) => {
      rooms.push({
        id: room.id,
        avatar: room.avatar,
        name: room.name,
        lastMessageSentAt: room.lastMessageSentAt,
        lastMessageContent: room.lastMessageContent,
        status: room.lastMessageContent,
      })
    })
    this.rooms = rooms
  },
  mounted() {
    this.getSocket.on('NewMessage', (message) => {
      const room = this.rooms.find((item) => message.roomId === item.id)
      room.lastMessageSentAt = message.createdAt
      room.lastMessageContent = message.content
      room.status = message.content
    })
  },
}
</script>
