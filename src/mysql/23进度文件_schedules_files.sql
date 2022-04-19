
/*
drop table if exists schedules_files;
create table schedules_files(
	it_id		char(13) not null ,			# 项目id
    ex_id		char(6) not null ,			# 项目id
    upurl		varchar(100),		# 原始上传地址
    uid			varchar(50),		# 上传id
    url			varchar(100) not null,		# 文件地址
    name		varchar(50),		# 文件名
    uploadtime	varchar(30),		# 上传时间
    size		varchar(50),			# 文件大小
    primary key(it_id,url)
)comment = '进度文件表';
*/





select * from schedules_files;


