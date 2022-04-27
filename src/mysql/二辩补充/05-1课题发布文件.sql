



drop table if exists topic_files;
create table topic_files(
	id		char(13) not null ,			# 课题id
    upurl		varchar(100),		# 原始上传地址
    uid			varchar(50),		# 上传id
    url			varchar(100) not null,		# 文件地址
    name		varchar(50),		# 文件名
    uploadtime	varchar(30),		# 上传时间
    size		varchar(50),			# 文件大小
    primary key(id,url)
)comment = '项目文件表';



select * from topic_files;

# select *  from topic_files where id = 'KT20220426001';










