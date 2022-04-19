/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2022/1/9 16:09:12                            */
/*==============================================================*/

drop database if exists sspro;
create database sspro;
use sspro;

drop table if exists achievements;

drop table if exists bid_items;

drop table if exists bidding;

drop table if exists calibration;

drop table if exists enterprise_achievements2;

drop table if exists enterprise_menbers2;

drop table if exists enterprises;

drop table if exists expert_achievements;

drop table if exists expert_personal;

drop table if exists first_trial;

drop table if exists release_items;

drop table if exists review_details;

drop table if exists review_expert;

drop table if exists team_achievements;

drop table if exists team_menbers;

drop table if exists teams;

/*==============================================================*/
/* Table: achievements                                          */
/*==============================================================*/
create table achievements
(
   ac_id                char(14) not null,
   name                 varchar(50),
   content              varchar(100),
   nature               varchar(50),
   type                 varchar(50),
   time_start           date,
   time_finilly         date,
   director             varchar(30),
   number               int,
   money                decimal(12,2),
   primary key (ac_id)
);

alter table achievements comment '研究成果表';

comment on column achievements.ac_id is
'成果id';

comment on column achievements.name is
'课题名';

comment on column achievements.content is
'课题简介';

comment on column achievements.nature is
'课题性质';

comment on column achievements.type is
'课题类型';

comment on column achievements.time_start is
'开始时间';

comment on column achievements.time_finilly is
'完成时间';

comment on column achievements.director is
'负责人';

comment on column achievements.number is
'课题人数';

comment on column achievements.money is
'课题经费';

/*==============================================================*/
/* Table: bid_items                                             */
/*==============================================================*/
create table bid_items
(
   bid_id               char(6) not null,
   it_id                char(13) not null,
   bid_time             datetime,
   files                varchar(100),
   budget               decimal(12,2),
   finilly_time         date,
   other                varchar(100),
   primary key (bid_id, it_id)
);

alter table bid_items comment '项目投标表';

comment on column bid_items.bid_id is
'投标人id';

comment on column bid_items.it_id is
'项目id';

comment on column bid_items.bid_time is
'投标时间';

comment on column bid_items.files is
'投标文件';

comment on column bid_items.budget is
'预算';

comment on column bid_items.finilly_time is
'预期完成时间';

comment on column bid_items.other is
'其他';

/*==============================================================*/
/* Table: bidding                                               */
/*==============================================================*/
create table bidding
(
   b_id                 char(9) not null,
   name                 varchar(20),
   address              varchar(200),
   phone                varchar(13),
   director             varchar(20),
   director_phone       char(11),
   director_address     varchar(200),
   primary key (b_id)
);

alter table bidding comment '社科联信息表';

comment on column bidding.b_id is
'社科id';

comment on column bidding.name is
'主体名字';

comment on column bidding.address is
'地址';

comment on column bidding.phone is
'电话';

comment on column bidding.director is
'负责人姓名';

comment on column bidding.director_phone is
'负责人电话';

comment on column bidding.director_address is
'负责人住址';

/*==============================================================*/
/* Table: calibration                                           */
/*==============================================================*/
create table calibration
(
   it_id                char(13) not null,
   bid_id               char(6) not null,
   time_calibration     date,
   time_finilly         date,
   budget               decimal(12,2),
   bond                 decimal(12,2),
   primary key (it_id, bid_id)
);

alter table calibration comment '定标表';

comment on column calibration.it_id is
'项目id';

comment on column calibration.bid_id is
'投标人id';

comment on column calibration.time_calibration is
'定标时间';

comment on column calibration.time_finilly is
'项目完成时间';

comment on column calibration.budget is
'预算';

comment on column calibration.bond is
'保证金';

/*==============================================================*/
/* Table: enterprise_achievements2                              */
/*==============================================================*/
create table enterprise_achievements2
(
   en_id                char(6) not null,
   ac_id                char(14) not null,
   primary key (en_id, ac_id)
);

alter table enterprise_achievements2 comment '企业成果表';

comment on column enterprise_achievements2.en_id is
'企业id';

comment on column enterprise_achievements2.ac_id is
'成果id';

/*==============================================================*/
/* Table: enterprise_menbers2                                   */
/*==============================================================*/
create table enterprise_menbers2
(
   en_id                char(6) not null,
   ex_id                char(6) not null,
   post                 varchar(100),
   other                varchar(100),
   primary key (en_id, ex_id)
);

alter table enterprise_menbers2 comment '企业成员表';

comment on column enterprise_menbers2.en_id is
'企业id';

comment on column enterprise_menbers2.ex_id is
'成员id';

comment on column enterprise_menbers2.post is
'成员职务';

comment on column enterprise_menbers2.other is
'其他';

/*==============================================================*/
/* Table: enterprises                                           */
/*==============================================================*/
create table enterprises
(
   en_id                char(6) not null,
   name                 varchar(40),
   content              varchar(200),
   address              varchar(100),
   phone                varchar(13),
   director             varchar(30),
   director_phone       char(11),
   time_setup           date,
   time_dismiss         date,
   primary key (en_id)
);

alter table enterprises comment '企业信息表';

comment on column enterprises.en_id is
'企业id';

comment on column enterprises.name is
'企业名';

comment on column enterprises.content is
'企业简介';

comment on column enterprises.address is
'地址';

comment on column enterprises.phone is
'电话';

comment on column enterprises.director is
'负责人姓名';

comment on column enterprises.director_phone is
'负责人电话';

comment on column enterprises.time_setup is
'成立时间';

comment on column enterprises.time_dismiss is
'解散时间';

/*==============================================================*/
/* Table: expert_achievements                                   */
/*==============================================================*/
create table expert_achievements
(
   ex_id                char(6) not null,
   ac_id                char(14) not null,
   primary key (ex_id, ac_id)
);

alter table expert_achievements comment '专家成果表';

comment on column expert_achievements.ex_id is
'专家id';

comment on column expert_achievements.ac_id is
'成果id';

/*==============================================================*/
/* Table: expert_personal                                       */
/*==============================================================*/
create table expert_personal
(
   ex_id                char(6) not null,
   name                 varchar(30),
   birthdate            datetime,
   research_specialty   varchar(100),
   education            varchar(20),
   degree               varchar(20),
   phone                char(11),
   email                varchar(30),
   address              varchar(80),
   company              varchar(100),
   register_time        datetime,
   cancellation_time    datetime,
   primary key (ex_id)
);

alter table expert_personal comment '专家个人表';

comment on column expert_personal.ex_id is
'专家id';

comment on column expert_personal.name is
'姓名';

comment on column expert_personal.birthdate is
'出生日期';

comment on column expert_personal.research_specialty is
'研究专长';

comment on column expert_personal.education is
'学历';

comment on column expert_personal.degree is
'学位';

comment on column expert_personal.phone is
'电话';

comment on column expert_personal.email is
'邮箱';

comment on column expert_personal.address is
'家庭地址';

comment on column expert_personal.company is
'工作单位';

comment on column expert_personal.register_time is
'注册时间';

comment on column expert_personal.cancellation_time is
'注销时间';

/*==============================================================*/
/* Table: first_trial                                           */
/*==============================================================*/
create table first_trial
(
   bid_id               char(6) not null,
   it_id                char(13) not null,
   adopt                int,
   reason               varchar(100),
   time                 datetime,
   primary key (bid_id, it_id)
);

alter table first_trial comment '初审表';

comment on column first_trial.bid_id is
'投标人id';

comment on column first_trial.it_id is
'项目id';

comment on column first_trial.adopt is
'是否通过';

comment on column first_trial.reason is
'原因';

comment on column first_trial.time is
'审核时间';

/*==============================================================*/
/* Table: release_items                                         */
/*==============================================================*/
create table release_items
(
   it_id                char(13) not null,
   name                 varchar(200),
   b_id                 char(9),
   content              varchar(400),
   files                varchar(100),
   time_release         date,
   time_end             date,
   recommend            int,
   public               int,
   invitation           int,
   nature               varchar(50),
   type                 varchar(50),
   time_finilly         date,
   director             varchar(20),
   director_phone       char(11),
   rate_economics       int,
   rate_comprehensive   int,
   rate_technology      int,
   other                varchar(100),
   primary key (it_id)
);

alter table release_items comment '项目发布表';

comment on column release_items.it_id is
'项目id';

comment on column release_items.name is
'项目名称';

comment on column release_items.b_id is
'发布单位';

comment on column release_items.content is
'项目具体内容';

comment on column release_items.files is
'附属文件';

comment on column release_items.time_release is
'发布时间';

comment on column release_items.time_end is
'截至报名时间';

comment on column release_items.recommend is
'是否系统推荐';

comment on column release_items.public is
'是否公开招标';

comment on column release_items.invitation is
'是否邀请';

comment on column release_items.nature is
'项目性质';

comment on column release_items.type is
'项目类型';

comment on column release_items.time_finilly is
'预计完成时间';

comment on column release_items.director is
'项目负责人';

comment on column release_items.director_phone is
'负责人电话';

comment on column release_items.rate_economics is
'经济评审占比';

comment on column release_items.rate_comprehensive is
'综合评审占比';

comment on column release_items.rate_technology is
'技术评审占比';

comment on column release_items.other is
'其他';

/*==============================================================*/
/* Table: review_details                                        */
/*==============================================================*/
create table review_details
(
   re_id                char(6) not null,
   it_id                char(13) not null,
   bid_id               char(6) not null,
   score_technology     int,
   time_technology      datetime,
   remark_technology    varchar(200),
   score_economics      int,
   time_economics       datetime,
   remark_economics     varchar(200),
   score_comprehensive  int,
   time_comprehensive   datetime,
   remark_comprehensive varchar(200),
   score_total          int,
   primary key (re_id, it_id, bid_id)
);

alter table review_details comment '评审详细表';

comment on column review_details.re_id is
'评审专家id';

comment on column review_details.it_id is
'项目id';

comment on column review_details.bid_id is
'投标人id';

comment on column review_details.score_technology is
'技术评审得分';

comment on column review_details.time_technology is
'技术评审时间';

comment on column review_details.remark_technology is
'技术评审备注';

comment on column review_details.score_economics is
'经济评审得分';

comment on column review_details.time_economics is
'经济评审时间';

comment on column review_details.remark_economics is
'经济评审备注';

comment on column review_details.score_comprehensive is
'综合评审分数';

comment on column review_details.time_comprehensive is
'综合评审时间';

comment on column review_details.remark_comprehensive is
'综合评审备注';

comment on column review_details.score_total is
'总分';

/*==============================================================*/
/* Table: review_expert                                         */
/*==============================================================*/
create table review_expert
(
   re_id                char(6) not null,
   re_name              varchar(30),
   gender               Integer,
   birthdate            datetime,
   research_specialty   varchar(100),
   education            varchar(20),
   degree               varchar(20),
   phone                char(11),
   email                varchar(30),
   address              varchar(80),
   register_time        datetime,
   cancellation_time    datetime,
   company              varchar(100),
   remarks              varchar(100),
   primary key (re_id)
);

alter table review_expert comment '评审专家信息表';

comment on column review_expert.re_id is
'评审专家id';

comment on column review_expert.re_name is
'专家名字';

comment on column review_expert.gender is
'性别';

comment on column review_expert.birthdate is
'出生日期';

comment on column review_expert.research_specialty is
'研究专长';

comment on column review_expert.education is
'学历';

comment on column review_expert.degree is
'学位';

comment on column review_expert.phone is
'电话';

comment on column review_expert.email is
'邮箱';

comment on column review_expert.address is
'家庭地址';

comment on column review_expert.register_time is
'注册时间';

comment on column review_expert.cancellation_time is
'注销时间';

comment on column review_expert.company is
'工作单位';

comment on column review_expert.remarks is
'备注';

/*==============================================================*/
/* Table: team_achievements                                     */
/*==============================================================*/
create table team_achievements
(
   te_id                char(6) not null,
   ac_id                char(14) not null,
   primary key (te_id, ac_id)
);

alter table team_achievements comment '团队成果表';

comment on column team_achievements.te_id is
'团队id';

comment on column team_achievements.ac_id is
'成果id';

/*==============================================================*/
/* Table: team_menbers                                          */
/*==============================================================*/
create table team_menbers
(
   te_id                char(6) not null,
   ex_id                char(6) not null,
   post                 varchar(100),
   other                varchar(100),
   primary key (te_id, ex_id)
);

alter table team_menbers comment '团队成员表';

comment on column team_menbers.te_id is
'团队id';

comment on column team_menbers.ex_id is
'成员id';

comment on column team_menbers.post is
'队员职务';

comment on column team_menbers.other is
'其他';

/*==============================================================*/
/* Table: teams                                                 */
/*==============================================================*/
create table teams
(
   te_id                char(6) not null,
   name                 varchar(50),
   content              varchar(200),
   ex_id                char(6),
   time_setup           datetime,
   time_dismiss         datetime,
   primary key (te_id)
);

alter table teams comment '团队信息表';

comment on column teams.te_id is
'团队id';

comment on column teams.name is
'团队名';

comment on column teams.content is
'团队简介';

comment on column teams.ex_id is
'负责人id';

comment on column teams.time_setup is
'成立时间';

comment on column teams.time_dismiss is
'解散时间';

alter table bid_items add constraint FK_Reference_12 foreign key (it_id)
      references release_items (it_id) on delete restrict on update restrict;

alter table calibration add constraint FK_Reference_20 foreign key (bid_id, it_id)
      references bid_items (bid_id, it_id) on delete restrict on update restrict;

alter table enterprise_achievements2 add constraint FK_Reference_10 foreign key (ac_id)
      references achievements (ac_id) on delete restrict on update restrict;

alter table enterprise_achievements2 add constraint FK_Reference_9 foreign key (en_id)
      references enterprises (en_id) on delete restrict on update restrict;

alter table enterprise_menbers2 add constraint FK_Reference_7 foreign key (ex_id)
      references expert_personal (ex_id) on delete restrict on update restrict;

alter table enterprise_menbers2 add constraint FK_Reference_8 foreign key (en_id)
      references enterprises (en_id) on delete restrict on update restrict;

alter table expert_achievements add constraint FK_Reference_2 foreign key (ex_id)
      references expert_personal (ex_id) on delete restrict on update restrict;

alter table expert_achievements add constraint FK_Reference_3 foreign key (ac_id)
      references achievements (ac_id) on delete restrict on update restrict;

alter table first_trial add constraint FK_Reference_18 foreign key (bid_id, it_id)
      references bid_items (bid_id, it_id) on delete restrict on update restrict;

alter table release_items add constraint FK_Reference_13 foreign key (b_id)
      references bidding (b_id) on delete restrict on update restrict;

alter table review_details add constraint FK_Reference_16 foreign key (re_id)
      references review_expert (re_id) on delete restrict on update restrict;

alter table review_details add constraint FK_Reference_17 foreign key (bid_id, it_id)
      references bid_items (bid_id, it_id) on delete restrict on update restrict;

alter table team_achievements add constraint FK_Reference_5 foreign key (te_id)
      references teams (te_id) on delete restrict on update restrict;

alter table team_achievements add constraint FK_Reference_6 foreign key (ac_id)
      references achievements (ac_id) on delete restrict on update restrict;

alter table team_menbers add constraint FK_Reference_1 foreign key (ex_id)
      references expert_personal (ex_id) on delete restrict on update restrict;

alter table team_menbers add constraint FK_Reference_11 foreign key (te_id)
      references teams (te_id) on delete restrict on update restrict;

