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

/*

# 改名
update bidding_user set username = '李秀华' where userid = 'u00000';
update bidding_user set username = '张锦红' where userid = 'u00001';
update bidding_user set username = '吕光娥' where userid = 'u00002';
update bidding_user set username = '夏楠' where userid = 'u00003';
update bidding_user set username = '严武松' where userid = 'u00004';
update bidding_user set username = '李晓杰' where userid = 'u00005';
update bidding_user set username = '史文辉' where userid = 'u00006';
update bidding_user set username = '田迎利' where userid = 'u00007';
update bidding_user set username = '郭春霞' where userid = 'u00008';
update bidding_user set username = '董义博' where userid = 'u00009';
update bidding_user set username = '宋志文' where userid = 'u00010';
update bidding_user set username = '周丽红' where userid = 'u00011';
update bidding_user set username = '杨富凯' where userid = 'u00012';
update bidding_user set username = '张占民' where userid = 'u00013';
update bidding_user set username = '祁玉良' where userid = 'u00014';
update bidding_user set username = '武利军' where userid = 'u00015';
update bidding_user set username = '苏秋萍' where userid = 'u00016';
update bidding_user set username = '张庆华' where userid = 'u00017';
update bidding_user set username = '张忠阳' where userid = 'u00018';
update bidding_user set username = '吕海凤' where userid = 'u00019';
update bidding_user set username = '李莉' where userid = 'u00020';
update bidding_user set username = '陶小敏' where userid = 'u00021';
update bidding_user set username = '杨银生' where userid = 'u00022';
update bidding_user set username = '杨莉嘉' where userid = 'u00023';
update bidding_user set username = '樊利星' where userid = 'u00024';
update bidding_user set username = '罗炳恒' where userid = 'u00025';
update bidding_user set username = '郭利妗' where userid = 'u00026';
update bidding_user set username = '杨海银' where userid = 'u00027';
update bidding_user set username = '黄智勇' where userid = 'u00028';
update bidding_user set username = '刘建伟' where userid = 'u00029';
update bidding_user set username = '薛松' where userid = 'u00030';
update bidding_user set username = '高明杰' where userid = 'u00031';
update bidding_user set username = '梦虹桥' where userid = 'u00032';
update bidding_user set username = '宋华幸' where userid = 'u00033';
update bidding_user set username = '杨爱民' where userid = 'u00034';
update bidding_user set username = '严肃' where userid = 'u00045';
update bidding_user set username = '赵克宁' where userid = 'u00101';
update bidding_user set username = '范玉平' where userid = 'u00109';


*/



