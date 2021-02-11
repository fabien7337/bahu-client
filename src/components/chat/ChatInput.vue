<template>
  <div class="chat-footer border-top py-4 py-lg-6 px-lg-8">
    <div class="container-xxl">
      <form id="chat-id-2-form" @submit.prevent="sendMessage" data-emoji-form="">
        <div class="form-row align-items-center">
          <div class="col">
            <div class="input-group">
              <!-- Textarea -->
              <textarea id="chat-id-2-input" v-model.trim="message" v-on:keyup="triggerMessageSend" class="form-control bg-transparent border-0" placeholder="Type your message..." rows="1" data-emoji-input="" style="overflow: hidden; resize: none; height: 46px;">
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
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ulid } from 'ulid';
import { mapGetters } from 'vuex';

export default {
  props: ['roomId'],
  components: {
    FontAwesomeIcon,
  },
  computed: {
    ...mapGetters(['getCurrentUser', 'getSocket']),
  },
  data() {
    return {
      typingTimeout: null,
      message: '',
    };
  },
  methods: {
    sendUserTyping() {
      clearTimeout(this.typingTimeout);
      this.typingTimeout = setTimeout(this.sendUserNotTyping, 1000);

      this.getSocket.emit('UserTyping', {
        roomId: this.roomId,
        username: this.getCurrentUser.username,
      });
    },
    sendUserNotTyping() {
      this.getSocket.emit('RemoveUserTyping', {
        roomId: this.roomId,
        username: this.getCurrentUser.username,
      });
    },
    triggerMessageSend(e) {
      e.preventDefault();

      if (e.keyCode === 13 && !e.shiftKey) {
        this.sendMessage();
      } else {
        this.sendUserTyping();
      }
    },
    sendMessage() {
      this.sendUserNotTyping();
      this.getSocket.emit('NewMessage', {
        clientId: ulid(),
        roomId: this.roomId,
        content: this.message,
        kind: 'text',
      });
      this.message = '';
    },
  },
  created() {
    window.addEventListener('beforeunload', this.sendUserNotTyping);
  },
};
</script>
