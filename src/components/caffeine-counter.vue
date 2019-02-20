<template>
  <div id="caffeine-counter">
    <div class="caffeine-title" ref="caffeineTitle">{{caffeineObj.caffeineMessage.message}}</div>
    <div class="roll-counter">
      <div class="roll-counter-wrapper" id="roll-counter1">
        <div class="roll-digit-wrapper" ref="digit1" :style="initPosition(digit1)"></div>
      </div>
      <div class="roll-counter-wrapper" id="roll-counter2">
        <div class="roll-digit-wrapper" ref="digit2" :style="initPosition(digit2)"></div>
      </div>
      <div class="roll-counter-wrapper" id="roll-counter3">
        <div class="roll-digit-wrapper" ref="digit3" :style="initPosition(digit3)"></div>
      </div>
      <div class="roll-counter-wrapper" id="roll-counter4">
        <div class="roll-digit-wrapper" ref="digit4" :style="initPosition(digit4)"></div>
      </div>

      <div class="caffeine-unit" ref="caffeineUnit">{{getCaffeineUnit}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  name: "CaffeineCounter",
  props: {
    initDelay: Number,
    timeOffset: Number,
    digit1: Object,
    digit2: Object,
    digit3: Object,
    digit4: Object,
    caffeineObj: Object
    /* objects passed
    offset: Number,
    totalIter: Number,
    init: Number,
    initDelay: Number,
    timeOffset: Number
    */
  },
  data() {
    return {
      rollStep: 40,

    };
  },
  mounted: function() {

    //init animation
     this.$anime({
      targets: '.caffeine-title',
      translateY: 32,
      opacity: [0,1],
      easing: 'easeOutElastic(1, 0.5)',
      delay: 2600,
      duration: 1500,
      autoplay: true,
      loop: false
    });
     this.$anime({
      targets: '.roll-counter',
      opacity: [0,1],
      top: 40,
      easing: 'easeOutElastic(1, 0.5)',
      delay: 2850,
      duration: 1500,
      autoplay: true,
      loop: false
    });
    

    //generate numbers
    this.generateDigit(this.$refs.digit1, this.digit1.totalIter);
    this.generateDigit(this.$refs.digit2, this.digit2.totalIter);
    this.generateDigit(this.$refs.digit3, this.digit3.totalIter);
    this.generateDigit(this.$refs.digit4, this.digit4.totalIter);

    //roll animation to init
     this.rollTo(this.$refs.digit4, this.digit4, this.initDelay, 0);
    this.rollTo(
      this.$refs.digit3,
      this.digit3,
      this.initDelay + (this.timeOffset * 1 + 30),
      0
    );
    this.rollTo(
      this.$refs.digit2,
      this.digit2,
      this.initDelay + (this.timeOffset * 2 + 12),
      0
    );
    this.rollTo(
      this.$refs.digit1,
      this.digit1,
      this.initDelay + (this.timeOffset * 3 + 45),
      0
    );
    //animate to
  /* this.rollTo(this.$refs.digit4, this.digit4, this.initDelay, 1);
    this.rollTo(
      this.$refs.digit3,
      this.digit3,
      this.initDelay + (this.timeOffset * 1 + 30),
      6
    );
    this.rollTo(
      this.$refs.digit2,
      this.digit2,
      this.initDelay + (this.timeOffset * 2 + 12),
      5
    );
    this.rollTo(
      this.$refs.digit1,
      this.digit1,
      this.initDelay + (this.timeOffset * 3 + 45),
      9
    );*/
  },
  computed: {
    ...mapGetters(["dailyCoffeeCount", "getCaffeine", "getCaffeineUnit"])
    //deprecated
    /*initPosition() {
      return "transform: translateY(" + this.calculateGlobalOffset() + "px)";
    }*/
  },
  
  methods: {
    ...mapActions(["increment"]),
    initPosition: function(digit) {
      return (
        "transform: translateY(" + this.calculateGlobalOffset(digit) + "px)"
      );
    },
    generateDigit: function(el, iter) {
      for (let i = 0; i < iter; i++) {
        for (let j = 0; j <= 9; j++) {
          el.innerHTML += "<div class='roll-digit'>" + j + "</div>";
        }
      }
    },
    calculateGlobalOffset(digit) {
      return -(( (this.rollStep * 10)*digit.offset) + 5);
    },
    calculateOffset(digit, num) {
      return -(-this.calculateGlobalOffset(digit) + (this.rollStep * num));
    },
    rollTo: function(el, digit, delay, num) {
      const ref = this;
      this.$anime.timeline().add(
        {
          targets: el,
          translateY: ref.calculateOffset(digit, num),
          duration: 4000
        },
        delay
      );
    },
    pad: function(number, width, char){
      char = char || '0';
      number = number + '';
      return number.length >= width ? number : new Array(width - number.length + 1).join(char) + number;

    },
    calculateDigitOffsets(caffeine){
      let digits = {};
      //caffeine.padStart(4, '0'); //ES8
      digits.d1 = this.pad(caffeine, 4).charAt(0);
      digits.d2 = this.pad(caffeine, 4).charAt(1);
      digits.d3 = this.pad(caffeine, 4).charAt(2);
      digits.d4 = this.pad(caffeine, 4).charAt(3);
      return digits;

    },
    animateColor: function(target, color){
      this.$anime({
        targets: target,
        color: color,
        easing: 'linear',
      });
    }
  },
  watch: {
    dailyCoffeeCount(newValue, oldValue) {
     let digits = this.calculateDigitOffsets(this.getCaffeine);
     this.rollTo(this.$refs.digit4, this.digit4, 800, digits.d4);
    this.rollTo(
      this.$refs.digit3,
      this.digit3,
      800 + (this.timeOffset * 1 + 30),
      digits.d3
    );
    this.rollTo(
      this.$refs.digit2,
      this.digit2,
      800 + (this.timeOffset * 2 + 12),
      digits.d2
    );
    this.rollTo(
      this.$refs.digit1,
      this.digit1,
      800 + (this.timeOffset * 3 + 45),
      digits.d1
    );
    console.log(digits);
    },
    'caffeineObj.caffeineMessage.message'(newValue, oldValue){
     console.log(newValue);
     let ref = this;
          this.$anime
          .timeline()
          .add({
            targets: '.caffeine-title',
            translateY: [
              {value: 20, easing: "easeOutElastic(1, 0.5)", duration:600}
            ],
            opacity: [1,0],
            easing: 'linear',
            delay: 500,
            duration: 100,
            autoplay: true,
            loop: false,
            complete: function(){
              ref.$refs.caffeineTitle.innerHTML = newValue;
              ref.$refs.caffeineTitle.style.color = ref.caffeineObj.caffeineMessage.color;
            }
          })
           .add({
            targets: '.caffeine-title',
            translateY: [
              {value: 32, easing: "easeOutElastic(1.5, 0.4)", duration:900}
            ],
            opacity: [0,1],
            easing: 'linear',
            delay: 0,
            duration: 100,
            autoplay: true,
            loop: false,
           
          })
          .add({
            targets: '.caffeine-unit',
            color: ref.caffeineObj.caffeineUnit.color,
            easing: 'linear',
            delay: 0,
            duration: 500,
            autoplay: true,
            loop: false,
           
          }, '0');
        //change caffeine unit color
         //this.animateColor(this.$refs.caffeineUnit, "'"+this.caffeineObj.caffeineUnit.color+"'");
           
         
    }
  }
};
</script>

<style scoped>
#caffeine-counter {
  position: absolute;
  left: 0;
  top: 0;
  width: 413px;
  height: 100%;
}
.caffeine-title {
  text-align: center;
  color: #4a475f;
  font-size: 16px;
  font-weight: 700;
  position: relative;
  top: 0px;
}

.roll-counter-wrapper,
.roll-digit {
  display: inline-block;
  filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.7))
    drop-shadow(0 0 6px rgba(255, 255, 255, 0.7));
}
.roll-counter-wrapper {
  /* background: blue;*/
  overflow: hidden;
  height: 30px;
}

.roll-counter{
    text-align: center;
    position: relative;
    /*top: 53px;*/
    top: 0px;
    transform: scale(1.4);
}

.roll-digit-wrapper,
.roll-digit {
  color: #ffffff;
  font-size: 26px;
}
.roll-digit-wrapper {
  line-height: 40px;
  height: 42px;
}
.caffeine-unit {
  color: #ade9db;
  font-size: 14px;
  display: inline-block;
  position: relative;
  left: 3px;
  top: -6px;
}
</style>
