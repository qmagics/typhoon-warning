<template>
  <div class="app">
    <Grid
      class="d3-grid"
      :w="3"
      :h="2"
      :maxBtn="true"
      :maxMinIcon="isFullScreen?'iconzu6':'iconzu114'"
      :onToggleMax="onToggleMax"
      plain-title
      :max="Map3d_Max"
    >
       <Biz_06 /> 
    </Grid>
    <Grid :x="3" icon="iconfont icon-cuoshi" title="防抗台措施">
      <Biz_01 />
    </Grid>
    <Grid :x="3" :y="1" icon="iconfont icon-hangsu" title="航速监测">
      <Biz_02 />
    </Grid>
    <Grid :y="2" :w="2" title="厂区监控" icon="iconfont icon-jiankong">
       <Biz_03 /> 
    </Grid>
    <Grid :x="2" :y="2" title="六横港区气象" icon="iconfont icon-tianqi">
       <Biz_04 /> 
    </Grid>
    <Grid :x="3" :y="2" :maxBtn="true" title="台风动态监测" icon="iconfont icon-kangtai">
       <Biz_05 /> 
    </Grid>
    <Modal />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      Biz_05_Max: false,

      isFullScreen: false,
    };
  },

  computed: {
    ...mapState({
      Map3d_Max: (state) => state.Map3d_Max,
    }),
  },

  methods: {
    onToggleMax() {
      if (!this.isFullScreen) {
        this.fullScreen();
      } else {
        this.exitScreen();
      }
    },

    //全屏
    fullScreen() {
      const ele = document.body;
      if (ele.requestFullscreen) {
        ele.requestFullscreen();
      } else if (ele.mozRequestFullScreen) {
        ele.mozRequestFullScreen();
      } else if (ele.webkitRequestFullscreen) {
        ele.webkitRequestFullscreen();
      } else if (ele.msRequestFullscreen) {
        ele.msRequestFullscreen();
      }
      this.isFullScreen = true;
    },

    //退出全屏
    exitScreen() {
      if (document.exitFullScreen) {
        document.exitFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      this.isFullScreen = false;
    },
  },

  created() {
    
    // this.$root.viewAnchor("5defbe02-4cac-4776-a064-a9a3935151e3");
    // this.$root.viewAnchor("123");
    // this.$root.viewShip("30ac733f-4cfe-463a-ae38-d99b906cc379");
    // this.$root.viewMonitor("789");
  },
};
</script>

<style lang="scss">
.d3-grid .max-screen {
  right: 38px !important;
}
</style>
