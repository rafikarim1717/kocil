<template>
  <!-- eslint-disable max-len -->
  <div class="flex flex-col p-5 gap-7 container-shadow bg-white">
    <div class="flex justify-between">
      <h2 class="text-2xl text-black">
        {{ userData.name ? 'HI,' + ' ' + userData.name : 'HI,User' }}
      </h2>
      <div class="inline-flex gap-x-2">
        <p class="text-2xl text-black">{{ checkPoin }}</p>
        <img src="@/assets/images/coin.png" class="object-contain" />
      </div>
    </div>
    <div class="grid grid-cols-1 self-center gap-12 md:grid-cols-2 lg:grid-cols-3">
      =======
      <hr class="style-one">
      <div class="grid grid-cols-1 self-center gap-12 md:grid-cols-2 lg:grid-cols-3">
        >>>>>>> d9065b4296dd2eb791699a8b1158d8208d931a7c
        <div v-show="userData.admin !== 1" class="max-w-sm my-4 rounded-lg shadow-menu">
          <div class="center p-5">
            <img class="w-28 h-28" src="@/assets/images/scan.png" />
          </div>
          <div class="px-6 py-4 text-center">
            <router-link :to="{ name: 'scanner-page' }">
              <button class="rounded-lg bg-black py-2 px-4 text-white">
                Tukar-Botol
              </button>
            </router-link>
          </div>
        </div>
       <div v-show="userData.admin !== 1" class="max-w-sm my-4 rounded-lg shadow-menu">
          =======
          <div v-show="userData.admin !== 1" class="max-w-sm my-4 rounded-lg shadow-menu">

            <div class="center p-5">
              <img class="w-28 h-28" src="@/assets/images/buy.png" />
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
              <img class="w-28 h-28" src="@/assets/images/history.png" />
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
        jumlahPoin: 0,
        tranksaksi: [
          {
            point: 0,
            jumlahBotol: 0,
            date: '',
          },
        ],
      },
      totalPoin: 0,
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
    checkPoin() {
      if (this.userData.tranksaksi) {
        const array = this.userData.tranksaksi;
        array.map((value) => {
          this.totalPoin += value.point;
          return this.totalPoin;
        });
        console.log(this.totalPoin);
        return this.totalPoin;
      }
      return 0;
    },
  },
  methods: {
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
