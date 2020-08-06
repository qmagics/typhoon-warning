<template>
    <div class="modal-page" v-loading="loading">
        <div class="modal-header" style="width:60%">
            <i class="iconfont iconziyuan3"></i>
            <span class="modal-title">{{vm.CNName}}（{{vm.Name}}）</span>
        </div>

        <div class="modal-body">
            <el-row>
                <el-col :span="15" style="padding-top:.1rem">
                    <el-row class="keyvalue">
                        <el-col :span="12">
                            <div class="label">船舶类型：</div>
                            <div class="value">{{vm.ShipTypeName}}</div>
                        </el-col>
                        <el-col :span="12">
                            <div class="label">当前状态：</div>
                            <div class="value text-primary">{{vm.StatusName}}</div>
                        </el-col>
                        <el-col :span="12">
                            <div class="label">IMO：</div>
                            <div class="value">{{vm.IMO}}</div>
                        </el-col>
                        <el-col :span="12">
                            <div class="label">当前吃水：</div>
                            <div class="value">{{vm.Draught}}m</div>
                        </el-col>
                        <el-col :span="12">
                            <div class="label">船宽/船长：</div>
                            <div class="value">{{vm.Beam}}/{{vm.Loa}}m</div>
                        </el-col>
                        <el-col :span="12">
                            <div class="label">当前航速：</div>
                            <div class="value">{{vm.Sog}}kn</div>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="9">
                    <el-image style="width:1rem;height:1rem;margin-left:.4rem;" :src="vm.Pic||defaultImg"></el-image>
                </el-col>
            </el-row>

            <el-collapse v-model="activeNames">
                <el-collapse-item title="生产信息：" :name="1">
                    <el-row class="keyvalue">
                        <el-col :span="8">
                            <div class="label">项目工号：</div>
                            <div class="value">{{vm.Code}}</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="label">停靠位置：</div>
                            <div class="value text-primary">{{vm.BerthName}}</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="label">下锚情况：</div>
                            <div class="value text-primary">{{vm.Anchor}}</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="label">进厂日期：</div>
                            <div class="value text-primary">{{vm.EnterTime | time}}</div>
                        </el-col>
                        <el-col :span="8">
                            <div class="label">出厂日期：</div>
                            <div class="value text-primary">{{vm.OutTime | time}}</div>
                        </el-col>
                    </el-row>
                </el-collapse-item>
                <el-collapse-item title="缆绳情况：" :name="2">
                    <template v-for="i in vm.Cable">
                        <el-row class="keyvalue" :key="i">
                            <el-col :span="8">
                                <div class="label">绑定位置：</div>
                                <div class="value">{{i.position}}</div>
                            </el-col>
                            <el-col :span="8">
                                <div class="label">缆绳数量：</div>
                                <div class="value text-primary">{{i.count}}</div>
                            </el-col>
                            <el-col :span="8">
                                <div class="label">缆绳信息：</div>
                                <div class="value text-primary">{{i.info}}</div>
                            </el-col>
                        </el-row>
                    </template>
                </el-collapse-item>
                <el-collapse-item title="人员信息：" :name="3">
                    <el-row class="keyvalue label--lg">
                        <el-col :span="12">
                            <div class="label">修船管理部：</div>
                            <div class="value">{{vm.MangerName}}</div>
                        </el-col>
                        <el-col :span="12">
                            <div class="label">经营部：</div>
                            <div class="value text-primary">{{vm.BusinessName}}</div>
                        </el-col>
                        <el-col :span="12">
                            <div class="label">船体工区：</div>
                            <div class="value">{{vm.HullName}}</div>
                        </el-col>
                        <el-col :span="12">
                            <div class="label">机电工区：</div>
                            <div class="value text-primary">{{vm.ElectromechanicalName}}</div>
                        </el-col>
                        <el-col :span="12">
                            <div class="label">涂修工区：</div>
                            <div class="value">{{vm.PaintingName}}</div>
                        </el-col>
                        <el-col :span="12">
                            <div class="label">技术中心：</div>
                            <div class="value text-primary">{{vm.TechnologyName}}</div>
                        </el-col>
                        <el-col :span="12">
                            <div class="label">质量管理部：</div>
                            <div class="value">{{vm.QualityName}}</div>
                        </el-col>
                        <el-col :span="12">
                            <div class="label">环境监督部：</div>
                            <div class="value text-primary">{{vm.SafetyName}}</div>
                        </el-col>
                    </el-row>
                </el-collapse-item>
            </el-collapse>

            <!-- <el-row class="keyvalue">
              <el-col :span="12">
                <div class="label">锚点位置：</div>
                <div class="value">
                  29°47′.82N
                  <br />122°06′.68E
                </div>
              </el-col>
              <el-col :span="12">
                <div class="label">锚点水深：</div>
                <div class="value">9183518</div>
              </el-col>
              <el-col>
                <div class="label">吨位限制：</div>
                <div class="value">
                  3.5万吨级散货船、3万吨级油船、2万吨
                  级集装箱船
                </div>
              </el-col>
              <el-col>
                <div class="label">船长限制：</div>
                <div class="value">26/18m</div>
              </el-col>
              <el-col>
                <div class="label">吨位限制：</div>
                <div class="value">
                  1.船舶应按限制条件选择锚泊点锚泊；
                  2.船舶锚泊期间显示相关信号标志，夜间
                  船上灯光适当遮蔽；
                </div>
              </el-col>
            </el-row>-->
        </div>
    </div>
</template>

<script>
    /**
     * 船舶详情
     */
    import { getShipDetail } from "@/api";
    import defaultImg from "@/assets/images/default_img.png";

    export default {
        props: {
            id: {},
        },
        data() {
            return {
                defaultImg,
                loading: false,
                vm: {},

                activeNames: [1, 2, 3],
            };
        },

        methods: {
            refresh() {
                this.loading = true;
                getShipDetail(this.id)
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