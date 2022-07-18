<template>
  <!-- eslint-disable max-len -->
  <div class="bg-gray-800">
    <nav class="flex container mx-auto px-5 py-5">
      <ul class="flex flex-grow space-x-4">
        <li>
          <router-link
            :to="{ name: 'home' }"
            exact-active-class="no-active"
            class="flex items-center space-x-3 text-gray-700 md:mr-5"
          >
            <span
              class="text-gray-200 hover:text-gray-300 text-2xl font-semibold py-1"
              >Recycler</span
            >
          </router-link>
        </li>
      </ul>
      <ul class="flex" @click="showMenu = !showMenu">
        <li>
          <a href="#" class="flex-none absolute right-0 px-5 z-30">
            <p
              class="text-gray-200 font-semibold tracking-wide hover:bg-gray-900 hover:bg-opacity-30 rounded px-2 py-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </p>
          </a>
          <div
            class="absolute top-0 right-0 z-10 h-screen w-full bg-black transition"
            :class="{
              'invisible opacity-0': !showMenu,
              'visible opacity-40': showMenu,
            }"
          ></div>
          <div
            class="absolute right-0 z-20 w-full px-5 mt-16 transition"
            :class="{
              'invisible opacity-0': !showMenu,
              'visible opacity-100': showMenu,
            }"
          >
            <ul
              class="flex flex-col bg-gray-100 w-full rounded shadow-md overflow-hidden"
            >
              <li class="flex bg-gray-800">
                <h3
                  class="flex flex-1 text-white text-base font-semibold px-5 py-4"
                >
                  Navigation
                </h3>
              </li>
              <li v-if="userLoggedIn">
                <router-link :to="{ name: 'scanner-page' }">
                  <a
                    class="flex flex-1 text-base text-gray-700 hover:bg-gray-200 font-semibold px-8 py-3"
                    href="#"
                  >
                    Tukar Botol
                  </a>
                </router-link>
              </li>
              <li v-if="userLoggedIn">
                <router-link :to="{ name: 'tukar-point' }">
                  <a
                    class="flex flex-1 text-base text-gray-700 hover:bg-gray-200 font-semibold px-8 py-3"
                    href="#"
                  >
                    Tukar Point
                  </a>
                </router-link>
              </li>
              <li v-if="userLoggedIn">
                <router-link :to="{ name: 'riwayat' }">
                  <a
                    class="flex flex-1 text-base text-gray-700 hover:bg-gray-200 font-semibold px-8 py-3"
                    href="#"
                  >
                    Riwayat Tranksaksi
                  </a>
                </router-link>
              </li>
              <li v-if="userLoggedIn && userData.admin == 1">
                <router-link :to="{ name: 'admin-page' }">
                  <a
                    class="flex flex-1 text-base text-gray-700 hover:bg-gray-200 font-semibold px-8 py-3"
                    href="#"
                  >
                    Admin Menu
                  </a>
                </router-link>
              </li>

              <li v-if="!userLoggedIn">
                <a
                  class="flex flex-1 text-lg text-gray-700 bg-gray-300 hover:text-blue-600 font-semibold px-8 py-4"
                  href="#"
                  @click.prevent="toggleAuthModal"
                >
                  Login
                </a>
              </li>
              <template v-else>
                <li>
                  <a
                    class="flex flex-1 text-lg bg-gray-300 hover:text-blue-600 font-semibold px-8 py-4"
                    href="#"
                    @click.prevent="signout"
                    >Logout</a
                  >
                </li>
              </template>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import firebase from 'firebase';
import { db } from '../includes/firebase';

export default {
  name: 'Header',
  data() {
    return {
      showMenu: false,
      userData: {
        name: '',
        email: '',
        admin: 0,
      },
    };
  },
  created() {},
  mounted() {
    this.isAdmin();
  },
  computed: {
    ...mapState(['userLoggedIn']),
  },
  methods: {
    ...mapMutations(['toggleAuthModal']),
    signout() {
      this.$store.dispatch('signout', {
        router: this.$router,
        route: this.$route,
      });

      // console.log(this.$route);
      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: 'home' });
      }
    },
    isAdmin() {
      const docRef = db
        .collection('users')
        .doc(firebase.auth().currentUser.uid);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const newData = doc.data();
            this.userData = newData;
            console.log('Document data:', doc.data());
            console.log(this.userData);
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });

      if (this.userData.admin === 1) {
        return this.userData.admin;
      }
      return this.userData.admin === false;
    },
    // toggleAuthModal() {
    //   this.$store.commit('toggleAuthModal');
    // },
  },
};
</script>
