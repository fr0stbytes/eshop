<template>
  <div class="login-container m-3 p-5 white-bg border">
    <h5 class="mt-2">Welcome back</h5>
    <h6 class="text-secondary">Please login to your account</h6>
    <b-alert variant="danger"
             dismissible
             :show="loginError !== null"
             @dismissed="clearLoginError">
      <em v-if="loginError">{{loginError}}</em>
    </b-alert>
    <div class="login-buttons mt-5">
      <b-form @submit.prevent="loginWithEmail">
      <b-form-group id="loginInputGroup1"
                    label="Email address:"
                    label-for="loginInput1">
        <b-form-input id="exampleInput1"
                      type="email"
                      v-model="email"
                      required
                      placeholder="Enter email">
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Password:"
                    label-for="loginInput2">
        <b-form-input id="loginInput2"
                      type="password"
                      v-model="password"
                      required
                      placeholder="Your password">
        </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
    <div class="is-small text-secondary mt-2">
      <b-btn variant="link" v-b-modal.modal1 class="register-btn">Don't have an account? Click here to Register</b-btn>
    </div>
    </div>
    <div class="social-login mt-5">
      <b-button variant="danger" class="mt-2 mr-2 btn-block" @click="loginWithGoogle()">Login With Google</b-button>
      <b-button variant="primary" class="mt-2 btn-block" @click="loginWithFacebook()">Login With Facebook</b-button>
    </div>

    <b-modal id="modal1" centered hide-footer title="Create an Account">
      <b-alert variant="danger"
               dismissible
               :show="registerError !== null"
               @dismissed="clearRegisterError">
        <em v-if="registerError">{{registerError}}</em>
      </b-alert>
      <b-form @submit.prevent="registerWithEmail" class="mt-3 mb-5 pr-3 pl-3">
      <b-form-group id="loginInputGroup3"
                    label="Email address:"
                    label-for="loginInput3">
        <b-form-input id="exampleInput3"
                      type="email"
                      v-model="registerEmail"
                      required
                      >
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup4"
                    label="Select password:"
                    label-for="loginInput4">
        <b-form-input id="loginInput4"
                      type="password"
                      v-model="registerPassword"
                      required
                      >
        </b-form-input>
        <b-form-text id="exampleInputGroup4">
         Must be at least 6 characters long.
        </b-form-text>
      </b-form-group>
      <b-form-group id="exampleInputGroup5"
                    label="Retype Password:"
                    label-for="loginInput5"
                    class="mt-2">
        <b-form-input id="passwordLive"
                      type="password"
                      v-model="retypePassword"
                      required
                      >
        </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Register</b-button>
    </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import firebase from 'firebase'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      registerPassword: '',
      registerEmail: '',
      retypePassword: ''
    }
  },
  computed: {
    ...mapState({
      loginError: state => state.auth.loginError,
      registerError: state => state.auth.registerError,
      user: state => state.auth.user
    })
  },
  methods: {
    loginWithEmail () {
      const loginDetails = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('loginWithEmail', loginDetails)
    },
    clearLoginError () {
      this.$store.dispatch('clearLoginError')
    },
    clearRegisterError () {
      this.$store.dispatch('clearRegisterError')
    },
    registerWithEmail () {
      let length = this.registerPassword
      if (length.length >= 6 && this.registerPassword === this.retypePassword) {
        const registerDetails = {
          email: this.registerEmail,
          password: this.registerPassword
        }
        this.$store.dispatch('registerWithEmail', registerDetails)
      } else {
        // Handle Password doesn't match or password < 6
        console.log(this.registerPassword + ' + ' + this.retypePassword + length.length)
      }
    },
    loginWithGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider()
      this.$store.dispatch('socialLogin', provider)
    },
    loginWithFacebook () {
      const provider = new firebase.auth.FacebookAuthProvider()
      this.$store.dispatch('socialLogin', provider)
    }
  }
}
</script>

<style lang="css">
  .login-container {
  }
  .register-btn {
    color: #6c757d;
    padding: 0;
  }
</style>
