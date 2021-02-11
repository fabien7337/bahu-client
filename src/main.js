import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowUp,
  faSearch,
  faEllipsisV,
} from '@fortawesome/pro-regular-svg-icons';
import {
  faCheck,
  faClock,
  faEdit,
  faComments,
  faUserFriends,
  faUser,
  faLayerGroup,
  faCog,
} from '@fortawesome/pro-light-svg-icons';
import io from 'socket.io-client';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

/** Socket IO Client - Store in Vuex State for use in components */
const socket = io('https://dev.bahu.com');
store.dispatch('assignSocket', socket);

library.add(faArrowUp, faSearch, faEllipsisV, faCheck, faClock, faEdit, faComments, faUserFriends, faUser, faLayerGroup, faCog);

createApp(App).use(store).use(router).mount('#app');
