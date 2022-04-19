drop table if exists education;
create table education(
id 			int,
name 		varchar(30),
primary key(id)
)comment = '学历表';
insert into education values
(1,"博士研究生"),
(2,"硕士研究生"),
(3,"本科"),
(4,"专科"),
(5,"中专/高中"),
(6,"初中"),
(7,"小学"),
(8,"无");
select * from education;