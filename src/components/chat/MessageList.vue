<template>
  <div class="chat-content px-lg-8" ref="messages">
    <div class="container-xxl py-6 py-lg-10" v-if="messages">
      <div v-for="(message, index) in messages" :key="index">
        <!-- Message -->
        <div class="message mt-2" v-if="user.id !== message.userId">
          <a class="avatar avatar-sm mr-4 mr-lg-5" v-if="getmembersLength > 2">
            <img class="avatar-img" :src="getmembers[message.userId]['avatar']" alt="">
          </a>
          <!-- Message: body -->
          <div class="message-body">
            <!-- Message: row -->
            <div class="message-row">
              <div class="d-flex align-items-center">
                <!-- Message: content -->
                <div class="message-content bg-light">
                  <h6 class="mb-2" v-if="getmembersLength > 2">{{ getmembers[message.userId]['username'] }}</h6>
                  <div>{{ message.content }}</div>
                  <div class="mt-1">
                    <small class="opacity-65">{{ formatTime(message.createdAt) }}</small>
                  </div>
                </div>
                <!-- Message: content -->
              </div>
            </div>
            <!-- Message: row -->
          </div>
          <!-- Message: Body -->
        </div>
        <!-- Message -->

        <div class="message message-right mt-2" v-else>
          <!-- Message: body -->
          <div class="message-body">
            <!-- Message: row -->
            <div class="message-row">
              <div class="d-flex align-items-center justify-content-end">
                <!-- Message: content -->
                <div class="message-content bg-primary text-white">
                  <div>{{ message.content }}</div>
                  <div class="mt-1">
                    <small class="opacity-65">{{ formatTime(message.createdAt) }}</small>
                    <font-awesome-icon :icon="['fal', 'check']" class="ml-3" v-if="message.createdAt"/>
                  </div>
                </div>
                <!-- Message: content -->
              </div>
            </div>
            <!-- Message: row -->
          </div>
          <!-- Message: body -->
        </div>
      </div>
      <!-- Message -->
    </div>

    <!-- Scroll to end -->
    <div class="end-of-chat"></div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
  props: ['members', 'messages'],
  components: {
    FontAwesomeIcon,
  },
  computed: {
    ...mapGetters(['getSocket']),
    getmembers() {
      const members = {};
      this.members.forEach((member) => {
        members[member.id] = {
          avatar: member.avatar,
          username: member.username,
        };
      });
      return members;
    },
    getmembersLength() {
      return this.members.length;
    },
  },
  data() {
    return {
      user: this.$store.state.user,
    };
  },
  methods: {
    formatTime(date) {
      return moment(date).format('LT');
    },
    scrollMessages() {
      const container = this.$refs.messages;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    },
  },
  mounted() {
    this.scrollMessages();

    this.getSocket.on('connect', () => {
      this.getSocket.emit('identify', this.user.token);
    });
  },
  updated() {
    this.scrollMessages();
  },
};
</script>
