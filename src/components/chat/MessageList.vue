<template>
  <div class="room-content hide-scrollbar bg-blue p-3 ps-4 pe-4" ref="messages">
    <div v-for="(message, index) in messages" :key="index">

      <!-- Message -->
      <div class="message mb-3 context-menu" data-type="message" data-id="1" v-if="user.id !== message.userId">
        <div class="row">
          <div class="col-auto" v-if="getmembersLength > 2">
            <!-- Avatar -->
            <a class="avatar avatar-sm" href="#TODO">
              <img :src="getmembers[message.userId]['avatar']" alt="..." class="avatar-img rounded-circle" width="40">
            </a>
          </div>
          <div class="col g-0 pe-3">
            <!-- Body -->
            <div class="message-body clearfix">
              <h5 class="message-title" v-if="getmembersLength > 2">{{ getmembers[message.userId]['username']  }}</h5>
              <!-- Text -->
              <div class="message-text" v-if="message.kind === 'text'" v-html="formatMessageContent(message.content)"></div>
              <div v-if="message.kind === 'files'">
                <div class="form-row py-3">
                  <div v-for="(file, index) in message.files" :key="index" class="col">
                    <img class="img-fluid rounded" :src="file.url" data-action="zoom" alt="{{ file.name }}" style="max-height: 400px;">
                  </div>
                </div>
              </div>
              <time class="message-time float-end">{{ formatTime(message.createdAt) }}</time>
            </div>
          </div>
        </div>
      </div>

      <!-- Message -->
      <div class="message message-right mb-3 d-flex align-items-center justify-content-end" v-else>
        <div class="message-body clearfix">
          <div class="message-text" v-html="formatMessageContent(message.content)"></div>
          <div class="message-sent float-end"></div>
          <time class="message-time float-end pe-1">{{ formatTime(message.createdAt)  }}</time>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import anchorme from 'anchorme'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  props: ['members', 'messages'],
  components: {
  },
  computed: {
    ...mapGetters(['getSocket']),
    getmembers() {
      const members = {}
      this.members.forEach((member) => {
        members[member.id] = {
          avatar: member.avatar,
          username: member.username,
        }
      })
      return members
    },
    getmembersLength() {
      return this.members.length
    },
  },
  data() {
    return {
      user: this.$store.state.user,
    }
  },
  methods: {
    formatMessageContent(messageContent) {
      return anchorme({
        input: messageContent,
        options: {
          attributes: {
            target: '_blank',
          },
        },
      })
    },
    formatTime(date) {
      return moment(date).format('LT')
    },
    scrollMessages() {
      const container = this.$refs.messages
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    },
  },
  mounted() {
    this.scrollMessages()

    this.getSocket.on('connect', () => {
      this.getSocket.emit('identify', this.user.token)
    })
  },
  updated() {
    this.scrollMessages()
  },
}
</script>
