<template>
  <div class="flex flex-col min-h-screen">
    <app-header />

    <div class="flex-grow">
      <router-view />
    </div>

    <auth-modal />
    <app-footer />
  </div>
</template>

<script>
import AppHeader from './components/Header.vue';
import AppFooter from './components/Footer.vue';
import AuthModal from './components/Auth.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AuthModal,
    AppFooter,
  },
  created() {
    this.$store.dispatch('init_login');
  },
};
</script>

<style>
/* .fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
} */
</style>
