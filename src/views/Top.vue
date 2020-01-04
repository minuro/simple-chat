<template>
  <v-container text-center>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <h1>部屋番号を入力してください</h1>  
        <router-link :to="{ name: 'room' }">
          <v-btn color="info" min-width="80px">
            入室する
          </v-btn>
        </router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style lang="scss">
a {
  text-decoration: none;
}
</style>