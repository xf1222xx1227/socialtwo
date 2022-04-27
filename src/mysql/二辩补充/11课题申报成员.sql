
drop table if exists declaresmenber;
create table declaresmenber(
	topicid		varchar(20),	# 课题id
    sb_id	varchar(20),	# 申报id
    indexs	int,			# 序号
    name	varchar(20),	# 姓名
    gender	int,			# 0男1女
    birthdate	varchar(20),
    title	varchar(30),		# 专业职称
    post	varchar(30),		# 行政职务
    education		int,		# 最高学历（外键）	
    degree			char(4),			# 最高学位（外键）
    workcompany		varchar(60),		# 工作单位
    primary key(sb_id,indexs)
);

# select a.*,b.c from declares a join (select topicid,count(*)+1 as c from declaresmenber group by topicid) b where a.topicid = b.topicid;

select * from declaresmenber;


# alter table declaresmenber drop primary key;
# alter table declaresmenber add primary key(sb_id,indexs);




select * from declaresmenber;


# set sql_safe_updates=1;
# delete from declaresmenber where sb_id = "KT202204270010001";














