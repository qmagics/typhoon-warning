<template>
  <div class="modals">
    <el-dialog
      :custom-class="'modal--'+modal.id"
      v-for="modal in modal_list"
      :key="modal.id"
      :title="modal.title"
      :visible="modal.visible"
      :width="modal.width"
      :before-close="getBeforeClose(modal)"
      @close="onClose(modal)"
      @closed="onClosed(modal)"
    >
      <Bg1 v-if="modal.id==='Bg1'||modal.id==='Bg3'" />
      <Bg2 v-if="modal.id==='Bg2'" />
      <div class="modal-content" :style="{height:modal.height}">
        <component
          :ref="'modalComponent_'+modal.id"
          :is="modal.component"
          v-bind="modal.data"
          v-on="modal.actions"
        ></component>
      </div>

      <template #footer>
        <el-button
          v-for="(btn,index) in modal.btns"
          :key="index"
          size="mini"
          :type="btn.type"
          @click="onModalBtnClick(btn,modal)"
        >{{btn.name}}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Bg1 from "./Bg1";
import Bg2 from "./Bg2";

export default {
  components: { Bg1, Bg2 },

  data() {
    return {};
  },

  computed: {
    ...mapState({
      modal_list: (state) => state.modal.modal_list,
    }),
  },

  methods: {
    onClose(modal) {
      this.$store.dispatch("modal/close", modal.id);
    },

    onClosed(modal) {
      this.$store.dispatch("modal/remove", modal.id);
    },

    getBeforeClose(modal) {
      const _this = this;
      return function (done) {
        if (!modal.beforeClose) {
          done();
        } else {
          modal.beforeClose(done, _this.$refs[`modalComponent_${modal.id}`][0]);
        }
      };
    },

    //弹窗按钮点击
    onModalBtnClick(btn, modal) {
      const { method, callback } = btn;

      if (!method) {
        this.onClose(modal);
        return;
      }

      //弹窗内实例组件上下文对象
      const ctx = this.$refs[`modalComponent_${modal.id}`][0];

      ctx && ctx[method] && ctx[method].call(null, callback);
    },
  },

  created() {},
};
</script>

<style lang="scss" src="./Modal.scss"></style>