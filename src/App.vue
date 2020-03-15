<template>
  <div id="app">
    <MainLayout>
      <router-view/>
    </MainLayout>
  </div>
</template>

<script>
  import MainLayout from '@/layouts/MainLayout'

  export default {
    name: "App",
    components: {
      MainLayout
    },
    created() {
      this.$store.dispatch('autoLogin')
    },
  }
</script>


