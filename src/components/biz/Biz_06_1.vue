<template>
  <div class="Biz_06_1" :class="showList?'is--show-list':''">
    <div class="header" @click="showList = !showList">
      <div class="icon">
        <i class="iconfont iconziyuan3"></i>
      </div>
      <div class="title">外厂船舶</div>
      <div class="subtitle">
        <strong>{{vm.total}}</strong>
        <span>艘</span>
      </div>
      <i class="tool" :class="showList?'el-icon-arrow-down':'el-icon-arrow-up'"></i>
    </div>
    <div class="body" v-show="showList" v-loading="loading">
      <ul>
        <li v-for="(i,index) in vm.list" :key="index">
          <div class="img"></div>
          <div class="info">
            <div class="title">{{i.CNName}}</div>
            <p>
              <span class="text-primary">总管：</span>
              <span class="text-info">{{i.MangerName}}</span>
            </p>
            <p>
              <span class="text-primary">船宽/船长：</span>
              <span class="text-info">{{i.Loa}}/{{i.Beam}}m</span>
            </p>
            <p>
              <span class="text-primary">船厂：</span>
              <span class="text-info">{{i.BerthName}}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/**
 * 外厂船舶
 */
import { getOutShips } from "@/api";

export default {
  data() {
    return {
      loading: false,
      showList: false,
      vm: {
        total: "-",
        list: [],
      },
    };
  },

  methods: {
    refresh() {
      this.loading = true;
      getOutShips()
        .then((data) => {
          const rows = data.data.rows;
          this.vm.list = rows;
          this.vm.total = rows.length;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },

  created() {
    this.refresh();
  },
};
</script>

<style lang="scss" scoped>
.Biz_06_1 {
  $header_height: 0.4rem;
  width: 2.8rem;
  height: $header_height + 0.1rem;
  position: absolute;
  left: 0;
  bottom: 0;
  transition: all 0.3s ease;

  &.is--show-list {
    height: 70%;
  }

  .header {
    height: $header_height;
    line-height: $header_height;
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;

    &:before {
      content: "";
      width: 93%;
      height: 58%;
      position: absolute;
      left: 5%;
      bottom: 10%;
      background-image: radial-gradient(
        rgb(9, 34, 68) 0%,
        rgb(12, 54, 113) 100%
      );
      //   background: rgb(12, 54, 113);
      transform: skew(-45deg);
      border-radius: 0.04rem;
    }

    .icon,
    .title,
    .subtitle,
    .tool {
      position: relative;
    }

    .icon {
      background: rgb(41, 47, 53);
      border: 0.03rem solid rgb(85, 141, 183);
      width: 0.44rem;
      height: 0.44rem;
      border-radius: 50%;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        font-size: 0.2rem;
      }
    }

    .title {
      font-weight: bold;

      font-size: 0.2rem;
      padding-left: 0.1rem;
    }

    .subtitle {
      font-size: 0.3rem;
      padding-left: 0.15rem;
      transform: translateY(0.04rem);
      strong {
        // background: red;
        display: inline-block;
        height: 0.3rem;
        max-width: 0.6rem;
        // text-overflow: ellipsis;
        // white-space: nowrap;
        overflow: hidden;
      }
      span {
        font-size: 50%;
        font-weight: normal;
      }
    }

    .tool {
      color: rgb(85, 141, 183);
      font-size: 0.18rem;
      position: absolute;
      right: 0.14rem;
      font-weight: bold;
      top: 0.14rem;
    }
  }

  .body {
    height: calc(100% - #{$header_height});
    overflow-y: auto;

    padding: 0.03rem 0.2rem 0.01rem 0.2rem;

    li {
      background: rgba(7, 14, 22, 0.8);
      margin-bottom: 0.05rem;
      border-radius: 0.1rem;
      padding: 0.05rem 0.1rem;
      border: 0.02rem solid rgba(#558db7, 0.7);
      display: flex;
      .img {
        width: 33%;
        background-image: url(../../assets/images/ship.png);
        background-position: center;
        // background-size: 130%;
        background-repeat: no-repeat;
      }

      .info {
        width: 67%;
        padding-left: 0.1rem;
        font-size: 0.12rem;

        .title {
          width: 100%;
          font-size: 0.15rem;
          font-weight: bold;
          height: 0.2rem;
          line-height: 0.2rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        P {
          height: 0.2rem;
          line-height: 0.2rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

  //   @/assets/images/ship.png
}
</style>