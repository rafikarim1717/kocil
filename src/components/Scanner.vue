<script setup>
/* eslint-disable */
import { ref } from 'vue';
import { StreamBarcodeReader } from 'vue-barcode-reader';
import firebase from 'firebase';
import { db } from '../includes/firebase';
import router from '../router';

const decodedText = ref('');
const showBarcode = ref(true);
const showResult = ref(false);
const hasilPertama = ref(['']);
const popupBox = ref(false);
const countdown = ref(25);

const onLoaded = () => {
  console.log('loaded');
};
const onDecode = text => {
  decodedText.value = text;
  showResult.value = true;
  rubahNilai();
};

const countDownTimer = () => {
  if (countdown.value > 0) {
    setTimeout(() => {
      countdown.value -= 1
      countDownTimer()
    }, 1000)
  }
  returnHome();
}

const returnHome = () => {
  if (countdown.value == 0) {
    router.push({ path: '/', replace: true })
  }
}

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
  })
    .then(() => {
      console.log('Data point dan botol telah masuk');
      alert('point anda sudah bertambah ');
      popupBox.value = true;
      showResult.value = false;
      showBarcode.value = false;
      countDownTimer();
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};
</script>

<template>
  <!-- eslint-disable max-len -->
  <div class="flex flex-col text-center items-center self-center justify-center">
    <div v-if="showBarcode" class="">
      <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded"></StreamBarcodeReader>
    </div>
    <div v-if="showResult" class="bg-white p-10 mt-10 rounded-lg shadow-container border">
      <div class="bg-white flex flex-col gap-6 p-6">
        <div class="tracking-wide">
          <h3 class="text-xl uppercase mb-2">Selamat Anda Mendapatkan:</h3>
          <p class="text-lg text-black">
            {{ hasilPertama[0] + ' poin' }}
          </p>
          <br />
          <h3 class="text-xl uppercase mb-2">
            Setelah Menukarkan :
          </h3>
          <p class="text-lg text-black">
            {{ hasilPertama[1] + ' botol' }}
          </p>
        </div>
        <div class="mt-4">
          <button @click="addData" class="col-span-12 rounded-lg px-4 py-2 bg-black text-white duration-300">
            Submit
          </button>
        </div>
      </div>
    </div>
    <div v-if="popupBox" class="bg-white p-10 mt-10 rounded-lg shadow-container border">
      <div class="bg-white flex flex-col gap-6 p-6">
        <h3 class="text-2xl font-bold mb-2">Silahkan Tunggu Selama</h3>
        <p class="text-xl font-medium"> {{ countdown }}</p>
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
</style>
