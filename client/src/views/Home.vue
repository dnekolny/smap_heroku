<template>
  <div class="home">
    <!-- STREET VIEW -->
    <StreetViewMap
      ref="map"
      v-on:position-changed="onStreetViewPositionChanged"
    />

    <div class="rightPanel">
      <h4>Choose image:</h4>

      <!-- SCREEN SCAN -->
      <div class="mb-3 ml-2">
        <label>Street View:</label>
        <ScreenScan
          v-on:scanningStart="onScanningStart"
          v-on:imgCaptured="imgChanged"
        />
      </div>

      <!-- IMAGE INPUT -->
      <div class="mb-3 ml-2">
        <label for="imgInput">Disk:</label>
        <ImageInput v-on:imgInputChanged="imgChanged" />
      </div>

      <!-- PREVIEW -->
      <img
        id="preview"
        v-if="this.spot.img.data"
        :src="this.spot.img.data"
        alt="Image preview..."
      />
      <div id="emptyPreview" v-else><p>Image Preview...</p></div>

      <!-- COORDS -->
      <table class="table-coords">
        <tr>
          <td><label for="latInput">Latitude:</label></td>
          <td><label for="lngInput">Longitude:</label></td>
          <td rowspan="2">
            <button
              class="btn btn--light"
              @click="btnRefreshMapClick"
              v-bind:disabled="!isMapInit"
            >
              Refresh Map
            </button>
          </td>
        </tr>
        <tr>
          <td>
            <input
              type="number"
              class="w-100"
              name="latInput"
              v-model="spot.lat"
            />
          </td>
          <td>
            <input
              type="number"
              class="w-100"
              name="lngInput"
              v-model="spot.lng"
            />
          </td>
        </tr>
      </table>

      <!-- CATEGORIES -->
      <CategoryButtonList
        v-bind:containers="spot.containers"
        v-on:container-changed="onContainerChanged"
      />

      <!-- SAVE & CANVEL -->
      <div class="text-center">
        <button
          v-bind:disabled="!this.spot.img.data"
          class="btn btn--lg btn--secondary"
          @click="btnSaveClick"
        >
          Save
        </button>
        <button class="btn btn--light" @click="btnCancelClick">
          Cancel
        </button>
      </div>
    </div>

    <Snackbar ref="snackbar" message="Spot Succesfully Saved!" />

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
import Snackbar from "../components/Snackbar";
import ContainerType from "../enums/ContainerType";

export default {
  name: "Home",
  components: {
    StreetViewMap,
    ScreenScan,
    ImageInput,
    CategoryButtonList,
    Snackbar,
  },

  data() {
    return {
      googleApiKey: "AIzaSyDu3_Dr5AqqF2SwVpUyVeE_E7m3ZNUI49o",
      isMapInit: false,
      spot: {
        name: null,
        lat: 0.0,
        lng: 0.0,
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
    onScanningStart() {
      this.$refs.map.initMap(this.googleApiKey);
      this.isMapInit = true;
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
          this.$refs.snackbar.show();
          this.clearSpot();
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    btnCancelClick() {
      this.clearSpot();
    },
    btnRefreshMapClick() {
      this.$refs.map.changePosition(this.spot.lat, this.spot.lng);
    },
    onStreetViewPositionChanged(lat, lng) {
      this.spot.lat = lat;
      this.spot.lng = lng;
    },
    clearSpot() {
      this.spot = {
        name: null,
        lat: null,
        lng: null,
        img: {
          data: null,
          contentType: null,
        },
        containers: [],
      };
      this.initContainers();
    },
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

#emptyPreview {
  display: flex;
  width: 100%;
  height: 300px;
  background: $color_light;
  color: $color_text_gray;
  margin-bottom: 0.8rem;

  p {
    margin: auto auto;
  }
}

.rightPanel {
  margin: 1rem 0 1rem 1rem;
}

.table-coords {
  width: 100%;
  margin-bottom: 0.7rem;
  border-spacing: 0;

  td,
  th {
    padding: 0 5px;
  }
}
</style>
