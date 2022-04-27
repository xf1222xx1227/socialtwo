



drop table if exists declares;
create table declares(
	sb_id				varchar(20),	# KT202001010010001
    topicid			varchar(20),	# 课题id（外键）
    ex_id			char(6),		# 申报人id（外键）
    name			varchar(40),	# 申报名称
    companytype		char(5),			# 推荐单位类别（外键）
    company			char(5),		# 具体推荐单位（外键）
    declaretype		varchar(20),	# 申报类别
    researchtype	varchar(20),	# 研究类型
    majorone		varchar(10),	# 一级学科（外键）
    majortwo		varchar(10),	# 二级学科（外键）
    checkList		varchar(20),	# 预期成果
    number			int,			# 字数
    checkListGone	varchar(20),	# 成果去向
    finishdate		varchar(20),	# 计划完成时间
    demonstration	varchar(5000),	# 课题设计论证
    declaretime		varchar(20),		# 申报时间
    nosupport		int,				# 同意转为立项不资助课题 0同意1不同意
    usereducation		int,		# 最高学历（外键）	
    userdegree			char(4),			# 最高学位（外键）
    useraddress		varchar(100),		# 负责人地址
    userbirthdate	varchar(20),
    useremail		varchar(30),
    usergender			int,		# 0男1女
    username		varchar(30),
    usernation		int,		# 民族（外键）
    userphone		varchar(20),
    userpost		varchar(20),	# 行政职务
    usertitle		varchar(20),		# 专业职称
    userpostoffice		varchar(20),			# 邮政编码
    userresearch_specialty		varchar(30),	# 研究专长
    usertutor		varchar(20),	# 担任导师
    userworkcompany		varchar(50),	# 工作单位
    userworkphone		varchar(20),		# 工作电话
    primary key(sb_id)
);
# alter table declares add primary key(sb_id);


select * from declares;


# update declares set companytype = "c2000" where sb_id = "KT202204270020001";


# delete from declares where sb_id = "KT202204270020001";


# KT202204260020001

































