/*
drop table if exists bidding_user;
create table bidding_user		# 社科联使用账户
(
   userid                           char(6)                        not null,	# uxxxxx
   username                           varchar(20),
   password							varchar(20),
   address                        varchar(200),
   phone                          varchar(13),
   b_id                           char(9),		#所属社科
   register_time                  varchar(50),			# 注册时间
   cancellation_time               varchar(50),			# 注销时间
   frozen						varchar(20),			# 冻结时间
   frozen_reason				varchar(200),			# 冻结原因
   primary key (userid)
)comment = '社科联使用账户';
insert into bidding_user values
	("u00000","李四1","1","浙江省杭州市余杭区","12343245345","b00000000","2022-01-01","","",""),
    ("u00001","李四2","1","浙江省杭州市余杭区","12343245345","b00000000","2022-01-01","","",""),
    ("u00002","王五3","1","浙江省杭州市余杭区","12343245345","b00000000","2022-01-01","","",""),
    ("u00003","李四4","1","浙江省杭州市余杭区","12343245345","b00000000","2022-01-01","","",""),
    ("u00004","张三5","1","浙江省杭州市余杭区","12343245345","b00000000","2022-01-01","","",""),
    ("u00005","张三6","1","浙江省杭州市余杭区","12343245345","b00000000","2022-01-01","","",""),
    ("u00006","王五7","1","浙江省杭州市余杭区","12343245345","b00000003","2022-01-01","","",""),
    ("u00007","李四8","1","浙江省杭州市余杭区","12343245345","b00000003","2022-01-01","","",""),
    ("u00008","张三9","1","浙江省杭州市余杭区","12343245345","b00000003","2022-01-01","","",""),
    ("u00009","张三10","1","浙江省杭州市余杭区","12343245345","b00000003","2022-01-01","","",""),
    ("u00010","李四11","1","浙江省杭州市余杭区","12343245345","b00000003","2022-01-01","","",""),
    ("u00011","王五12","1","浙江省杭州市余杭区","12343245345","b00000000","2022-01-01","","",""),
    ("u00012","李四13","1","浙江省杭州市余杭区","12343245345","b00000000","2022-01-01","","",""),
    ("u00013","张三14","1","浙江省杭州市余杭区","12343245345","b00000000","2022-01-01","","",""),
    ("u00014","李四15","1","浙江省杭州市余杭区","12343245345","b00000001","2022-01-01","","",""),
    ("u00015","王五16","1","浙江省杭州市余杭区","12343245345","b00000003","2022-01-01","","",""),
    ("u00016","张三17","1","浙江省杭州市余杭区","12343245345","b00000003","2022-01-01","","",""),
    ("u00017","李四18","1","浙江省杭州市余杭区","12343245345","b00000003","2022-01-01","","",""),
    ("u00018","张三19","1","浙江省杭州市余杭区","12343245345","b00000001","2022-01-01","","",""),
    ("u00019","王五20","1","浙江省杭州市余杭区","12343245345","b00000002","2022-01-01","","",""),
    ("u00020","张三21","1","浙江省杭州市余杭区","12343245345","b00000002","2022-01-01","","",""),
    ("u00021","李四22","1","浙江省杭州市余杭区","12343245345","b00000002","2022-01-01","","",""),
    ("u00022","王五23","1","浙江省杭州市余杭区","12343245345","b00000002","2022-01-01","","",""),
    ("u00023","张三24","1","浙江省杭州市余杭区","12343245345","b00000002","2022-01-01","","",""),
    ("u00024","李四25","1","浙江省杭州市余杭区","12343245345","b00000002","2022-01-01","","",""),
    ("u00025","张三26","1","浙江省杭州市余杭区","12343245345","b00000002","2022-01-01","","",""),
    ("u00026","王五27","1","浙江省杭州市余杭区","12343245345","b00000002","2022-01-01","","",""),
    ("u00027","李四28","1","浙江省杭州市余杭区","12343245345","b00000001","2022-01-01","","",""),
    ("u00028","李四29","1","浙江省杭州市余杭区","12343245345","b00000001","2022-01-01","","",""),
    ("u00029","张三30","1","浙江省杭州市余杭区","12343245345","b00000003","2022-01-01","","",""),
    ("u00030","王五31","1","浙江省杭州市余杭区","12343245345","b00000001","2022-01-01","","",""),
    ("u00031","李四32","1","浙江省杭州市余杭区","12343245345","b00000001","2022-01-01","","",""),
    ("u00032","王五33","1","浙江省杭州市余杭区","12343245345","b00000001","2022-01-01","","",""),
    ("u00033","李四34","1","浙江省杭州市余杭区","12343245345","b00000001","2022-01-01","","",""),
    ("u00034","王五35","1","浙江省杭州市余杭区","12343245345","b00000001","2022-01-01","","",""),
    ("u00045","王五36","1","浙江省杭州市余杭区","12343245345","b00000001","2022-01-01","","","");
    */
select * from bidding_user;





