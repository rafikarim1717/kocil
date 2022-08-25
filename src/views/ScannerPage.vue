<template>
  <!-- eslint-disable max-len -->
  <main>
    <section class="container mx-auto my-12 px-5">
      <Scanner />
    </section>
  </main>
</template>

<script>
import Scanner from '../components/Scanner.vue';

export default {
  name: 'ScannerPage',
  components: { Scanner },
  data() {
    return {
      decodedText: '',
    };
  },
  methods: {
  },
};
</script>

<style scoped>
</style>
