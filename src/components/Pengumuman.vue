<template>
  <!-- eslint-disable max-len -->
  <section class="container mx-auto px-5 my-12 container-pengumuman">
    <div class="flex justify-center max-w-4xl self-center border shadow-pengumuman">
      <div id="carouselExampleCaptions" class="carousel slide relative" data-bs-ride="carousel">
        <div class="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
            aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
            aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
            aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner relative w-full overflow-hidden">
          <div class="carousel-item active relative float-left w-full">
            <img src="https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg" class="object-cover " alt="..." />
            <div class="carousel-caption hidden md:block absolute text-center">
              <h5 class="text-xl">First slide label</h5>
            </div>
          </div>
          <div class="carousel-item relative float-left w-full">
            <img src="https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg" class="object-cover " alt="..." />
            <div class="carousel-caption hidden md:block absolute text-center">
              <h5 class="text-xl">Second slide label</h5>
            </div>
          </div>
          <div class="carousel-item relative float-left w-full">
            <img src="https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg" class="object-cover " alt="..." />
            <div class="carousel-caption hidden md:block absolute text-center">
              <h5 class="text-xl">Third slide label</h5>

            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
          type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span class="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
          type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span class="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  </section>
  <!-- <section v-if="errored">
    <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
  </section>

  <section v-else class="container mx-auto p-5">
    <div v-if="loading">Loading...</div>

    <div v-else class="currency">
      {{ info }}
    </div>

  </section> -->
</template>

<script>
import axios from 'axios';

export default {
  /* eslint-disable */
  name: 'Pengumuman',
  data() {
    return {
      slides: [
        {
          img: "pengumuman.png",
          id: 1,
        },
        {
          img: "pengumuman-1.png",
          id: 2,
        },
        {
          img: "pengumuman.png",
          id: 3,
        },
        {
          img: "pengumuman-1.png",
          id: 4,
        },
      ],
      totalVuePackages: null,
      results: [],
      info: null,
      loading: true,
      errored: false
    };
  },
  mounted() {
    axios
      .get('https://api.thingspeak.com/channels/1774900/feeds.json?api_key=S3BPB72OYPL7KJKL&results=2')
      .then(response => {
        this.info = response.data
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Gentium+Book+Plus:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&display=swap');

h2 {
  font-family: 'Barlow', sans-serif;
  font-weight: 500;
}

p {
  font-family: 'Gentium Book Plus', serif;
  font-weight: 500;
}

.container-pengumuman{
  text-align: -webkit-center;
}
.shadow-pengumuman{
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
}
</style>
