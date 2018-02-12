<template>
  <v-content :class="isMobile ? 'white' : ''">
    <v-container grid-list-sm>
      <v-layout row justify-space-between>
        <v-flex></v-flex>
        <v-flex md6 lg3 xs12 class="pt-4">
          <v-card :flat="isMobile">
            <v-card-title>
              <h1 class="title">Sign In</h1>
            </v-card-title>
            <v-card-text>
              <v-text-field
                label="Username"
                data-vv-name="username"
                name="username"
                v-validate="'required'"
                required
                @keyup.enter="signInWithUsername"
                :error-messages="errors.collect('username')"
                v-model="username"></v-text-field>
              <v-text-field
                required
                @keyup.enter="signInWithUsername"
                v-validate="'required'"
                name="password"
                :error-messages="errors.collect('password')"
                data-vv-name="password"
                label="Password"
                v-model="password"
                type="password"></v-text-field>
              <v-alert color="error" icon="warning" name="scale-transition" outline v-model="errorMessage.show">{{ errorMessage.message }}</v-alert>
              <v-btn block large color="primary" @click="signInWithUsername" :loading="loading" :disabled="loading">Sign In</v-btn>
              <v-btn block flat color="grey" to="/create-account">Create Account</v-btn>
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
  import firebase from 'firebase'
  import { mapActions } from 'vuex'
  import { firestore } from '@/firebase'

  export default {
    $_veeValidate: {
      validator: 'new'
    },
    data () {
      return {
        errorMessage: {
          show: false,
          message: ''
        },
        username: '',
        password: '',
        loading: false,
        provider: new firebase.auth.GoogleAuthProvider()
      }
    },
    watch: {
      username () {
        this.errorMessage.show = false
      },
      password () {
        this.errorMessage.show = false
      }
    },
    methods: {
      ...mapActions({
        setUser: 'user/setUser',
        setSnackbarShow: 'app/setSnackbarShow',
        setSnackbarMessage: 'app/setSnackbarMessage'
      }),
      signInWithUsername () {
        this.loading = true
        this.$validator.validateAll().then(valid => {
          if (valid) {
            firebase.auth().signInWithEmailAndPassword(this.username + '@relgic.com', this.password).then(user => {
              this.loading = false
              if (user) {
                this.setSnackbarShow(true)
                this.setSnackbarMessage('Welcome back, ' + user.email.replace(/@relgic\.com/g, ''))
                this.setUser(user)
                this.$router.push('/channels')
                firestore.collection('users').doc(user.uid).set({
                  uid: user.uid
                })
              }
            }).catch(err => {
              console.log(err)
              this.loading = false
              if (err.code === 'auth/user-not-found') {
                this.errorMessage.show = true
                this.errorMessage.message = 'Username not found.'
              }
              if (err.code === 'auth/wrong-password') {
                this.errorMessage.show = true
                this.errorMessage.message = 'The password is incorrect.'
              }
            })
          } else {
            this.loading = false
          }
        })
      },
      signInWithProvider () {
        firebase.auth().signInWithPopup(this.provider).then(res => {
          if (res.user) {
            this.setUser(res.user)
          }
        }).catch(err => console.log(err))
      }
    },
    created () {
      this.setPageTitle('Sign In')
    }
  }
</script>
