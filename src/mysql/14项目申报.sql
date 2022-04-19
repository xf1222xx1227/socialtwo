/*
drop table if exists bid_items;
create table bid_items			#项目投标表
(
   ex_id                         char(6)                        not null,
   it_id                          char(13)                       not null,
   bid_time                       varchar(20),
   budget                         int,
   finilly_time                   varchar(20),
   other                          varchar(100),
   primary key (ex_id, it_id)
)comment = '项目申报表';
insert into bid_items values
("S00000","XM20220102001","2022-03-11","10000","2022-03-15","无"),
("S00000","XM20220102002","2022-03-10","120000","2022-03-31","无"),
("S00000","XM20220102003","2022-03-10","11000","2025-03-31","无"),
("S00000","XM20220102005","2022-03-10","11000","2022-03-31","无"),
("S00000","XM20220101013","2022-03-10","11000","2025-03-31","无"),
("S00000","XM20220101014","2022-03-10","11000","2025-03-31","无"),
("S00000","XM20220101015","2022-03-10","11000","2025-03-31","无"),
("S00000","XM20220101016","2022-03-10","11000","2025-03-31","无"),
("S00000","XM20220101017","2022-03-10","11000","2025-03-31","无"),
("S00000","XM20220101018","2022-03-10","11000","2025-03-31","无"),
("S00000","XM20220102019","2022-03-10","11000","2022-03-31","无"),
("S00000","XM20220101020","2022-03-10","11000","2025-03-31","无"),
("S00000","XM20220101021","2022-03-10","11000","2025-03-31","无"),
("S00000","XM20220101022","2022-03-10","11000","2025-03-31","无"),
("S00000","XM20220101023","2022-03-10","11000","2025-03-31","无"),
("S00000","XM20220101024","2022-03-10","11000","2025-03-31","无"),
("S00000","XM20220101025","2022-03-10","11000","2025-03-31","无"),
("S00000","XM20220101026","2022-03-10","11000","2025-03-31","无"),
("S00000","XM20220101027","2022-03-10","11000","2025-03-31","无"),
("S00000","XM20220101028","2022-03-10","11000","2025-03-31","无"),
("S00000","XM20220102029","2022-03-10","11000","2022-03-31","无"),
("S00000","XM20220101030","2022-03-10","11000","2025-03-31","无"),
("S00000","XM20220101031","2022-03-10","11000","2025-03-31","无"),
("S00000","XM20220101032","2022-03-10","11000","2025-03-31","无"),
("S00000","XM20220101033","2022-03-10","11000","2025-03-31","无"),
("S00001","XM20220101023","2022-03-10","11000","2025-03-31","无"),
("S00001","XM20220101024","2022-03-10","11000","2025-03-31","无"),
("S00001","XM20220101025","2022-03-10","11000","2025-03-31","无"),
("S00001","XM20220102026","2022-03-10","11000","2022-03-31","无"),
("S00001","XM20220101027","2022-03-10","11000","2025-03-31","无"),
("S00001","XM20220101028","2022-03-10","11000","2025-03-31","无"),
("S00001","XM20220101029","2022-03-10","11000","2025-03-31","无"),
("S00001","XM20220101030","2022-03-10","11000","2025-03-31","无"),
("S00001","XM20220101031","2022-03-10","11000","2025-03-31","无"),
("S00001","XM20220102073","2022-03-10","11000","2022-03-31","无"),
("S00001","XM20220101074","2022-03-10","11000","2025-03-31","无"),
("S00001","XM20220101075","2022-03-10","11000","2025-03-31","无"),
("S00001","XM20220101076","2022-03-10","11000","2025-03-31","无"),
("S00001","XM20220101077","2022-03-10","11000","2025-03-31","无"),
("S00001","XM20220101078","2022-03-10","11000","2025-03-31","无"),
("S00001","XM20220101089","2022-03-10","11000","2025-03-31","无"),
("S00001","XM20220101080","2022-03-10","11000","2025-03-31","无");

# =CONCATENATE("insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('",A2,"','",B2,"','2022-04-03','",D2,"','2022-05-01','",F2,"');")
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00002','XM20220101013','2022-04-03','0','2022-05-01','gd n');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00002','XM20220101014','2022-04-03','0','2022-05-01','gd n');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00002','XM20220101015','2022-04-03','0','2022-05-01','gd n');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00002','XM20220101016','2022-04-03','0','2022-05-01','gd n');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00002','XM20220101017','2022-04-03','0','2022-05-01','gd n');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00002','XM20220101018','2022-04-03','0','2022-05-01','gd n');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00002','XM20220101019','2022-04-03','0','2022-05-01','gd n');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00002','XM20220101020','2022-04-03','0','2022-05-01','gd n');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00002','XM20220101021','2022-04-03','0','2022-05-01','gd n');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00002','XM20220101022','2022-04-03','0','2022-05-01','gd n');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00002','XM20220101023','2022-04-03','0','2022-05-01','gd n');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00002','XM20220101024','2022-04-03','0','2022-05-01','gd n');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00002','XM20220101025','2022-04-03','0','2022-05-01','gd n');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00002','XM20220101026','2022-04-03','0','2022-05-01','gd n');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00002','XM20220101027','2022-04-03','0','2022-05-01','gd n');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00003','XM20220101013','2022-04-03','42000','2022-05-01','ryjnhgwfgh');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00003','XM20220101014','2022-04-03','42000','2022-05-01','ryjnhgwfgh');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00003','XM20220101015','2022-04-03','42000','2022-05-01','ryjnhgwfgh');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00003','XM20220101016','2022-04-03','42000','2022-05-01','ryjnhgwfgh');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00003','XM20220101017','2022-04-03','42000','2022-05-01','ryjnhgwfgh');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00003','XM20220101018','2022-04-03','42000','2022-05-01','ryjnhgwfgh');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00003','XM20220101019','2022-04-03','42000','2022-05-01','ryjnhgwfgh');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00003','XM20220101020','2022-04-03','42000','2022-05-01','ryjnhgwfgh');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00003','XM20220101021','2022-04-03','42000','2022-05-01','ryjnhgwfgh');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00003','XM20220101022','2022-04-03','42000','2022-05-01','ryjnhgwfgh');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00003','XM20220101023','2022-04-03','42000','2022-05-01','ryjnhgwfgh');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00003','XM20220101024','2022-04-03','42000','2022-05-01','ryjnhgwfgh');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00003','XM20220101025','2022-04-03','42000','2022-05-01','ryjnhgwfgh');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00003','XM20220101026','2022-04-03','42000','2022-05-01','ryjnhgwfgh');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00003','XM20220101027','2022-04-03','42000','2022-05-01','ryjnhgwfgh');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00003','XM20220101028','2022-04-03','42000','2022-05-01','ryjnhgwfgh');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00003','XM20220101029','2022-04-03','42000','2022-05-01','ryjnhgwfgh');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00005','XM20220101013','2022-04-03','100000','2022-05-01','rggefvf');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00005','XM20220101014','2022-04-03','100000','2022-05-01','rggefvf');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00005','XM20220101015','2022-04-03','100000','2022-05-01','rggefvf');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00005','XM20220101016','2022-04-03','100000','2022-05-01','rggefvf');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00005','XM20220101017','2022-04-03','100000','2022-05-01','rggefvf');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00005','XM20220101018','2022-04-03','100000','2022-05-01','rggefvf');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00005','XM20220101019','2022-04-03','100000','2022-05-01','rggefvf');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00005','XM20220101020','2022-04-03','100000','2022-05-01','rggefvf');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00005','XM20220101021','2022-04-03','100000','2022-05-01','rggefvf');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00005','XM20220101022','2022-04-03','100000','2022-05-01','rggefvf');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00005','XM20220101023','2022-04-03','100000','2022-05-01','rggefvf');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00005','XM20220101024','2022-04-03','100000','2022-05-01','rggefvf');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00006','XM20220101013','2022-04-03','100000','2022-05-01','jjh,hhm');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00006','XM20220101014','2022-04-03','100000','2022-05-01','jjh,hhm');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00006','XM20220101015','2022-04-03','100000','2022-05-01','jjh,hhm');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00006','XM20220101016','2022-04-03','100000','2022-05-01','jjh,hhm');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00006','XM20220101017','2022-04-03','100000','2022-05-01','jjh,hhm');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00006','XM20220101018','2022-04-03','100000','2022-05-01','jjh,hhm');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00006','XM20220101019','2022-04-03','100000','2022-05-01','jjh,hhm');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00006','XM20220101020','2022-04-03','100000','2022-05-01','jjh,hhm');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00006','XM20220101021','2022-04-03','100000','2022-05-01','jjh,hhm');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00006','XM20220101022','2022-04-03','100000','2022-05-01','jjh,hhm');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00006','XM20220101023','2022-04-03','100000','2022-05-01','jjh,hhm');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00006','XM20220101024','2022-04-03','100000','2022-05-01','jjh,hhm');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00006','XM20220101025','2022-04-03','100000','2022-05-01','jjh,hhm');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00006','XM20220101026','2022-04-03','100000','2022-05-01','jjh,hhm');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00006','XM20220101027','2022-04-03','100000','2022-05-01','bgdshbdgnbgd');

*/
/*
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00000','XM20220101001','2022-02-03','100000','2022-05-01','bgdshbdgnbgd');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00001','XM20220101002','2022-02-03','100000','2022-05-01','bgdshbdgnbgd');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00002','XM20220101003','2022-02-03','100000','2022-05-01','bgdshbdgnbgd');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00003','XM20220101004','2022-02-03','100000','2022-05-01','bgdshbdgnbgd');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00004','XM20220101005','2022-02-03','100000','2022-05-01','bgdshbdgnbgd');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00005','XM20220101006','2022-02-03','100000','2022-05-01','bgdshbdgnbgd');
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values ('S00000','XM20220101007','2022-02-03','100000','2022-05-01','bgdshbdgnbgd');
*/


/*
insert into bid_items (ex_id,it_id,bid_time,budget,finilly_time,other) values 
('S00000','XM20220101037','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00001','XM20220101038','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00002','XM20220101038','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00001','XM20220101039','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00002','XM20220101039','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00003','XM20220101040','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00004','XM20220101040','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00003','XM20220101041','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00004','XM20220101041','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00005','XM20220101042','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00006','XM20220101042','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00007','XM20220101042','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00000','XM20220101043','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00001','XM20220101044','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00000','XM20220101045','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00002','XM20220101046','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00003','XM20220101046','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00004','XM20220101047','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00005','XM20220101047','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00006','XM20220101047','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00007','XM20220101048','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00008','XM20220101048','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00009','XM20220101049','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00010','XM20220101049','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00000','XM20220101050','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00000','XM20220101051','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00002','XM20220101052','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00003','XM20220101052','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00004','XM20220101052','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00005','XM20220101052','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00006','XM20220101052','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00007','XM20220101052','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00008','XM20220101053','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00009','XM20220101053','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00001','XM20220101053','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00002','XM20220101053','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00000','XM20220101054','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00003','XM20220101054','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00000','XM20220101055','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00000','XM20220101056','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00002','XM20220101057','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00003','XM20220101057','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
# 2020-02
('S00000','XM20200102001','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00001','XM20200102002','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00002','XM20200102002','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00003','XM20200102002','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00004','XM20200102003','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00005','XM20200102003','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00005','XM20200102004','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00004','XM20200102004','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00000','XM20200102005','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00001','XM20200102006','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00002','XM20200102006','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00004','XM20200102006','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00001','XM20200102007','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00005','XM20200102007','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00006','XM20200102007','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00001','XM20200102008','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00005','XM20200102008','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00006','XM20200102008','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),

# 2022-04 
('S00000','XM20220401001','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00001','XM20220401001','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00002','XM20220401001','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00003','XM20220401001','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00004','XM20220401001','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00005','XM20220401001','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00006','XM20220401002','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00007','XM20220401002','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00008','XM20220401002','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00009','XM20220401002','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00001','XM20220402003','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00002','XM20220402003','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00003','XM20220402003','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00004','XM20220402003','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00005','XM20220403004','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00006','XM20220403004','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00007','XM20220403004','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00008','XM20220403004','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00001','XM20220402005','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00002','XM20220402005','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00003','XM20220402005','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00000','XM20220402005','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00005','XM20220402005','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00000','XM20220404006','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00001','XM20220404006','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00002','XM20220404006','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
# 2022-04-07/8/9
('S00001','XM20220407001','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00002','XM20220407001','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00003','XM20220407001','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00000','XM20220407001','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00004','XM20220407001','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00005','XM20220407002','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00006','XM20220407002','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00007','XM20220407002','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00008','XM20220407002','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00009','XM20220407003','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00000','XM20220407003','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00008','XM20220407003','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00001','XM20220407003','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00001','XM20220407004','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00002','XM20220407004','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00003','XM20220407004','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00004','XM20220408005','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00005','XM20220408005','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00006','XM20220408005','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00007','XM20220409010','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00008','XM20220409010','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00009','XM20220409010','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00001','XM20220409011','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00004','XM20220409011','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00005','XM20220409011','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00006','XM20220409011','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
# 2022-03
('S00001','XM20220301001','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00002','XM20220301001','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00003','XM20220301001','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00004','XM20220302003','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00005','XM20220302003','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00006','XM20220302003','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00007','XM20220302003','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00008','XM20220302003','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00009','XM20220303004','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00000','XM20220303004','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00001','XM20220303004','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00002','XM20220303004','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00003','XM20220302005','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00004','XM20220302005','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00005','XM20220302005','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00006','XM20220304006','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00007','XM20220304006','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00008','XM20220304006','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00009','XM20220304006','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00000','XM20220304006','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00001','XM20220304007','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00002','XM20220304007','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00003','XM20220304007','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00004','XM20220304007','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00005','XM20220305008','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00006','XM20220305008','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00007','XM20220305008','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00008','XM20220305008','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00009','XM20220306009','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00000','XM20220306009','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00001','XM20220306009','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00002','XM20220306009','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00003','XM20220306010','2022-02-03','100000','2022-05-01','bgdshbdgnbgd'),
('S00004','XM20220306010','2022-02-03','100000','2022-05-01','bgdshbdgnbgd');

*/











select * from bid_items order by it_id;


# select * from bid_items where ex_id = "S00001";












