<template>
  <div id="home">
    <el-row :gutter="12" class="row">
      <el-col :span="8" class="col">
        <el-card shadow="hover" class="card">
          <div slot="header" class="clearfix">
            <span class="cardtitle">我的发布</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="goto('bid')"
              >前往</el-button
            >
          </div>
          <div class="cardcontent">
            <div class="contenttotal content">
              <div class="text">总发布数：</div>
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
              <div class="number">{{ firstitems }}</div>
            </div>
            <div class="contenttotal content">
              <div class="text">初审记录数：</div>
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
            <div
              class="contenttotal content"
              style="border-bottom: 1px solid rgb(7, 191, 241)"
            >
              <div class="text">细审邀请专家数：</div>
              <div class="number">{{ detailinvitation }}</div>
            </div>
            <div class="contentinfo contents">
              <div class="info">
                <div class="text">未应答</div>
                <div class="number">
                  {{ undetail }}
                </div>
              </div>
              <div class="info">
                <div class="text">接受</div>
                <div class="number">{{ detailjoin }}</div>
              </div>
              <div class="info">
                <div class="text">不接受</div>
                <div class="number">{{ detailunjoin }}</div>
              </div>
              <div class="info">
                <div class="text">已过期</div>
                <div class="number">{{ detailed }}</div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12" class="row">
      <el-col :span="8" class="col" style="overflow: scroll">
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
      <el-col :span="8" class="col"></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userid: "",

      // 申报项目
      bidtotal: 0,
      biding: 0,
      bided: 0,

      // 初审
      firstitems: 0, //初审项目数
      firsttotal: 0, // 初审条数
      refirst: 0, //待审
      unfirsted: 0, // 初审不通过
      firsted: 0, // 初审通过

      // 细审
      detailtotal: 0, // 细审项目
      detailinvitation: 0, // 细审邀请
      undetail: 0, // 未应答
      detailjoin: 0, // 参与细审
      detailunjoin: 0, // 不参与
      detailed: 0, // 过期

      // 正在完成
      scheduletotal: 0, // 进行中项目数量
      dataschedule: [],

      // 完成项目
      finishtotal: 0, // 完成总数
      finishontime: 0, //按时完成
      finishovertime: 0, // 超时完成
    };
  },
  created() {
    this.userid = sessionStorage.getItem("userid");
    this.getBidTotal();
    this.getFirst();
    this.getDetail();
    this.getExamineInvitation();
    this.getcalibration();
    this.getFinish();
    // this.getExamineCount();
  },
  methods: {
    // 路由跳转
    goto(val) {
      if (val == "bid") {
        this.$router.push({ path: "/items/bidding" });
      } else if (val == "first") {
        this.$router.push({ path: "/items/preliminaryexamination" });
      } else if (val == "detail") {
        this.$router.push({ path: "/items/detailedExamination" });
      } else if (val == "schedule") {
        this.$router.push({ path: "/items/schedule" });
      } else if (val == "finish") {
        this.$router.push({ path: "/items/finished" });
      } else if (val == "examine") {
        this.$router.push({ path: "/examine" });
      }
    },
    // 获取社科成员总发布项目条数
    getBidTotal() {
      this.$api
        .getOneBiddingUserBiddingItems({
          userid: this.userid,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              this.bidtotal = res.data.result[0].count;
              this.getBided();
            }
          }
        });
    },
    // 获取社科成员完成项目数量
    getBided() {
      this.$api
        .getOneSocialUserFinishItemsCount({
          userid: this.userid,
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
        .getOneBiddingUserFirstCount({
          userid: this.userid,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              this.firsttotal = data.length;
              let q1 = 0;
              let q2 = 0;
              let q3 = 0;
              let q4 = [];
              for (let i = 0; i < data.length; i++) {
                if (data[i].adopt == 0) {
                  q1++;
                } else if (data[i].adopt == 1) {
                  q2++;
                } else if (data[i].adopt == 2) {
                  q3++;
                }
                let str = q4.join();
                if (str.indexOf(data[i].it_id) == -1) {
                  q4.push(data[i].it_id);
                }
              }
              this.refirst = q1;
              this.firsted = q2;
              this.unfirsted = q3;
              this.firstitems = q4.length;
            }
          }
        });
    },
    // 获取细审项目情况
    getDetail() {
      this.$api
        .getOneBiddingUserDetail({
          userid: this.userid,
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
        .getOneBiddingUserDetailInvitation({
          userid: this.userid,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              this.detailinvitation = data.length;
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
              // this.examinenew = q1;
              this.detailjoin = q2;
              this.detailunjoin = q3;
              this.getExamineInvitationNow(q1);
            }
          }
        });
    },
    // 获取未完成的项目细审邀请(还能进入审核)
    getExamineInvitationNow(q1) {
      this.$api
        .getOneBiddingUserInvitationNow({
          userid: this.userid,
        })
        .then((res) => {
          if (res.status == 200) {
            let len = 0;
            if (res.data.status == 200) {
              let data = res.data.result;
              len = data.length;
            }
            this.undetail = len;
            this.detailed = q1 - len;
          }
        });
    },
    // 获取正在进行项目数量
    getcalibration() {
      this.$api
        .getOneBiddingUserScheduleItems({
          userid: this.userid,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.status == 200) {
              let data = res.data.result;
              this.scheduletotal = data.length;
              this.getschedule(data);
              // console.log(111, data);
            }
          }
        });
    },
    // 获取正在进行项目进度
    getschedule(xdata) {
      this.$api
        .getOneBiddingUserSchedule({
          userid: this.userid,
        })
        .then((res) => {
          if (res.status == 200) {
            this.dataschedule = [];
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
        .getOneSocialUserFinishItems({
          userid: this.userid,
          pagesize: 1000,
          pagenum: 1,
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
  overflow: auto;
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