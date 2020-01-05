<template>
  <v-container text-center>
    <v-layout row wrap justify-center>
      <div class="fix-btn mr-5 mb-5">
        <v-btn color="info" height="60" width="60" @click="openModal">
          <v-img
            :src="require('../assets/chat_icon.png')"
            contain
            height="50"
          />
        </v-btn>
      </div>
      <InputModal @close="closeModal" v-if="modal">
        <textarea
        class="text-area"
        maxlength="30" 
        v-model="inputText"
        />
        <div>
          <v-btn class="mt-2" color="info" @click="submit">投稿</v-btn>
        </div>
        <div>
          <v-btn class="mt-2" color="info" @click="closeModal">キャンセル</v-btn>
        </div>
      </InputModal>
      <v-flex xs12>
        <h1>部屋 [{{this.$store.state.roomNo}}]</h1>
      </v-flex>
      <v-flex xs10 md8>
        <ChatDisplay 
        class="mt-2"
        v-for="(chat, index) in dbChats" 
        :key="index"
        :text="chat.text"
        :date="chat.createdAt | moment"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import db from 'firebase'
import moment from 'moment'
import ChatDisplay from '../components/ChatDisplay'
import InputModal from '../components/InputModal'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'

export default {
  components: {
    ChatDisplay,
    InputModal
  },
  created() {
    if(!this.$store.state.roomNo){
      this.$router.push({name: 'top'})
    }
    else{
      this.unsubscribe = db.firestore().collection(`rooms/${this.$store.state.roomNo}/chats`).orderBy('createdAt').onSnapshot(snapshot =>{
        this.clearChats()
        snapshot.forEach(doc => {
          this.addChat({
            chat: doc.data()
          })
        })
      })
    }
  },
  destroyed() {
    this.unsubscribe()
  },
  data() {
    return {
      unsubscribe: Function,
      modal: false,
      inputText: ''
    }
  },
  methods: {
    submit() {
      if(this.inputText){
        let chat = {}
        chat.text = this.inputText
        chat.createdAt = db.firestore.FieldValue.serverTimestamp()
        this.addDBChat(chat)
      }
      this.closeModal()
    },
    openModal(){
      this.modal = true
    },
    closeModal(){
      this.modal = false
    },
    ...mapActions(['addChat', 'addDBChat', 'clearChats'])
  },
  computed: {
    ...mapGetters(['dbChats'])
  },
  filters: {
      moment: function (date) {
          return moment(date.toDate()).format('YYYY/MM/DD HH:mm');
      }
  }
}
</script>

<style lang="scss" scoped>
.fix-btn {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 10;
}
.text-area {
  font-size: 24px;
  border: 1px solid black;
  width: 100%;
}
</style>