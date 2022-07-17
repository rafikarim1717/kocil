<template>
  <!-- eslint-disable max-len -->
  <main>
    <!-- Introduction -->
    <section class="container mx-auto my-12 px-5">
      <div class="p-6 flex justify-center">
        <h3 class="text-3xl text-gray-700 font-bold -ml-3">
          Form Exchange User
        </h3>
      </div>
      <div class="p-5">
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full border text-center">
                  <thead class="border-b">
                    <tr>
                      <th
                        scope="col"
                        class="text-sm font-medium bg-gray-800 text-white px-6 py-4 border-r"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium bg-gray-800 text-white px-6 py-4 border-r"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium bg-gray-800 text-white px-6 py-4 border-r"
                      >
                        Mobile Number
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium bg-gray-800 text-white px-6 py-4 border-r"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium bg-gray-800 text-white px-6 py-4"
                      >
                        Point
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in userData.historyForm"
                      :key="item.id"
                      class="border-b"
                    >
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r"
                      >
                        {{ index + 1 }}
                      </td>
                      <td
                        class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r"
                      >
                        {{ item.email }}
                      </td>
                      <td
                        class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r"
                      >
                        {{ item.mobileNumber }}
                      </td>
                      <td
                        class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r"
                      >
                        {{ item.picked }}
                      </td>
                      <td
                        class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                      >
                        {{ item.selectedPoint }}
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
    <section class="container mx-auto my-12 px-5">
      <div class="p-6 flex justify-center">
        <h3 class="text-3xl text-gray-700 font-bold -ml-3">
          Form Feedback User
        </h3>
      </div>
      <div class="p-5">
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full border text-center">
                  <thead class="border-b">
                    <tr>
                      <th
                        scope="col"
                        class="text-sm font-medium bg-gray-800 text-white px-6 py-4 border-r"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium bg-gray-800 text-white px-6 py-4 border-r"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium bg-gray-800 text-white px-6 py-4 border-r"
                      >
                        Message
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium bg-gray-800 text-white px-6 py-4"
                      >
                        Rating
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in userData.feedbackForm"
                      :key="item.id"
                      class="border-b"
                    >
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r"
                      >
                        {{ index + 1 }}
                      </td>
                      <td
                        class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r"
                      >
                        {{ item.email }}
                      </td>
                      <td
                        class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r"
                      >
                        {{ item.message }}
                      </td>
                      <td
                        class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap border-r"
                      >
                        {{ item.rating }}
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
  </main>
</template>

<script>
import { db } from '../includes/firebase';

export default {
  name: 'AdminPage',
  components: {},
  data() {
    return {
      userData: {
        historyForm: [],
        feedbackForm: [],
      },
    };
  },
  created() {
    const query = db
      .collection('users')
      .where('historyForm', '!=', false)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const newData = doc.data();
          this.userData.historyForm = newData.historyForm;
          console.log(this.userData);
          return query;
        });
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
    const queryFeedback = db
      .collection('users')
      .where('historyForm', '!=', false)
      .get()
      .then((queryFeedbackSnapshot) => {
        queryFeedbackSnapshot.forEach((doc) => {
          // doc.data() is never undefined for queryFeedback doc snapshots
          const newData = doc.data();
          this.userData.feedbackForm = newData.feedbackForm;
          console.log(this.userData);
          return queryFeedback;
        });
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
    // const doesExist = (userData, value) => {
    //   for (const key in userData) {
    //     if (userData[key] === value) {
    //       return true;
    //     }
    //   }
    //   return false;
    // };
    // const exists = doesExist(userData, historyForm);
    // return exists;
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
h3 {
  text-align: -webkit-center;
}
</style>
