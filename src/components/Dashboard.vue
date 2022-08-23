<template>
  <!-- eslint-disable max-len -->
  <!-- Main Content -->
  <div class="flex flex-col p-5 gap-7 container-shadow bg-white">
    <div class="flex justify-between">
      <h2 class="text-2xl text-black">
        {{ userData.name ? 'HI,' + ' ' + userData.name : 'HI,User' }}
      </h2>
      <div class="inline-flex gap-x-2">
        <p class="text-2xl text-black">{{ totalPoin }}</p>
        <img src="@/assets/coin.png" class="object-contain" />
      </div>
    </div>

      <hr class="style-one">
    <div
      class="grid grid-cols-1 self-center gap-12 md:grid-cols-2 lg:grid-cols-3"
    >
      <div v-show="userData.admin !== 1" class="max-w-sm my-4 rounded-lg shadow-menu">
        <div class="center p-5">
          <img class="w-28 h-28" src="@/assets/scan.png" />
        </div>
        <div class="px-6 py-4 text-center">
          <router-link :to="{ name: 'scanner-page' }">
            <button class="rounded-lg bg-black py-2 px-4 text-white">
              Tukar-Botol
            </button>
          </router-link>
        </div>
      </div>
      <div v-show="userData.admin !== 1"  class="max-w-sm my-4 rounded-lg shadow-menu">
        <div class="center p-5">
          <img class="w-28 h-28" src="@/assets/buy.png" />
        </div>
        <div class="px-6 py-4 text-center">
          <router-link :to="{ name: 'tukar-point' }">
            <button class="rounded-lg bg-black py-2 px-4 text-white">
              Tukar-Point
            </button>
          </router-link>
        </div>
      </div>
      <div class="max-w-sm my-4 rounded-lg shadow-menu">
        <div class="center p-5">
          <img class="w-28 h-28" src="@/assets/history.png" />
        </div>
        <div class="px-6 py-4 text-center">
          <router-link :to="{ name: 'riwayat' }">
            <button class="rounded-lg bg-black py-2 px-4 text-white">
              Riwayat Tranksaksi
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import { db } from '../includes/firebase';

export default {
  name: 'Dashboard',
  components: {},
  data() {
    return {
      userData: {
        admin: 0,
        name: '',
        email: '',
        tranksaksi: [
          {
            point: 0,
            jumlahBotol: 0,
            date: '',
          },
        ],
      },
    };
  },
  created() {
    const docRef = db.collection('users').doc(firebase.auth().currentUser.uid);

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
  },
  computed: {
    totalPoin() {
      if (this.userData.tranksaksi) {
        const array = this.userData.tranksaksi;

        let totalPoin = 0;
        array.map((value) => {
          totalPoin += value.point;
          return totalPoin;
        });
        return totalPoin;
      }
      return 0;
    },
  },
  methods: {
    // if(this.userData.tranksaksi){
    //       totalPoin();
    // }
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,500;1,300&display=swap');
.container-shadow {
box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}
h2 {
  font-family: 'Poppins', sans-serif;
  font-weight: 500 bold;
}
p {
  font-family: 'Poppins', sans-serif;
  font-weight: 500 bold;
}

.shadow-menu {
box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px;
}
.center {
  text-align: -webkit-center;
}
hr.style-one {
    width: 100%;
    border: 0;
    height: 2px;
    background: #333;
    background-image: linear-gradient(to right, #ccc, #333, #ccc);
}
</style>
