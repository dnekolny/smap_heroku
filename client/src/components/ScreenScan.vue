<template>
  <div>
    <button v-if="scanning" class="btn btn--danger" @click="stopScanning">
      Stop scanning
    </button>
    <button v-else class="btn btn--secondary" @click="startScanning">
      Start scanning
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
      scanning: false,
      scanBtnTitle: "Start scanning",
      captureBtnDisabled: true,
      mediaStream: null,
      imageCapture: null,
    };
  },

  methods: {
    async startScanning() {
      try {
        const displayMediaOptions = {
          video: {
            cursor: "never",
          },
          audio: false,
        };

        this.mediaStream = await navigator.mediaDevices.getDisplayMedia(
          displayMediaOptions
        );

        const track = this.mediaStream.getVideoTracks()[0];
        this.imageCapture = new ImageCapture(track);

        this.scanning = true;
      } catch (err) {
        console.log("ERROR in startScanning():");
        console.log(err);
      }
    },

    async stopScanning() {
      try{
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.scanning = false;
      }
      catch(err){
        console.log("ERROR in stopScanning()");
        console.log(err);
      }
    },

    captureImage() {
      this.imageCapture
        .grabFrame()
        .then((imageBitmap) => {
          const canvas = document.querySelector("#screenCanvas");
          this.drawCanvas(canvas, imageBitmap);
          var url = canvas.toDataURL("image/png");
          this.$emit("imgCaptured", url);
        })
        .catch((error) => console.log(error));
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
