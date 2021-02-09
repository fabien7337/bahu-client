<template>
  <div class="sidebar">
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
                            <p class="small text-muted text-nowrap ml-4">10:42 am</p>
                          </div>
                          <div class="text-truncate">{{ room.lastMessageContent }}</div>
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
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import RoomService from '@/services/RoomService';

export default {
  data() {
    return {
      rooms: null,
    };
  },
  components: {
    FontAwesomeIcon,
  },
  async created() {
    const response = await RoomService.getRooms();
    this.rooms = response.data;
  },
};
</script>
