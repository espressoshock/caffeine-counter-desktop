<template>
  <div id="title-bar">
    <span class="title"></span>
    <span class="icons">
      <span class="minimize-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="11px"
          height="1px"
        >
          <path
            fill-rule="evenodd"
            fill="rgb(255, 255, 255)"
            d="M-0.000,-0.000 L11.000,-0.000 L11.000,1.000 L-0.000,1.000 L-0.000,-0.000 Z"
          ></path>
        </svg>
      </span>
      <span class="close-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="11.78px"
          height="11.84px"
        >
          <path
            fill-rule="evenodd"
            fill="rgb(255, 255, 255)"
            d="M7.674,6.713 L12.259,11.323 C12.560,11.626 12.560,12.115 12.259,12.417 C12.109,12.568 11.913,12.644 11.715,12.644 C11.518,12.644 11.321,12.568 11.171,12.417 L6.586,7.807 L2.000,12.417 C1.850,12.568 1.653,12.644 1.456,12.644 C1.259,12.644 1.062,12.568 0.912,12.417 C0.612,12.115 0.612,11.626 0.912,11.323 L5.498,6.713 L0.912,2.103 C0.612,1.801 0.612,1.311 0.912,1.009 C1.213,0.707 1.699,0.707 2.000,1.009 L6.586,5.619 L11.171,1.009 C11.472,0.707 11.959,0.707 12.259,1.009 C12.560,1.311 12.560,1.801 12.259,2.103 L7.674,6.713 Z"
          ></path>
        </svg>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      require: true
    }
  },
  name: "TitleBar",
  data() {
    return {};
  },
  mounted: function() {}
};
</script>

<style scoped>

</style>
