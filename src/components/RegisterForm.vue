<template>
  <form @submit.prevent="submitForm">
    <div class="form-group">
      <label for="inputRName">Name</label>
      <input
        type="text"
        class="form-control"
        id="inputRName"
        v-model.trim="userName"
        :class="{
            'is-valid': $v.userName.required && $v.userName.minLength,
            'is-invalid': $v.userName.$dirty && (!$v.userName.minLength || !$v.userName.required)
          }"
      >
      <span class="invalid-feedback" v-if="$v.userName.$dirty && (!$v.userName.minLength || !$v.userName.required)">
        Required Field. Minimum length is {{ $v.userName.$params.minLength.min }}
      </span>
    </div>
    <div class="form-group">
      <label for="inputREmail">Email</label>
      <input
        type="email"
        class="form-control"
        id="inputREmail"
        v-model.trim="userEmail"
        :class="{
            'is-valid': $v.userEmail.required && $v.userEmail.email,
            'is-invalid': $v.userEmail.$dirty && (!$v.userEmail.email || !$v.userEmail.required)
          }"
      >
      <span class="invalid-feedback" v-if="$v.userEmail.$dirty && (!$v.userEmail.email || !$v.userEmail.required)">
        Required Field. Must be email.
      </span>
    </div>
    <div class="form-group">
      <label for="inputRLogin">Login</label>
      <input
        type="text"
        class="form-control"
        id="inputRLogin"
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
      <label for="inputRPassword">Password</label>
      <input
        type="password"
        class="form-control"
        id="inputRPassword"
        v-model.trim="userPassword"
        :class="{
            'is-valid': $v.userPassword.required && $v.userLogin.minLength,
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
          Register
      </button>
    </div>
  </form>
</template>


<script>
  import { email, minLength, required } from 'vuelidate/lib/validators'
  import FormMixin from '@/mixins/Form.mixin'

  export default {
    data() {
      return {
        userName: '',
        userEmail: '',
        userLogin: '',
        userPassword: '',
        isSendFormData: false
      }
    },
    validations: {
      userName: { minLength: minLength(3), required },
      userEmail: { email, required },
      userLogin: { minLength: minLength(6), required },
      userPassword: { minLength: minLength(6), required }
    },
    mixins: [FormMixin],
    methods: {
      async submitForm() {
        const formData = {
          userName: this.userName,
          userEmail: this.userEmail,
          userLogin: this.userLogin,
          userPassword: this.userPassword,
        };

        const isSuccess = await this.sendFormData('register', formData)

        if (isSuccess) {
          this.userName = ''
          this.userEmail = ''
          this.userLogin = ''
          this.userPassword = ''
        }
      }
    }
  }
</script>
