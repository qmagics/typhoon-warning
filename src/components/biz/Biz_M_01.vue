<template>
  <div class="modal-page" v-loading="loading">
    <div class="modal-header">
      <i class="iconfont iconziyuan41"></i>
      <span class="modal-title">{{vm.Name}}（{{vm.Code}}）</span>
    </div>

    <div class="modal-body">
      <el-row class="keyvalue">
        <el-col :span="12">
          <div class="label">锚点位置：</div>
          <div class="value">
            {{vm.Lon}}
            <br />
            {{vm.Lat}}
          </div>
        </el-col>
        <el-col :span="12">
          <div class="label">锚点水深：</div>
          <div class="value">{{vm.Extended1}}</div>
        </el-col>
        <el-col>
          <div class="label">吨位限制：</div>
          <div class="value">{{vm.Extended2}}</div>
        </el-col>
        <el-col>
          <div class="label">船长限制：</div>
          <div class="value">{{vm.Extended3}}</div>
        </el-col>
        <el-col>
          <div class="label">使用要求：</div>
          <div class="value">{{vm.Extended4}}</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
/**
 * 锚点详情
 */
import { getAnchorDetail } from "@/api";

export default {
  props: {
    id: {},
  },
  data() {
    return {
      loading: false,
      vm: {
        title: "1号锚点（005911）",
      },
    };
  },

  methods: {
    refresh() {
      this.loading = true;
      getAnchorDetail(this.id)
        .then((data) => {
          this.vm = data.data;
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

<style>
</style>