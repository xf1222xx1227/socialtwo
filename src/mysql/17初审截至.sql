
/*
drop table if exists finish_first_trial;
create table finish_first_trial
(
   it_id                          char(13)                       not null,
   finishtime                          varchar(30),	
   detailfinishtime                          varchar(30),	
   updatetime                         varchar(300),
   primary key (it_id)
)comment = '初审截至表';


insert into finish_first_trial values
("XM20220101001","2022-02-10","2022-02-20","2022-02-08"),
("XM20220101002","2022-02-10","2022-02-20","2022-02-08"),
("XM20220101003","2022-02-10","2022-02-20","2022-02-08"),
("XM20220101004","2022-02-10","2022-02-20","2022-02-08"),
("XM20220101005","2022-02-10","2022-02-20","2022-02-08"),
("XM20220101006","2022-02-10","2022-02-20","2022-02-08"),
("XM20220101007","2022-02-10","2022-02-20","2022-02-08");

*/

/*
insert into finish_first_trial  values ('XM20200102001','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20200102002','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20200102003','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20200102004','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20200102005','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20200102006','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20200102007','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20200102008','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20200102009','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20200102010','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20200102011','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20200102012','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220301001','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220301002','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220302003','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220302005','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220302011','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220302012','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220303004','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220304006','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220304007','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220305008','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220306009','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220306010','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220401001','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220401002','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220402003','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220402005','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220402011','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220402012','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220403004','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220404006','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220404007','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220405008','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220406009','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220406010','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220407001','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220407002','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220407003','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220407004','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220408005','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220408006','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220408007','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220408008','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220408009','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220409010','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220409011','2022-02-10','2022-02-20','2022-02-08');
insert into finish_first_trial  values ('XM20220409012','2022-02-10','2022-02-20','2022-02-08');



*/




select * from finish_first_trial;








