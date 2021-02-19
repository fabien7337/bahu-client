import axios from 'axios'

export default {
  getRooms() {
    return axios.get('https://dev.bahu.com/api/rooms')
  },
  getRoom(id) {
    return axios.get(`https://dev.bahu.com/api/rooms/${id}`)
  },
  getMessages(id) {
    return axios.get(`https://dev.bahu.com/api/rooms/${id}/messages`)
  },
}
