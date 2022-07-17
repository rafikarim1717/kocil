<template>
  <!-- eslint-disable max-len -->
  <section class="">
    <div
      v-if="paymentform"
      class="min-h-screen flex items-center bg-gray-800 py-6"
    >
      <div class="w-full p-6">
        <h2 class="text-center text-white font-bold text-2xl uppercase mb-10">
          Fill out payment form
        </h2>
        <div
          class="bg-white shadow-xl p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2"
        >
          <form action="" :validation-schema="schema" @submit="addFormData">
            <div class="mb-5">
              <label class="block mb-2 font-bold text-gray-600">Email</label>
              <input
                v-model="formData.email"
                type="email"
                name="email"
                placeholder="email"
                class="border border-black shadow p-3 w-full rounded"
              />
            </div>
            <div class="mb-5">
              <label class="block mb-2 font-bold text-gray-600"
                >Mobile Number</label
              >
              <input
                v-model="formData.mobileNumber"
                type="text"
                name="mobileNumber"
                placeholder="Put in your mobile number."
                class="border border-black shadow p-3 w-full rounded"
              />
            </div>
            <div class="mb-5">
              <label for="twitter" class="block mb-2 font-bold text-gray-600"
                >Type</label
              >
              <div class="flex gap-2">
                <input type="radio" value="Gopay" v-model="formData.picked" />
                <label>Gopay</label>

                <input type="radio" value="Ovo" v-model="formData.picked" />
                <label>Ovo</label>

                <label> (1P = 1RP) </label>
              </div>
            </div>

            <div class="mb-7">
              <label for="twitter" class="block mb-2 font-bold text-gray-600"
                >Point</label
              >
              <select
                v-model="formData.selectedPoint"
                class="border border-black shadow p-3 w-full rounded"
              >
                <option disabled value="">Please select one</option>
                <option>25,000</option>
                <option>50,000</option>
                <option>100,000</option>
                <option>150,000</option>
              </select>
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
  </section>

  <section class="">
    <div
      v-if="feedback"
      class="min-h-screen flex items-center bg-gray-800 py-6"
    >
      <div class="w-full p-4">
        <h2 class="text-center text-white font-bold text-2xl uppercase mb-10">
          Fill out feedback form
        </h2>
        <div
          class="bg-white shadow-xl p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2"
        >
          <div class="mb-5">
            <label for="email" class="block mb-2 font-bold text-gray-600"
              >Rating</label
            >
            <div class="flex gap-2">
              <input type="radio" value="1" v-model="feedbackForm.rating" />
              <label>1(Baik)</label>

              <input type="radio" value="2" v-model="feedbackForm.rating" />
              <label>2(Sedang)</label>

              <input type="radio" value="3" v-model="feedbackForm.rating" />
              <label>3(Buruk)</label>
            </div>
          </div>
          <div class="mb-5">
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
        rating: 0,
      },
      feedback: false,
      paymentform: true,
    };
  },
  computed: {},
  methods: {
    addFormData() {
      const dataTranksaksi = db
        .collection('users')
        .doc(firebase.auth().currentUser.uid);

      dataTranksaksi
        .update({
          historyForm: firebase.firestore.FieldValue.arrayUnion({
            email: firebase.auth().currentUser.email,
            mobileNumber: this.formData.mobileNumber,
            picked: this.formData.picked,
            selectedPoint: this.formData.selectedPoint,
          }),
        })
        .then(() => {
          console.log('Document updated');
          this.feedback = true;
          this.paymentform = false;
          alert('berhasil submit form');
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
            email: this.feedbackForm.email,
            message: this.feedbackForm.message,
          }),
        })
        .then(() => {
          console.log('Document updated');
          this.feedback = false;
          this.paymentform = true;
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
