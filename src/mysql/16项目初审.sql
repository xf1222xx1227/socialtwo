/*
drop table if exists first_trial;
create table first_trial
(
   ex_id                         char(6)                        not null,
   it_id                          char(13)                       not null,
   adopt                          int,					# 审核结果(未审核为0，通过为1，不通过为2)
   reason                         varchar(300),
   userid                           char(6)                        not null,	# 审核人
   time_examine                           varchar(20),
   primary key (ex_id, it_id)
)comment = '初审表';
*/
#	insert into first_trial values
# ("S00000","XM20220102001",0,"","",""),
# 	("S00000","XM20220102003",1,"思路清晰","u00000","2022-03-13 13:45:46"),
# ("S00000","XM20220102004",0,"","",""),
# ("S00000","XM20220101013",0,"","",""),
# ("S00000","XM20220101014",0,"","",""),
#	("S00000","XM20220101015",2,"主题不明确","u00000","2022-03-13 13:45:46"),
# ("S00000","XM20220101016",0,"","",""),
# ("S00000","XM20220101017",0,"","",""),
# ("S00000","XM20220101018",0,"","",""),
# ("S00000","XM20220101019",0,"","",""),
#	("S00000","XM20220101020",2,"主题不明确","u00000","2022-03-13 13:45:46"),
# ("S00000","XM20220101021",0,"","",""),
# ("S00000","XM20220101022",0,"","",""),
# ("S00001","XM20220101023",0,"","",""),
# ("S00001","XM20220101024",0,"","",""),
# ("S00001","XM20220101025",0,"","",""),
# ("S00001","XM20220101026",0,"","",""),
# ("S00001","XM20220101027",0,"","",""),
# ("S00001","XM20220101028",0,"","",""),
# ("S00001","XM20220101029",0,"","",""),
# ("S00001","XM20220101030",0,"","",""),
#	("S00001","XM20220101031",1,"思路清晰","u00000","2022-03-13 13:45:46");

/*
# =CONCATENATE("insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('",A1,"','",B1,"','",C1,"','",D1,"','",E1,"','2022-04-03 15:13:12');")
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220101013','1','1','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220101014','1','1','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220101015','2','主题不明确','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220101016','1','1','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220101017','1','1','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220101018','1','1','u00000','2022-04-03 15:13:12');
# insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220101019','1','qwqw','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220101020','2','主题不明确','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220101021','1','11','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220101022','1','qwqw','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220101023','1','1','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220101024','1','1','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220101025','1','qwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220102003','1','思路清晰','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20220101023','1','1','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20220101024','1','1','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20220101031','1','思路清晰','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20220101013','1','11111','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20220101014','2','www','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20220101016','1','wqwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20220101017','1','wqwqw','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20220101018','1','qwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20220101019','1','qwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20220101020','1','qwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20220101021','1','qwqw','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20220101022','1','qwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20220101023','1','qwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20220101024','1','qwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20220101025','1','qwqw','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00003','XM20220101013','1','www','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00003','XM20220101014','1','www','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00003','XM20220101015','2','ww','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00003','XM20220101016','1','wwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00003','XM20220101017','1','wqwqw','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00003','XM20220101018','1','qwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00003','XM20220101019','1','qwqw','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00003','XM20220101020','1','qwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00003','XM20220101021','1','qwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00003','XM20220101022','1','qwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00003','XM20220101023','1','qwqw','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00003','XM20220101024','1','qwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00005','XM20220101013','1','ww','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00005','XM20220101014','1','www','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00005','XM20220101015','1','qwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00005','XM20220101016','1','wqwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00005','XM20220101017','1','qwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00005','XM20220101018','1','qwqw','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00005','XM20220101019','1','qwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00005','XM20220101020','1','qwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00005','XM20220101021','1','qwqw','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00005','XM20220101022','1','qwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00005','XM20220101023','1','qwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00005','XM20220101024','1','qwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00006','XM20220101013','1','ww','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00006','XM20220101014','2','ww','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00006','XM20220101015','1','qwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00006','XM20220101016','1','wqwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00006','XM20220101017','1','wqwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00006','XM20220101018','1','wqwqw','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00006','XM20220101019','1','wqw','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00006','XM20220101020','1','qwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00006','XM20220101021','1','qwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00006','XM20220101022','1','qwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00006','XM20220101023','1','qwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00006','XM20220101024','1','qwq','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00006','XM20220101025','1','qwq','u00000','2022-04-03 15:13:12');

*/
/*
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220101001','1','qwq','u00000','2022-02-06 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20220101002','1','qwq','u00000','2022-02-06 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20220101003','1','qwq','u00000','2022-02-06 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00003','XM20220101004','1','qwq','u00000','2022-02-06 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00004','XM20220101005','1','qwq','u00000','2022-02-06 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00005','XM20220101006','1','qwq','u00000','2022-02-06 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220101007','1','qwq','u00000','2022-02-06 15:13:12');
*/
# select * from first_trial where it_id = "XM20220101019";


/*

insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20200102001','1','思路清晰','u00000','2020-01-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20200102002','1','思路清晰','u00000','2020-01-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20200102002','1','思路清晰','u00000','2020-01-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00003','XM20200102002','1','思路清晰','u00000','2020-01-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00004','XM20200102003','1','思路清晰','u00000','2020-01-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00005','XM20200102003','1','思路清晰','u00000','2020-01-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00004','XM20200102004','1','思路清晰','u00000','2020-01-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00005','XM20200102004','1','思路清晰','u00000','2020-01-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20200102005','1','思路清晰','u00000','2020-01-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20200102006','1','思路清晰','u00001','2020-01-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20200102006','1','思路清晰','u00001','2020-01-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00004','XM20200102006','1','思路清晰','u00001','2020-01-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20200102007','1','思路清晰','u00000','2020-01-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00005','XM20200102007','1','思路清晰','u00000','2020-01-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00006','XM20200102007','1','思路清晰','u00000','2020-01-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20200102008','1','思路清晰','u00000','2020-01-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00005','XM20200102008','1','思路清晰','u00000','2020-01-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00006','XM20200102008','1','思路清晰','u00000','2020-01-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220101032','1','思路清晰','u00000','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220101033','1','思路清晰','u00000','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220101037','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20220101038','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20220101038','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20220101039','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20220101039','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00003','XM20220101040','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00004','XM20220101040','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00003','XM20220101041','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00004','XM20220101041','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00005','XM20220101042','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00006','XM20220101042','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00007','XM20220101042','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220101043','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20220101044','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220101045','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20220101046','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00003','XM20220101046','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00004','XM20220101047','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00005','XM20220101047','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00006','XM20220101047','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00007','XM20220101048','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00008','XM20220101048','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00009','XM20220101049','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00010','XM20220101049','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220101050','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220101051','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20220101052','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00003','XM20220101052','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00004','XM20220101052','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00005','XM20220101052','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00006','XM20220101052','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00007','XM20220101052','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20220101053','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20220101053','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00008','XM20220101053','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00009','XM20220101053','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220101054','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00003','XM20220101054','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220101055','1','思路清晰','u00001','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220101056','1','思路清晰','u00000','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20220101057','1','思路清晰','u00000','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00003','XM20220101057','1','思路清晰','u00000','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20220101074','1','思路清晰','u00000','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20220101075','1','思路清晰','u00000','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20220101076','1','思路清晰','u00000','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20220101077','1','思路清晰','u00000','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20220101078','1','思路清晰','u00000','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20220101080','1','思路清晰','u00000','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20220101089','1','思路清晰','u00000','2022-01-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220102005','1','思路清晰','u00000','2022-01-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220102019','1','思路清晰','u00000','2022-01-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20220102026','1','思路清晰','u00000','2022-01-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220102029','1','思路清晰','u00000','2022-01-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20220102073','1','思路清晰','u00000','2022-01-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20220301001','1','思路清晰','u00000','2022-03-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20220301001','1','思路清晰','u00000','2022-03-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00003','XM20220301001','1','思路清晰','u00000','2022-03-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00004','XM20220302003','1','思路清晰','u00001','2022-03-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00005','XM20220302003','1','思路清晰','u00001','2022-03-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00006','XM20220302003','1','思路清晰','u00001','2022-03-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00007','XM20220302003','1','思路清晰','u00001','2022-03-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00008','XM20220302003','1','思路清晰','u00001','2022-03-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00003','XM20220302005','1','思路清晰','u00002','2022-03-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00004','XM20220302005','1','思路清晰','u00002','2022-03-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00005','XM20220302005','1','思路清晰','u00002','2022-03-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220303004','1','思路清晰','u00001','2022-03-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20220303004','1','思路清晰','u00001','2022-03-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20220303004','1','思路清晰','u00001','2022-03-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00009','XM20220303004','1','思路清晰','u00001','2022-03-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220304006','1','思路清晰','u00004','2022-03-04 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00006','XM20220304006','1','思路清晰','u00004','2022-03-04 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00007','XM20220304006','1','思路清晰','u00004','2022-03-04 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00008','XM20220304006','1','思路清晰','u00004','2022-03-04 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00009','XM20220304006','1','思路清晰','u00004','2022-03-04 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20220304007','1','思路清晰','u00005','2022-03-04 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20220304007','1','思路清晰','u00005','2022-03-04 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00003','XM20220304007','1','思路清晰','u00005','2022-03-04 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00004','XM20220304007','1','思路清晰','u00005','2022-03-04 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00005','XM20220305008','1','思路清晰','u00005','2022-03-05 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00006','XM20220305008','1','思路清晰','u00005','2022-03-05 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00007','XM20220305008','1','思路清晰','u00005','2022-03-05 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00008','XM20220305008','1','思路清晰','u00005','2022-03-05 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220306009','1','思路清晰','u00005','2022-03-06 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20220306009','1','思路清晰','u00005','2022-03-06 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20220306009','1','思路清晰','u00005','2022-03-06 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00009','XM20220306009','1','思路清晰','u00005','2022-03-06 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00003','XM20220306010','1','思路清晰','u00003','2022-03-06 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00004','XM20220306010','1','思路清晰','u00003','2022-03-06 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220401001','1','思路清晰','u00000','2022-04-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20220401001','1','思路清晰','u00000','2022-04-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20220401001','1','思路清晰','u00000','2022-04-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00003','XM20220401001','1','思路清晰','u00000','2022-04-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00004','XM20220401001','1','思路清晰','u00000','2022-04-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00005','XM20220401001','1','思路清晰','u00000','2022-04-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00006','XM20220401002','1','思路清晰','u00000','2022-04-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00007','XM20220401002','1','思路清晰','u00000','2022-04-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00008','XM20220401002','1','思路清晰','u00000','2022-04-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00009','XM20220401002','1','思路清晰','u00000','2022-04-01 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20220402003','1','思路清晰','u00000','2022-04-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20220402003','1','思路清晰','u00000','2022-04-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00003','XM20220402003','1','思路清晰','u00000','2022-04-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00004','XM20220402003','1','思路清晰','u00000','2022-04-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220402005','1','思路清晰','u00000','2022-04-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20220402005','1','思路清晰','u00000','2022-04-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20220402005','1','思路清晰','u00000','2022-04-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00003','XM20220402005','1','思路清晰','u00000','2022-04-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00005','XM20220402005','1','思路清晰','u00000','2022-04-02 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00005','XM20220403004','1','思路清晰','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00006','XM20220403004','1','思路清晰','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00007','XM20220403004','1','思路清晰','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00008','XM20220403004','1','思路清晰','u00000','2022-04-03 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220404006','1','思路清晰','u00000','2022-04-04 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20220404006','1','思路清晰','u00000','2022-04-04 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20220404006','1','思路清晰','u00000','2022-04-04 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220407001','1','思路清晰','u00000','2022-04-07 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20220407001','1','思路清晰','u00000','2022-04-07 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20220407001','1','思路清晰','u00000','2022-04-07 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00003','XM20220407001','1','思路清晰','u00000','2022-04-07 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00004','XM20220407001','1','思路清晰','u00000','2022-04-07 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00005','XM20220407002','1','思路清晰','u00000','2022-04-07 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00006','XM20220407002','1','思路清晰','u00000','2022-04-07 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00007','XM20220407002','1','思路清晰','u00000','2022-04-07 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00008','XM20220407002','1','思路清晰','u00000','2022-04-07 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00000','XM20220407003','1','思路清晰','u00000','2022-04-07 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20220407003','1','思路清晰','u00000','2022-04-07 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00008','XM20220407003','1','思路清晰','u00000','2022-04-07 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00009','XM20220407003','1','思路清晰','u00000','2022-04-07 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20220407004','1','思路清晰','u00000','2022-04-07 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00002','XM20220407004','1','思路清晰','u00000','2022-04-07 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00003','XM20220407004','1','思路清晰','u00000','2022-04-07 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00004','XM20220408005','1','思路清晰','u00000','2022-04-08 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00005','XM20220408005','1','思路清晰','u00000','2022-04-08 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00006','XM20220408005','1','思路清晰','u00000','2022-04-08 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00007','XM20220409010','1','思路清晰','u00000','2022-04-09 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00008','XM20220409010','1','思路清晰','u00000','2022-04-09 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00009','XM20220409010','1','思路清晰','u00000','2022-04-09 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00001','XM20220409011','1','思路清晰','u00000','2022-04-09 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00004','XM20220409011','1','思路清晰','u00000','2022-04-09 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00005','XM20220409011','1','思路清晰','u00000','2022-04-09 15:13:12');
insert into first_trial (ex_id,it_id,adopt,reason,userid,time_examine) values ('S00006','XM20220409011','1','思路清晰','u00000','2022-04-09 15:13:12');




*/




select * from first_trial order by it_id;
































