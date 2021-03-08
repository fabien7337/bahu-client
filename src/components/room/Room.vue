<template>
  <!-- Nav Top -->
  <div class="room-header">
    <div class="row align-items-center ps-4 border-bottom" style="height: 66px;">
      <div class="col-auto">
        <!-- Avatar -->
        <a href="#" class="avatar">
          <img :src="room.avatar" alt="..." class="avatar-img rounded-circle" width="48">
        </a>
      </div>
      <div class="col g-0">
        <!-- Title -->
        <h4 class="mb-1 bold">{{ room.name }}</h4>
        <!-- Time -->
        <p class="card-text small text-muted" v-html="roomStatus"></p>
      </div>
      <div class="col-auto me-4">
        <!-- Dropdown -->
        <div class="dropdown">
          <a class="dropdown-ellipses dropdown-toggle icon-lg" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <font-awesome-icon :icon="['fal', 'ellipsis-h']"/>
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <a href="#" class="dropdown-item">
              <font-awesome-icon :icon="['fal', 'edit']"/>Edit
            </a>
            <a href="#" class="dropdown-item">
              <font-awesome-icon :icon="['fal', 'archive']"/>Archive
            </a>
            <a href="#" class="dropdown-item ">
              <font-awesome-icon :icon="['fal', 'trash-alt']"/>Delete chat
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <MessageList :members="members" :messages="messages" />

  <ChatInput :roomId="roomId" />
</template>

<script>
import ChatInput from '@/components/chat/ChatInput.vue'
import MessageList from '@/components/chat/MessageList.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import RoomService from '@/services/RoomService'
import { mapGetters } from 'vuex'

export default {
  props: ['roomId'],
  components: {
    ChatInput,
    FontAwesomeIcon,
    MessageList,
  },
  computed: {
    ...mapGetters(['getCurrentUser', 'getSocket']),
  },
  data() {
    return {
      messages: [],
      members: [],
      room: null,
      roomStatus: null,
    }
  },
  async created() {
    const res1 = await RoomService.getRoom(this.roomId)
    this.room = res1.data
    this.roomStatus = `${this.room.members.length} members`
    this.members = this.room.members

    const res2 = await RoomService.getMessages(this.roomId)
    this.messages = res2.data.reverse()

    this.getSocket.on('NewMessage', (message) => {
      if (message.roomId === this.roomId) {
        if (message.kind === 'text') {
          this.messages = [...this.messages, message]
        }
        if (message.kind === 'files') {
          const message2 = message
          message2.content = 'TODO: DISPLAY FILES'
          this.messages = [...this.messages, message2]
        }
      }
    })

    this.getSocket.on('receivedUserTyping', (data) => {
      const usernames = data.usernames.filter((username) => username !== this.getCurrentUser.username)
      if (usernames.length === 1) {
        this.roomStatus = `${usernames[0]} is typing<span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>`
      } else if (usernames.length >= 2) {
        this.roomStatus = `${usernames.slice(0, usernames.length - 1).join(', ')} and ${usernames.slice(-1)} are typing<span class="typing-dots"><span>.</span><span>.</span><span>.</span></span>`
      } else {
        this.roomStatus = `${this.room.members.length} members`
      }
    })
  },
}
</script>
