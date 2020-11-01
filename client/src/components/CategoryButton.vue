<template>
  <div
    class="categoryBtn"
    v-bind:class="'category-' + container.contType"
    @click="onClick"
    @contextmenu.prevent="handler"
  >
    <div v-bind:class="'category-' + container.contType + '__img'"></div>
    {{ container.count }}
  </div>
</template>

<script>
//import ContainerType from "../enums/ContainerType";

export default {
  name: "CategoryButton",

  props: ["container"],

  methods: {
    onClick() {
      this.emitContainer(this.container.count + 1);
    },
    handler(e) {
      e.preventDefault();
      if (this.container.count > 0)
        this.emitContainer(this.container.count - 1);
    },
    emitContainer(newCount) {
      var newCont = {
        contType: this.container.contType,
        count: newCount,
        probability: this.container.probability,
      }
      this.$emit("container-changed", newCont);
    },
  },
};
</script>

<style lang="scss" scoped>
.categoryBtn {
  width: 2rem;
  padding: 0.5rem 0.8rem;
  margin: 0.16rem;
  color: $color_text_white;
  background: $color_primary;
  border: none;
  border-radius: 0.25rem;
  font-size: 0.95rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
}
$categories: "PLASTIC", "COLOR_GLASS", "CLEAR_GLASS", "PAPER", "METAL",
  "TEXTILE", "BIO", "CARTONS", "OIL", "ELECTRO", "MIXED";

$categoryColorList: rgba(255, 255, 0, 0.8), rgba(0, 128, 0, 0.8),
  rgba(243, 243, 243, 0.8), rgba(0, 0, 255, 0.8), rgba(128, 128, 128, 0.8),
  rgba(240, 28, 159, 0.8), rgba(156, 72, 23, 0.8), rgba(255, 166, 0, 0.8),
  rgba(230, 58, 15, 0.8), rgba(255, 0, 0, 0.8), rgba(0, 0, 0, 0.8);

$categoryImgList: "plastic.png", "color_glass.png", "clear_glass.png",
  "paper.png", "metal.png", "textile.png", "bio.png", "cartons.png", "oil.png",
  "electro.png", "mixed.png";

//@for $i from 0 through 10 {
//@each $cat in $categories {
@for $i from 1 through length($categories) {
  $cat: nth($categories, $i);

  .category-#{$cat} {
    background: nth($categoryColorList, $i);

    @if $i == 0 or $i == 2 {
      color: $color_text_black;
    } @else {
      color: $color_text_white;
    }

    &__img {
      background-image: url("../assets/images/"+nth($categoryImgList, $i));
      background-size: contain;
      width: 30px;
      height: 30px;
    }

    &:hover {
      background: darken(nth($categoryColorList, $i), $bg_hover_darken);
    }
  }
}
</style>
