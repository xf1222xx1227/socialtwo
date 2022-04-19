drop table if exists expert_personal_register;
create table expert_personal_register
(
   ex_id                          char(6)                        not null,
   name                           varchar(30),		# 学者姓名
   password							varchar(20),
   honor						  char(4),			# 荣誉称号(外键)
   birthdate                      varchar(15),				# 出生日期
   research_specialty             char(4),		# 研究专长(外键)
   education                      varchar(20),		# 学历
   degree                         char(4) ,		# 学位(外键)
   major                      		varchar(10),		# 专业（专业）
   phone                          varchar(13),			# 电话
   email                          varchar(30),		# 邮件
   address_province                    int,		# 家庭地址-省
   address_city                        int,		# 家庭地址-市
   address_county                      int,		# 家庭地址-县
   address_detail                      varchar(80),		# 家庭地址-详细地址
   company                        varchar(100),		# 公司
   accept_invitation              int,		# 是否接收邀请
   accept_recommend               int,		# 是否接收推荐
   register_time                  varchar(50),			# 注册时间
   primary key (ex_id)
)comment = '学者注册表';
select * from expert_personal_register;