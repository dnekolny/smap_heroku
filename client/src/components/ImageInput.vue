<template>
  <div>
    <input
      type="file"
      name="imgInput"
      id="imgInput"
      accept="image/*"
      @change="ImageChange"
      data-buttonText="Your label here."
    />
  </div>
</template>

<script>
var reader = null;

export default {
  name: "ImageInput",

  data() {
    return {
      image: null,
    };
  },

  mounted() {
    reader = new FileReader();
  },

  methods: {
    ImageChange(event) {
      this.image = event.target.files[0];
      //console.log(this.image);

      reader.addEventListener(
        "load",
        this.OnReaderLoad,
        /*function() {
          // convert image file to base64 string
          console.log(reader.result);
        },*/
        false
      );
      reader.readAsDataURL(this.image);
    },
    OnReaderLoad() {
      //console.log(reader.result);
      this.$emit("imgInputChanged", reader.result);
    },
  },
};
</script>
