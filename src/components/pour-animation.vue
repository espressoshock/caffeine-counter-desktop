<template>
  <div id="pour-animation">
    <div class="espresso-group-head" ref="groupHead" style="opacity: 1"></div>
    <div
      v-if="coffeeWrapperRender"
      class="espresso-cup-wrapper"
      ref="espressoCupWrapper"
      v-on:mousedown="dragstart($event)"
      v-on:mouseup="dragend($event)"
      v-on:mouseleave="dragend($event)"
      v-on:mousemove="drag($event)"
      style="opacity: 1"
    >
      <div class="espresso-cup">
            <div class="coffee-drip-wrapper">
      <div class="coffee-drip-svg-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="85.31px"
          height="220.19px"
        >
          <defs>
            <clipPath id="drip-clip">
              <path id="drip-clip-path"
                fill-rule="evenodd"
                fill="rgb(255, 255, 255)"
                d="M-0.000,183.016 L-0.000,0.016 L96.000,0.016 L96.000,183.016 L-0.000,183.016 ZM96.000,198.016 L96.000,217.016 L-0.000,217.016 L-0.000,198.016 L96.000,198.016 ZM96.000,273.016 L-0.000,273.016 L-0.000,232.016 L96.000,232.016 L96.000,273.016 Z"
              ></path>
            </clipPath>
          </defs>
          <path
            fill-rule="evenodd"
            fill="rgb(192, 127, 69)"
            d="M82.543,171.411 C70.045,195.000 45.000,191.813 45.000,191.813 C45.000,191.813 19.955,195.000 7.456,171.411 C5.427,167.581 3.586,163.748 1.893,159.938 C1.940,159.800 1.981,159.649 2.030,159.514 C2.020,159.489 2.011,159.463 2.002,159.440 C2.022,159.159 2.052,158.869 2.092,158.578 L2.092,151.566 C2.113,134.435 2.092,95.372 3.100,73.483 L3.100,73.373 C3.100,49.470 3.785,28.333 4.854,21.601 C5.570,17.114 7.864,13.607 11.000,10.859 L11.000,23.822 C10.052,31.532 9.147,51.143 9.147,73.112 L9.147,73.263 C8.145,97.794 8.149,140.076 8.139,157.446 C9.254,171.519 17.668,185.000 44.906,185.000 C45.559,185.000 46.172,185.012 46.768,185.029 C68.800,184.025 77.362,173.668 79.691,161.940 L79.691,153.262 C79.681,136.251 78.684,94.190 78.684,73.273 L78.684,73.112 C78.684,52.954 77.877,34.848 77.000,26.044 L77.000,10.992 C80.082,13.721 82.336,17.183 83.037,21.601 C84.106,28.343 84.761,49.460 85.214,73.413 C85.224,74.164 85.184,74.996 85.194,75.757 C85.627,99.720 85.738,143.424 85.738,160.024 L85.738,160.765 C85.738,160.775 85.778,160.785 85.778,160.795 C85.778,160.935 85.738,161.086 85.738,161.226 L85.738,163.510 C85.582,163.859 85.426,164.161 85.270,164.477 C85.327,164.879 85.376,165.294 85.422,165.712 C84.499,167.611 83.549,169.511 82.543,171.411 Z"
          ></path>
        </svg>
      </div>
    </div>
        <div class="espresso-cup-highlights"></div>
        <sprite-animator
          :id="'coffee-pour-animation'"
          :spritesheet="require('../assets/coffee-pour@2x.png')"
          :json="require('../assets/animation-data/coffee-pour-data.json')"
          :yoyo="false"
          :fps="30"
          ref="coffeePourAnim"
          :autoplay="false"
        ></sprite-animator>
      </div>
    </div>
  </div>
</template>


<script>
import SpriteAnimator from "./sprite-animator";


export default {
  
  name: "PourAnimation",
  data() {
    return {
      dragHandling: {
        dragCurrentX: 0,
        dragInitialX: 0,
        dragXOffset: 80,
        dragActive: false,
        dragAllowed: true,
        dragMultiplier: 1.0
      },
      coffeeWrapperRender: true
    };
  },
  components: {
    "sprite-animator": SpriteAnimator
  },
  mounted: function() {
    this.$anime({
      targets: this.$refs.groupHead,
      top: -30,
      easing: "easeOutElastic(1, 0.7)",
      delay: 2200,
      duration: 1500,
      autoplay: true,
      loop: false
    });
    this.$anime({
      targets: ".espresso-cup-wrapper",
      right: -80,
      rotateZ: 0,
      easing: "easeOutElastic(1, 0.5)",
      delay: 2400,
      duration: 1500,
      autoplay: true,
      loop: false
    });
  },
  methods: {
    //drag fns
    dragstart: function(e) {
      if (
        e.target.parentElement.parentElement == this.$refs.espressoCupWrapper &&
        this.dragHandling.dragAllowed
      ) {
        //scale anim
        this.$anime({
          targets: ".espresso-cup-wrapper",
          scale: 1.2,
          easing: "easeOutElastic(1, 0.5)",
          delay: 0,
          duration: 800,
          autoplay: true,
          loop: false,
          complete: function(anim){

          }
        });

        this.dragHandling.dragAllowed = true;
        this.dragHandling.dragActive = true;
        this.dragHandling.dragInitialX =
          e.clientX - this.dragHandling.dragXOffset;
      }
    },
    dragend: function(e) {
      if (this.dragHandling.dragActive && this.dragHandling.dragAllowed) {
        this.dragHandling.dragInitialX = this.dragCurrentX;
        this.dragHandling.dragActive = false;

        this.$anime.remove(".espresso-cup-wrapper");
        console.log(
          this.$refs.espressoCupWrapper.style.right.substr(
            0,
            this.$refs.espressoCupWrapper.style.right.indexOf("p")
          )
        );
        if (this.$refs.espressoCupWrapper.style.right.substr(0,this.$refs.espressoCupWrapper.style.right.indexOf("p")) > 135 ||
        this.$refs.espressoCupWrapper.style.right.substr(0,this.$refs.espressoCupWrapper.style.right.indexOf("p")) < 100) {
          //disable interaction
          this.dragHandling.dragAllowed = false;
          //since we don't dragend - reset posx
          this.dragHandling.dragCurrentX = 0;
          this.dragHandling.dragInitialX = 0;
          this.dragHandling.dragXOffset = 80;
          //scale anim
          this.$anime({
            targets: ".espresso-cup-wrapper",
            right: 135,
            easing: "easeOutElastic(1, 0.5)",
            delay: 0,
            duration: 1000,
            autoplay: true,
            loop: false
          });

          let ref = this;
          //animate full-cup pour
          this.coffeCupAnim(1000);
         /* setTimeout(function(){
            ref.$refs.coffeePourAnim.playOnce();
             //move to the right
          ref.$anime({
            targets: ".espresso-cup-wrapper",
            right: [
              { value: 430, easing: "easeOutElastic(1, 0.4)", duration: 4000 }
            ],
            opacity: [
              { value: 1, easing: "linear", duration: 0 },
              { value: 0, easing: "linear" }
            ],
            rotateZ: [{ value: -10, duration: 200 }, { value: 0 }],
            delay: 2300,
            autoplay: true,
            loop: false,
            complete: function(){
              //reset pour animation
              ref.coffeeWrapperRender = false;
             //ref.$refs.coffeePourAnim.reset();
            }
          });
          },1000)*/
          
          //emit event on bus
          //bus.$emit('coffeIncrease');
          this.$store.dispatch("increment");

          //drip-pour anim
          this.$anime
          .timeline()
          .add({
            targets: "#drip-clip-path",
            translateY: [-270, 10],
            easing: "easeInOutQuint",
            delay: 200,
            duration: 1250,
            autoplay: true,
            loop: false
          })
          .add({
            targets: "#drip-clip-path",
            translateY: 195,
            easing: "easeInOutQuint",
            duration: 1300,
            autoplay: true,
            loop: false
          }, 1200)
           
          //
           setTimeout(function() {
            //reset glass animation
            let renderResetPromise = ref.coffeCupRendererReset();
            renderResetPromise.then(rsp => {
              ref.$refs.espressoCupWrapper.style.right = "-160px";
              ref.$refs.espressoCupWrapper.style.opacity = 1;
              ref.$anime.remove(".espresso-cup-wrapper");

              //empty glass
              ref.$anime({
                targets: ".espresso-cup-wrapper",
                right: -80,
                rotateZ: 0,
                easing: "easeOutElastic(1, 0.5)",
                delay: 300,
                duration: 1500,
                autoplay: true,
                loop: false,
                complete: function(anim) {
                  ref.dragHandling.dragAllowed = true;
                }
              });
            });
          }, 3700);
        }

        //scale anim
        this.$anime({
          targets: ".espresso-cup-wrapper",
          scale: 1,
          rotateZ: 0,
          easing: "easeOutElastic(1, 0.5)",
          delay: 0,
          duration: 800,
          autoplay: true,
          loop: false
        });
      }
    },
    drag: function(e) {
      if (this.dragHandling.dragActive && this.dragHandling.dragAllowed) {
        this.dragHandling.dragCurrentX =
          e.clientX - this.dragHandling.dragInitialX;
        let dx =
          this.dragHandling.dragCurrentX * this.dragHandling.dragMultiplier;

        if (dx < 80) {
          //rotate drag
          //scale anim
          this.$anime({
            targets: ".espresso-cup-wrapper",
            rotateZ: -10,
            easing: "easeOutElastic(1, 0.5)",
            delay: 0,
            duration: 800,
            autoplay: true,
            loop: false
          });
        }

        if (
          this.$refs.espressoCupWrapper.style.right.substr(
            0,
            this.$refs.espressoCupWrapper.style.right.indexOf("p")
          ) < 220
        ) {
          console.log("triggered dx: " + dx);

          this.$refs.espressoCupWrapper.style.right = -dx + "px";
          //this.$refs.espressoCupWrapper.style.right = '300px';
          this.dragHandling.dragXOffset = this.dragHandling.dragCurrentX;
        }
      }
    },
    coffeCupAnim: function(delay) {
      let ref = this;
      setTimeout(function() {
        //start coffee-pour anim
        ref.$refs.coffeePourAnim.play();

        setTimeout(function() {
          ref.$refs.coffeePourAnim.stop();
          //move to the right
          ref.$anime({
            targets: ".espresso-cup-wrapper",
            right: [
              { value: 430, easing: "easeOutElastic(1, 0.4)", duration: 4000 }
            ],
            opacity: [
              { value: 1, easing: "linear", duration: 0 },
              { value: 0, easing: "linear" }
            ],
            rotateZ: [{ value: -10, duration: 200 }, { value: 0 }],
            delay: 1000,
            autoplay: true,
            loop: false
          });
        }, 1400);
      }, delay);
    },
    coffeCupRendererReset: function(delay = 10) {
      return new Promise((resolve, reject) => {
        let ref = this;
        this.coffeeWrapperRender = false;
        setTimeout(function() {
          ref.coffeeWrapperRender = true;
          resolve(true);
        }, 1);
      });
    }
  }
};
</script>

<style scoped>
#pour-animation {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.espresso-group-head {
  width: 826px;
  height: 922px;
  background: url(../assets/espresso-grouphead@2x.png);
  transform: scale(0.5);
  transform-origin: left top;
  position: absolute;
  /* top:-280px; */
  top: -280px;
  left: 50%;
  margin-left: -206.5px;
}
.espresso-cup-wrapper {
  width: 136.2px;
  height: 169.8px;
  position: absolute;
  bottom: 106px;
  right: -160px;
  z-index: 4;
}
.espresso-cup {
  width: 227px;
  height: 283px;
  background: url(../assets/espressocup-doublewall-empty@2x.png);
  position: absolute;
  left: -46px;
  top: -56px;
  transform: scale(0.6);
  
}

.espresso-cup-highlights {
  width: 227px;
  height: 283px;
  background: url(../assets/espressocup-doublewall-empty-highlights@2x.png);
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 3;
}
.vue-sprite {
  position: absolute;
  left: -105px;
  bottom: 52px;
  transform: scale(0.833);
  left: -9px;
  bottom: 67px;
}
.coffee-drip-svg-wrapper {
  position: absolute;
  /*left: 162px;
  top: 110px;
  transform: scale(1.01);*/
  clip-path: url("#drip-clip");
  left: 63.4px;
  top: -51px;
  transform: scale(1.68);
}
#drip-clip-path {
  transform: translateY(-270px);
}
</style>