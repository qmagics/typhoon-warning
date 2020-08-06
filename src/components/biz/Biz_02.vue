<template>
  <div class="page">
    <div class="group" style="height:62%">
      <div class="group-header">
        <div class="title">码头防台</div>
        <div class="info">
          <span>
            <span class="text-primary">最高航速：</span>
            <strong style="font-size:170%;">{{vm.max1}}</strong>
            kn
          </span>
          <span>
            <span class="text-primary">最低航速：</span>
            <strong style="font-size:170%;">{{vm.min1}}</strong>
            kn
          </span>
        </div>
      </div>
      <div class="group-body">
        <div class="item" v-for="(i,index) in vm.models1" :key="index">
          <div class="item-header text-info">
            <span class="index">{{i.Code}}</span>
            <span class="name">{{i.CNName}}</span>
          </div>
          <div class="item-body">
            <Dashboard :value="i.Sog||0" />
          </div>
        </div>
      </div>
    </div>

    <div class="group" style="height:38%">
      <div class="group-header">
        <div class="title">锚地防台</div>
        <div class="info">
          <span>
            <span class="text-primary">最高航速：</span>
            <strong style="font-size:170%;">{{vm.max2}}</strong>
            kn
          </span>
          <span>
            <span class="text-primary">最低航速：</span>
            <strong style="font-size:170%;">{{vm.min2}}</strong>
            kn
          </span>
        </div>
      </div>
      <div class="group-body">
        <div class="item" v-for="(i,index) in vm.models2" :key="index">
          <div class="item-header text-info">
            <span class="index">{{i.Code}}</span>
            <span class="name">{{i.CNName}}</span>
          </div>
          <div class="item-body">
            <Dashboard :value="i.Sog" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 航速监测
 */
import Dashboard from "@/components/biz/Dashboard.vue";
import { getSpeed } from "@/api";

export default {
  components: {
    Dashboard,
  },
  data() {
    return {
      vm: {
      },
    };
  },
  methods: {
    refresh() {
      getSpeed().then((data) => {
        this.vm = data.data.rows;

        setTimeout(() => {
          this.refresh();
        }, 10000);
      });
    },
  },
  mounted() {
    this.refresh();
  },
};
</script>

<style scoped lang="scss">
.page {
  padding-top: 0.05rem;
}
.group {
  padding: 0 0.2rem;
  .group-header {
    display: flex;
    height: 0.3rem;
    line-height: 0.3rem;
    justify-content: space-between;
    border-bottom: 0.02rem solid rgb(62, 104, 135);
    margin-bottom: 0.04rem;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      width: 0.06rem;
      height: 0.06rem;
      border-radius: 50%;
      background: rgb(118, 196, 255);
      left: 0;
      bottom: -0.03rem;
    }
    .title {
      font-size: 0.16rem;
      font-weight: bold;
      text-indent: 0.1rem;
    }
    .info {
      font-size: 0.12rem;
      & > span:first-child {
        margin-right: 0.3rem;
      }
    }
  }
  .group-body {
    height: calc(100% - 0.34rem);
    overflow: hidden;

    .item {
      float: left;
      width: 21%;
      margin-bottom: 0.05rem;
      margin-right: 5.3333%;
      &:nth-child(4n) {
        margin-right: 0;
      }
      .item-header {
        display: flex;
        align-items: center;
        height: 0.24rem;
        // margin-bottom: 0.04rem;
        align-items: center;
        vertical-align: middle;
        justify-content: center;
        .index {
          font-size: 0.12rem;
          display: inline-block;
          width: 0.16rem;
          text-align: center;
          height: 0.16rem;
          line-height: 0.16rem;
          border: 0.01rem solid rgb(166, 221, 255);
          border-radius: 50%;
          margin-right: 0.02rem;
        }
        .name {
          font-size: 0.12rem;
          height: 0.18rem;
          // width: calc(100% - 0.18rem);
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .item-body {
        height: calc(100% - 0.22rem);
        padding: 0 0.2rem;
      }
    }
  }
}
</style>