<template>
  <div id="increment-coffee-btn">
    <div class="flash-simulator"></div>
    <div class="btn-wrapper" ref="increaseBtn" style="opacity: 0">
      <svg class="increase-btn"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="19px"
        height="21px"
      >
        <path
          fill-rule="evenodd"
          fill="rgb(177, 174, 191)"
          d="M17.000,12.000 L12.000,12.000 L12.000,19.000 C12.000,20.104 11.104,21.000 10.000,21.000 C8.895,21.000 8.000,20.104 8.000,19.000 L8.000,12.000 L2.000,12.000 C0.895,12.000 -0.000,11.105 -0.000,10.000 C-0.000,8.895 0.895,8.000 2.000,8.000 L8.000,8.000 L8.000,2.000 C8.000,0.895 8.895,-0.000 10.000,-0.000 C11.104,-0.000 12.000,0.895 12.000,2.000 L12.000,8.000 L17.000,8.000 C18.105,8.000 19.000,8.895 19.000,10.000 C19.000,11.105 18.105,12.000 17.000,12.000 Z"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "IncrementCoffeeBtn",
  data() {
    return {
      animationTimeline: this.$anime.timeline()
    };
  },
  mounted: function() {
    this.animationTimeline.add({
      targets: '.flash-simulator',
      easing: 'linear',
      opacity: [
        [0],
        {value: 0},
        {value: 1, duration: 100},
      ]
    })
    .add({
      targets: '.flash-simulator',
      easing: 'linear',
      duration: 100,
      opacity: [
        {value: 0},
      ]
    })
    .add({
      targets: this.$refs.increaseBtn,
      scale:[5,1],
      opacity: [
        {
          value: "1",
          duration: 1000,
          delay: 0,
          easing: "cubicBezier(.17,.67,.83,.67)"
        }
      ],
      easing: "easeOutElastic(1, 1)",
      delay: 0,
      duration: 1000,
      autoplay: true,
      loop: false
    });
  }
};
</script>

<style scoped>
#increment-coffee-btn {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.btn-wrapper {
  position: relative;
  top: 50%;
  left: 50%;
  margin-left: -9.5px;
  margin-top: -10.5px;
  width: 19px;
  height: 21px;
  z-index: 1;

}
.btn-wrapper > svg{
  filter: drop-shadow(0 0 12px rgb(255, 255, 255) ) drop-shadow(0 0 15px rgba(255, 255, 255, 0.7) );

}
.flash-simulator{
  width: 100%;
  height: 100%;
  background: rgb(177, 174, 191);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  opacity: 0;
}
</style>
