/*
drop table if exists calibration;
create table calibration		#定标表
(
   it_id                          char(13)                       not null,
   ex_id                         char(6)                        not null,
   time_calibration               varchar(20),
   time_finilly                   varchar(20),
   budget                         int,
   userid                           char(6),		# 定标人
   state							int,		# 0表示未应答，1表示接受，2表示拒绝
   other							varchar(200),
   primary key (it_id,ex_id)
)comment = '定标表';

insert into calibration values
("XM20220101001","S00000","2021-02-10","2022-02-10",100000,"u00000",1,""),
("XM20220101002","S00001","2021-02-10","2022-02-10",300000,"u00000",1,""),
("XM20220101003","S00002","2021-02-10","2022-02-10",200000,"u00000",1,""),
("XM20220101004","S00003","2021-02-10","2022-02-10",110000,"u00000",1,""),
("XM20220101005","S00004","2021-02-10","2022-02-10",14000,"u00000",1,""),
("XM20220101006","S00005","2021-02-10","2022-02-10",110000,"u00000",1,""),
("XM20220101007","S00000","2021-02-10","2022-02-10",200000,"u00000",1,"");
*/


/*

insert into calibration  values ('XM20200102001','S00000','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20200102002','S00001','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20200102003','S00004','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20200102004','S00004','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20200102005','S00000','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20200102006','S00002','2022-04-01','2022-04-15',100000,'u00001',1,'');
insert into calibration  values ('XM20200102007','S00006','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20200102008','S00006','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220101032','S00000','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220101033','S00000','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220101037','S00000','2022-04-01','2022-04-15',100000,'u00001',1,'');
insert into calibration  values ('XM20220101038','S00002','2022-04-01','2022-04-15',100000,'u00001',1,'');
insert into calibration  values ('XM20220101039','S00001','2022-04-01','2022-04-15',100000,'u00001',1,'');
insert into calibration  values ('XM20220101040','S00004','2022-04-01','2022-04-15',100000,'u00001',1,'');
insert into calibration  values ('XM20220101041','S00004','2022-04-01','2022-04-15',100000,'u00001',1,'');
insert into calibration  values ('XM20220101042','S00007','2022-04-01','2022-04-15',100000,'u00001',1,'');
insert into calibration  values ('XM20220101043','S00000','2022-04-01','2022-04-15',100000,'u00001',1,'');
insert into calibration  values ('XM20220101044','S00001','2022-04-01','2022-04-15',100000,'u00001',1,'');
insert into calibration  values ('XM20220101045','S00000','2022-04-01','2022-04-15',100000,'u00001',1,'');
insert into calibration  values ('XM20220101046','S00003','2022-04-01','2022-04-15',100000,'u00001',1,'');
insert into calibration  values ('XM20220101047','S00005','2022-04-01','2022-04-15',100000,'u00001',1,'');
insert into calibration  values ('XM20220101048','S00008','2022-04-01','2022-04-15',100000,'u00001',1,'');
insert into calibration  values ('XM20220101049','S00010','2022-04-01','2022-04-15',100000,'u00001',1,'');
insert into calibration  values ('XM20220101050','S00000','2022-04-01','2022-04-15',100000,'u00001',1,'');
insert into calibration  values ('XM20220101051','S00000','2022-04-01','2022-04-15',100000,'u00001',1,'');
insert into calibration  values ('XM20220101052','S00007','2022-04-01','2022-04-15',100000,'u00001',1,'');
insert into calibration  values ('XM20220101053','S00002','2022-04-01','2022-04-15',100000,'u00001',1,'');
insert into calibration  values ('XM20220101054','S00003','2022-04-01','2022-04-15',100000,'u00001',1,'');
insert into calibration  values ('XM20220101055','S00000','2022-04-01','2022-04-15',100000,'u00001',1,'');
insert into calibration  values ('XM20220101056','S00000','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220101057','S00003','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220101074','S00001','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220101075','S00001','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220101076','S00001','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220101077','S00001','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220101078','S00001','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220101080','S00001','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220101089','S00001','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220102005','S00000','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220102019','S00000','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220102026','S00001','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220102029','S00000','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220102073','S00001','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220301001','S00003','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220302003','S00008','2022-04-01','2022-04-15',100000,'u00001',1,'');
insert into calibration  values ('XM20220302005','S00005','2022-04-01','2022-04-15',100000,'u00002',1,'');
insert into calibration  values ('XM20220303004','S00009','2022-04-01','2022-04-15',100000,'u00001',1,'');
insert into calibration  values ('XM20220304006','S00000','2022-04-01','2022-04-15',100000,'u00004',1,'');
insert into calibration  values ('XM20220304007','S00004','2022-04-01','2022-04-15',100000,'u00005',1,'');
insert into calibration  values ('XM20220305008','S00005','2022-04-01','2022-04-15',100000,'u00005',1,'');
insert into calibration  values ('XM20220306009','S00009','2022-04-01','2022-04-15',100000,'u00005',1,'');
insert into calibration  values ('XM20220306010','S00004','2022-04-01','2022-04-15',100000,'u00003',1,'');
insert into calibration  values ('XM20220401001','S00005','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220401002','S00006','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220402003','S00004','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220402005','S00005','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220403004','S00005','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220404006','S00002','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220407001','S00000','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220407002','S00008','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220407003','S00009','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220407004','S00001','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220408005','S00006','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220409010','S00009','2022-04-01','2022-04-15',100000,'u00000',1,'');
insert into calibration  values ('XM20220409011','S00006','2022-04-01','2022-04-15',100000,'u00000',1,'');



*/


select * from calibration;
select * from calibration where it_id ="XM20220101013" and ex_id="S00006";


delete from calibration where it_id ="XM20220101013" and ex_id="S00006";

set sql_safe_updates=0;
update calibration set state = 0 where ex_id = "S00005";
set sql_safe_updates=1;






