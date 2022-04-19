
/*
drop table if exists schedules_urge;
create table schedules_urge(
	it_id		char(13) not null ,			# 项目id
    ex_id		char(6) not null ,			# 专家id
    urgetime		varchar(20),		# 原始上传地址
    state			int,			# 0表示未应答，1表示已观看
    primary key(it_id,ex_id)
)comment = '进度文件表';
*/


select * from schedules_urge;