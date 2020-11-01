<template>
  <div id="snackbar" v-bind:class="{ show: isShow }">{{ message }}</div>
</template>

<script>
export default {
  name: "Snackbar",
  props: ["message"],
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    show() {
      this.isShow = true;
      var self = this;
      
      setTimeout(function() {
        self.isShow = false;
      }, 3000);
    },
  },
};
</script>

<style lang="scss" scoped>
#snackbar {
  visibility: hidden;
  min-width: 250px; 
  margin-left: -125px; 
  background-color: $color_secondary;
  color: #fff; 
  text-align: center;
  border-radius: 2px; 
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  bottom: 30px;

  &.show {
    visibility: visible;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
  }
}

/* Animations to fade the snackbar in and out */
@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}
</style>
