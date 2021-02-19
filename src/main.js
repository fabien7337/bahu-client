import axios from 'axios'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowUp,
  faSearch,
  faEllipsisV,
} from '@fortawesome/pro-regular-svg-icons'
import {
  faCheck,
  faClock,
  faEdit,
  faComments,
  faUserFriends,
  faUser,
  faLayerGroup,
  faCog,
  faPaperclip,
  faTimes,
  faFile,
  faChevronLeft,
} from '@fortawesome/pro-light-svg-icons'
import io from 'socket.io-client'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/** BugSnag: Init */
Bugsnag.start({
  apiKey: '0d18b084756c4f3ed46cd1927a9fd2e0',
  plugins: [new BugsnagPluginVue()],
})

/** Socket IO Client - Store in Vuex State for use in components */
const socket = io('https://dev.bahu.com')
store.dispatch('assignSocket', socket)

/** Axios Response Intercept */
axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      localStorage.removeItem('user')
      router.push({
        name: 'Login',
        params: { message: 'Session has expired, please login again' },
      })
    }
  },
)

library.add(faArrowUp, faSearch, faEllipsisV, faCheck, faClock, faEdit, faComments, faUserFriends, faUser, faLayerGroup, faCog, faPaperclip, faTimes, faFile, faChevronLeft)

const bugsnagVue = Bugsnag.getPlugin('vue')
createApp(App)
  .use(bugsnagVue)
  .use(store).use(router)
  .mount('#app')
