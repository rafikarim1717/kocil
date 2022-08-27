<template>
  <!-- eslint-disable max-len -->
  <main>
    <section class="container mx-auto my-6">
      <Pengumuman />
    </section>

    <section class="container mx-auto my-12 p-6">
      <Dashboard v-if="userLoggedIn" />
    </section>
  </main>
</template>

<script>
import { mapState } from 'vuex';
import firebase from 'firebase';
import { db } from '../includes/firebase';
import Pengumuman from '../components/Pengumuman.vue';
import Dashboard from '../components/Dashboard.vue';

export default {
  name: 'Home',
  components: { Pengumuman, Dashboard },
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
    };
  },
  created() {
    this.checkPoin();
    this.addJumlahPoin();
  },
  computed: {
    ...mapState(['userLoggedIn']),
  },
  methods: {
    async addJumlahPoin() {
      if (this.userData.jumlahPoin) {
        const dataJumlahPoin = db
          .collection('users')
          .doc(firebase.auth().currentUser.uid);

        try {
          await dataJumlahPoin.update({
            jumlahPoin: this.userData.jumlahPoin,
          });
          console.log('Document successfully updated!');
        } catch (error) {
          console.error('Error updating document: ', error);
        }
      }
      return 0;
    },
    checkPoin() {
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
    },
  },
};
</script>

<style scoped></style>
