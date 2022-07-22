<script setup>
/* eslint-disable */
import { ref } from 'vue';
import { StreamBarcodeReader } from 'vue-barcode-reader';
import firebase from 'firebase';
import { db } from '../includes/firebase';

const decodedText = ref('');
const showResult = ref(false);
const hasilPertama = ref(['']);
// const emit = defineEmits(['name']);

const onLoaded = () => {
  console.log('loaded');
};
const onDecode = text => {
  decodedText.value = text;
  showResult.value = true;
  rubahNilai();
};

const rubahNilai = () => {
  const penampung = decodedText.value.split(',');
  const penampungDua = penampung.map(Number);
  hasilPertama.value[0] = penampungDua[0];
  hasilPertama.value[1] = penampungDua[1];
  console.log(hasilPertama.value);

  return hasilPertama.value;
};

const addData = () => {
  rubahNilai();

  const dataTranksaksi = db
    .collection('users')
    .doc(firebase.auth().currentUser.uid);

  dataTranksaksi.update({
    tranksaksi: firebase.firestore.FieldValue.arrayUnion({
      point: hasilPertama.value[0],
      jumlahBotol: hasilPertama.value[1],
      date: new Date().toString(),
    }),
  });
  alert('selamat data telah masuk');
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
      <h3 class="text-lg uppercase mb-3">Selamat Anda Mendapatkan:</h3>
      <h2 class="tracking-wide">
        <h2 class="text-lg font-bold text-gray-700">
          {{ hasilPertama[0] + 'poin' }}
        </h2>
        <br />
        <h2 class="text-lg font-semibold text-gray-700">
          {{ 'setelah menukarkan ' + hasilPertama[1] + ' Botol' }}
        </h2>
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
