<template>
  <div id="bottom-bar" style="opacity: 0.0">
    <div class="bar-wrapper">
      <svg
        ref="bottomBar"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="1752.44px"
        height="151px"
      >
        <path id="bottom-bar-path"
          fill-rule="evenodd"
          v-bind:fill="this.caffeineSteps.step1.bgColor"
          d="M1752.000,47.147 C1696.000,47.147 1667.795,3.137 1606.250,-0.007 C1544.705,3.137 1517.350,47.147 1460.375,47.147 C1403.400,47.147 1375.982,3.137 1314.437,-0.007 C1252.893,3.137 1225.444,47.147 1168.469,47.147 C1111.493,47.147 1084.029,3.137 1022.484,-0.007 C960.939,3.137 933.467,47.147 876.492,47.147 C819.517,47.147 792.041,3.137 730.496,-0.007 C668.951,3.137 641.473,47.147 584.498,47.147 C527.523,47.147 500.044,3.137 438.499,-0.007 C376.954,3.137 349.475,47.147 292.499,47.147 C235.524,47.147 207.795,3.137 146.250,-0.007 C84.705,3.137 57.000,47.147 -0.000,47.147 L-0.000,150.987 L146.500,150.987 L292.500,150.987 L438.500,150.987 L584.500,150.987 L730.500,150.987 L876.500,150.987 L1022.500,150.987 L1168.500,150.987 L1314.500,150.987 L1460.500,150.987 L1606.500,150.987 L1752.000,150.987 C1752.000,150.987 1753.000,47.147 1752.000,47.147 Z"
        ></path>
      </svg>
      <caffeine-counter
        v-bind:initDelay="initDelay"
        v-bind:timeOffset="timeOffset"
        v-bind:digit1="digit1"
        v-bind:digit2="digit2"
        v-bind:digit3="digit3"
        v-bind:digit4="digit4"
        v-bind:caffeineObj="caffeineObj"
      ></caffeine-counter>
    </div>
  </div>
</template>

<script>
import CaffeineCounter from "./caffeine-counter";
import { mapGetters } from "vuex";

export default {
  name: "BottomBar",
  props: {
    tl: Object
  },
  data() {
    return {
      //construct digits props
      initDelay: 2800,
      timeOffset: 200,
      digit1: {
        offset: 1,
        totalIter: 4,
        init: 0
      },
      digit2: {
        offset: 2,
        totalIter: 4,
        init: 0
      },
      digit3: {
        offset: 3,
        totalIter: 4,
        init: 0
      },
      digit4: {
        offset: 2,
        totalIter: 4,
        init: 0
      },
      caffeineSteps:{
        step1:{
          message: "Ready to work?",
          bgColor: "#72d7c4",
          messageColor: "#4a475f",
          unitColor: "#4a475f",
          threashold: 0,
        },
        step2:{
          message: "Coffee lover?",
          bgColor: "#72b5d7", 
          messageColor: "#164b66",
          unitColor: "#9fd9f6",
          threashold: 80,
        },
        step3:{
          message: "Supeeercharing...!",
          bgColor: "#ab72d7",
          messageColor: "#3e155e",
          unitColor: "#ceace8",
          threashold: 150,
        },
        step4:{
          message: "Procaffeinating...",
          bgColor: "#fa69b4",
          messageColor: "#5a1137",
          unitColor: "#e8accb",
          threashold: 200,
        },
        step5:{
          message: "Danger coffee zone!",
          bgColor: "#d62855", 
          messageColor: "#5b081d",
          unitColor: "#f96d93",
          threashold: 260,
        },
      },
      caffeineObj:{
        caffeineMessage: {
        message: '',
        color: '',
        },
        caffeineUnit: {
          message: '',
          color: '',
        }
      }
      
    };
  },
  components: {
    "caffeine-counter": CaffeineCounter
  },
  computed: {
    ...mapGetters(["dailyCoffeeCount", "getCaffeine", "getCaffeineUnit"]),

  },
  methods: {
    animateColor: function(color){
      let ref = this;
      this.$anime({
        targets:"#bottom-bar-path",
        fill: color,
        easing: 'linear'
      });
    }
  },
  mounted: function() {
    //defaults
     this.caffeineObj.caffeineMessage.message=this.caffeineSteps.step1.message;
    
    let ref = this;
      this.$anime({
      targets: '#bottom-bar',
      translateY: [
          {value: -115, duration: 1500, delay: 2000}
      ], 
      opacity: [
        {value: 0, delay: 100, easing: "linear", duration: 1500},
        {value: 1, delay: 0, easing: "linear", duration: 1500}
      ],
          
        
      duration: 1500,
      autoplay: true,
      loop: false
    });
     this.$anime({
      targets: ref.$refs.bottomBar,
      translateX: [
          {value: -523, duration: 1500, delay: 2000}
      ], 
      delay: 2000,
      autoplay: true,
      loop: false
    });
    
  },
  watch: {
    getCaffeine(newValue, oldValue) {
      if(newValue>this.caffeineSteps.step5.threashold){
        this.animateColor(this.caffeineSteps.step5.bgColor);

        this.caffeineObj.caffeineMessage.message=this.caffeineSteps.step5.message;
        this.caffeineObj.caffeineMessage.color=this.caffeineSteps.step5.messageColor;
        this.caffeineObj.caffeineUnit.color=this.caffeineSteps.step5.unitColor;


      } else if(newValue>this.caffeineSteps.step4.threashold){
        this.animateColor(this.caffeineSteps.step4.bgColor);

        this.caffeineObj.caffeineMessage.message=this.caffeineSteps.step4.message;
        this.caffeineObj.caffeineMessage.color=this.caffeineSteps.step4.messageColor;
        this.caffeineObj.caffeineUnit.color=this.caffeineSteps.step4.unitColor;
        
        


      }else if(newValue>this.caffeineSteps.step3.threashold){
        this.animateColor(this.caffeineSteps.step3.bgColor); 

        this.caffeineObj.caffeineMessage.message=this.caffeineSteps.step3.message;
        this.caffeineObj.caffeineMessage.color=this.caffeineSteps.step3.messageColor;
        this.caffeineObj.caffeineUnit.color=this.caffeineSteps.step3.unitColor;
        
        
      }else if(newValue>this.caffeineSteps.step2.threashold){
         this.animateColor(this.caffeineSteps.step2.bgColor); 

        this.caffeineObj.caffeineMessage.message=this.caffeineSteps.step2.message;
        this.caffeineObj.caffeineMessage.color=this.caffeineSteps.step2.messageColor;
        this.caffeineObj.caffeineUnit.color=this.caffeineSteps.step2.unitColor;
       

      }
    }
  }
};
</script>

<style scoped>
#bottom-bar {
  position: absolute;
  /*bottom: -35px;*/
  left: 0;
}
.bar-wrapper {
  height: 151px;
  width: 100%;

}

</style>
