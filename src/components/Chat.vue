<template>
  <div class="chat">
    <div class="chat-body">
      <!-- Chat: Header -->
      <div class="chat-header border-bottom py-4 py-lg-6 px-lg-8">
        <div class="container-xxl">
          <div class="row align-items-center">
            <!-- Close chat(mobile) -->
            <div class="col-3 d-xl-none">
              <ul class="list-inline mb-0">
                <li class="list-inline-item">
                  <a class="text-muted px-0" href="#" data-chat="open">
                    <i class="icon-md fe-chevron-left"></i>
                  </a>
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
                  <small class="text-muted">Online</small>
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
                      <i class="icon-md fe-more-vertical"></i>
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

      <!-- Chat: Content-->
      <div class="chat-content px-lg-8" ref="messages">
        <div class="container-xxl py-6 py-lg-10" v-if="messages">
          <div v-for="(message, index) in messages" :key="index">
            <!-- Message -->
            <div class="message mt-2" v-if="user.id !== message.userId">
              <!-- Message: body -->
              <div class="message-body">
                <!-- Message: row -->
                <div class="message-row">
                  <div class="d-flex align-items-center">
                    <!-- Message: content -->
                    <div class="message-content bg-light">
                      <div>{{ message.content }}</div>
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
      <!-- Chat: Content-->

      <!-- Chat: Footer -->
      <div class="chat-footer border-top py-4 py-lg-6 px-lg-8">
        <div class="container-xxl">
          <form id="chat-id-2-form" @submit.prevent="sendMessage" data-emoji-form="">
            <div class="form-row align-items-center">
              <div class="col">
                <div class="input-group">
                  <!-- Textarea -->
                  <textarea id="chat-id-2-input" v-model="message" @keydown.enter.exact.prevent="sendMessage" class="form-control bg-transparent border-0" placeholder="Type your message..." rows="1" data-emoji-input="" style="overflow: hidden; resize: none; height: 46px;">
                  </textarea>
                  <!-- Emoji button -->
                  <div class="input-group-append">
                    <button class="btn btn-ico btn-secondary btn-minimal bg-transparent border-0" type="button" data-emoji-btn="">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-smile injected-svg">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                        <line x1="9" y1="9" x2="9.01" y2="9"></line>
                        <line x1="15" y1="9" x2="15.01" y2="9"></line>
                      </svg>
                    </button>
                  </div>
                  <!-- Upload button -->
                  <div class="input-group-append">
                    <button id="chat-upload-btn-2" class="btn btn-ico btn-secondary btn-minimal bg-transparent border-0 dropzone-button-js dz-clickable" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-paperclip injected-svg">
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <!-- Submit button -->
              <div class="col-auto">
                <button class="btn btn-ico btn-primary rounded-circle" type="submit">
                  <font-awesome-icon :icon="['far', 'arrow-up']" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <!-- Chat: Footer -->

    </div>
  </div>
</template>

<script>
import RoomService from '@/services/RoomService';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { mapGetters } from 'vuex';

export default {
  props: ['id'],
  data() {
    return {
      room: null,
      message: '',
      messages: null,
      user: this.$store.state.user,
    };
  },
  components: {
    FontAwesomeIcon,
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();

      this.getSocket.emit('NewMessage', {
        roomId: this.room.id,
        content: this.message,
        kind: 'text',
      });
      this.message = '';
    },
    scrollMessages() {
      const container = this.$refs.messages;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    },
  },
  computed: {
    ...mapGetters(['getSocket']),
  },
  async created() {
    const response = await RoomService.getRoom(this.id);
    this.room = response.data;

    const response2 = await RoomService.getMessages(this.id);
    this.messages = response2.data.reverse();
  },
  mounted() {
    this.scrollMessages();

    this.getSocket.on('NewMessage', (message) => {
      if (message.roomId === this.room.id) {
        this.messages = [...this.messages, message];
      }
    });

    this.getSocket.on('connect', () => {
      this.getSocket.emit('identify', this.user.token);
    });
  },
  updated() {
    this.scrollMessages();
  },
};
</script>
