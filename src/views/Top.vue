<template>
  <v-container text-center>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <v-alert
        border="left"
        colored-border
        type="error"
        elevation="2"
        v-if="errorMessage"
        >
          {{errorMessage}}
        </v-alert>
      </v-flex>
      <v-flex xs12>
        <h1>部屋番号を入力してください</h1>  
      </v-flex>
      <v-flex xs6 sm4 md2>
        <v-text-field 
        class="text-field"
        maxlength="4" 
        solo 
        single-line
        v-model="roomNo"
        @keyup.enter="joinRoom"
        />
        <v-btn color="info" min-width="80px" @click="joinRoom">
          入室する
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import db from 'firebase'
import {mapActions} from 'vuex'

export default {
  data() {
    return{
      errorMessage: '',
      roomNo: ''
    }
  },
  methods: {
    joinRoom(){
      this.errorMessage = this.checkInput(this.roomNo)
      if(!this.errorMessage){
        this.setRoomNo(this.roomNo)
        this.clearChats()
        //this.getDBChats()
        this.$router.push({name: 'room'})
      }
    },
    checkInput(num){
      if(!num){
        return '部屋番号を入力してください'
      }
      if(num.length != 4){
        return '4文字で入力してください'
      }
      if(/\D/g.test(num)){
        return '数字で入力してください'
      }
      
      return ''
    },
    getDBChats(){
      db.firestore().collection(`rooms/${this.roomNo}/chats`).get().then(snapshot =>{
        snapshot.forEach(doc => this.addChat({
          chat: doc.data()
        }))
        this.$router.push({name: 'room'})
      })
    },
    ...mapActions(['setRoomNo', 'addChat', 'clearChats'])
  }
}
</script>

<style lang="scss">
a {
  text-decoration: none;
}
.text-field input{
  text-align: center;
}
</style>