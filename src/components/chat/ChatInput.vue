<template>
  <!-- Nav Bottom -->
  <div class="room-footer">
    <form @submit.prevent="sendMessage" data-emoji-form="">
      <div class="border-top row ps-4 pe-4 g-0" style="min-height: 80px; max-height: 300px;">
        <div class="col-auto align-self-center">
          <a href="#" class="icon-lg dropzone-button-js">
            <i class="fal fa-paperclip"></i>
          </a>
        </div>
        <div class="col align-self-center ps-3 pe-4">
          <textarea id="chat-input" class="form-control" placeholder="Message" data-autosize="true" data-emoji-input="" rows="1" style="max-height: 300px;" v-model.trim="message" v-on:keypress="triggerMessageSend"></textarea>
        </div>
        <div class="col-auto align-self-center pe-4">
          <a class="icon-lg" data-emoji-btn="">
            <i class="fal fa-smile"></i>
          </a>
        </div>
        <div class="col-auto align-self-center">
          <button class="btn btn-primary rounded-circle" type="submit">
            <i class="fas fa-arrow-up"></i>
          </button>
        </div>
      </div>
    </form>
  </div>

  <div id="dropzone-template-js" class="d-none">
    <div class="col-lg-4 my-3">
      <div class="card bg-light">
        <div class="card-body p-3">
          <div class="media align-items-center">
            <div class="dropzone-file-preview">
              <div class="avatar avatar rounded bg-secondary text-basic-inverse d-flex align-items-center justify-content-center mr-3">
                <i class="fal fa-file"></i>
              </div>
            </div>
            <div class="dropzone-image-preview">
              <div class="avatar avatar mr-5">
                <img src="#" class="avatar-img rounded" data-dz-thumbnail="" alt="">
              </div>
            </div>
            <div class="media-body overflow-hidden">
              <h6 class="text-truncate small mb-0" data-dz-name></h6>
              <p class="extra-small mb-0" data-dz-size></p>
              <p class="extra-small" data-dz-uploadprogress></p>
            </div>
            <div class="ml-1">
              <a href="#" class="btn btn-sm btn-link text-decoration-none text-muted" data-dz-remove>
                <i class="fal fa-times"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import autosize from 'autosize'
import Dropzone from 'dropzone'
import { EmojiButton } from '@joeattardi/emoji-button'
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
      const previewsContainer = document.querySelector('.dropzone-previews-js')
      previewsContainer.innerHTML = ''
    },
  },
  created() {
    window.addEventListener('beforeunload', this.sendUserNotTyping)
  },
  mounted() {
    /* Autosize: Setup */
    autosize(document.getElementById('chat-input'))

    /* Dropzone: Setup */
    const el = document.querySelectorAll('.dropzone-form-js')[0]
    const clickable = document.querySelectorAll('.dropzone-button-js')[0]
    const previewsContainer = el.querySelector('.dropzone-previews-js')
    const template = document.querySelector('#dropzone-template-js')
    this.dropzone = new Dropzone(el, {
      url: 'https:dev.bahu.com/api/rooms/6022f29c921a143e16741311/file',
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

    /* EmojiButton */
    const form = document.querySelectorAll('[data-emoji-form]')[0]
    const button = form.querySelector('[data-emoji-btn]')
    const picker = new EmojiButton({
      position: 'top',
      zIndex: 1020,
    })
    picker.on('emoji', (emoji) => {
      this.message += emoji.emoji
    })
    button.addEventListener('click', () => {
      picker.togglePicker(button)
    })
  },
}
</script>
