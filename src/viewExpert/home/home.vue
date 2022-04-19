<template>
  <div id="home">
    <el-row :gutter="12" class="row">
      <el-col :span="8" class="col">
        <el-card shadow="hover" class="card">
          <div slot="header" class="clearfix">
            <span class="cardtitle">我的申报</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="goto('bid')"
              >前往</el-button
            >
          </div>
          <div class="cardcontent">
            <div class="contenttotal content">
              <div class="text">总申报数：</div>
              <div class="number">{{ bidtotal }}</div>
            </div>
            <div class="contentinfo contents">
              <div class="info">
                <div class="text">进行中</div>
                <div class="number">{{ biding }}</div>
              </div>
              <div class="info">
                <div class="text">已完成</div>
                <div class="number">{{ bided }}</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" class="col">
        <el-card shadow="hover" class="card">
          <div slot="header" class="clearfix">
            <span class="cardtitle">初审统计</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="goto('first')"
              >前往</el-button
            >
          </div>
          <div class="cardcontent">
            <div class="contenttotal content">
              <div class="text">初审项目数：</div>
              <div class="number">{{ firsttotal }}</div>
            </div>
            <div class="contentinfo contents">
              <div class="info">
                <div class="text">待审</div>
                <div class="number">{{ refirst }}</div>
              </div>
              <div class="info">
                <div class="text">通过</div>
                <div class="number">{{ firsted }}</div>
              </div>
              <div class="info">
                <div class="text">不通过</div>
                <div class="number">{{ unfirsted }}</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" class="col">
        <el-card shadow="hover" class="card">
          <div slot="header" class="clearfix">
            <span class="cardtitle">细审统计</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="goto('detail')"
              >前往</el-button
            >
          </div>
          <div class="cardcontent">
            <div
              class="contenttotal content"
              style="border-bottom: 1px solid rgb(7, 191, 241)"
            >
              <div class="text">细审项目数：</div>
              <div class="number">{{ detailtotal }}</div>
            </div>
            <!-- <div class="contentinfo contents">
              <div class="info">
                <div class="text">待审</div>
                <div class="number">{{ refirst }}</div>
              </div>
              <div class="info">
                <div class="text">通过</div>
                <div class="number">{{ firsted }}</div>
              </div>
              <div class="info">
                <div class="text">不通过</div>
                <div class="number">{{ unfirsted }}</div>
              </div>
            </div> -->
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12" class="row">
      <el-col :span="8" class="col">
        <el-card shadow="hover" class="card">
          <div slot="header" class="clearfix">
            <span class="cardtitle">进行中项目统计</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="goto('schedule')"
              >前往</el-button
            >
          </div>
          <div class="cardcontent">
            <div
              class="contenttotal content"
              style="border-bottom: 1px solid rgb(7, 191, 241)"
            >
              <div class="text">进行中项目数：</div>
              <div class="number">{{ scheduletotal }}</div>
            </div>
            <div class="list" :key="item.it_id" v-for="item in dataschedule">
              <div class="name">{{ item.name }}</div>
              <div class="schedules">{{ item.schedules }}%</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" class="col">
        <el-card shadow="hover" class="card">
          <div slot="header" class="clearfix">
            <span class="cardtitle">完成项目统计</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="goto('finish')"
              >前往</el-button
            >
          </div>
          <div class="cardcontent">
            <div class="contenttotal content">
              <div class="text">已完成数：</div>
              <div class="number">{{ finishtotal }}</div>
            </div>
            <div class="contentinfo contents">
              <div class="info">
                <div class="text">按时完成</div>
                <div class="number">{{ finishontime }}</div>
              </div>
              <div class="info">
                <div class="text">超时完成</div>
                <div class="number">{{ finishovertime }}</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" class="col">
        <el-card shadow="hover" class="card">
          <div slot="header" class="clearfix">
            <span class="cardtitle">我的审核</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="goto('examine')"
              >前往</el-button
            >
          </div>
          <div class="cardcontent">
            <div class="contenttotal content">
              <div class="text">项目审核邀请数：</div>
              <div class="number">
                {{ examineinvitationtotal }}
              </div>
            </div>

            <div class="contentinfo contents">
              <div class="info">
                <div class="text">未应答</div>
                <div class="number">
                  <el-badge :is-dot="examinenew != 0" class="item">
                    {{ examinenew }}
                  </el-badge>
                </div>
              </div>
              <div class="info">
                <div class="text">参与</div>
                <div class="number">{{ examinejoin }}</div>
              </div>
              <div class="info">
                <div class="text">不参与</div>
                <div class="number">{{ examineunjoin }}</div>
              </div>
            </div>
            <div class="contenttotal content">
              <div class="text">已审记录数：</div>
              <div class="number">{{ examinecounttotal }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import base from "../../api/base";
export default {
  data() {
    return {
      exid: "",

      // 申报项目
      bidtotal: 0,
      biding: 0,
      bided: 0,

      // 初审
      firsttotal: 0, // 初审总数
      refirst: 0, //待审
      unfirsted: 0, // 初审不通过
      firsted: 0, // 初审通过

      // 细审
      detailtotal: 0, // 细审总数

      // 正在完成
      scheduletotal: 0, // 进行中项目数量
      dataschedule: [],

      // 完成项目
      finishtotal: 0, // 完成总数
      finishontime: 0, //按时完成
      finishovertime: 0, // 超时完成

      // 我的审核
      examineinvitationtotal: 0, // 收到邀请的项目数量
      examinejoin: 0, // 参与审核
      examineunjoin: 0, // 不参与
      examinenew: 0, // 未应答项目数量
      examinecounttotal: 0, // 审核记录数量
    };
  },
  created() {
    this.exid = sessionStorage.getItem("userid");
    this.getBidTotal();
    this.getBided();
    this.getFirst();
    this.getDetail();
    this.getExamineInvitation();
    this.getcalibration();
    this.getFinish();
    this.getExamineCount();
  },
  methods: {
    // 路由跳转
    goto(val) {
      if (val == "bid") {
        this.$router.push({ path: "/itemsex/biddingex" });
      } else if (val == "first") {
        this.$router.push({ path: "/itemsex/preliminaryexaminationex" });
      } else if (val == "detail") {
        this.$router.push({ path: "/itemsex/detailedExaminationex" });
      } else if (val == "schedule") {
        this.$router.push({ path: "/itemsex/scheduleex" });
      } else if (val == "finish") {
        this.$router.push({ path: "/itemsex/finishedex" });
      } else if (val == "examine") {
        this.$router.push({ path: "/examineex" });
      }
    },
    // 获取专家总申报项目条数
    getBidTotal() {
      this.$api
        .getOneExpertBidCount({
          ex_id: this.exid,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              this.bidtotal = res.data.result[0].count;
            }
          }
        });
    },
    // 获取专家完成项目数量
    getBided() {
      this.$api
        .getOneExpertFinishItemsCount({
          ex_id: this.exid,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              this.bided = res.data.result[0].count;
            }
          }
          this.biding = this.bidtotal - this.bided;
        });
    },
    // 获取初审情况
    getFirst() {
      this.$api
        .getBidItemsFirstTrialResult({
          ex_id: this.exid,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              this.firsttotal = data.length;
              let q1 = 0;
              let q2 = 0;
              let q3 = 0;
              for (let i = 0; i < data.length; i++) {
                if (data[i].adopt == 0) {
                  q1++;
                } else if (data[i].adopt == 1) {
                  q2++;
                } else if (data[i].adopt == 2) {
                  q3++;
                }
              }
              this.refirst = q1;
              this.firsted = q2;
              this.unfirsted = q3;
            }
          }
        });
    },
    // 获取细审项目情况
    getDetail() {
      this.$api
        .getOneExpertDetailExaminedItems({
          ex_id: this.exid,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              this.detailtotal = data.length;
            }
          }
        });
    },
    // 获取细审邀请数据
    getExamineInvitation() {
      this.$api
        .getOneExpertDetailInvitation({
          ex_id: this.exid,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              this.examineinvitationtotal = data.length;
              let q1 = 0;
              let q2 = 0;
              let q3 = 0;
              for (let i = 0; i < data.length; i++) {
                if (data[i].state == 0) {
                  q1++;
                } else if (data[i].state == 1) {
                  q2++;
                } else if (data[i].state == 2) {
                  q3++;
                }
              }
              this.examinenew = q1;
              this.examinejoin = q2;
              this.examineunjoin = q3;
            }
          }
        });
    },
    // 获取正在进行项目数量
    getcalibration() {
      this.$api
        .getOneExpertScheduleItems({
          ex_id: this.exid,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              this.scheduletotal = data.length;
              this.getschedule(data);
            }
          }
        });
    },
    // 获取正在进行项目进度
    getschedule(xdata) {
      this.$api
        .getOneExpertSchedule({
          ex_id: this.exid,
        })
        .then((res) => {
          if (res.status == 200) {
            for (let i = 0; i < xdata.length; i++) {
              xdata[i].schedules = 0;
            }
            if (res.data.status == 200) {
              let data = res.data.result;
              for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < xdata.length; j++) {
                  if (data[i].it_id == xdata[j].it_id) {
                    if (data[i].schedules > xdata[j].schedules) {
                      xdata[j].schedules = data[i].schedules;
                    }
                    break;
                  }
                }
              }
            }
            this.dataschedule = xdata;
          }
        });
    },
    // 获取完成项目
    getFinish() {
      this.$api
        .getOneExpertFinishedItems({
          ex_id: this.exid,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              this.finishtotal = data.length;
              let q1 = 0;
              let q2 = 0;
              for (let i = 0; i < data.length; i++) {
                if (data[i].finilly_time >= data[i].time_finilly) {
                  q1++;
                } else {
                  q2++;
                }
              }
              this.finishontime = q1;
              this.finishovertime = q2;
              // console.log(data);
            }
          }
        });
    },
    // 获取专家审核总数量
    getExamineCount() {
      this.$api
        .getOneExpertDetailExamineCount({
          ex_id: this.exid,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              this.examinecounttotal = res.data.result[0].count;
            }
          }
        });
    },
  },
  // 进入页面时强制刷新
  deactivated() {
    this.$destroy();
  },
};
</script>

<style lang="less" scoped>
#home {
  width: 100%;
  height: 92vh;
  display: flex;
  flex-flow: column;
  .row {
    flex: 1;
    .col {
      height: 100%;
      padding: 10px;
      .card {
        height: 100%;
        .clearfix {
          .cardtitle {
            font-size: 17px;
            font-weight: bold;
          }
        }
        .cardcontent {
          .content {
            height: 50px;
            border-top: 1px solid rgb(7, 191, 241);
            display: flex;
            flex-flow: row;
            align-items: center;

            .text {
              flex: 3;
              font-size: 16px;
            }
            .number {
              flex: 2;
              font-size: 18px;
            }
          }
          .contents {
            height: 70px;
            display: flex;
            flex-flow: row;
            border-top: 1px solid rgb(7, 191, 241);

            .info {
              flex: 1;
              border-left: 1px solid rgb(7, 191, 241);
              display: flex;
              flex-flow: column;
              .text {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 15px;
              }
              .number {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
              }
            }
          }
          .contents :nth-child(1) {
            border: none;
          }
          // 正在进行项目列表样式
          .list {
            padding: 0px 10px;
            // width: 90%;
            height: 40px;
            border-top: 1px solid rgb(157, 129, 144);
            display: flex;
            flex-flow: row;
            align-items: center;
            // justify-content: center;

            .name {
              flex: 3;
              font-size: 15px;
              text-align: center;
              // border: 1px solid red;
            }
            .schedules {
              flex: 2;
              font-size: 18px;
              text-align: center;
            }
          }
          .list:nth-child(1) {
            border: none;
          }
        }
        .cardcontent :nth-child(1) {
          border: none;
        }
      }
    }
  }
}
// .el-card__body {
//   padding: 10px;
//   height: 100%;
// }
</style>