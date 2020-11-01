<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Add</router-link> |
      <router-link to="/spots">List</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

*{
  margin: 0;
  padding: 0;
}

h1, h2, h3, h4, h5, h6{
  margin: 0.5rem 0;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  float: right;
  padding: 10px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

@import '@/scss/btns';

</style>
