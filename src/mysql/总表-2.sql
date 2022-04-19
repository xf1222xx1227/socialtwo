/*==============================================================*/
/* DBMS name:      MySQL 4.0                                    */
/* Created on:     2022/1/9 16:19:47                            */
/*==============================================================*/
drop database if exists social;
create database social;
use social;
# 投标主体项目成果表
drop table if exists achievements;		

# 项目投标表
drop table if exists bid_items;

#社科主体表
drop table if exists bidding;

#定标表
drop table if exists calibration;

# 企业成果对应表
drop table if exists enterprise_achievements;

# 企业成员表
drop table if exists enterprise_menbers;

#企业信息表
drop table if exists enterprises;

# 学者项目成果对应表
drop table if exists expert_achievements;

# 学者信息表
drop table if exists expert_personal;

# 初审表
drop table if exists first_trial;

#项目发布表
drop table if exists release_items;

# 细审表
drop table if exists review_details;

# 评审专家表
drop table if exists review_expert;

#团队成果对应表
drop table if exists team_achievements;

# 团队成员表
drop table if exists team_menbers;

#团队表
drop table if exists teams;

drop table if exists degree;
create table degree
(
   de_id                          char(4)                        not null,
   name                           varchar(30),		# 学位名
   primary key (de_id)
)comment = '学位表';
insert into degree values
("D000","哲学博士学位"),
("D001","经济学博士学位"),
("D002","法学博士学位"),
("D003","教育学博士学位"),
("D004","文学博士学位"),
("D005","历史学博士学位"),
("D006","理学博士学位"),
("D007","工学博士学位"),
("D008","农学博士学位"),
("D009","医学博士学位"),
("D010","军事学博士学位"),
("D011","管理学博士学位"),
("D012","艺术学博士学位"),
("D100","哲学硕士学位"),
("D101","经济学硕士学位"),
("D102","法学硕士学位"),
("D103","教育学硕士学位"),
("D104","文学硕士学位"),
("D105","历史学硕士学位"),
("D106","理学硕士学位"),
("D107","工学硕士学位"),
("D108","农学硕士学位"),
("D109","医学硕士学位"),
("D110","军事学硕士学位"),
("D111","管理学硕士学位"),
("D112","艺术学硕士学位"),
("D200","哲学学士学位"),
("D201","经济学学士学位"),
("D202","法学学士学位"),
("D203","教育学学士学位"),
("D204","文学学士学位"),
("D205","历史学学士学位"),
("D206","理学学士学位"),
("D207","工学学士学位"),
("D208","农学学士学位"),
("D209","医学学士学位"),
("D210","军事学学士学位"),
("D211","管理学学士学位"),
("D212","艺术学学士学位"),
("D999","无");
select * from degree;




drop table if exists achievements;
create table achievements		#成果表
(
   it_id                          char(13)                      not null,
   #name                           varchar(50),
   #content                        varchar(400),				# 内容
   #nature                         varchar(50),				# 类型
   #type                           varchar(50),
   start_time                     date,
   finilly_time                   date,
   # director                       varchar(30),				#
   # number                         int,
   money                          int,		# 经费
   primary key (it_id)
)comment = '成果表';
insert into achievements values
("XM20220101001","2022-02-10","2024-01-01",100000),
("XM20220101002","2022-02-10","2024-01-01",100000),
("XM20220101003","2022-02-10","2024-01-01",200000),
("XM20220101004","2022-02-10","2024-01-01",400000),
("XM20220101005","2022-02-10","2024-01-01",100000),
("XM20220101006","2022-02-10","2024-01-01",200000),
("XM20220101007","2022-02-10","2024-01-01",130000);
select * from achievements;


drop table if exists expert_achievements;
create table expert_achievements
(
   ex_id                          char(6)                        not null,
   it_id                          char(13)                       not null,
   director                       int,						# 负责人？
   primary key (ex_id, it_id)
)comment = '学者项目成果对应表';
insert into expert_achievements values
("S00000","XM20220101001",1),
("S00000","XM20220101002",1),
("S00001","XM20220101002",0),
("S00002","XM20220101003",1),
("S00003","XM20220101004",1),
("S00003","XM20220101005",1),
("S00003","XM20220101006",1),
("S00004","XM20220101007",1),
("S00005","XM20220101007",0),
("S00006","XM20220101007",0);
select * from expert_achievements;



create table calibration		#定标表
(
   it_id                          char(13)                       not null,
   bid_id                         char(6)                        not null,
   time_calibration               date,
   time_finilly                   date,
   budget                         decimal(12,2),
   bond                           decimal(12,2),
   primary key (it_id, bid_id)
)comment = '定标表';





create table first_trial
(
   ex_id                         char(6)                        not null,
   it_id                          char(13)                       not null,
   adopt                          int,
   reason                         varchar(100),
   time                           datetime,
   primary key (bid_id, it_id)
)comment = '初审表';



create table enterprises		# 企业表
(
   en_id                          char(6)                        not null,
   name                           varchar(40),
   content                        varchar(200),
   address                        varchar(100),
   phone                          varchar(13),
   director                       varchar(30),
   director_phone                 char(11),
   time_setup                     date,
   time_dismiss                   date,
   primary key (en_id)
)comment = '企业表';

create table enterprise_menbers
(
   en_id                          char(6)                        not null,
   ex_id                          char(6)                        not null,
   post                           varchar(100),
   other                          varchar(100),
   primary key (en_id, ex_id)
)comment = '企业成员表';


create table teams
(
   te_id                          char(6)                        not null,
   name                           varchar(50),
   content                        varchar(200),
   ex_id                          char(6),
   time_setup                     datetime,
   time_dismiss                   datetime,
   primary key (te_id)
)comment = '团队表';

create table team_menbers
(
   te_id                          char(6)                        not null,
   ex_id                          char(6)                        not null,
   post                           varchar(100),
   other                          varchar(100),
   primary key (te_id, ex_id)
)comment = '团队成员表';

create table enterprise_achievements		#企业成果表
(
   en_id                          char(6)                        not null,
   ac_id                          char(14)                       not null,
   primary key (en_id, ac_id)
)comment = '企业成果表';

create table team_achievements
(
   te_id                          char(6)                        not null,
   ac_id                          char(14)                       not null,
   primary key (te_id, ac_id)
)comment = '团队成果表';







/*==============================================================*/
/* Index: "Reference_13_FK"                                            */
/*==============================================================*/
/*
create index Reference_13_FK
(
   b_id
);
*/

/*==============================================================*/
/* Table: review_details                                        */
/*==============================================================*/
create table review_details
(
   re_id                          char(6)                        not null,
   it_id                          char(13)                       not null,
   bid_id                         char(6)                        not null,
   score_technology               int,
   time_technology                datetime,
   remark_technology              varchar(200),
   score_economics                int,
   time_economics                 datetime,
   remark_economics               varchar(200),
   score_comprehensive            int,
   time_comprehensive             datetime,
   remark_comprehensive           varchar(200),
   score_total                    int,
   primary key (re_id, it_id, bid_id)
)comment = '细审表';



create table review_expert
(
   re_id                          char(6)                        not null,
   re_name                        varchar(30),
   gender                         Integer,
   birthdate                      datetime,
   research_specialty             varchar(100),
   education                      varchar(20),
   degree                         varchar(20),
   phone                          char(11),
   email                          varchar(30),
   address                        varchar(80),
   register_time                  datetime,
   cancellation_time              datetime,
   company                        varchar(100),
   remarks                        varchar(100),
   primary key (re_id)
)comment = '评审专家信息表';




drop table if exists finish_first_trial;
create table finish_first_trial
(
   it_id                          char(13)                       not null,
   finishtime                          varchar(30),					
   updatetime                         varchar(300),
   primary key (it_id)
)comment = '初审截至表';
select * from finish_first_trial;



drop table if exists release_items_invitation;
create table release_items_invitation
(
	it_id                          char(13)                       not null,
	ex_id                         char(6)                        not null,
    addtime							varchar(50),
    state							int,	# 0表示未应答，1表示同意，2表示不参加
    type							int,	# 0表示系统推荐，1表示自定义邀请
   primary key (ex_id, it_id)
)comment = '项目发布邀请专家参与申报';
# 测试数据
insert into release_items_invitation values
("XM20220304001","S00000",1),
("XM20220304001","S00002",1),
("XM20220304001","S00009",1);


select * from release_items_invitation;