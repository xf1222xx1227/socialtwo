
/*
drop table if exists admins;
create table admins		#社科联信息表
(
   id                           char(9)                        not null,		# Bxxxxxxxxx
   name                           varchar(20),
   password						varchar(20),
   phone						varchar(11),
   primary key (id)
)comment = '社科联信息表';
insert into admins values
	("A00","管理员1","1","17365421568"),
    ("A01","管理员2","1","17365421568"),
    ("A02","管理员3","1","17365421568"),
    ("A03","管理员4","1","17365421568");
*/    
    
select * from admins;





