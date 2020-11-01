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
      <img
        id="preview"
        v-if="this.spot.img.data"
        :src="this.spot.img.data"
        alt="Image preview..."
      />
      <CategoryButtonList
        v-bind:containers="spot.containers"
        v-on:container-changed="onContainerChanged"
      />
      <div class="text-center">
        <button
          v-bind:disabled="!this.spot.img.data"
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
import Vue from "vue";
import StreetViewMap from "../components/StreetViewMap";
import ScreenScan from "../components/ScreenScan";
import ImageInput from "../components/ImageInput";
import CategoryButtonList from "../components/CategoryButtonList";
import ContainerType from "../enums/ContainerType";

export default {
  name: "Home",
  components: {
    StreetViewMap,
    ScreenScan,
    ImageInput,
    CategoryButtonList,
  },

  data() {
    return {
      spot: {
        name: null,
        lat: null,
        lng: null,
        img: {
          data: null,
          contentType: null,
        },
        containers: [],
      },
    };
  },

  mounted() {
    this.initContainers();

    //nastavuje velikost canvasu na velikost obrazovky
    var canvas = document.getElementById("screenCanvas");
    canvas.height = window.screen.height;
    canvas.width = window.screen.width;
  },

  methods: {
    //vygeneruje všechny typy kontejnerů s počtem 0
    initContainers() {
      Object.keys(ContainerType).map((key) => {
        this.spot.containers = [
          ...this.spot.containers,
          {
            contType: key,
            count: 0,
            probability: 1,
          },
        ];
      });
    },

    imgChanged(img) {
      this.spot.img.data = img;
    },
    onContainerChanged(container) {
      const index = this.spot.containers
        .map((c) => c.contType)
        .indexOf(container.contType);
      if (index >= 0)
        //this.spot.containers[index] = container;
        Vue.set(this.spot.containers, index, container);
    },
    btnSaveClick() {
      console.log("btn SAVE CLICKED");
      
      this.$apollo
        .mutate({
          // Query
          mutation: require("../graphql/AddSpot.gql"),
          // Parameters
          variables: {
            spot: this.spot,
          },
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
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
  margin: 1rem 0 1rem 1rem;
}
</style>
