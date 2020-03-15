<template>
  <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
    <h5 class="my-0 mr-md-auto font-weight-normal">Vue Blog</h5>
    <nav class="my-2 my-md-0 mr-md-3">
      <router-link
        v-for="link in links"
        :key="link.href"
        :to="link.href"
        class="p-2 text-dark"
        active-class="link--active"
        exact
      >
        {{ link.name }}
      </router-link>
    </nav>
    <div v-if="isAuthUser">
      <div class="btn-group">
        <button type="button" class="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false">
          {{ userName }}
        </button>
        <div class="dropdown-menu dropdown-menu-right">
          <button class="dropdown-item" type="button" @click="logoutHandler">Logout</button>
        </div>
      </div>
    </div>
    <div v-else>
      <button type="button" class="btn btn-outline-primary mr-2" data-toggle="modal" data-target="#loginModal">
        Login
      </button>
      <button type="button" class="btn btn-outline-success" data-toggle="modal" data-target="#registerModal">
        Register
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        links: [
          { href: '/', name: 'Main', iconClass: 'el-icon-s-home' },
          { href: '/article', name: 'Article', iconClass: 'el-icon-chat-line-round' },
        ]
      }
    },
    computed: {
      isAuthUser() {
        return this.$store.getters.isAuthenticated
      },
      userName() {
        return this.$store.getters.user.name
      },
    },
    methods: {
      logoutHandler() {
        return this.$store.dispatch('logout')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .link {
    &--active {
      cursor: not-allowed;
      opacity: 0.5;
      display: inline-block;
      pointer-events: none;
      text-decoration: none;
    }
  }
</style>
