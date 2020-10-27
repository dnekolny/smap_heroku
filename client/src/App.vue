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
$color_primary: rgb(47, 89, 204);
$color_primary_dark: rgb(32, 74, 187);
$color_secondary: rgb(83, 202, 99);
$color_secondary_dark: rgb(45, 180, 63);
$color_light: rgb(233, 233, 233);
$color_lighter: rgb(238, 238, 238);

$color_text_heading: rgb(27, 27, 27);
$color_text_primary: rgb(27, 27, 27);
$color_text_light: rgb(233, 233, 233);
$color_text_btn: rgb(27, 27, 27);
$color_text_btn_light: rgb(255, 255, 255);

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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

.btn {
  display: inline-block;
  padding: 0.4rem 1rem;
  margin: 0.2rem;
  color: $color_text_btn_light;
  background: $color_primary;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
  cursor: pointer;

  &--primary {
    background: $color_primary;
    &:hover {
      background: $color_primary_dark;
    }
  }

  &--light {
    color: $color_text_btn;
    background: $color_lighter;
    &:hover {
      background: $color_light;
    }
  }

  &--secondary {
    background: $color_secondary;
    &:hover {
      background: $color_secondary_dark;
    }
  }
}
</style>
