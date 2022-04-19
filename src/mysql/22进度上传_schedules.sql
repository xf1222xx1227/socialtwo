
/*
drop table if exists schedules;
create table schedules		#进度上传表
(
   it_id                          char(13)                       not null,
   ex_id                         char(6)                        not null,
   title               			varchar(200),
   schedules                           int,	
   time_schedule               			varchar(20),
   other						varchar(200),
   primary key (it_id,ex_id,time_schedule)
)comment = '进度上传表';
*/


select * from schedules;