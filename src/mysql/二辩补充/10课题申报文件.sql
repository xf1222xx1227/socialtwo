

drop table if exists declares_files;
create table declares_files(
	topicid		char(13) not null ,			# 课题id
    sb_id	varchar(20),		# 申报id
    upurl		varchar(100),		# 原始上传地址
    uid			varchar(50),		# 上传id
    url			varchar(100) not null,		# 文件地址
    name		varchar(50),		# 文件名
    uploadtime	varchar(30),		# 上传时间
    size		varchar(50)			# 文件大小
    
)comment = '申报文件表';



select * from declares_files;


 # delete from declares_files where sb_id = "KT202204270020001";

















