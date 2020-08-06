<template>
  <div class="grid" :class="{'border':border,'plain-title':plainTitle,'max':vMax}" :style="style">
    <div class="grid-header" v-if="!plainTitle">
      <div class="grid-header__bg"></div>
      <i class="grid-icon" :class="icon"></i>
      <span class="grid-title">{{title}}</span>
    </div>

    <div class="grid-body">
      <slot></slot>
      <div class="tool">
        <i
          v-if="maxBtn"
          @click="onMax"
          class="max-screen iconfont"
          :class="maxMinIcon || (vMax?'iconzu6':'iconzu114')"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
const percentV = 100 / 3;
const percentH = 100 / 4;

export default {
  name: "Grid",

  props: {
    x: Number,
    y: Number,
    w: {
      type: Number,
      default: 1,
    },
    h: {
      type: Number,
      default: 1,
    },

    title: String,
    icon: String,

    border: {
      type: Boolean,
      default: false,
    },

    plainTitle: Boolean,

    max: Boolean,

    maxBtn: Boolean,

    maxBtnLink: String,

    onToggleMax: Function,

    maxMinIcon: String,
  },

  data() {
    return {
      vMax: this.max,
    };
  },

  computed: {
    style() {
      const { x, y, w, h } = this;
      return {
        top: y * percentV + "%",
        left: x * percentH + "%",
        width: w * percentH + "%",
        height: h * percentV + "%",
      };
    },
  },

  methods: {
    onMax() {
      if (!this.onToggleMax || "function" !== typeof this.onToggleMax) {
        this.vMax = !this.vMax;
      } else {
        this.onToggleMax();
      }
    },
  },

  watch: {
    vMax(val) {
      this.$emit("update:max", val);
    },
    max(val) {
      this.vMax = val;
    },
  },
};
</script>