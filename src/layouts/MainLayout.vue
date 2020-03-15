<template>
  <div>
    <header>
      <nav-bar/>
    </header>

    <notifications group="errors" position="bottom right"/>
    <notifications group="success" position="bottom right"/>

    <main>
      <div class="container">
        <router-view/>
      </div>
    </main>

    <footer>
      <Modal
        modalId="loginModal"
        modalTitle="Login"
        :isNeedToClose="isNeedToCloseLoginModal"
      >
        <login-form
          :hasModal="loginFormHasModal"
          @closeModal="closeLoginModal"
        />
      </Modal>

      <Modal
        modalId="registerModal"
        modalTitle="Registration"
        :isNeedToClose="isNeedToCloseRegisterModal"
      >
        <register-form
          :hasModal="registerFormHasModal"
          @closeModal="closeRegisterModal"
        />
      </Modal>
    </footer>
  </div>
</template>

<script>
  import NavBar from '@/components/app/NavBar'
  import Modal from '@/components/app/Modal'
  import RegisterForm from '@/components/RegisterForm'
  import LoginForm from '@/components/LoginForm'

  export default {
    data() {
      return {
        loginFormHasModal: true,
        registerFormHasModal: true,
        isNeedToCloseLoginModal: false,
        isNeedToCloseRegisterModal: false,
      }
    },
    methods: {
      closeLoginModal() {
        this.isNeedToCloseLoginModal = true
      },
      closeRegisterModal() {
        this.isNeedToCloseRegisterModal = true;
      }
    },
    computed: {
      error() {
        return this.$store.getters.error
      },
      success() {
        return this.$store.getters.success
      },
    },
    watch: {
      error(message) {
        this.$notify({ group: 'errors', type: 'error', title: 'Error!', text: message })
      },
      success(message) {
        this.$notify({ group: 'success', type: 'success', title: 'Success!', text: message })
      }
    },
    components: {
      NavBar,
      Modal,
      RegisterForm,
      LoginForm
    }
  }
</script>
