<template>
  <div class="dashboard">
    <div class="dashboard-ring">
      <svg id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 63.3 47.9">
        <title>中远船厂12-03</title>
        <path
          d="M6.1,48.5A33,33,0,0,1,1.7,32.3,31.78,31.78,0,0,1,21,3.1l.8,1.8A29.81,29.81,0,0,0,3.7,32.3,31,31,0,0,0,7.8,47.5Z"
          transform="translate(-1.7 -0.6)"
          style="fill:#5afffa"
        />
        <path
          d="M45.5,5.1A28.35,28.35,0,0,0,33.4,2.5,30.47,30.47,0,0,0,21.8,4.9L21,3.1A30.41,30.41,0,0,1,33.3.6a31.87,31.87,0,0,1,13,2.7Z"
          transform="translate(-1.7 -0.6)"
          style="fill:#57c3ff"
        />
        <path
          d="M60.6,48.5l-1.8-1a31.39,31.39,0,0,0,4.1-15.3A29.92,29.92,0,0,0,45.5,5.1l.8-1.8A32.07,32.07,0,0,1,65,32.3,33,33,0,0,1,60.6,48.5Z"
          transform="translate(-1.7 -0.6)"
          style="fill:#ff808f"
        />
      </svg>
      <div class="dashboard-zhizhen" :style="zhizhenStyle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2.75 11.88">
          <polygon style="fill: #ccf3ff;" points="0 11.88 2.75 11.85 1.54 0 1.01 0 0 11.88" />
        </svg>
      </div>
    </div>
    <div class="dashboard-value">
      <strong>{{value}}</strong>
      <span>{{unit}}</span>
    </div>
    <!-- <div class="dashboard-kedu">
      <span class="kedu-1">0</span>
      <span class="kedu-2">1</span>
      <span class="kedu-3">2</span>
    </div>
    -->
  </div>
</template>

<script>
export default {
  name: "Dashboard",

  data() {
    return {
      vValue: 0,
    };
  },

  props: {
    value: {},
    unit: {
      type: String,
      default: "kn",
    },
    total: {
      type: Number,
      default: 2,
    },
  },

  watch: {
    value: {
      handler(val) {
        setTimeout(() => {
          this.vValue = val;
        }, 200);
      },
      immediate: true,
    },
  },

  computed: {
    zhizhenStyle() {
      const vValue = this.vValue >= this.total ? this.total : this.vValue;
      return {
        transform: `translate(-50%, -50%) rotate(${
          (vValue / this.total) * 240 - 30
        }deg)`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  position: relative;

  .dashboard-ring {
    position: relative;
  }
  .dashboard-value {
    font-size: 0.12rem;
    position: absolute;
    left: 50%;
    bottom: 15%;
    transform: translateX(-50%);
    strong {
      font-size: 120%;
    }
  }

  .dashboard-zhizhen {
    height: 0.06rem;
    width: 80%;
    position: absolute;
    left: 50%;
    top: 60%;
    transition: all 0.5s ease;
    transform: translate(-50%, -50%) rotate(-30deg);

    svg {
      height: 0.1rem;
      position: absolute;
      transform: translateY(-50%) rotate(-90deg);
      left: 5%;
      top: 50%;
    }
  }
}
</style>