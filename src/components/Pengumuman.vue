<template>
  <!-- eslint-disable max-len -->
  <section class="container mx-auto px-5 my-12 container-pengumuman">
    <div
      class="flex justify-center max-w-xl self-center border shadow-pengumuman"
    >
      <div
        id="carouselExampleCaptions"
        class="carousel slide relative"
        data-bs-ride="carousel"
      >
        <div
          class="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4"
        >
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner relative w-full overflow-hidden">
          <div class="carousel-item active float-left w-full">
            <img src="@/assets/images/banner1.png" class="object-cover" alt="..." />
            <div
              class="carousel-caption hidden md:block absolute text-center"
            ></div>
          </div>
          <div class="carousel-item float-left w-full">
            <img src="@/assets/images/banner2.png" class="object-cover" alt="..." />
            <div
              class="carousel-caption hidden md:block absolute text-center"
            ></div>
          </div>
          <div class="carousel-item float-left w-full">
            <img src="@/assets/images/banner3.png" class="object-cover" alt="..." />
            <div
              class="carousel-caption hidden md:block absolute text-center"
            ></div>
          </div>
        </div>
        <button
          class="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            class="carousel-control-prev-icon inline-block bg-no-repeat"
            aria-hidden="true"
          ></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            class="carousel-control-next-icon inline-block bg-no-repeat"
            aria-hidden="true"
          ></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  /* eslint-disable */
  name: 'Pengumuman',
  data() {
    return {
      totalVuePackages: null,
      results: [],
      info: null,
      loading: true,
      errored: false,
    };
  },
  mounted() {
    axios
      .get(
        'https://api.thingspeak.com/channels/1774900/feeds.json?api_key=S3BPB72OYPL7KJKL&results=2'
      )
      .then(response => {
        this.info = response.data;
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
  methods: {
    next() {
      const first = this.slides.shift();
      this.slides = this.slides.concat(first);
    },
    previous() {
      const last = this.slides.pop();
      this.slides = [last].concat(this.slides);
    },
  },
};
</script>

<style>
</style>
