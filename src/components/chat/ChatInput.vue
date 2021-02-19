<template>
  <div class="chat-footer border-top py-4 py-lg-6 px-lg-8">
    <div class="container-xxl">
      <form @submit.prevent="sendMessage" data-emoji-form="">
        <div class="form-row align-items-center">
          <div class="col">
            <div class="input-group">
              <!-- Textarea -->
              <textarea id="chat-input" v-model.trim="message" v-on:keypress="triggerMessageSend" class="form-control bg-transparent border-0" placeholder="Type your message..." rows="1" data-emoji-input="" data-autosize="true">
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
                <button id="chat-upload" class="btn btn-ico btn-secondary btn-minimal bg-transparent border-0 dropzone-button-js dz-clickable" type="button">
                  <font-awesome-icon :icon="['fal', 'paperclip']" />
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

  <div id="dropzone-template-js" class="d-none">
    <div class="col-lg-4 my-3">
      <div class="card bg-light">
        <div class="card-body p-3">
          <div class="media align-items-center">
            <div class="dropzone-file-preview">
              <div class="avatar avatar rounded bg-secondary text-basic-inverse d-flex align-items-center justify-content-center mr-3">
                <font-awesome-icon :icon="['fal', 'file']" />
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
                <font-awesome-icon :icon="['fal', 'times']" />
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ulid } from 'ulid'
import { mapGetters } from 'vuex'

Dropzone.autoDiscover = false

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
  },
}
</script>
