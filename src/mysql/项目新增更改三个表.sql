
use social;

# 项目发布表
drop table if exists release_items;
create table release_items
(
   it_id                          char(13)                       not null,	# XM20210101001
   name                           varchar(200),
   userid						char(6),					# 发布人（外键）
   content                        varchar(400),				# 项目内容
   time_release                   varchar(25),				# 发布时间
   time_end                        varchar(25),				# 截至投标时间
   recommend                      int,						# 系统推荐招标（0、1）
   public                         int,						# 公开招标
   invitation                     int,						# 邀请招标
   type							char(4),					# 项目分类/研究方向（外键 research_direction re_id）
   cid                        	 	int,					# 项目的类别(外键 item_category)		
   # time_finilly                   varchar(25),				# 预计完成时间
   rate_economics                 int,						# 经济评审占比
   rate_technology                int,						# 技术评审占比
   rate_comprehensive             int,						# 综合评审占比
   other                          varchar(200),				# 其他
   funds                          bigint,					# 预算
   primary key (it_id)
)comment = '项目发布表';
insert into release_items values
("XM20220101001","项目1","u00000","content","2022-02-01","2022-02-10",0,0,0,"R001",1,30,60,10,"",0),
("XM20220101002","项目2","u00000","content","2022-02-01","2022-02-10",0,0,0,"R004",2,30,60,10,"",0),
("XM20220101003","项目3","u00000","content","2022-02-01","2022-02-10",0,0,0,"R003",1,30,60,10,"",0),
("XM20220101004","项目4","u00000","content","2022-02-01","2022-02-10",0,0,0,"R005",2,30,60,10,"",0),
("XM20220101005","项目5","u00000","content","2022-02-01","2022-02-10",0,0,0,"R007",3,30,60,10,"",0),
("XM20220101006","项目6","u00000","content","2022-02-01","2022-02-10",0,0,0,"R001",2,30,60,10,"",0),
("XM20220101007","项目7","u00000","content","2022-02-01","2022-02-10",0,0,0,"R999",2,30,60,10,"",0),
("XM20220101008","项目8","u00000","content","2022-02-01","2022-02-10",0,0,0,"R001",3,30,60,10,"",0),
("XM20220101009","项目9","u00000","content","2022-02-01","2022-02-10",0,0,0,"R001",2,30,60,10,"",0),
("XM20220101010","项目10","u00000","content","2022-02-01","2022-02-10",0,0,0,"R002",2,30,60,10,"",0),
("XM20220101011","项目11","u00000","content","2022-02-01","2022-02-10",0,0,0,"R001",3,30,60,10,"",0),
("XM20220101012","项目12","u00000","content","2022-02-01","2022-02-10",0,0,0,"R008",5,30,60,10,"",0);
# 正在招标项目
insert into release_items values
("XM20220102001","项目1","u00000","content","2022-02-01","2022-02-10",0,0,0,"R001",1,30,60,10,"",10000),
("XM20220102002","项目2","u00000","content","2022-02-01","2022-02-10",0,0,0,"R004",2,30,60,10,"",120000),
("XM20220102003","项目3","u00000","content","2022-02-01","2022-02-10",0,0,0,"R003",1,30,60,10,"",3000),
("XM20220102004","项目4","u00000","content","2022-02-01","2022-02-10",0,0,0,"R005",2,30,60,10,"",9000),
("XM20220102005","项目5","u00000","content","2022-02-01","2022-02-10",0,0,0,"R007",3,30,60,10,"",56000),
("XM20220102006","项目6","u00000","content","2022-02-01","2022-02-10",0,0,0,"R001",2,30,60,10,"",3400),
("XM20220102007","项目7","u00000","content","2022-02-01","2022-02-10",0,0,0,"R999",2,30,60,10,"",180000),
("XM20220102008","项目8","u00000","content","2022-02-01","2022-02-10",0,0,0,"R001",3,30,60,10,"",30000),
("XM20220102009","项目9","u00000","content","2022-02-01","2022-02-10",0,0,0,"R001",2,30,60,10,"",100000),
("XM20220102010","项目10","u00000","content","2022-02-01","2022-02-10",0,0,0,"R002",2,30,60,10,"",50000),
("XM20220102011","项目11","u00000","content","2022-02-01","2022-02-10",0,0,0,"R001",3,30,60,10,"",70000),
("XM20220102012","项目12","u00000","content","2022-02-01","2022-02-10",0,0,0,"R008",5,30,60,10,"",80000);
# 修改测试数据
insert into release_items values
("XM20220304001","测试1","u00000","","2022-03-04","2022-03-09 00:00:00",0,1,1,"R001",1,30,60,10,"",120000);

select * from release_items where it_id in("XM20220102001","XM20220304001");
select * from item_files where it_id in("XM20220102001","XM20220304001");




select * from release_items order by it_id;
# select files from release_items where it_id = "XM20220304001";

drop table if exists item_files;
create table item_files(
	it_id		char(13) not null ,			# 项目id
    upurl		varchar(100),		# 原始上传地址
    uid			varchar(50),		# 上传id
    url			varchar(100) not null,		# 文件地址
    name		varchar(50),		# 文件名
    uploadtime	varchar(30),		# 上传时间
    size		varchar(50),			# 文件大小
    primary key(it_id,url)
)comment = '项目文件表';
# 修改测试数据
insert into item_files values
# ("XM20220304001","upload\1646394349731-功能架构.docx","1646394349709","http://localhost:8989/1646394349731-功能架构.docx","功能架构.docx","2022-01-07 11:09:32","895002"),
("XM20220304001","upload\1646394357028-001.txt","1646394356690","http://localhost:8989/1646394357028-001.txt","001.txt","2022-03-03 00:48:47","30"),
("XM20220304001","upload\1646394357034-002.txt","1646394356692","http://localhost:8989/1646394357034-002.txt","002.txt","2022-03-03 00:48:47","30"),
("XM20220304001","upload\\1646418147650-zxy_MIS14_chn01.pptx","1646418147622","http://localhost:8989/1646418147650-zxy_MIS14_chn01.pptx","zxy_MIS14_chn01.pptx","2020-11-18 18:56:53","1505273");

select * from item_files;

# 项目状态表
drop table if exists item_state;
create table item_state(
	it_id           char(13)                      not null,
    releases		int,		# 发布（0：未到，1：进行中，2：通过）1
    bid				int,		# 招标2
    release_items   int,		# 初审3
    review_details  int,		# 细审4
    calibratio		int,		# 定标5
    bid_opening		int,		# 开标6
    finish			int,		# 完成7
    state			varchar(20),	#当前状态（0：未发布，1：发布，2：招标）
    primary key(it_id)
)comment = '项目状态表';
insert into item_state values
("XM20220101001",2,2,2,2,2,2,2,7),
("XM20220101002",2,2,2,2,2,2,2,7),
("XM20220101003",2,2,2,2,2,2,2,7),
("XM20220101004",2,2,2,2,2,2,2,7),
("XM20220101005",2,2,2,2,2,2,2,7),
("XM20220101006",2,2,2,2,2,2,2,7),
("XM20220101007",2,2,2,2,2,2,2,7),
("XM20220101008",2,2,2,2,2,2,2,7),
("XM20220101009",2,2,2,2,2,2,2,7),
("XM20220101010",2,2,2,2,2,2,2,7),
("XM20220101011",2,2,2,2,2,2,2,7),
("XM20220101012",2,2,2,2,2,2,2,7);

# 正在招标阶段项目
insert into item_state values
("XM20220102001",2,1,0,0,0,0,0,2),
("XM20220102002",2,1,0,0,0,0,0,2),
("XM20220102003",2,1,0,0,0,0,0,2),
("XM20220102004",2,1,0,0,0,0,0,2),
("XM20220102005",2,1,0,0,0,0,0,2),
("XM20220102006",2,1,0,0,0,0,0,2),
("XM20220102007",2,1,0,0,0,0,0,2),
("XM20220102008",2,1,0,0,0,0,0,2),
("XM20220102009",2,1,0,0,0,0,0,2),
("XM20220102010",2,1,0,0,0,0,0,2),
("XM20220102011",2,1,0,0,0,0,0,2),
("XM20220102012",2,1,0,0,0,0,0,2);
# 修改测试数据
insert into item_state values
("XM20220304001",2,1,0,0,0,0,0,2);




select * from release_items a join item_state b 
	where a.it_id=b.it_id and b.state = 2;

select * from item_state;


drop table if exists release_items_invitation;
create table release_items_invitation
(
   it_id                            char(13)                      not null,	# XM20210101001
   ex_id							char(6)                      not null,
   primary key (it_id,ex_id)
)comment = '项目发布专家邀请表';

# 测试数据
insert into release_items_invitation values
("XM20220304001","S00000"),
("XM20220304001","S00002"),
("XM20220304001","S00009");


select * from release_items_invitation;





select * from release_items order by it_id;
select * from release_items_invitation;
select * from item_state;
select * from item_files;









