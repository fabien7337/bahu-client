<template>
  <div class="tab-content h-100" role="tablist">
    <div class="tab-pane fade h-100 show active" id="tab-content-dialogs" role="tabpanel">
      <div class="d-flex flex-column h-100">
        <div class="hide-scrollbar">
          <div class="container-fluid py-6">
            <!-- Title -->
            <router-link :to="{ name: 'Home' }">
              <h2 class="font-bold mb-6">Bahu</h2>
            </router-link>
            <!-- Title -->
            <!-- Search -->
            <form class="mb-6">
              <div class="input-group">
                <input type="text" class="form-control form-control-lg" placeholder="Search for messages or users..." aria-label="Search for messages or users...">
                <div class="input-group-append">
                  <button class="btn btn-lg btn-ico btn-secondary btn-minimal" type="submit">
                    <font-awesome-icon class="icon-md" :icon="['far', 'search']" />
                  </button>
                </div>
              </div>
            </form>
            <!-- Search -->
            <!-- Chats -->
            <nav class="nav d-block list-discussions-js mb-n6" v-for="(room, index) in rooms" :key="index">
              <!-- Chat link -->
              <router-link :to="{ name: 'Room', params: { id: room.id } }" class="text-reset nav-link p-0 mb-6">
                <div class="card card-active-listener">
                  <div class="card-body">
                    <div class="media">
                      <div class="avatar mr-5">
                        <img class="avatar-img" :src="room.avatar" alt="Bootstrap Themes">
                      </div>
                      <div class="media-body overflow-hidden">
                        <div class="d-flex align-items-center mb-1">
                          <h6 class="text-truncate mb-0 mr-auto">{{ room.name }}</h6>
                          <p class="small text-muted text-nowrap ml-4">{{ formatTime(room.lastMessageSentAt) }}</p>
                        </div>
                        <div class="text-truncate">{{ room.status }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </router-link>
              <!-- Chat link -->
            </nav>
            <!-- Chats -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import RoomService from '@/services/RoomService';
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      rooms: null,
    };
  },
  components: {
    FontAwesomeIcon,
  },
  computed: {
    ...mapGetters(['getSocket']),
  },
  methods: {
    formatTime(date) {
      if (moment(date) >= moment().subtract(1, 'days')) {
        return moment(date).format('LT');
      }
      if (moment(date) >= moment().subtract(7, 'days')) {
        return moment(date).format('ddd');
      }
      return moment(date).format('L');
    },
  },
  async created() {
    const response = await RoomService.getRooms();
    const rooms = [];
    response.data.forEach((room) => {
      rooms.push({
        id: room.id,
        avatar: room.avatar,
        name: room.name,
        lastMessageSentAt: room.lastMessageSentAt,
        lastMessageContent: room.lastMessageContent,
        status: room.lastMessageContent,
      });
    });
    this.rooms = rooms;
  },
  mounted() {
    this.getSocket.on('NewMessage', (message) => {
      const room = this.rooms.find((item) => message.roomId === item.id);
      room.lastMessageSentAt = message.createdAt;
      room.lastMessageContent = message.content;
      room.status = message.content;
    });
  },
};
</script>
