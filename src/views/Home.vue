<template>
  <!-- eslint-disable max-len -->
  <main>
    <!-- Introduction -->
    <section class="container mx-auto my-6">
      <Pengumuman />
    </section>

    <!-- Main Content -->
    <section class="container mx-auto my-12 p-6">
      <Dashboard v-if="userLoggedIn" />
    </section>
  </main>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import Pengumuman from '../components/Pengumuman.vue';
import Dashboard from '../components/Dashboard.vue';

export default {
  name: 'Home',
  components: { Pengumuman, Dashboard },
  data() {
    return {
      info: null,
    };
  },
  mounted() {
    /* eslint-disable */
    axios
      .get(
        'https://api.thingspeak.com/channels/1774900/feeds.json?api_key=S3BPB72OYPL7KJKL&results=2'
      )
      .then(response => (this.info = response));
    console.log(this.info);
  },
  computed: {
    ...mapState(['userLoggedIn']),
  },
  methods: {},
};
</script>

<style scoped></style>
