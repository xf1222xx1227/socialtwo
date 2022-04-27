
/*
drop table if exists users;
create table users
(
    ex_id                          char(6)                        not null,
    name                           varchar(30),		# 学者姓名
    gender							int,			# 0男1女
    password							varchar(20),
    honor						  char(4),			# 荣誉称号(外键)
    birthdate                      varchar(15),				# 出生日期
    research_specialty             char(4),		# 研究专长(外键)
    education                      int,		# 学历	外键
    degree                         char(4) ,		# 学位(外键)
    major                      		varchar(10),		# 专业（外键）
    phone                          varchar(13),			# 电话
    email                          varchar(30),		# 邮件
    address                    varchar(80),		# 家庭地址
    workcompany                        varchar(100),		# 公司
    workphone						varchar(20),		# 办公电话
    companytype							char(5),		# 所属机构类别，外键
    company							char(5),		# 所属机构，外键
    register_time                  varchar(50),			# 注册时间
    cancellation_time               varchar(50),			# 注销时间
    nation					int,	# 民族
    card						varchar(20),	#身份证号码
    post						varchar(20),				#行政职务
    title					varchar(20),		#专业职称
    primary key (ex_id)
)comment = '用户信息表';



insert into users values
("S00000","张中山",0,"1","H000","2000-11-19","R000",1,"D000","10101","17395462598","45436356@qq.com","浙江省杭州市","中国美术学院","0571-31718732","c2000","c2001","2022-02-01","",1,"522122200011192000","","");
# ("S00001","李建国",0,"1","H300","1992-12-19","R001",1,"D001","20101","15485692456","4456356@qq.com","浙江省杭州市","","","c2000","c2001","2022-02-01","",1,"522122200011192000","","");

*/

select * from users;












