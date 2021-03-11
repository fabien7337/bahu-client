<template>
  <!-- Nav Bottom -->
  <div class="room-footer">
    <form data-emoji-form="">
      <div class="border-top row ps-4 pe-4 g-0" style="min-height: 80px; max-height: 300px;">
        <div class="col-auto align-self-center">
          <a href="#" class="icon-lg">
            <i class="fal fa-paperclip"></i>
          </a>
        </div>
        <div class="col align-self-center ps-3 pe-4">
          <textarea id="chat-input" type="text" class="form-control" placeholder="Message" data-autosize="true" data-emoji-input="" rows="1" style="max-height: 300px;" v-model.trim="message" v-on:keypress="triggerMessageSend"></textarea>
        </div>
        <div class="col-auto align-self-center pe-4">
          <a class="icon-lg" data-emoji-btn="">
            <i class="fal fa-smile"></i>
          </a>
        </div>
        <div class="col-auto align-self-center">
          <button class="btn btn-primary rounded-circle">
            <i class="fas fa-arrow-up"></i>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import autosize from 'autosize'
import Dropzone from 'dropzone'
import { ulid } from 'ulid'
import { mapGetters } from 'vuex'

Dropzone.autoDiscover = false

export default {
  props: ['roomId'],
  computed: {
    ...mapGetters(['getCurrentUser', 'getSocket']),
  },
  data() {
    return {
      typingTimeout: null,
      message: '',
      fileIds: [],
    }
  },
  methods: {
    sendUserTyping() {
      clearTimeout(this.typingTimeout)
      this.typingTimeout = setTimeout(this.sendUserNotTyping, 1000)

      this.getSocket.emit('UserTyping', {
        roomId: this.roomId,
        username: this.getCurrentUser.username,
      })
    },
    sendUserNotTyping() {
      this.getSocket.emit('RemoveUserTyping', {
        roomId: this.roomId,
        username: this.getCurrentUser.username,
      })
    },
    triggerMessageSend(e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault()
        this.sendMessage()
      } else {
        this.sendUserTyping()
      }
    },
    sendMessage() {
      this.sendUserNotTyping()

      let kind = 'text'
      if (this.fileIds.length > 0) {
        kind = 'files'
      }
      this.getSocket.emit('NewMessage', {
        clientId: ulid(),
        roomId: this.roomId,
        content: this.message,
        kind,
        fileIds: this.fileIds,
      })
      this.message = ''
      this.fileIds = []

      /* Autosize: Update after sendMessage() */
      document.getElementById('chat-input').value = ''
      autosize.update(document.getElementById('chat-input'))

      /* Dropzone Reset */
      if (false) {
        const previewsContainer = document.querySelector('.dropzone-previews-js')
        previewsContainer.innerHTML = ''
      }
    },
  },
  created() {
    window.addEventListener('beforeunload', this.sendUserNotTyping)
  },
  mounted() {
    /* Autosize: Setup */
    autosize(document.getElementById('chat-input'))

    /* Dropzone: Setup */
    if (false) {
      const el = document.querySelectorAll('.dropzone-form-js')[0]
      const clickable = document.querySelectorAll('.dropzone-button-js')[0]
      const previewsContainer = el.querySelector('.dropzone-previews-js')
      const template = document.querySelector('#dropzone-template-js')
      this.dropzone = new Dropzone(el, {
        url: 'https://dev.bahu.com/api/rooms/6022f29c921a143e16741311/file',
        headers: {
          Authorization: `Bearer ${this.getCurrentUser.token}`,
        },
        clickable,
        previewsContainer,
        previewTemplate: template.innerHTML,
      })
      this.dropzone.on('uploadprogress', (file, progress) => {
        if (file.previewElement) {
          const progressElement = file.previewElement.querySelector('[data-dz-uploadprogress]')
          progressElement.style.width = '100px'
          if (progress < 100) {
            progressElement.textContent = `Uploading ${parseInt(progress, 10)}%`
          } else {
            progressElement.textContent = 'Ready to send'
          }
        }
      })
      this.dropzone.on('success', (file, response) => {
        this.fileIds.push(response)
      })
    }
  },
}
</script>
