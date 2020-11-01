<template>
  <div id="pano" ref="googleMap"><p>Street view map.. (click on init button)</p></div>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader";

export default {
  name: "StreetViewMap",

  data() {
    return {
      mapConfig: {
        position: {
          lat: 50.2000003,
          lng: 15.8525732,
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
      svService: null,
    };
  },

  methods: {
    async initMap(apiKey) {
      console.log(apiKey);
      const googleMapApi = await GoogleMapsApiLoader({
        apiKey: "AIzaSyDu3_Dr5AqqF2SwVpUyVeE_E7m3ZNUI49o",
      });
      this.google = googleMapApi;

      this.svService = new this.google.maps.StreetViewService();
      this.panorama = new this.google.maps.StreetViewPanorama(
        this.$refs.googleMap,
        this.mapConfig
      );

      this.panorama.addListener("position_changed", () => {
        this.$emit(
          "position-changed",
          this.panorama.getPosition().lat(),
          this.panorama.getPosition().lng()
        );
        console.log(this.panorama.getPosition().lat() + "");
      });
    },
    changePosition(lat, lng) {
      var coord = this.mapConfig.position;
      if (lat && lng) {
        lat = parseFloat(lat);
        lng = parseFloat(lng);
        if (!isNaN(lat) && !isNaN(lng)) {
          coord = {
            lat: parseFloat(lat),
            lng: parseFloat(lng),
          };
        }
      }
      console.log(coord);
      this.svService.getPanorama(
        {
          location: coord,
          radius: 200,
        },
        this.processSVData
      );
    },
    processSVData(data, status) {
      //   console.log(data);
      //   console.log(status);
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
  },
};
</script>

<style lang="scss">
#pano {
  display: flex;
  width: 1024px;
  min-width: 1024px;
  height: 800px;
  min-height: 800px;
  background: $color_light;
  color: $color_text_gray;

  p{
    margin: auto;
  }
}

#pano .gm-style > div {
  display: none !important;
}

#pano .gm-style > div:first-child {
  display: block !important;
}
</style>
