<template>
  <!-- eslint-disable max-len -->
  <main>
    <!-- Introduction -->
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
    // getData(decodedText) {
    //   this.decodedText = decodedText;
    //   console.log(this.decodedText);
    //   // const docRef = db
    //   //   .collection('users')
    //   //   .doc(firebase.auth().currentUser.uid);
    //   // docRef
    //   //   .get()
    //   //   .then(doc => {
    //   //     if (doc.exists) {
    //   //       console.log('Document data:', doc.data());
    //   //     } else {
    //   //       // doc.data() will be undefined in this case
    //   //       console.log('No such document!');
    //   //       console.log(value);
    //   //     }
    //   //   })
    //   //   .catch(error => {
    //   //     console.log('Error getting document:', error);
    //   //   });
    // },
  },
};
</script>

<style scoped>
.container-shadow {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
}
.shadow-menu {
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
}
.background {
  background-color: rgba(0, 0, 0, 0.2);
}
.center {
  text-align: -webkit-center;
}
</style>
