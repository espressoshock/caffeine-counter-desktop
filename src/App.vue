<template>
  <div id="app">
    <coffee-counter v-bind:maxCoffee="20"></coffee-counter>
    <increment-coffee-btn></increment-coffee-btn>
    <bottom-bar></bottom-bar>
  </div>
</template>


<script>
import BottomBar from "../src/components/bottom-bar";
import CoffeeCounter from "../src/components/coffee-counter";
import IncrementCoffeeBtn from "../src/components/increment-coffee-btn";

import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "app",
  data() {
    return {};
  },
  mounted: function() {},
  components: {
    "bottom-bar": BottomBar,
    "coffee-counter": CoffeeCounter,
    "increment-coffee-btn": IncrementCoffeeBtn
  },
  methods: {}
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:700,900");

html,
body,
#app {
  font-family: "Source Sans Pro", sans-serif;
  margin: 0;
  padding: 0;
  user-select: none;
}
#app {
  overflow: hidden;
  width: 413px;
  height: 461px;
  background: #4a475f;
  position: relative;
}
</style>
