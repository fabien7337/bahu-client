<template>
  <div class="navigation navbar navbar-light justify-content-center py-xl-7">
    <!-- Brand -->
    <router-link :to="{ name: 'Home' }" class="d-none d-xl-block mb-6">
      <img src="/logo.png" height="46" />
    </router-link>

    <!-- Menu -->
    <ul class="nav navbar-nav flex-row flex-xl-column flex-grow-1 justify-content-between justify-content-xl-center py-3 py-lg-0" role="tablist">

      <!-- Invisible item to center nav vertically -->
      <li class="nav-item d-none d-xl-block invisible flex-xl-grow-1">
        <a class="nav-link position-relative p-0 py-xl-3" href="#TODO" title="">
          <i class="icon-lg fe-x"></i>
        </a>
      </li>

      <!-- Create Room -->
      <li class="nav-item">
        <a class="nav-link position-relative p-0 py-xl-3" data-toggle="tab" href="#TODO" title="Create room" role="tab">
          <font-awesome-icon class="icon-lg" :icon="['fal', 'edit']" />
        </a>
      </li>

      <!-- Contacts -->
      <li class="nav-item mt-xl-9">
        <a class="nav-link position-relative p-0 py-xl-3" data-toggle="tab" href="#TODO" title="Contacts" role="tab">
          <font-awesome-icon class="icon-lg" :icon="['fal', 'user-friends']" />
        </a>
      </li>

      <!-- Rooms -->
      <li class="nav-item mt-xl-9">
        <router-link :to="{ name: 'Home' }" class="nav-link position-relative p-0 py-xl-3 active" data-toggle="tab" title="Rooms" role="tab">
          <font-awesome-icon class="icon-lg" :icon="['fal', 'comments']" />
          <div class="badge badge-dot badge-primary badge-bottom-center"></div>
        </router-link>
      </li>

      <!-- Profile -->
      <li class="nav-item mt-xl-9">
        <a class="nav-link position-relative p-0 py-xl-3" data-toggle="tab" href="#TODO" title="Profile" role="tab">
          <font-awesome-icon class="icon-lg" :icon="['fal', 'user']" />
        </a>
      </li>

      <!-- Apps -->
      <li class="nav-item mt-xl-9 d-none d-xl-block flex-xl-grow-1">
        <a class="nav-link position-relative p-0 py-xl-3" data-toggle="tab" href="#TODO" title="Apps" role="tab">
          <font-awesome-icon class="icon-lg" :icon="['fal', 'layer-group']" />
        </a>
      </li>

      <!-- Settings -->
      <li class="nav-item mt-xl-9">
        <a class="nav-link position-relative p-0 py-xl-3" href="#TODO" title="Settings">
          <font-awesome-icon class="icon-lg" :icon="['fal', 'cog']" />
        </a>
      </li>

    </ul>
    <!-- Menu -->
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  components: {
    FontAwesomeIcon,
  },
};
</script>
