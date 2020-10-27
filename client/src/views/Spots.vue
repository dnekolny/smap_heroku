<template>
  <div class="spots">
    <SpotList />
  </div>
</template>

<script>
// @ is an alias to /src
import SpotList from '../components/SpotList'

export default {
  name: 'Home',
  components: {
    SpotList
  }
}
</script>