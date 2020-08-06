<template>
  <div class="page">
    <div class="box">
      <video
        id="e2-video1"
        class="video-js"
        autoplay="autoplay"
        :controls="showControls"
        preload="auto"
      >
        <source
          src="http://192.168.160.241:6713/mag/hls/95bbcb2092d14bfc8940eefe9c638752/1/live.m3u8"
          type="application/x-mpegURL"
        />
      </video>
      <video
        id="e2-video2"
        class="video-js"
        autoplay="autoplay"
        :controls="showControls"
        preload="auto"
      >
        <source
          src="http://192.168.160.241:6713/mag/hls/1a50c27c288c40d589a22de5e52bdfed/1/live.m3u8"
          type="application/x-mpegURL"
        />
      </video>
      <video
        id="e2-video3"
        class="video-js"
        autoplay="autoplay"
        :controls="showControls"
        preload="auto"
      >
        <source
          src="http://192.168.160.241:6713/mag/hls/80c10e4bc4ef449894daa49a758eef7e/1/live.m3u8"
          type="application/x-mpegURL"
        />
      </video>
      <video
        id="e2-video4"
        class="video-js"
        autoplay="autoplay"
        :controls="showControls"
        preload="auto"
      >
        <source
          src="http://192.168.160.241:6713/mag/hls/6fe03bd8168540f79cbe7ecfa411e663/1/live.m3u8"
          type="application/x-mpegURL"
        />
      </video>
    </div>

    <div class="box">
      <video
        id="e2-video5"
        class="video-js"
        autoplay="autoplay"
        :controls="showControls"
        preload="auto"
      >
        <source
          src="http://192.168.160.241:6713/mag/hls/ec1ecfea640944c18a8f2ac709a5d4c7/1/live.m3u8"
          type="application/x-mpegURL"
        />
      </video>
      <video
        id="e2-video6"
        class="video-js"
        autoplay="autoplay"
        :controls="showControls"
        preload="auto"
      >
        <source
          src="http://192.168.160.241:6713/mag/hls/026e34001a0a499385dd703f2f2392f1/1/live.m3u8"
          type="application/x-mpegURL"
        />
      </video>
      <video
        id="e2-video7"
        class="video-js"
        autoplay="autoplay"
        :controls="showControls"
        preload="auto"
      >
        <source
          src="http://192.168.160.241:6713/mag/hls/5bc72d9679e545288e724f21b879f15f/1/live.m3u8"
          type="application/x-mpegURL"
        />
      </video>
      <video
        id="e2-video8"
        class="video-js"
        autoplay="autoplay"
        :controls="showControls"
        preload="auto"
      >
        <source
          src="http://192.168.160.241:6713/mag/hls/72d9af5eae184bdaa3b8cae32e3e6cc1/1/live.m3u8"
          type="application/x-mpegURL"
        />
      </video>
    </div>
  </div>
</template>

<script>
/**
 * 厂区监控
 */
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default {
  components: {},
  props: {},
  data() {
    return {
      showControls: false,

      play1: null,
      play2: null,
      play3: null,
      play4: null,
      play5: null,
      play6: null,
      play7: null,
      play8: null,
    };
  },
  beforeRouteLeave(to, from, next) {
    this.play1.dispose();
    this.play2.dispose();
    this.play3.dispose();
    this.play4.dispose();
    this.play5.dispose();
    this.play6.dispose();
    this.play7.dispose();
    this.play8.dispose();
    next();
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      this.play1 = videojs("e2-video1", { muted: true, autoplay: true });
      this.play2 = videojs("e2-video2", { muted: true, autoplay: true });
      this.play3 = videojs("e2-video3", { muted: true, autoplay: true });
      this.play4 = videojs("e2-video4", { muted: true, autoplay: true });
      this.play5 = videojs("e2-video5", { muted: true, autoplay: true });
      this.play6 = videojs("e2-video6", { muted: true, autoplay: true });
      this.play7 = videojs("e2-video7", { muted: true, autoplay: true });
      this.play8 = videojs("e2-video8", { muted: true, autoplay: true });
      this.$nextTick(() => {
        this.play1.play();
        this.play2.play();
        this.play3.play();
        this.play4.play();
        this.play5.play();
        this.play6.play();
        this.play7.play();
        this.play8.play();
      });
    },
  },
};
</script>

<style lang="scss">
.page {
  height: 100%;
}
.box {
  height: 50%;
  .video-js {
    width: 25%;
    height: 100%;
    float: left;
  }
}
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