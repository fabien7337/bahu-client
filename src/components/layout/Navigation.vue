<template>
  <!-- Nav Bottom -->
  <div class="room-list-footer">
    <div class="border-top d-flex justify-content-evenly" style="height: 80px;">
      <div class="align-self-center">
        <a href="#TODO" class="icon-lg">
          <i class="fas fa-layer-group"></i>
        </a>
      </div>
      <div class="align-self-center">
        <router-link :to="{ name: 'Home'  }" class="icon-lg active">
          <i class="fas fa-comments"></i>
        </router-link>
      </div>
      <div class="align-self-center">
        <a href="#TODO" class="icon-lg">
          <i class="fas fa-user"></i>
        </a>
      </div>
      <div class="align-self-center">
        <a href="#TODO" class="icon-lg">
          <i class="fas fa-cog"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>
