<template>
  <!-- Nav Bottom -->
  <div class="room-list-footer">
    <div class="border-top d-flex justify-content-evenly" style="height: 80px;">
      <div class="align-self-center">
        <a href="#TODO" class="icon-lg">
          <font-awesome-icon :icon="['fas', 'layer-group']" />
        </a>
      </div>
      <div class="align-self-center">
        <router-link :to="{ name: 'Home'  }" class="icon-lg active">
          <font-awesome-icon :icon="['fas', 'comments']" />
        </router-link>
      </div>
      <div class="align-self-center">
        <a href="#TODO" class="icon-lg">
          <font-awesome-icon :icon="['fas', 'user']" />
        </a>
      </div>
      <div class="align-self-center">
        <a href="#TODO" class="icon-lg">
          <font-awesome-icon :icon="['fas', 'cog']" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  components: {
    FontAwesomeIcon,
  },
}
</script>
