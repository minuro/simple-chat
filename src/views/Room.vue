<template>
  <v-container text-center>
    <v-layout row wrap justify-center>
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
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'

export default {
  components: {
    ChatDisplay
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
  date() {
    return {
      unsubscribe: {
        type: Function
      }
    }
  },
  methods: {
    ...mapActions(['addChat', 'clearChats'])
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