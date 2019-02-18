<template>
  <div id="coffee-counter">
    <div class="counter-wrapper">
      <div class="counter" ref="counter" style="opacity: 0"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import { bus } from "../main";

export default {
  name: "CoffeCounter",
  props: {
    maxCoffee: Number
  },
  data() {
    return {
      rollStep: 500,
      durationBase: 2000
    };
  },
  computed: {
    ...mapGetters(["dailyCoffeeCount"])
  },
  methods: {
    ...mapActions(["increment"]),
    generateDigits: function(digitLen) {
      for (let i = 0; i <= digitLen; i++) {
        this.$refs.counter.innerHTML +=
          "<div class='counter-digit'>" + i + "</div>";
      }
    },
    calculateOffset: function(number){
      return -(this.rollStep*number);
    },
    calculateDuration: function(number){
      return this.durationBase*number;
    },
    rollTo: function(number, delay=0) {
      const ref = this;
      this.$anime.timeline().add(
        {
          targets: ref.$refs.counter,
          translateY: ref.calculateOffset(number),
          duration: ref.durationBase
        },
        delay
      );
    }
  },
  mounted: function() {
    //generate digits
    this.generateDigits(this.maxCoffee);
    
    //entry animation
    this.$anime({
      targets: ".counter",
      opacity: [{ value: 0 }, { value: 1 }],
      duration: 1500,
      easing: "linear",
      delay: 1300,
      autoplay: true,
      loop: false
    });

    //roll to init value
    this.rollTo(this.dailyCoffeeCount, 0);
  },
  watch: {
    dailyCoffeeCount(newValue, oldValue) {
     this.rollTo(newValue, 3800);
    }
  }
};
</script>

<style scoped>
#coffee-counter {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.counter {
  font-family: "Source Sans Pro", sans-serif;

  font-size: 530px;
  font-weight: 900;

  color: rgba(96, 93, 117, 0.5);
  position: relative;
  top: 89px;
}
.counter-wrapper {
  text-align: center;
  position: relative;
  top: -146px;
  z-index: 0;
  line-height: 500px;
}
</style>
