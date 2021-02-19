<template>
  <div class="chat dropzone-form-js">
    <div class="chat-body">
      <!-- Chat: Header -->
      <div class="chat-header border-bottom py-4 py-lg-6 px-lg-8">
        <div class="container-xxl">
          <div class="row align-items-center">
            <!-- Close chat(mobile) -->
            <div class="col-3 d-xl-none">
              <ul class="list-inline mb-0">
                <li class="list-inline-item">
                  <router-link :to="{ name: 'Home' }" class="text-muted px-0" data-chat="open">
                    <font-awesome-icon class="icon-md" :icon="['fal', 'chevron-left']" />
                  </router-link>
                </li>
              </ul>
            </div>

            <!-- Chat photo -->
            <div class="col-6 col-xl-6">
              <div class="media text-center text-xl-left" v-if="room">
                <div class="avatar avatar-sm avatar-online d-none d-lg-inline-block mr-5">
                  <img :src="room.avatar" class="avatar-img" alt="">
                </div>
                <div class="media-body align-self-center text-truncate">
                  <h6 class="text-trunctate mb-n1">{{ room.name }}</h6>
                  <span class="badge badge-dot badge-success d-inline-block d-xl-none mr-1"></span>
                  <small class="text-muted" v-html="roomStatus"></small>
                </div>
              </div>
            </div>

            <!-- Chat toolbar -->
            <div class="col-3 col-xl-6 text-right">
              <ul class="nav justify-content-end">
                <li class="nav-item list-inline-item d-none d-xl-block mr-3">
                  <a class="nav-link text-muted px-3" data-toggle="collapse" data-target="#chat-2-search" href="#" title="Search this chat">
                    <font-awesome-icon class="icon-md" :icon="['far', 'search']" />
                  </a>
                </li>
                <li class="nav-item list-inline-item d-none d-xl-block mr-0">
                  <a class="nav-link text-muted px-3" href="#" data-chat-sidebar-toggle="#chat-2-info" title="Details">
                    <font-awesome-icon class="icon-md" :icon="['far', 'ellipsis-v']" />
                  </a>
                </li>

                <!-- Mobile nav -->
                <li class="nav-item list-inline-item d-block d-xl-none">
                  <div class="dropdown">
                    <a class="nav-link text-muted px-0" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <font-awesome-icon class="icon-md" :icon="['far', 'ellipsis-v']" />
                    </a>
                    <div class="dropdown-menu">
                      <a class="dropdown-item d-flex align-items-center" data-toggle="collapse" data-target="#chat-2-search" href="#">
                        Search <span class="ml-auto pl-5 fe-search"></span>
                      </a>
                      <a class="dropdown-item d-flex align-items-center" href="#" data-chat-sidebar-toggle="#chat-2-info">
                        Chat Info <span class="ml-auto pl-5 fe-more-horizontal"></span>
                      </a>
                    </div>
                  </div>
                </li>
                <!-- Mobile nav -->
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- Chat: Header -->

      <MessageList :members="members" :messages="messages" />

      <div class="chat-files hide-scrollbar px-lg-8">
        <div class="container-xxl">
          <div class="dropzone-previews-js form-row py-4"></div>
        </div>
      </div>

      <ChatInput :roomId="roomId" />
    </div>
  </div>
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
