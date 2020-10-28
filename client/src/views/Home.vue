<template>
  <div class="home">
    <StreetViewMap />
    <div class="rightPanel">
      <h4>Výběr obrázku:</h4>
      <div class="mb-3 ml-2">
        <label>Ze Street View:</label>
        <ScreenScan v-on:imgCaptured="imgChanged" />
      </div>
      <div class="mb-3 ml-2">
        <label for="imgInput">Z disku:</label>
        <ImageInput v-on:imgInputChanged="imgChanged" />
      </div>
      <img id="preview" :src="image" alt="Image preview...">
      <div class="text-center">
        <button
          v-bind:disabled="!image"
          class="btn btn--lg btn--secondary"
          @click="btnSaveClick"
        >
          Save
        </button>
      </div>
    </div>

    <div>
      <canvas id="screenCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import StreetViewMap from "../components/StreetViewMap";
import ScreenScan from "../components/ScreenScan";
import ImageInput from "../components/ImageInput";

export default {
  name: "Home",
  components: {
    StreetViewMap,
    ScreenScan,
    ImageInput
  },

  data() {
    return {
      image: null,
    };
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
    imgChanged(img) {
      this.image = img;
      console.log(this.image);
    },
  },
};
</script>

<style lang="scss">

.home {
  display: flex;
  flex-wrap: nowrap;
}
#screenCanvas {
  width: 1024px;
  max-width: 100%;
  height: 800px;
  max-height: 100%;
  display: none;
}

#preview {
  width: 100%;
}

.rightPanel {
  margin: 1rem 1.5rem;
}
</style>
