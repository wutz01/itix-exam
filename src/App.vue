<template lang="pug">
  v-app
    v-app-bar(app color="white" flat)
      v-avatar(:color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'" size='32')
      v-tabs.ml-n9(right color="grey darken-1")
        v-tab(v-for="link in links", :key="link")
          | {{ link }}
      //- v-avatar.hidden-sm-and-down(color="grey darken-1 shrink", size="32")
    v-main.grey.lighten-3
      v-container
        router-view
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      links: [
        'Login',
        'Delivery',
        'Blog',
        'Help',
        'Language',
      ]
    }
  }
}
</script>

<style>
</style>
