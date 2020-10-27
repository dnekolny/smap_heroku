<template>
  <div class="home">
    <StreetViewMap />
    <div>
      <button class="btn btn--primary" @click="btnSaveClick">Save</button>
    </div>
    <ScreenScan v-on:imgCaptured="imgCaptured" />
    <div>
      <canvas id="screenCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import StreetViewMap from "../components/StreetViewMap";
import ScreenScan from "../components/ScreenScan";

export default {
  name: "Home",
  components: {
    StreetViewMap,
    ScreenScan,
  },

  mounted() {
    var canvas = document.getElementById("screenCanvas");
    canvas.height = window.screen.height;
    canvas.width = window.screen.width;
    console.log(canvas);
  },

  methods: {
    btnSaveClick() {
      console.log("btn CLICKED");
    },
    imgCaptured(img) {
      console.log(img);
    },
  },
};
</script>

<style lang="scss">
.home {
  display: flex;
  flex-wrap: wrap;
}
#screenCanvas {
  width: 1024px;
  max-width: 100%;
  height: 768px;
  max-height: 100%;
  display: none;
}
</style>
