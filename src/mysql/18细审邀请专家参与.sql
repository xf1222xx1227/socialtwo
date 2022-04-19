
/*
drop table if exists review_details_invitation;
create table review_details_invitation
(
	it_id                          char(13)                       not null,
	ex_id                         char(6)                        not null,
    addtime							varchar(50),
    state							int,	# 0表示未应答，1表示同意，2表示不参加
    type							int,	# 1表示系统推荐，2表示自定义邀请
   primary key (ex_id, it_id)
)comment = '邀请专家参与细审';


insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101019','S00000','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101013','S00001','2022-03-31 14:25:55','1','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101014','S00001','2022-03-31 14:25:55','1','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101015','S00001','2022-03-31 14:25:55','1','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101017','S00001','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101018','S00001','2022-03-31 14:25:55','1','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101019','S00001','2022-03-31 14:25:55','1','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101020','S00001','2022-03-31 14:25:55','1','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101021','S00001','2022-03-31 14:25:55','1','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101022','S00001','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101026','S00001','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101013','S00002','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101031','S00002','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220102006','S00002','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101013','S00003','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220102004','S00003','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220102006','S00003','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220102009','S00003','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101013','S00004','2022-03-31 14:25:55','1','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101014','S00004','2022-03-31 14:25:55','1','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101015','S00004','2022-03-31 14:25:55','1','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101016','S00004','2022-03-31 14:25:55','1','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101017','S00004','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101018','S00004','2022-03-31 14:25:55','2','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101019','S00004','2022-03-31 14:25:55','1','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101020','S00004','2022-03-31 14:25:55','2','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101021','S00004','2022-03-31 14:25:55','1','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101022','S00004','2022-03-31 14:25:55','1','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101023','S00004','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101024','S00004','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101025','S00004','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101026','S00004','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101031','S00004','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220102001','S00004','2022-03-31 14:25:55','1','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220102002','S00004','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220102003','S00004','2022-03-31 14:25:55','1','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220102004','S00004','2022-03-31 14:25:55','1','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220102006','S00004','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220102009','S00004','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101025','S00005','2022-03-31 14:25:55','1','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101026','S00005','2022-03-31 14:25:55','1','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101031','S00005','2022-03-31 14:25:55','1','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220102004','S00005','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101013','S00007','2022-03-31 14:25:55','1','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101014','S00007','2022-03-31 14:25:55','1','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101015','S00007','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101017','S00007','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101018','S00007','2022-03-31 14:25:55','1','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101019','S00007','2022-03-31 14:25:55','1','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101020','S00007','2022-03-31 14:25:55','1','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101021','S00007','2022-03-31 14:25:55','1','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101022','S00007','2022-03-31 14:25:55','1','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101023','S00007','2022-03-31 14:25:55','1','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101024','S00007','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101025','S00007','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101013','S00008','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101014','S00008','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101015','S00008','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101017','S00008','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101018','S00008','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101019','S00008','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101020','S00008','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101021','S00008','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101022','S00008','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101023','S00008','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101024','S00008','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101025','S00008','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101026','S00008','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101013','S00009','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101014','S00009','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101015','S00009','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101017','S00009','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101018','S00009','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101019','S00009','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101020','S00009','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101021','S00009','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101022','S00009','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101023','S00009','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101024','S00009','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101013','S00010','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101014','S00010','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101015','S00010','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101017','S00010','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101018','S00010','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101019','S00010','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101020','S00010','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101021','S00010','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101022','S00010','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101024','S00010','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101014','S00011','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101017','S00011','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101018','S00011','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101020','S00011','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101022','S00011','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101014','S00012','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101014','S00013','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101013','S00023','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101013','S00025','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101013','S00036','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101013','S00048','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101013','S00049','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101013','S00061','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101013','S00062','2022-03-31 14:25:55','0','2');
insert into review_details_invitation (it_id,ex_id,addtime,state,type) values ('XM20220101013','S00074','2022-03-31 14:25:55','0','2');
*/
# select * from review_details_invitation where ex_id="S00001";

select * from review_details_invitation ;


/*
set sql_safe_updates=0;
update review_details_invitation set state="0" where ex_id = "S00001";
set sql_safe_updates=1;
*/










