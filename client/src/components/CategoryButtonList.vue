<template>
  <div class="categories">
    <CategoryButton
      v-for="container in containers"
      v-bind:key="container.contType"
      v-bind:container="container"
      v-on:container-changed="onContainerChanged"
    />
  </div>
</template>

<script>
import CategoryButton from "./CategoryButton";

export default {
  name: "CategoryButtonList",
  components: {
    CategoryButton,
  },

  props: ["containers"],

  methods: {
    onContainerChanged(newCont) {
      this.$emit("container-changed", newCont);
    },
  },
};
</script>

<style lang="scss" scoped>
.categories {
  display: flex;
  flex-wrap: wrap;
}
</style>
