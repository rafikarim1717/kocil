<template>
  <!-- eslint-disable max-len -->
  <section class="container mx-auto my-6">
    <div class="p-6 flex justify-center">
      <h3 class="text-3xl text-gray-700 font-bold -ml-3">Riwayat Penukaran</h3>
    </div>

    <div class="p-6">
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full border border-black text-center">
                <thead class="border-b border-black">
                  <tr>
                    <th
                      scope="col"
                      class="text-lg font-medium bg-gray-800 text-white px-6 py-4 border-r border-black"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      class="text-lg font-medium bg-gray-800 text-white px-6 py-4 border-r border-black"
                    >
                      Point
                    </th>
                    <th
                      scope="col"
                      class="text-lg font-medium bg-gray-800 text-white px-6 py-4 border-r border-black"
                    >
                      Jumlah-Botol
                    </th>
                    <th
                      scope="col"
                      class="text-lg font-medium bg-gray-800 text-white px-6 py-4"
                    >
                      Waktu
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="border-b border-black"
                    v-for="(value, index) in userDataTranksaksi"
                    :key="value.id"
                  >
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-black"
                    >
                      {{ index + 1 }}
                    </td>
                    <td
                      class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r border-black"
                    >
                      {{ '+' + value.point }}
                    </td>
                    <td
                      class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r border-black"
                    >
                      {{ value.jumlahBotol }}
                    </td>
                    <td
                      class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                    >
                      {{ value.date }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="container mx-auto my-6">
    <div class="p-6 flex justify-center">
      <h3 class="text-3xl text-gray-700 font-bold -ml-3">Riwayat Tranksaksi</h3>
    </div>

    <div class="p-6">
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full border border-black text-center">
                <thead class="border-b border-black">
                  <tr>
                    <th
                      scope="col"
                      class="text-lg font-medium bg-gray-800 text-white px-6 py-4 border-r border-black"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      class="text-lg font-medium bg-gray-800 text-white px-6 py-4 border-r border-black"
                    >
                      mobileNumber
                    </th>
                    <th
                      scope="col"
                      class="text-lg font-medium bg-gray-800 text-white px-6 py-4 border-r border-black"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      class="text-lg font-medium bg-gray-800 text-white px-6 py-4"
                    >
                      Point
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="border-b border-black"
                    v-for="(value, index) in userDataHistory"
                    :key="value.id"
                  >
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-black"
                    >
                      {{ index + 1 }}
                    </td>
                    <td
                      class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r border-black"
                    >
                      {{ value.mobileNumber }}
                    </td>
                    <td
                      class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r border-black"
                    >
                      {{ value.picked }}
                    </td>
                    <td
                      class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                    >
                      {{ value.selectedPoint }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="container mx-auto my-6">
    <div class="p-6 flex justify-center">
      <h3 class="text-3xl text-gray-700 font-bold -ml-3">Riwayat Feedback</h3>
    </div>

    <div class="p-6">
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full border border-black text-center">
                <thead class="border-b border-black">
                  <tr>
                    <th
                      scope="col"
                      class="text-lg font-medium bg-gray-800 text-white px-6 py-4 border-r border-black"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      class="text-lg font-medium bg-gray-800 text-white px-6 py-4 border-r border-black"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      class="text-lg font-medium bg-gray-800 text-white px-6 py-4 border-r border-black"
                    >
                      Message
                    </th>
                    <th
                      scope="col"
                      class="text-lg font-medium bg-gray-800 text-white px-6 py-4"
                    >
                      Rating
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="border-b border-black"
                    v-for="(value, index) in userDataFeedback"
                    :key="value.id"
                  >
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-black"
                    >
                      {{ index + 1 }}
                    </td>
                    <td
                      class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r border-black"
                    >
                      {{ value.email }}
                    </td>
                    <td
                      class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r border-black"
                    >
                      {{ value.message }}
                    </td>
                    <td
                      class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                    >
                      {{ value.rating }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
  name: 'Riwayat',
  components: {},
  data() {
    return {
      userDataHistory: [
        {
          mobileNumber: 0,
          picked: '',
          selectedPoint: 0,
        },
      ],
      userDataFeedback: [
        {
          email: '',
          message: '',
        },
      ],
      userDataTranksaksi: [
        {
          date: '',
          jumlahBotol: 0,
          point: 0,
        },
      ],
    };
  },
  created() {
    const docRef = db.collection('users').doc(firebase.auth().currentUser.uid);

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const newData = doc.data();
          this.userDataTranksaksi = newData.tranksaksi;
          this.userDataFeedback = newData.feedbackForm;
          this.userDataHistory = newData.historyForm;
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.log('Error getting document:', error);
      });
  },
  computed: {},
  methods: {},
};
</script>
