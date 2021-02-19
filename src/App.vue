<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  created() {
    const userString = localStorage.getItem('user')
    if (userString) {
      const userData = JSON.parse(userString)
      this.$store.commit('SET_USER_DATA', userData)
    } else {
      this.$router.push('/login')
    }
  },
}
</script>
