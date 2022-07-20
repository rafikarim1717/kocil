<script setup>
import { ref } from 'vue';
import { StreamBarcodeReader } from 'vue-barcode-reader';
import firebase from 'firebase';
import { db } from '../includes/firebase';

const decodedText = ref('');
const showResult = ref(false);
// const emit = defineEmits(['name']);

const onLoaded = () => {
  console.log('loaded');
};
const onDecode = (text) => {
  decodedText.value = text;
  showResult.value = true;
};

const addData = () => {
  const hasilPertama = decodedText.value[0];
  const hasilKedua = decodedText.value[1];

  console.log(hasilPertama, hasilKedua);
  alert('point dan jumlah botol berhasil masuk ke data user');

  const dataTranksaksi = db
    .collection('users')
    .doc(firebase.auth().currentUser.uid);

  dataTranksaksi.update({
    tranksaksi: firebase.firestore.FieldValue.arrayUnion({
      point: hasilPertama,
      jumlahBotol: hasilKedua,
      date: new Date().toString(),
    }),
  });
};
</script>

<template>
  <!-- eslint-disable max-len -->
  <div class="flex flex-col">
    <StreamBarcodeReader
      @decode="onDecode"
      @loaded="onLoaded"
    ></StreamBarcodeReader>
    <div
      v-if="showResult"
      class="bg-white p-10 mt-10 rounded-lg shadow-container text-tengah text-center border"
    >
      <h3 class="text-lg uppercase">Selamat Anda Mendapatkan:</h3>
      <h2 class="tracking-wide">
        <h2 class="text-lg">{{ decodedText[0] + 'poin' }}</h2>
        <br class="text-lg" />
        {{ 'setelah menukarkan, ' + decodedText[1] + ' botol' }}
      </h2>
      <div class="mt-5">
        <button
          @click="addData"
          class="col-span-12 rounded-lg px-4 py-2 bg-black text-white duration-300"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shadow-container {
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
}
.text-tengah {
  text-align-last: center;
}
</style>
