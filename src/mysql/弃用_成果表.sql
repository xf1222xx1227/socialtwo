use social;

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
