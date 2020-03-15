export default {
  props: {
    hasModal: {
      type: Boolean,
      required: true
    },
    modalId: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      isSendFormData: false
    }
  },
  methods: {
    async sendFormData(action, formData) {
      let isSuccess = false;
      const isInvalidForm = this.$v.$invalid

      if (isInvalidForm) {
        this.$v.$touch()
        return isSuccess
      }

      this.isSendFormData = true

      try {
        await this.$store.dispatch(action, formData)
        this.$v.$reset()

        if (this.hasModal) {
          this.closeModal()
        }

        isSuccess = true
      } catch (e) {

      } finally {
        setTimeout(() => {
          this.isSendFormData = false
        }, 0)
      }

      return isSuccess
    },
    closeModal() {
      this.$emit('closeModal')
    }
  }
}
