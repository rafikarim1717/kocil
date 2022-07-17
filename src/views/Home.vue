<template>
  <!-- eslint-disable max-len -->
  <main>
    <!-- Introduction -->
    <section class="container mx-auto my-6">
      <Pengumuman />
    </section>

    <!-- Main Content -->
    <section class="container mx-auto my-12 p-5">
      <Dashboard v-if="userLoggedIn" />
    </section>
  </main>
</template>

<script>
import { mapState } from 'vuex';
import Pengumuman from '../components/Pengumuman.vue';
import Dashboard from '../components/Dashboard.vue';

export default {
  name: 'Home',
  components: { Pengumuman, Dashboard },
  data() {
    return {};
  },
  computed: {
    ...mapState(['userLoggedIn']),
  },
  methods: {},
};
</script>

<style scoped></style>
