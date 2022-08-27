<template>
  <!-- eslint-disable max-len -->
  <section class="">
    <div class="container mx-auto">
      <div v-if="paymentform" class="flex items-center">
        <div class="w-full p-6">
          <h2 class="text-center text-black font-bold text-2xl uppercase my-6">
            Tukar Poin
          </h2>
          <div
            class="bg-white p-10 rounded-lg shadow-container md:w-3/4 mx-auto lg:w-1/2"
          >
            <form action="" :validation-schema="schema" @submit="addFormData">
              <div class="mb-5">
                <label class="block mb-2 font-bold text-gray-600 text-lg"
                  >Email</label
                >
                <div class="bg-gray-400 p-2 text-lg">
                  {{ userData.email }}
                </div>
              </div>
              <div class="mb-5">
                <div class="flex gap-2">
                  <input
                    type="radio"
                    value="Gopay"
                    v-model="formData.picked"
                    class="focus:outline-none"
                  />
                  <label>Gopay</label>

                  <input
                    type="radio"
                    value="Ovo"
                    v-model="formData.picked"
                    class="focus:outline-none"
                  />
                  <label>Ovo</label>
                </div>
              </div>

                <div class="mb-5">
                <label class="block mb-2 font-bold text-gray-600 text-lg"
                  >Nomor Telfon</label
                >
                <input
                  v-model="formData.mobileNumber"
                  type="text"
                  name="mobileNumber"
                  placeholder="Put in your mobile number."
                  class="border border-black shadow p-3 w-full rounded"
                />
              </div>

              <div class="mb-7">
                <label for="twitter" class="block mb-2 font-bold text-gray-600"
                  >Point</label
                >
                <select
                  v-model="formData.selectedPoint"
                  class="border border-black shadow p-3 w-full rounded"
                >
                  <option disabled value="" class="p-1">
                    Please select one
                  </option>
                  <option class="p-1">25</option>
                  <option class="p-1">50</option>
                  <option class="p-1">100</option>
                  <option class="p-1">150</option>
                </select>
              </div>

              <div class="mb-7">
                <div class="flex jutify-between gap-4">
                  <h1>Poin sekarang</h1>
                  <p>{{ checkPoin }}</p>
                </div>
                <div class="flex jutify-between gap-4">
                  <h1>Poin yang dipilih</h1>
                  <p>{{ this.formData.selectedPoint }}</p>
                </div>
                <div class="flex jutify-between gap-4">
                  <h1>Poin</h1>
                  <p>{{ checkPoin - this.formData.selectedPoint }}</p>
                </div>
              </div>
            </form>
            <button
              type="submit"
              @click="addFormData"
              class="block w-full bg-black text-white font-bold p-3 rounded-lg"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div v-if="feedback" class="flex items-center h-screen bg-gray-600 py-4">
        <div class="w-full p-4">
          <h2 class="text-center text-white font-bold text-2xl uppercase mb-10">
            Fill out feedback form
          </h2>
          <div
            class="bg-white shadow-xl p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2"
          >
            <div class="mb-7">
              <label for="email" class="block mb-2 font-bold text-gray-600"
                >Rating</label
              >
              <div class="flex gap-2">
                <input
                  type="radio"
                  value="1"
                  v-model="feedbackForm.rating"
                  class="focus:outline-none"
                />
                <label>1(Baik)</label>

                <input
                  type="radio"
                  value="2"
                  v-model="feedbackForm.rating"
                  class="focus:outline-none"
                />
                <label>2(Sedang)</label>

                <input
                  type="radio"
                  value="3"
                  v-model="feedbackForm.rating"
                  class="focus:outline-none"
                />
                <label>3(Buruk)</label>
              </div>
            </div>
            <div class="mb-7">
              <label for="message" class="block mb-2 font-bold text-gray-600"
                >Message</label
              >
              <textarea
                v-model="feedbackForm.message"
                id="message"
                name="message"
                placeholder="Put in your feedback message."
                class="border border-black shadow p-3 w-full rounded"
              ></textarea>
            </div>
            <button
              type="submit"
              @click="addFeedbackData"
              class="block w-full bg-black text-white font-bold p-3 rounded-lg"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from 'firebase';
import { db } from '../includes/firebase';

export default {
  name: 'TukarBotol',
  components: {},
  data() {
    return {
      schema: {
        mobileNumber: 'required|min:10|max:12',
      },
      formData: {
        email: '',
        mobileNumber: 0,
        picked: '',
        selectedPoint: 0,
      },
      feedbackForm: {
        email: '',
        message: '',
        rating: '',
      },
      userData: {
        admin: 0,
        name: '',
        email: '',
        jumlahPoin: 0,
      },
      feedback: false,
      paymentform: true,
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
        return this.totalPoin;
      }
      return 0;
    },
  },
  methods: {
    addFormData() {
      let x = 0;
      x = Number(this.formData.selectedPoint);
      const dataTranksaksi = db
        .collection('users')
        .doc(firebase.auth().currentUser.uid);

      dataTranksaksi
        .update({
          historyForm: firebase.firestore.FieldValue.arrayUnion({
            email: firebase.auth().currentUser.email,
            mobileNumber: this.formData.mobileNumber,
            picked: this.formData.picked,
            selectedPoint: x,
          }),
        })
        .then(() => {
          console.log('Document updated');
          alert('berhasil submit form');
          this.feedback = true;
          this.paymentform = false;
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    },
    addFeedbackData() {
      const dataTranksaksi = db
        .collection('users')
        .doc(firebase.auth().currentUser.uid);

      dataTranksaksi
        .update({
          feedbackForm: firebase.firestore.FieldValue.arrayUnion({
            email: firebase.auth().currentUser.email,
            message: this.feedbackForm.message,
            rating: this.feedbackForm.rating,
          }),
        })
        .then(() => {
          console.log('Document updated');
          alert('terimakasih atas feedback anda');
          this.feedback = false;
          this.paymentform = true;
          this.$router.push({ name: 'home' });
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    },
  },
};
</script>

<style>
.contaienr-center {
  text-align: -webkit-center;
}

.shadow-container {
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
}
</style>
