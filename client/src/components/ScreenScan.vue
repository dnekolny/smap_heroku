<template>
  <div class="d-inline-flex w-100">
    <button v-if="scanning" class="btn btn--danger" @click="stopScanning">
      Stop scanning
    </button>
    <button v-else class="btn btn--secondary" @click="startScanning">
      Init map & Start scanning
    </button>
    <button
      class="btn"
      v-bind:class="{ 'btn--light': !scanning, 'btn--secondary': scanning }"
      @click="captureImage"
      v-bind:disabled="!scanning"
    >
      Capture Image
    </button>
  </div>
</template>

<script>
export default {
  name: "ScreenScan",

  data() {
    return {
      displayMediaOptions: {
        video: {
          cursor: "never",
        },
        audio: false,
      },
      scanning: false,
      scanBtnTitle: "Start scanning",
      captureBtnDisabled: true,
      mediaStream: null,
      //track: null,
      imageCapture: null,
      prevImgPromise: null,
    };
  },

  methods: {
    async startScanning() {
      try {
        this.mediaStream = await navigator.mediaDevices.getDisplayMedia(
          this.displayMediaOptions
        );

        const track = this.mediaStream.getVideoTracks()[0];

        track.addEventListener(
          "mute",
          (event) => {
            console.log("TRACK MUTE!");
            console.log(event);
          },
          false
        );

        track.addEventListener(
          "unmute",
          (event) => {
            console.log("TRACK UNMUTE!");
            console.log(event);
          },
          false
        );

        this.imageCapture = new ImageCapture(track);

        this.scanning = true;
        this.$emit("scanningStart");
      } catch (err) {
        console.log("ERROR in startScanning():");
        console.log(err);
      }
    },

    async stopScanning() {
      try {
        this.mediaStream.getTracks().forEach((track) => track.stop());
        this.scanning = false;
      } catch (err) {
        console.log("ERROR in stopScanning()");
        console.log(err);
      }
    },

    async captureImage() {
      console.log(this.imageCapture.track.muted);
      //const promise = this.prevImgPromise;
      //console.log(promise);

      if (
        //!promise &&
        !(
          this.imageCapture.track.readyState != "live" ||
          !this.imageCapture.track.enabled ||
          this.imageCapture.track.muted
        )
      ) {
        this.imageCapture //const imgPromise =
          .grabFrame()
          .then((imageBitmap) => {
            const canvas = document.querySelector("#screenCanvas");
            this.drawCanvas(canvas, imageBitmap);
            var url = canvas.toDataURL("image/png");
            this.$emit("imgCaptured", url);
          })
          // .then(() => {
          //   //this.prevImgPromise = null;
          // })
          .catch((error) => console.error(error));

        //this.prevImgPromise = imgPromise;
      }
    },
    captureImage2() {
      console.log(this.imageCapture.track.muted);

      this.imageCapture
        .takePhoto()
        .then(function(blob) {
          console.log("Took photo:", blob);
        })
        .catch(function(error) {
          console.log("takePhoto() error: ", error);
        });
    },
    drawCanvas(canvas, img) {
      canvas.width = getComputedStyle(canvas).width.split("px")[0];
      canvas.height = getComputedStyle(canvas).height.split("px")[0];
      /*let ratio = Math.min(
        canvas.width / img.width,
        canvas.height / img.height
      );*/
      /*let x = (canvas.width - img.width * ratio) / 2;
      let y = (canvas.height - img.height * ratio) / 2;*/
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      canvas.getContext("2d").drawImage(
        img,
        0,
        0,
        1024, //img.width,
        768, //img.height,
        0, //x,
        0, //y,
        1024, //img.width * ratio,
        768 //img.height * ratio*/
      );
    },
  },
};
</script>
