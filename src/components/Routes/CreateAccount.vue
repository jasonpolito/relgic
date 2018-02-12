<template>
  <v-content :class="isMobile ? 'white' : ''">
    <v-container grid-list-sm>
      <v-layout row justify-space-between>
        <v-flex></v-flex>
        <v-flex xs12 md6 lg3 class="pt-4">
          <v-card :flat="isMobile">
            <v-card-title>
              <h1 class="title">Create Account</h1>
            </v-card-title>
            <v-card-text>
              <v-text-field
                label="Username"
                data-vv-name="username"
                name="username"
                v-validate="'required'"
                required
                :error-messages="errors.collect('username')"
                v-model="username"></v-text-field>
              <v-text-field
                required
                v-validate="'required|min:6'"
                name="password"
                :error-messages="errors.collect('password')"
                data-vv-name="password"
                label="Password"
                v-model="password"
                type="password"></v-text-field>
              <v-alert v-model="errorMessage.show" color="error" transition="scale-transition" outline icon="warning">{{ errorMessage.message }}</v-alert>
              <v-btn block color="primary" large @click="createAccountWithUsername" :loading="loading" :disabled="loading">Create Account</v-btn>
              <v-btn block flat color="grey" to="/sign-in">Have account?</v-btn>
            </v-card-text>
            <v-divider></v-divider>
            <div class="text-xs-center" style="margin-top: -18px">
              <v-badge color="grey lighten-3" light overlap>
                <span slot="badge" class="grey--text text--darken-2" style="font-size: .6em">OR</span>
              </v-badge>
            </div>
            <v-card-text>
              <v-btn flat block color="red" @click="signInWithProvider">Sign In with Google</v-btn>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex></v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  import { mapActions } from 'vuex'
  import firebase from 'firebase'
  import { firestore } from '@/firebase'

  export default {
    $_veeValidate: {
      validator: 'new'
    },
    data () {
      return {
        username: '',
        password: '',
        loading: false,
        errorMessage: {
          show: false,
          message: ''
        },
        provider: new firebase.auth.GoogleAuthProvider()
      }
    },
    watch: {
      username () {
        this.errorMessage.show = false
      }
    },
    methods: {
      ...mapActions({
        setUser: 'user/setUser',
        setSnackbarShow: 'app/setSnackbarShow',
        setSnackbarMessage: 'app/setSnackbarMessage'
      }),
      createAccountWithUsername () {
        this.loading = true
        this.errorMessage.show = false
        this.$validator.validateAll().then(valid => {
          if (valid) {
            firebase.auth().createUserWithEmailAndPassword(this.username + '@relgic.com', this.password).then(user => {
              this.loading = false
              if (user) {
                this.setSnackbarShow(true)
                this.setSnackbarMessage('Welcome to Relgic, ' + user.email.replace(/@relgic\.com/g, '') + '!')
                this.setUser(user)
                this.$router.push('/channels')
                firestore.collection('users').doc(user.uid).set({
                  uid: user.uid
                })
              }
            }).catch(err => {
              this.loading = false
              this.errorMessage.show = true
              this.errorMessage.message = err.message.replace(/email address/g, 'username')
              console.log(err)
            })
          } else {
            this.loading = false
          }
        })
      },
      signInWithProvider () {
        firebase.auth().signInWithPopup(this.provider).then(res => {
          if (res.user) {

          }
        }).catch(err => console.log(err))
      }
    },
    mounted () {
      this.setPageTitle('Create Account')
    }
  }
</script>
