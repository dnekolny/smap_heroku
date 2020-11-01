<template>
  <div class="spots">
    <h3>Spots</h3>
    <!-- <MutationTest /> -->
    <SpotList />
  </div>
</template>

<script>
// @ is an alias to /src
import SpotList from "../components/SpotList";
// import MutationTest from '../components/MutationTest'

export default {
  name: "Home",
  components: {
    SpotList,
    // MutationTest
  },
};
</script>
