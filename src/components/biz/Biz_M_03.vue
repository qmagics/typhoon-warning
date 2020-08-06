<template>
  <div class="modal-page" v-loading="loading">
    <div class="modal-header">
      <i class="iconfont icon-jiankong"></i>
      <span class="modal-title">{{vm.Name}}（{{vm.Code}}）</span>
    </div>

    <div class="modal-body" style="padding-left:0;padding-right:0;">
      <video
        id="video_Biz_M_03"
        class="video-js"
        autoplay="autoplay"
        :controls="showControls"
        preload="auto"
      >
        <source :src="vm.Url" type="application/x-mpegURL" />
      </video>
    </div>
  </div>
</template>

<script>
/**
 * 监控详情
 */
import { getMonitorDetail } from "@/api";
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default {
  props: {
    id: {},
  },
  data() {
    return {
      loading: false,
      vm: {},
      showControls: false,

      play: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    refresh() {
      this.loading = true;
      getMonitorDetail(this.id)
        .then((data) => {
          this.vm = data.data;
          this.init();
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    init() {
      this.play1 = videojs("video_Biz_M_03", { muted: true, autoplay: true });
      this.$nextTick(() => {
        this.play.play();
      });
    },
  },

  created() {
    this.refresh();
  },
};
</script>

<style lang="scss" scoped>
/*视频*/
.vjs-paused .vjs-big-play-button,
.vjs-paused.vjs-has-started .vjs-big-play-button {
  display: block;
}

/* 中间的播放箭头 */
.vjs-big-play-button .vjs-icon-placeholder {
  font-size: 1.63em;
}
/* 加载圆圈 */
.vjs-loading-spinner {
  font-size: 2.5em;
  width: 2em;
  height: 2em;
  border-radius: 1em;
  margin-top: -1em;
  margin-left: -1.5em;
}
.video-js {
  width: 100%;
  height: 100%;
  .vjs-tech {
    outline: none;
  }
  /* 中间的播放箭头 */
  .vjs-big-play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 2.5em;
    line-height: 2.3em;
    height: 2.5em;
    width: 2.5em;
    -webkit-border-radius: 2.5em;
    -moz-border-radius: 2.5em;
    border-radius: 2.5em;
    background-color: #73859f;
    background-color: rgba(115, 133, 159, 0.5);
    border-width: 0.07em;
    margin-top: -1.25em;
    margin-left: -1.25em;
  }
  button {
    outline: none;
  }
}
</style>