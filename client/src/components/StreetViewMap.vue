<template>
  <div id="pano" ref="googleMap"></div>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader";

export default {
  name: "StreetViewMap",

  data() {
    return {
      apiKey: "AIzaSyCOVFYj3-uJxXDStCkfJM4ekF5GOojaQG4",
      mapConfig: {
        position: {
          lat: 42.345573,
          lng: -71.098326,
        },
        addressControl: false,
        zoomControl: false,
        fullscreenControl: false,
        linksControl: false,
        panControl: false,
        enableCloseButton: false,
        motionTrackingControl: false,
      },
      panorama: null,
      google: null,
    };
  },

  async mounted() {
    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey,
    });
    this.google = googleMapApi;
    this.initializeMap();
  },

  methods: {
    processSVData(data, status) {
      console.log(data);
      console.log(status);
      if (status === "OK") {
        const location = data.location;

        this.panorama.setPano(location.pano);
        this.panorama.setPov({
          heading: Math.floor(Math.random() * 361), //0 - 360
          pitch: -10,
        });
        this.panorama.setVisible(true);
      } else {
        console.error("Street View data not found for this location.");
      }
    },
    initializeMap() {
      const panoContainer = this.$refs.googleMap;

      const coord = {
        lat: 50.08394,
        lng: 15.67348,
      };
      const sv = new this.google.maps.StreetViewService();
      this.panorama = new this.google.maps.StreetViewPanorama(
        panoContainer,
        this.mapConfig
      );

      // Set the initial Street View camera to the center of the map
      sv.getPanorama(
        {
          location: coord,
          radius: 200,
        },
        this.processSVData
      );
    },
  },
};
</script>

<style lang="scss">
#pano {
  width: 1024px;
  max-width: 100%;
  height: 800px;
  max-height: 100%;
  border: 3px solid #f00;
}
</style>
