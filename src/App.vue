<template>
  <v-app>
    <v-app-bar app dense>
      <v-spacer/>
      <v-toolbar-title class="headline">
        <span>simple chat</span>
      </v-toolbar-title>
      <v-spacer/>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  }
}
</script>
