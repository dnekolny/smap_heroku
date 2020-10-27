<template>
  <div>
    <button class="btn btn--secondary" @click="onScanBtnClicked">{{ scanBtnTitle }}</button>
    <button class="btn btn--light" @click="captureImage" :disabled="captureBtnDisabled">
      Capture Image
    </button>
  </div>
</template>

<script>
export default {
  name: "ScreenScan",

  data() {
    return {
      scanBtnTitle: "Start scanning",
      onScanBtnClicked: this.btnStartScanClick,
      captureBtnDisabled: true,
      mediaStream: null,
      imageCapture: null,
    };
  },

  methods: {
    async btnStartScanClick() {
      await this.startScanning();
      this.captureBtnDisabled = false;
      this.scanBtnTitle = "Stop scanning";
      this.onScanBtnClicked = this.btnStopScanClick;
    },

    async btnStopScanClick() {
      await this.stopScanning();
      this.captureBtnDisabled = true;
      this.scanBtnTitle = "Start scanning";
      this.onScanBtnClicked = this.btnStartScanClick;
    },

    async startScanning() {
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
      console.log("TRACK:");
      console.log(track);

      try {
        this.imageCapture = new ImageCapture(track);
        console.log("IMAGE CAPTURE:");
        console.log(this.imageCapture);
      } catch (err) {
        console.log("ERROR - new ImageCapture(track):");
        console.log(err);
      }
    },

    async stopScanning() {},

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
      canvas
        .getContext("2d")
        .drawImage(
          img,
          0,
          0,
          1024,//img.width,
          768,//img.height,
          0,//x,
          0,//y,
          1024,//img.width * ratio,
          768//img.height * ratio*/
        );
    },
  },
};
</script>
