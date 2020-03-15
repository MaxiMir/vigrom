<template>
  <div>
    <form @submit.prevent="submitForm" :class="{'d-none': !showForm}">
      <div class="form-group">
        <div class="form-group">
          <textarea
            class="form-control"
            placeholder="I think ..."
            rows="3"
            v-model.trim="userComment"
            ref="textAreaElem"
            :class="{
              'is-valid': $v.userComment.required && $v.userComment.minLength,
              'is-invalid': $v.userComment.$dirty && (!$v.userComment.minLength || !$v.userComment.required)
            }"
          ></textarea>
        </div>
      </div>

      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-primary" :disabled="isSendFormData">
          <span
            class="spinner-grow spinner-grow-sm"
            role="status" aria-hidden="true"
            v-if="isSendFormData"
          >
          </span>
          Add Comment
        </button>
      </div>
    </form>

    <button type="button" class="btn mt-3 mb-3" @click="toggleBtnHandler" :class="btnClass">
      {{ btnName }}
    </button>
  </div>

</template>

<script>
  import { minLength, required } from 'vuelidate/lib/validators'
  import FormMixin from '@/mixins/Form.mixin'

  export default {
    props: {
      userName: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        userComment: '',
        isSendFormData: false,
        showForm: false
      }
    },
    validations: {
      userComment: { minLength: minLength(10), required },
    },
    computed: {
      btnName() {
        return this.showForm ? 'Hide Form' : 'Add Comment'
      },
      btnClass() {
        return this.showForm ? 'btn-light' : 'btn-primary'
      }
    },
    mixins: [FormMixin],
    methods: {
      toggleBtnHandler() {
        this.showForm = !this.showForm
      },
      async submitForm() {
        const formData = {
          userName: this.userName,
          userComment: this.userComment,
        }

        await this.sendFormData('addComment', formData)
        this.commentAddHandler(formData)
      },
      commentAddHandler(formData) {
        this.$emit('commentAdd', formData)
        this.showForm = false
        this.$v.$reset()
      }
    }
  }
</script>
