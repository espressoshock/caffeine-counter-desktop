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
                  <path
                    id="drip-clip-path"
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
        <vue-spritecore
          v-bind:id="'coffee-pour-animation'"
          v-bind:spritesheet="require('../assets/coffee-pour@2x.png')"
          v-bind:json="require('../assets/animation-data/coffee-pour-data.json')"
          v-bind:autoplay="false"
          v-bind:loop="false"
          v-bind:scaleX="0.833"
          v-bind:scaleY="0.833"
          v-bind:lowerBound="0"
          v-bind:upperBound="54"
          v-on:ready="pourAnimationReady"
          v-on:animationStarted="pourAnimationStarted(...arguments)"
          v-on:animationStopped="pourAnimationStopped(...arguments)"
          v-on:animationReset="pourAnimationReset(...arguments)"
          v-on:animationOver="pourAnimationOver(...arguments)"
          ref="coffeePourAnimation"
        ></vue-spritecore>
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
      coffeeWrapperRender: true,
      animationTimeline: this.$anime.timeline()
    };
  },
  components: {},
  mounted: function() {
    //entry animation
    this.groupHeadEntryAnimation();
    this.coffeeCupEntryAnimation();
  },
  methods: {
    //drag fns
    dragstart: function(e) {
      if (
        e.target.parentElement.parentElement == this.$refs.espressoCupWrapper &&
        this.dragHandling.dragAllowed
      ) {
        //scale animation
        this.cupScaleAnimation();

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

        if (
          this.$refs.espressoCupWrapper.style.right.substr(
            0,
            this.$refs.espressoCupWrapper.style.right.indexOf("p")
          ) > 135 ||
          this.$refs.espressoCupWrapper.style.right.substr(
            0,
            this.$refs.espressoCupWrapper.style.right.indexOf("p")
          ) < 100
        ) {
          //disable interaction
          this.dragHandling.dragAllowed = false;
          //since we don't dragend - reset posx
          this.dragHandling.dragCurrentX = 0;
          this.dragHandling.dragInitialX = 0;
          this.dragHandling.dragXOffset = 80;
          //cup centering animation
          this.cupCenteringAnimation();

          //drip-pour anim
          this.coffeeDripAnimation();
          //animate full-cup pour
          this.sleep(1000).then(() => {
            this.$refs.coffeePourAnimation.play();
            this.sleep(2700).then(() => {
              console.log("done");
              this.$anime.remove(".espresso-cup-wrapper");
              this.$refs.espressoCupWrapper.style.right = "-160px";
              this.$refs.coffeePourAnimation.reset(0);
              this.coffeeCupEntryAnimation();
            });
          });

          //emit event on bus
          //bus.$emit('coffeIncrease');
          this.$store.dispatch("increment");
        }

        //scale back cup
        this.cupScaleAnimation(1 ,0);
      }
    },
    drag: function(e) {
      if (this.dragHandling.dragActive && this.dragHandling.dragAllowed) {
        this.dragHandling.dragCurrentX =
          e.clientX - this.dragHandling.dragInitialX;
        let dx =
          this.dragHandling.dragCurrentX * this.dragHandling.dragMultiplier;

        if (dx < 80) this.cupRotateAnimation();

        if (
          this.$refs.espressoCupWrapper.style.right.substr(
            0,
            this.$refs.espressoCupWrapper.style.right.indexOf("p")
          ) < 220
        ) {
          this.$refs.espressoCupWrapper.style.right = -dx + "px";
          this.dragHandling.dragXOffset = this.dragHandling.dragCurrentX;
        }
      }
    },
    pourAnimationReady: function() {
      console.log("ready");
      return new Promise((resolve, reject) => {
        resolve(true);
      });
    },
    pourAnimationStarted: function(startFrame, stopFrame) {
      console.log("animation started:[" + startFrame + "," + stopFrame + "]");
    },
    pourAnimationStopped: function(frame) {
      console.log("animation stopped at frame: " + frame);
    },
    pourAnimationReset: function(frame) {
      console.log("animation resetted at frame: " + frame);
    },
    pourAnimationOver: function(frame) {
      console.log("animation over at frame:" + frame);
      this.sleep(1400).then(() => this.animateCupRight());
    },
    sleep: function(mills) {
      return new Promise(resolve => setTimeout(resolve, mills));
    },
    animateCupRight: function() {
      let ref = this;
      this.$anime({
        targets: ".espresso-cup-wrapper",
        right: [
          { value: 430, easing: "easeOutElastic(1, 0.4)", duration: 4000 }
        ],
        opacity: [
          { value: 1, easing: "linear", duration: 0 },
          { value: 0, easing: "linear" }
        ],
        rotateZ: [{ value: -10, duration: 200 }, { value: 0 }],
        delay: 0,
        autoplay: true,
        loop: false,
        complete: function() {}
      });
    },
    coffeeDripAnimation: function() {
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
        .add(
          {
            targets: "#drip-clip-path",
            translateY: 195,
            easing: "easeInOutQuint",
            duration: 1250,
            autoplay: true,
            loop: false
          },
          1200
        );
    },
    coffeeCupEntryAnimation: function(delay = 2400) {
      let ref = this;
      this.$anime(
        {
          targets: ".espresso-cup-wrapper",
          right: -80,
          rotateZ: 0,
          opacity: [0, 1],
          delay: delay,
          easing: "easeOutElastic(1, 0.5)",
          duration: 1500,
          autoplay: true,
          loop: false,
          complete: function(anim) {
            ref.dragHandling.dragAllowed = true;
          }
        }
      );
    },
    groupHeadEntryAnimation: function(delay = 2200) {
      this.$anime(
        {
          targets: this.$refs.groupHead,
          top: -30,
          easing: "easeOutElastic(1, 0.7)",
          duration: 1500,
          autoplay: true,
          loop: false,
          delay: delay,
        }
      );
    },
    cupScaleAnimation: function(scaleFactor = 1.2, rotationFactor = 0) {
      //scale anim
      this.$anime({
        targets: ".espresso-cup-wrapper",
        scale: scaleFactor,
        rotateZ: rotationFactor,
        easing: "easeOutElastic(1, 0.5)",
        duration: 800,
        autoplay: true,
        loop: false,
        complete: function(anim) {}
      });
    },
    cupRotateAnimation: function(factor = -10) {
      this.$anime({
        targets: ".espresso-cup-wrapper",
        rotateZ: factor,
        easing: "easeOutElastic(1, 0.5)",
        duration: 800,
        autoplay: true,
        loop: false
      });
    },
    cupCenteringAnimation: function() {
      this.$anime({
        targets: ".espresso-cup-wrapper",
        right: 135,
        easing: "easeOutElastic(1, 0.5)",
        delay: 0,
        duration: 1000,
        autoplay: true,
        loop: false
      });
    },

  }
};
</script>

<style>
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

.coffee-drip-svg-wrapper {
  position: absolute;

  clip-path: url("#drip-clip");
  left: 63.4px;
  top: -51px;
  transform: scale(1.68);
}
#drip-clip-path {
  transform: translateY(-270px);
}
#coffee-pour-animation {
  position: absolute;
  bottom: 88px;
  left: 10.5px;
}
</style>