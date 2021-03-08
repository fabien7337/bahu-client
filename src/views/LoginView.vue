<template>
  <div class="container d-flex flex-column">
    <div class="row align-items-center justify-content-center no-gutters min-vh-100">
      <div class="col-12 col-md-5 col-xl-4 my-5">
        <h1 class="display-4 text-center mb-3">Log in</h1>
        <p class="text-muted text-center mb-5">Manage your account, check notifications, chat with friends, and more.</p>

        <!-- Form -->
        <form @submit.prevent="login">
          <!-- Email -->
          <div class="form-group">
            <label class="form-label" for="email">Email Address</label>
            <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter your email" value>
          </div>

          <!-- Password -->
          <div class="form-group">
            <div class="row">
              <div class="col">
                <label class="form-label" for="password">Password</label>
              </div>
              <div class="col-auto">
                <a href="#TODO" class="form-text small text-muted">Forgot password?</a>
              </div>
            </div>
            <input v-model="password" type="password" class="form-control" id="password" placeholder="Enter your password" value>
          </div>

          <!-- Submit -->
          <button class="btn btn-lg w-100 btn-primary mb-3" type="submit">Log in</button>
        </form>

        <!-- Text -->
        <p class="text-center">
          <small class="text-muted text-center">
            Don't have an account yet? <a href="#TODO">Sign up</a>.
          </small>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async login() {
      await this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      })
      this.$router.push('/')
    },
  },
}
</script>
