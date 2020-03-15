<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <label for="inputLLogin">Login</label>
      <input
        type="text"
        class="form-control"
        id="inputLLogin"
        v-model.trim="userLogin"
        :class="{
            'is-valid': $v.userLogin.required && $v.userLogin.minLength,
            'is-invalid': $v.userLogin.$dirty && (!$v.userLogin.minLength || !$v.userLogin.required)
          }"
      >
      <span class="invalid-feedback" v-if="$v.userLogin.$dirty && (!$v.userLogin.minLength || !$v.userLogin.required)">
        Required Field. Minimum length is {{ $v.userLogin.$params.minLength.min }}
      </span>
    </div>
    <div class="form-group">
      <label for="inputLPassword">Password</label>
      <input
        type="password"
        class="form-control"
        id="inputLPassword"
        v-model.trim="userPassword"
        :class="{
            'is-valid': $v.userPassword.required && $v.userPassword.minLength,
            'is-invalid': $v.userPassword.$dirty && (!$v.userPassword.minLength || !$v.userPassword.required)
          }"
      >
      <span class="invalid-feedback" v-if="$v.userPassword.$dirty && (!$v.userPassword.minLength || !$v.userPassword.required)">
        Required Field. Minimum length is {{ $v.userPassword.$params.minLength.min }}
      </span>
    </div>
    <div class="d-flex justify-content-center">
      <button type="submit" class="btn btn-primary" :disabled="isSendFormData">
          <span
            class="spinner-grow spinner-grow-sm"
            role="status" aria-hidden="true"
            v-if="isSendFormData"
          >
          </span>
          Enter
      </button>
    </div>
  </form>
</template>

<script>
  import { minLength, required } from 'vuelidate/lib/validators'
  import FormMixin from '@/mixins/Form.mixin'

  export default {
    data() {
      return {
        userLogin: '',
        userPassword: '',
      }
    },
    validations: {
      userLogin: { minLength: minLength(6), required },
      userPassword: { minLength: minLength(6), required }
    },
    mixins: [FormMixin],
    methods: {
      async submitForm() {
        const formData = {
          userLogin: this.userLogin,
          userPassword: this.userPassword,
        };

        await this.sendFormData('login', formData)
      }
    }
  }
</script>
