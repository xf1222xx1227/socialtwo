
/*
drop table if exists users_register;
create table users_register
(
   ex_id                          char(6)                        not null,
   company							char(5),		# 所属机构，外键
   name                           varchar(30),		# 学者姓名
   gender							int,			# 0男1女   
   birthdate                      varchar(15),				# 出生日期
   phone                          varchar(13),			# 电话
   card								varchar(30),
   email                          varchar(30),		# 邮件
   password							varchar(20),
   register_time                  varchar(50),			# 注册时间
   primary key (ex_id)
)comment = '用户信息表';
*/
/*
insert into users_register values
("S00100","c2001","张三",0,"2000-11-19","17395462598","522122166512524236","45436356@qq.com","1","2022-02-01");
*/


select * from users_register;










