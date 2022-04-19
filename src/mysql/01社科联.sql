/*

drop table if exists bidding;
create table bidding		#社科联信息表
(
   b_id                           char(9)                        not null,		# Bxxxxxxxxx
   name                           varchar(20),
   password						varchar(20),
   address                        varchar(200),
   phone                          varchar(13),
   representative                       varchar(20),	#法人代表
   representative_phone                 char(11),
   representative_address               varchar(200),
   register_time                  varchar(50),			# 注册时间
   cancellation_time               varchar(50),			# 注销时间
   frozen						varchar(20),			# 冻结时间
   frozen_reason				varchar(200),			# 冻结原因
   primary key (b_id)
)comment = '社科联信息表';
insert into bidding values
	("b00000000","浙江省社科联","1","浙江省杭州市余杭区","12343245345","王五01","12343245342","浙江省杭州市余杭区","","","",""),
    ("b00000001","浙江省杭州市社科联","1","浙江省杭州市余杭区","12343245345","王五02","12343245342","浙江省杭州市余杭区","","","",""),
    ("b00000002","浙江省宁波市社科联","1","浙江省杭州市余杭区","12343245345","王五03","12343245342","浙江省杭州市余杭区","","","",""),
    ("b00000003","浙江省绍兴市社科联","1","浙江省杭州市余杭区","12343245345","王五04","12343245342","浙江省杭州市余杭区","","","","");
    
    
    */
    
    
select * from bidding;