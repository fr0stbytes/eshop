<template>
  <div class="container mt-5 login-container">
    <h5 class="mt-5">Welcome back</h5>
    <h6 class="text-secondary">Please login to your account</h6>
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
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
    <div class="is-small text-secondary mt-2">
      <b-btn variant="link" v-b-modal.modal1 class="register-btn">Don't have an account? Click here to Register</b-btn>
    </div>
    </div>
    <div class="social-login mt-5">
      <b-button variant="danger" class="mt-2 mr-2 btn-block">Login With Google</b-button>
      <b-button variant="primary" class="mt-2 btn-block">Login With Facebook</b-button>
    </div>

    <b-modal id="modal1" title="Create an Account">
      <b-form @submit.prevent="registerWithEmail">
      <b-form-group id="loginInputGroup3"
                    label="Email address:"
                    label-for="loginInput3">
        <b-form-input id="exampleInput3"
                      type="email"
                      v-model="registerEmail"
                      required
                      placeholder="Enter email">
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup4"
                    label="Select password:"
                    label-for="loginInput4">
        <b-form-input id="loginInput4"
                      type="password"
                      v-model="registerPassword"
                      required
                      placeholder="Select password">
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup5"
                    label="Password:"
                    label-for="loginInput5">
        <b-form-input id="loginInput5"
                      type="password"
                      v-model="retypePassword"
                      required
                      placeholder="Retype password">
        </b-form-input>
      </b-form-group>
      <b-button variant="outline-primary">Register</b-button>
    </b-form>
    </b-modal>
  </div>
</template>

<script>
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
  methods: {
    loginWithEmail () {
      const loginDetails = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('loginWithEmail', loginDetails)
      // console.log(loginDetails)
    }
  }
}
</script>

<style lang="css">
  .login-container {
    max-width: 500px;
    margin: 0 auto;
  }
  .register-btn {
    color: #6c757d;
    padding: 0;
  }
</style>
