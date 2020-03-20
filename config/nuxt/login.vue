<template>
  <div>
    <b-container v-on:keydown.enter="loginLocal(usr, pass)">
      <!-- <b-form inline> -->
      <b-input-group>
        <b-input v-model="usr" class="mr-2" :placeholder="usr" />
      </b-input-group>
      <b-input-group>
        <b-input-group-append>
          <b-input
            v-model="pass"
            :type="!showPass ? 'password' : 'text'"
            :placeholder="showPass ? pass : ''"
          />
          <b-button @click="showPass = !showPass">
            <b-icon :icon="showPass ? 'eye' : 'eye-slash'" aria-hidden="true"></b-icon>
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </b-container>
    <br />
    <b-container>
      <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">Remember me</b-form-checkbox>
      <b-button @click="loginLocal(usr, pass)">Login</b-button>
      <p v-if="msg !== ''">{{msg}}</p>
      <!-- </b-form> -->
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usr: null,
      pass: '',
      msg: '',
      showPass: false,
      saveCreds: false
    }
  },
  methods: {
    loginLocal(usr, pass) {
      if (usr && pass) {
        this.$auth
          .loginWith('local', {
            data: {
              identifier: usr,
              password: pass
            }
          })
          // .then(() => {
          //   setTimeout(() => {
          //     this.$router.push('/')
          //   }, 4500)
          // })
          .catch(err => {
            this.setMsg('invalid credentials')
          })
      }
      if (!usr) {
        this.setMsg('missing user name')
      }
      if (!pass) {
        this.setMsg('missing password')
      }
      if (!usr && !pass) {
        this.setMsg('missing user name and password')
      }
    },
    loginGoogle() {},
    loginGoogle() {},
    setMsg(msg) {
      this.msg = msg
      setTimeout(() => {
        this.msg = ''
      }, 1500)
    }
  }
}
</script>

<style>
</style>
