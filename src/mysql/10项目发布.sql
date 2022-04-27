# 项目发布表
/*
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
("XM20220101012","项目12","u00000","content","2022-02-01","2022-02-10",0,0,0,"R008",5,30,60,10,"",0),
("XM20220101013","项目13","u00000","content","2022-02-01","2024-02-10",1,0,0,"R001",3,30,60,10,"",0),
("XM20220101014","项目14","u00000","content","2022-02-01","2024-02-10",1,0,0,"R000",3,30,60,10,"",0),
("XM20220101015","项目15","u00000","content","2022-02-01","2024-02-10",1,0,0,"R002",3,30,60,10,"",0),
("XM20220101016","项目16","u00000","content","2022-02-01","2024-02-10",1,0,0,"R003",3,30,60,10,"",0),
("XM20220101017","项目17","u00000","content","2022-02-01","2024-02-10",1,0,0,"R004",3,30,60,10,"",0),
("XM20220101018","项目18","u00000","content","2022-02-01","2024-02-10",1,0,0,"R005",3,30,60,10,"",0),
("XM20220101019","项目19","u00000","content","2022-02-01","2024-02-10",2,0,0,"R006",3,30,60,10,"",0),
("XM20220101020","项目20","u00000","content","2022-02-01","2024-02-10",3,0,0,"R007",3,30,60,10,"",0),
("XM20220101021","项目21","u00000","content","2022-02-01","2024-02-10",1,0,0,"R008",3,30,60,10,"",0),
("XM20220101022","项目22","u00000","content","2022-02-01","2024-02-10",1,0,0,"R009",3,30,60,10,"",0),
("XM20220101023","项目23","u00000","content","2022-02-01","2024-02-10",1,0,0,"R010",3,30,60,10,"",0),
("XM20220101024","项目24","u00000","content","2022-02-01","2024-02-10",1,0,0,"R000",3,30,60,10,"",0),
("XM20220101025","项目25","u00000","content","2022-02-01","2024-02-10",1,0,0,"R002",3,30,60,10,"",0),
("XM20220101026","项目26","u00000","content","2022-02-01","2024-02-10",1,0,0,"R003",3,30,60,10,"",0),
("XM20220101027","项目27","u00000","content","2022-02-01","2024-02-10",1,0,0,"R004",3,30,60,10,"",0),
("XM20220101028","项目28","u00000","content","2022-02-01","2024-02-10",1,0,0,"R005",3,30,60,10,"",0),
("XM20220101029","项目29","u00000","content","2022-02-01","2024-02-10",2,0,0,"R006",3,30,60,10,"",0),
("XM20220101030","项目30","u00000","content","2022-02-01","2024-02-10",3,0,0,"R007",3,30,60,10,"",0),
("XM20220101031","项目31","u00000","content","2022-02-01","2024-02-10",1,0,0,"R008",3,30,60,10,"",0),
("XM20220101032","项目32","u00000","content","2022-02-01","2024-02-10",1,0,0,"R009",3,30,60,10,"",0),
("XM20220101033","项目33","u00000","content","2022-02-01","2024-02-10",1,0,0,"R010",3,30,60,10,"",0),
("XM20220101034","项目34","u00000","content","2022-02-01","2024-02-10",1,0,0,"R000",3,30,60,10,"",0),
("XM20220101035","项目35","u00000","content","2022-02-01","2024-02-10",1,0,0,"R002",3,30,60,10,"",0),
("XM20220101036","项目36","u00000","content","2022-02-01","2024-02-10",1,0,0,"R003",3,30,60,10,"",0),
("XM20220101037","项目37","u00001","content","2022-02-01","2024-02-10",1,0,0,"R004",3,30,60,10,"",0),
("XM20220101038","项目38","u00001","content","2022-02-01","2024-02-10",1,0,0,"R005",3,30,60,10,"",0),
("XM20220101039","项目39","u00001","content","2022-02-01","2024-02-10",1,0,0,"R006",3,30,60,10,"",0),
("XM20220101040","项目40","u00001","content","2022-02-01","2024-02-10",1,0,0,"R007",3,30,60,10,"",0),
("XM20220101041","项目41","u00001","content","2022-02-01","2024-02-10",1,0,0,"R008",3,30,60,10,"",0),
("XM20220101042","项目42","u00001","content","2022-02-01","2024-02-10",1,0,0,"R009",3,30,60,10,"",0),
("XM20220101043","项目43","u00001","content","2022-02-01","2024-02-10",1,0,0,"R010",3,30,60,10,"",0),
("XM20220101044","项目44","u00001","content","2022-02-01","2024-02-10",1,0,0,"R000",3,30,60,10,"",0),
("XM20220101045","项目45","u00001","content","2022-02-01","2024-02-10",1,0,0,"R002",3,30,60,10,"",0),
("XM20220101046","项目46","u00001","content","2022-02-01","2024-02-10",1,0,0,"R003",3,30,60,10,"",0),
("XM20220101047","项目47","u00001","content","2022-02-01","2024-02-10",1,0,0,"R004",3,30,60,10,"",0),
("XM20220101048","项目48","u00001","content","2022-02-01","2024-02-10",1,0,0,"R005",3,30,60,10,"",0),
("XM20220101049","项目49","u00001","content","2022-02-01","2024-02-10",1,0,0,"R006",3,30,60,10,"",0),
("XM20220101050","项目50","u00001","content","2022-02-01","2024-02-10",1,0,0,"R007",3,30,60,10,"",0),
("XM20220101051","项目51","u00001","content","2022-02-01","2024-02-10",1,0,0,"R008",3,30,60,10,"",0),
("XM20220101052","项目52","u00001","content","2022-02-01","2024-02-10",1,0,0,"R009",3,30,60,10,"",0),
("XM20220101053","项目53","u00001","content","2022-02-01","2024-02-10",1,0,0,"R010",3,30,60,10,"",0),
("XM20220101054","项目54","u00001","content","2022-02-01","2024-02-10",1,0,0,"R000",3,30,60,10,"",0),
("XM20220101055","项目55","u00001","content","2022-02-01","2024-02-10",1,0,0,"R002",3,30,60,10,"",0),
("XM20220101056","项目56","u00000","content","2022-02-01","2024-02-10",1,0,0,"R003",3,30,60,10,"",0),
("XM20220101057","项目57","u00000","content","2022-02-01","2024-02-10",1,0,0,"R004",3,30,60,10,"",0),
("XM20220101058","项目58","u00000","content","2022-02-01","2024-02-10",1,0,0,"R005",3,30,60,10,"",0),
("XM20220101059","项目59","u00000","content","2022-02-01","2024-02-10",1,0,0,"R006",3,30,60,10,"",0),
("XM20220101060","项目60","u00000","content","2022-02-01","2024-02-10",1,0,0,"R007",3,30,60,10,"",0),
("XM20220101061","项目61","u00000","content","2022-02-01","2024-02-10",1,0,0,"R008",3,30,60,10,"",0),
("XM20220101062","项目62","u00000","content","2022-02-01","2024-02-10",1,0,0,"R009",3,30,60,10,"",0),
("XM20220101063","项目63","u00000","content","2022-02-01","2024-02-10",1,0,0,"R010",3,30,60,10,"",0),
("XM20220101064","项目64","u00002","content","2022-02-01","2024-02-10",1,0,0,"R000",3,30,60,10,"",0),
("XM20220101065","项目65","u00002","content","2022-02-01","2024-02-10",1,0,0,"R002",3,30,60,10,"",0),
("XM20220101066","项目66","u00002","content","2022-02-01","2024-02-10",1,0,0,"R003",3,30,60,10,"",0),
("XM20220101067","项目67","u00002","content","2022-02-01","2024-02-10",1,0,0,"R004",3,30,60,10,"",0),
("XM20220101068","项目68","u00002","content","2022-02-01","2024-02-10",1,0,0,"R005",3,30,60,10,"",0),
("XM20220101069","项目69","u00002","content","2022-02-01","2024-02-10",1,0,0,"R006",3,30,60,10,"",0),
("XM20220101070","项目70","u00002","content","2022-02-01","2024-02-10",1,0,0,"R007",3,30,60,10,"",0),
("XM20220101071","项目71","u00002","content","2022-02-01","2024-02-10",1,0,0,"R008",3,30,60,10,"",0),
("XM20220101072","项目72","u00002","content","2022-02-01","2024-02-10",1,0,0,"R009",3,30,60,10,"",0),
("XM20220101073","项目73","u00000","content","2022-02-01","2024-02-10",1,0,0,"R010",3,30,60,10,"",0),
("XM20220101074","项目74","u00000","content","2022-02-01","2024-02-10",1,0,0,"R000",3,30,60,10,"",0),
("XM20220101075","项目75","u00000","content","2022-02-01","2024-02-10",1,0,0,"R002",3,30,60,10,"",0),
("XM20220101076","项目76","u00000","content","2022-02-01","2024-02-10",1,0,0,"R003",3,30,60,10,"",0),
("XM20220101077","项目77","u00000","content","2022-02-01","2024-02-10",1,0,0,"R004",3,30,60,10,"",0),
("XM20220101078","项目78","u00000","content","2022-02-01","2024-02-10",1,0,0,"R005",3,30,60,10,"",0),
("XM20220101079","项目79","u00000","content","2022-02-01","2024-02-10",1,0,0,"R006",3,30,60,10,"",0),
("XM20220101080","项目80","u00000","content","2022-02-01","2024-02-10",1,0,0,"R007",3,30,60,10,"",0),
("XM20220101081","项目81","u00000","content","2022-02-01","2024-02-10",1,0,0,"R008",3,30,60,10,"",0),
("XM20220101082","项目82","u00000","content","2022-02-01","2024-02-10",1,0,0,"R009",3,30,60,10,"",0),
("XM20220101083","项目83","u00000","content","2022-02-01","2024-02-10",1,0,0,"R010",3,30,60,10,"",0);
# 正在招标项目
insert into release_items values
("XM20220102001","项目0101","u00000","content","2022-02-01","2022-02-10",1,0,0,"R001",1,30,60,10,"",10000),
("XM20220102002","项目0102","u00000","content","2022-02-01","2022-02-10",1,0,0,"R004",2,30,60,10,"",120000),
("XM20220102003","项目0103","u00000","content","2022-02-01","2022-02-10",1,0,0,"R003",1,30,60,10,"",3000),
("XM20220102004","项目0104","u00000","content","2022-02-01","2022-02-10",1,0,0,"R005",2,30,60,10,"",9000),
("XM20220102005","项目0105","u00000","content","2022-02-01","2022-02-10",1,0,0,"R007",3,30,60,10,"",56000),
("XM20220102006","项目0106","u00000","content","2022-02-01","2022-02-10",1,0,0,"R001",2,30,60,10,"",3400),
("XM20220102007","项目0107","u00000","content","2022-02-01","2022-02-10",1,0,0,"R999",2,30,60,10,"",180000),
("XM20220102008","项目0108","u00000","content","2022-02-01","2022-02-10",1,0,0,"R001",3,30,60,10,"",30000),
("XM20220102009","项目0109","u00000","content","2022-02-01","2022-02-10",1,0,0,"R001",2,30,60,10,"",100000),
("XM20220102010","项目0110","u00000","content","2022-02-01","2022-02-10",1,0,0,"R002",2,30,60,10,"",50000),
("XM20220102011","项目0111","u00000","content","2022-02-01","2022-02-10",1,0,0,"R001",3,30,60,10,"",70000),
("XM20220102012","项目0112","u00000","content","2022-02-01","2022-02-10",1,0,0,"R008",5,30,60,10,"",80000);
# 修改测试数据
insert into release_items values
("XM20220304001","测试1","u00000","","2022-03-04","2022-03-09 00:00:00",1,1,1,"R001",1,30,60,10,"",120000);
*/


/*
# 2020-01
insert into release_items values
("XM20200102001","项目01010","u00000","content","2020-02-01","2022-02-10",1,0,0,"R001",1,30,60,10,"",10000),
("XM20200102002","项目01020","u00000","content","2020-02-01","2022-02-10",1,0,0,"R004",2,30,60,10,"",120000),
("XM20200102003","项目01030","u00000","content","2020-02-01","2022-02-10",1,0,0,"R003",1,30,60,10,"",3000),
("XM20200102004","项目01040","u00000","content","2020-02-01","2022-02-10",1,0,0,"R005",2,30,60,10,"",9000),
("XM20200102005","项目01050","u00000","content","2020-02-01","2022-02-10",1,0,0,"R007",3,30,60,10,"",56000),
("XM20200102006","项目01060","u00001","content","2020-02-01","2022-02-10",1,0,0,"R001",2,30,60,10,"",3400),
("XM20200102007","项目01070","u00000","content","2020-02-01","2022-02-10",1,0,0,"R999",2,30,60,10,"",180000),
("XM20200102008","项目01080","u00000","content","2020-02-01","2022-02-10",1,0,0,"R001",3,30,60,10,"",30000),
("XM20200102009","项目01090","u00001","content","2020-02-01","2022-02-10",1,0,0,"R001",2,30,60,10,"",100000),
("XM20200102010","项目01100","u00000","content","2020-02-01","2022-02-10",1,0,0,"R002",2,30,60,10,"",50000),
("XM20200102011","项目01110","u00001","content","2020-02-01","2022-02-10",1,0,0,"R001",3,30,60,10,"",70000),
("XM20200102012","项目01120","u00000","content","2020-02-01","2022-02-10",1,0,0,"R008",5,30,60,10,"",80000);

# 2022-04
insert into release_items values
("XM20220401001","项目0421","u00000","content","2022-04-01","2022-02-10",1,0,0,"R001",1,30,60,10,"",10000),
("XM20220401002","项目0422","u00000","content","2022-04-01","2022-02-10",1,0,0,"R004",2,30,60,10,"",120000),
("XM20220402003","项目0423","u00000","content","2022-04-02","2022-02-10",1,0,0,"R003",1,30,60,10,"",3000),
("XM20220403004","项目0424","u00000","content","2022-04-03","2022-02-10",1,0,0,"R005",2,30,60,10,"",9000),
("XM20220402005","项目0425","u00000","content","2022-04-02","2022-02-10",1,0,0,"R007",3,30,60,10,"",56000),
("XM20220404006","项目0426","u00000","content","2022-04-03","2022-02-10",1,0,0,"R001",2,30,60,10,"",3400),
("XM20220404007","项目0427","u00000","content","2022-04-04","2022-02-10",1,0,0,"R999",2,30,60,10,"",180000),
("XM20220405008","项目0428","u00000","content","2022-04-05","2022-02-10",1,0,0,"R001",3,30,60,10,"",30000),
("XM20220406009","项目0429","u00000","content","2022-04-06","2022-02-10",1,0,0,"R001",2,30,60,10,"",100000),
("XM20220406010","项目0420","u00000","content","2022-04-06","2022-02-10",1,0,0,"R002",2,30,60,10,"",50000),
("XM20220402011","项目0421","u00000","content","2022-04-02","2022-02-10",1,0,0,"R001",3,30,60,10,"",70000),
("XM20220402012","项目0422","u00000","content","2022-04-02","2022-02-10",1,0,0,"R008",5,30,60,10,"",80000);

# 2022-04-07/8/9
insert into release_items values
("XM20220407001","项目0401","u00000","content","2022-04-07","2022-04-10",1,0,0,"R001",1,30,60,10,"",10000),
("XM20220407002","项目0402","u00000","content","2022-04-07","2022-04-10",1,0,0,"R004",2,30,60,10,"",120000),
("XM20220407003","项目0403","u00000","content","2022-04-07","2022-04-10",1,0,0,"R003",1,30,60,10,"",3000),
("XM20220407004","项目0404","u00000","content","2022-04-07","2022-04-10",1,0,0,"R005",2,30,60,10,"",9000),
("XM20220408005","项目0405","u00000","content","2022-04-08","2022-04-10",1,0,0,"R007",3,30,60,10,"",56000),
("XM20220408006","项目0406","u00000","content","2022-04-08","2022-04-10",1,0,0,"R001",2,30,60,10,"",3400),
("XM20220408007","项目0407","u00000","content","2022-04-08","2022-04-10",1,0,0,"R999",2,30,60,10,"",180000),
("XM20220408008","项目0408","u00000","content","2022-04-08","2022-04-10",1,0,0,"R001",3,30,60,10,"",30000),
("XM20220408009","项目0409","u00000","content","2022-04-08","2022-04-10",1,0,0,"R001",2,30,60,10,"",100000),
("XM20220409010","项目0410","u00000","content","2022-04-09","2022-04-10",1,0,0,"R002",2,30,60,10,"",50000),
("XM20220409011","项目0411","u00000","content","2022-04-09","2022-04-10",1,0,0,"R001",3,30,60,10,"",70000),
("XM20220409012","项目0412","u00000","content","2022-04-09","2022-04-10",1,0,0,"R008",5,30,60,10,"",80000);

# 2022-03
insert into release_items values
("XM20220301001","项目0301","u00000","content","2022-03-01","2022-03-10",1,0,0,"R001",1,30,60,10,"",10000),
("XM20220301002","项目0302","u00000","content","2022-03-01","2022-03-10",1,0,0,"R004",2,30,60,10,"",120000),
("XM20220302003","项目0303","u00001","content","2022-03-02","2022-03-10",1,0,0,"R003",1,30,60,10,"",3000),
("XM20220303004","项目0304","u00001","content","2022-03-03","2022-03-10",1,0,0,"R005",2,30,60,10,"",9000),
("XM20220302005","项目0305","u00002","content","2022-03-02","2022-03-10",1,0,0,"R007",3,30,60,10,"",56000),
("XM20220304006","项目0306","u00004","content","2022-03-03","2022-03-10",1,0,0,"R001",2,30,60,10,"",3400),
("XM20220304007","项目0307","u00005","content","2022-03-04","2022-03-10",1,0,0,"R999",2,30,60,10,"",180000),
("XM20220305008","项目0308","u00005","content","2022-03-05","2022-03-10",1,0,0,"R001",3,30,60,10,"",30000),
("XM20220306009","项目0309","u00005","content","2022-03-06","2022-03-10",1,0,0,"R001",2,30,60,10,"",100000),
("XM20220306010","项目0310","u00003","content","2022-03-06","2022-03-10",1,0,0,"R002",2,30,60,10,"",50000),
("XM20220302011","项目0311","u00002","content","2022-03-02","2022-03-10",1,0,0,"R001",3,30,60,10,"",70000),
("XM20220302012","项目0312","u00000","content","2022-03-02","2022-03-10",1,0,0,"R008",5,30,60,10,"",80000);


*/


/*

delete from release_items where it_id = 'XM20200102001';
delete from release_items where it_id = 'XM20200102002';
delete from release_items where it_id = 'XM20200102003';
delete from release_items where it_id = 'XM20200102004';
delete from release_items where it_id = 'XM20200102005';
delete from release_items where it_id = 'XM20200102006';
delete from release_items where it_id = 'XM20200102007';
delete from release_items where it_id = 'XM20200102008';
delete from release_items where it_id = 'XM20200102009';
delete from release_items where it_id = 'XM20200102010';
delete from release_items where it_id = 'XM20200102011';
delete from release_items where it_id = 'XM20200102012';
delete from release_items where it_id = 'XM20220102001';
delete from release_items where it_id = 'XM20220102002';
delete from release_items where it_id = 'XM20220102003';
delete from release_items where it_id = 'XM20220102004';
delete from release_items where it_id = 'XM20220102005';
delete from release_items where it_id = 'XM20220102006';
delete from release_items where it_id = 'XM20220102007';
delete from release_items where it_id = 'XM20220102008';
delete from release_items where it_id = 'XM20220102009';
delete from release_items where it_id = 'XM20220102010';
delete from release_items where it_id = 'XM20220102011';
delete from release_items where it_id = 'XM20220102012';
delete from release_items where it_id = 'XM20220301001';
delete from release_items where it_id = 'XM20220301002';
delete from release_items where it_id = 'XM20220302003';
delete from release_items where it_id = 'XM20220302005';
delete from release_items where it_id = 'XM20220302011';
delete from release_items where it_id = 'XM20220302012';
delete from release_items where it_id = 'XM20220303004';
delete from release_items where it_id = 'XM20220304001';
delete from release_items where it_id = 'XM20220304006';
delete from release_items where it_id = 'XM20220304007';
delete from release_items where it_id = 'XM20220305008';
delete from release_items where it_id = 'XM20220306009';
delete from release_items where it_id = 'XM20220306010';
delete from release_items where it_id = 'XM20220401001';
delete from release_items where it_id = 'XM20220401002';
delete from release_items where it_id = 'XM20220402003';
delete from release_items where it_id = 'XM20220402005';
delete from release_items where it_id = 'XM20220402011';
delete from release_items where it_id = 'XM20220402012';
delete from release_items where it_id = 'XM20220403004';
delete from release_items where it_id = 'XM20220404006';
delete from release_items where it_id = 'XM20220404007';
delete from release_items where it_id = 'XM20220405008';
delete from release_items where it_id = 'XM20220406009';
delete from release_items where it_id = 'XM20220406010';
delete from release_items where it_id = 'XM20220407001';
delete from release_items where it_id = 'XM20220407002';
delete from release_items where it_id = 'XM20220407003';
delete from release_items where it_id = 'XM20220407004';
delete from release_items where it_id = 'XM20220408005';
delete from release_items where it_id = 'XM20220408006';
delete from release_items where it_id = 'XM20220408007';
delete from release_items where it_id = 'XM20220408008';
delete from release_items where it_id = 'XM20220408009';
delete from release_items where it_id = 'XM20220409010';
delete from release_items where it_id = 'XM20220409011';
delete from release_items where it_id = 'XM20220409012';

*/




/*
set sql_safe_updates=0;
delete from release_items where substring(it_id,1,8) = "XM202204";
set sql_safe_updates=1;
*/






select * from release_items order by it_id;




/*
# 改名
update release_items set name = '习近平总书记关于“四个自信”重要论述研究' where it_id = 'XM20200102001';
update release_items set name = '习近平总书记关于中国精神重要论述研究' where it_id = 'XM20200102002';
update release_items set name = '马克思主义人民民主思想研究' where it_id = 'XM20200102003';
update release_items set name = '马克思主义中国化“两个结合”及其关系研究' where it_id = 'XM20200102004';
update release_items set name = '马克思主义中国化“两个结合”及其关系研究' where it_id = 'XM20200102005';
update release_items set name = '中国式现代化新道路与人类文明新形态研究' where it_id = 'XM20200102006';
update release_items set name = '中国式现代化新道路与人类文明新形态研究' where it_id = 'XM20200102007';
update release_items set name = '全人类共同价值研究' where it_id = 'XM20200102008';
update release_items set name = '新时代英雄观的理论建构与传播体系研究' where it_id = 'XM20200102009';
update release_items set name = '新时代英雄观的理论建构与传播体系研究' where it_id = 'XM20200102010';
update release_items set name = '海外华人与人类命运共同体研究' where it_id = 'XM20200102011';
update release_items set name = '中国共产党百年历程主题研究' where it_id = 'XM20200102012';
update release_items set name = '中国共产党人百年伦理精神研究' where it_id = 'XM20220101001';
update release_items set name = '红军长征史' where it_id = 'XM20220101002';
update release_items set name = '人民军队优抚安置史文献整理与研究' where it_id = 'XM20220101003';
update release_items set name = '人民军队优抚安置史文献整理与研究' where it_id = 'XM20220101004';
update release_items set name = '中国共产党革命音乐百年发展史研究' where it_id = 'XM20220101005';
update release_items set name = '党的建设理论体系研究' where it_id = 'XM20220101006';
update release_items set name = '党的建设理论体系研究' where it_id = 'XM20220101007';
update release_items set name = '国外主要共产党（工人党）党建理论与实践研究' where it_id = 'XM20220101008';
update release_items set name = '中国马克思主义哲学史资料整理及研究' where it_id = 'XM20220101009';
update release_items set name = '潘梓年哲学思想研究' where it_id = 'XM20220101010';
update release_items set name = '潘梓年哲学思想研究' where it_id = 'XM20220101011';
update release_items set name = '规范性哲学研究' where it_id = 'XM20220101012';
update release_items set name = '汉语哲学的领域、基本问题与方法' where it_id = 'XM20220101013';
update release_items set name = '20世纪中国分析哲学史研究' where it_id = 'XM20220101014';
update release_items set name = '明清朱子学通史' where it_id = 'XM20220101015';
update release_items set name = '《江永全书》整理与研究' where it_id = 'XM20220101016';
update release_items set name = '中医哲学传承体系与创新发展研究' where it_id = 'XM20220101017';
update release_items set name = '构建人类卫生健康共同体的伦理路径研究' where it_id = 'XM20220101018';
update release_items set name = '中国乡村道德的实证研究与地图平台建设' where it_id = 'XM20220101019';
update release_items set name = '文化强国背景下公民道德建设工程研究' where it_id = 'XM20220101020';
update release_items set name = '人工认知对自然认知挑战的哲学研究' where it_id = 'XM20220101021';
update release_items set name = '负责任的人工智能及其实践的哲学研究' where it_id = 'XM20220101022';
update release_items set name = '现代技术治理理论问题研究' where it_id = 'XM20220101023';
update release_items set name = '马克思主义美学史' where it_id = 'XM20220101024';
update release_items set name = '审美意象的历史发展及其理论建构研究' where it_id = 'XM20220101025';
update release_items set name = '中国古代美学命题整理与研究' where it_id = 'XM20220101026';
update release_items set name = '阿多诺文艺美学著作翻译、笺注与研究' where it_id = 'XM20220101027';
update release_items set name = '齐美尔美学艺术学思想文献整理与研究' where it_id = 'XM20220101028';
update release_items set name = '中国特色社会主义政治经济学理论体系研究' where it_id = 'XM20220101029';
update release_items set name = '新发展阶段伟大实践与发展经济学理论创新研究' where it_id = 'XM20220101030';
update release_items set name = '全球视野下的中国近代经济思想史' where it_id = 'XM20220101031';
update release_items set name = '中华人民共和国经济战略思想史研究' where it_id = 'XM20220101032';
update release_items set name = '中国税收通史' where it_id = 'XM20220101033';
update release_items set name = '开放经济安全监测预警和综合评估研究' where it_id = 'XM20220101034';
update release_items set name = '特色农业赋能增收长效机制构建研究' where it_id = 'XM20220101035';
update release_items set name = '促进高质量发展的中国税制结构优化与改革研究' where it_id = 'XM20220101036';
update release_items set name = '数字金融有效支持实体经济高质量发展研究' where it_id = 'XM20220101037';
update release_items set name = '接续推进脱贫地区乡村振兴的金融支持研究' where it_id = 'XM20220101038';
update release_items set name = '在线平台信息价值和信息行为研究' where it_id = 'XM20220101039';
update release_items set name = '促进残疾人共同富裕研究' where it_id = 'XM20220101040';
update release_items set name = '粤港澳大湾区数据要素跨境流动路径研究' where it_id = 'XM20220101041';
update release_items set name = '开放开源科学技术创新体系构建研究' where it_id = 'XM20220101042';
update release_items set name = '平台企业治理研究' where it_id = 'XM20220101043';
update release_items set name = '中国企业裂变式发展重大问题研究' where it_id = 'XM20220101044';
update release_items set name = '企业低碳价值创造的理论与实践研究' where it_id = 'XM20220101045';
update release_items set name = '工业大数据统计测度理论及应用研究' where it_id = 'XM20220101046';
update release_items set name = '坚持和完善人民当家作主制度体系研究' where it_id = 'XM20220101047';
update release_items set name = '中国核心术语国际影响力研究' where it_id = 'XM20220101048';
update release_items set name = '当代西方国家政治极化的源起与影响研究' where it_id = 'XM20220101049';
update release_items set name = '美式民主的理论悖论与实践困境研究' where it_id = 'XM20220101050';
update release_items set name = '社会组织推动共同富裕的体制机制与政策体系研究' where it_id = 'XM20220101051';
update release_items set name = '特大城市社会治理数字化转型的机制与优化路径研究' where it_id = 'XM20220101052';
update release_items set name = '新时代我国数字强边战略及实施路径研究' where it_id = 'XM20220101053';
update release_items set name = '智慧社会安全风险治理体系研究' where it_id = 'XM20220101054';
update release_items set name = '新时代国际领导力研究' where it_id = 'XM20220101055';
update release_items set name = '大数据主权安全保障体系建设研究' where it_id = 'XM20220101056';
update release_items set name = '中美科技竞争与维护我国国家安全研究' where it_id = 'XM20220101057';
update release_items set name = '欧洲对外战略调整与中欧美关系研究' where it_id = 'XM20220101058';
update release_items set name = '澜湄区域合作史' where it_id = 'XM20220101059';
update release_items set name = '百年变局下全球化进路与人类命运共同体构建研究' where it_id = 'XM20220101060';
update release_items set name = '中国特色郊区社会形态研究' where it_id = 'XM20220101061';
update release_items set name = '数字时代的记忆研究' where it_id = 'XM20220101062';
update release_items set name = '建立和完善农村低收入人口常态化帮扶机制研究' where it_id = 'XM20220101063';
update release_items set name = '革命老区“红色文化+旅游”融合发展研究' where it_id = 'XM20220101064';
update release_items set name = '残疾人社会组织活力的社会机制研究' where it_id = 'XM20220101065';
update release_items set name = '跨县搬迁社区治理与后期扶持研究' where it_id = 'XM20220101066';
update release_items set name = '零工经济下的劳动者权益问题研究' where it_id = 'XM20220101067';
update release_items set name = '生态产品价值实现与乡村振兴的协同机制研究' where it_id = 'XM20220101068';
update release_items set name = '人口老龄化背景下的残疾预防策略与应用研究' where it_id = 'XM20220101069';
update release_items set name = '习近平法治思想中的民生保障理论研究' where it_id = 'XM20220101070';
update release_items set name = '行政法总则制定的理论与实践问题研究' where it_id = 'XM20220101071';
update release_items set name = '基于法治、国家治理和全球治理的技术法规研究' where it_id = 'XM20220101072';
update release_items set name = '网络信息安全监管的法治体系构建研究' where it_id = 'XM20220101073';
update release_items set name = '互联网平台的社会影响与治理路径研究' where it_id = 'XM20220101074';
update release_items set name = '社会信用体系的法律保障机制研究' where it_id = 'XM20220101075';
update release_items set name = '完善医疗保障基金监管法律制度研究' where it_id = 'XM20220101076';
update release_items set name = '我国经济制裁法律体系构建研究' where it_id = 'XM20220101077';
update release_items set name = '民事司法程序现代化问题研究' where it_id = 'XM20220101078';
update release_items set name = '数字经济的刑事安全风险防范体系建构研究' where it_id = 'XM20220101079';
update release_items set name = '西南各民族水文化调查与研究' where it_id = 'XM20220101080';
update release_items set name = '涉台传统村落资源调查整理及保护利用研究' where it_id = 'XM20220101081';
update release_items set name = '中华优秀传统生态文化藏文文献资料收集整理与研究' where it_id = 'XM20220101082';
update release_items set name = '中国国家博物馆藏敦煌吐鲁番文献整理与研究' where it_id = 'XM20220101083';
update release_items set name = '敦煌石窟文献释录与图文互证研究' where it_id = 'XM20220102001';
update release_items set name = '敦煌吐蕃历史文化与石窟艺术研究' where it_id = 'XM20220102002';
update release_items set name = '敦煌遗书草书写本研究' where it_id = 'XM20220102003';
update release_items set name = '中国古代各民族相互依存关系史文献整理与研究' where it_id = 'XM20220102004';
update release_items set name = '中国海关通史' where it_id = 'XM20220102005';
update release_items set name = '中国特殊教育通史' where it_id = 'XM20220102006';
update release_items set name = '《中国历史海洋地图集》编绘研究' where it_id = 'XM20220102007';
update release_items set name = '南海海疆建筑史迹保护与利用研究' where it_id = 'XM20220102008';
update release_items set name = '中国大运河生态系统变迁研究' where it_id = 'XM20220102009';
update release_items set name = '中国血防史资料整理与研究' where it_id = 'XM20220102010';
update release_items set name = '海内外珍稀黄河古地图整理与研究' where it_id = 'XM20220102011';
update release_items set name = '古蜀地区文明化华夏化进程研究' where it_id = 'XM20220102012';
update release_items set name = '三星堆文化与中国文明研究' where it_id = 'XM20220301001';
update release_items set name = '新发现宋元明清赋役类纸背文书整理与研究' where it_id = 'XM20220301002';
update release_items set name = '明清至民国南海海疆经略与治理体系研究' where it_id = 'XM20220302003';
update release_items set name = '汉满蒙文档案所见清朝东北边疆经略研究' where it_id = 'XM20220302005';
update release_items set name = '新疆巡抚治疆史料长编' where it_id = 'XM20220302011';
update release_items set name = '乾嘉学派稿抄本研究' where it_id = 'XM20220302012';
update release_items set name = '中国近代县报搜集、整理与研究' where it_id = 'XM20220303004';
update release_items set name = '中国近代邮政史料整理与研究' where it_id = 'XM20220304006';
update release_items set name = '海外藏中国糖业资料搜集、整理与研究' where it_id = 'XM20220304007';
update release_items set name = '新时代中国特色考古学理论体系研究' where it_id = 'XM20220305008';
update release_items set name = '关中地区十六国时期墓葬资料的整理与研究' where it_id = 'XM20220306009';
update release_items set name = '周原遗址凤雏城址区田野考古资料整理与研究' where it_id = 'XM20220306010';
update release_items set name = '人类瘟疫史' where it_id = 'XM20220401001';
update release_items set name = '韩国汉文史部文献编年与专题研究' where it_id = 'XM20220401002';
update release_items set name = '外国历史教科书中的中国形象史料整理与研究' where it_id = 'XM20220402003';
update release_items set name = '东南亚藏中国南海史料文献整理与研究' where it_id = 'XM20220402005';
update release_items set name = '美国对朝鲜半岛政策档案文献整理与研究（1945-2001）' where it_id = 'XM20220402011';
update release_items set name = '中东经济通史' where it_id = 'XM20220402012';
update release_items set name = '欧洲近代社会主义思想史研究' where it_id = 'XM20220403004';
update release_items set name = '法兰西第三共和国殖民扩张史料整理与研究' where it_id = 'XM20220404006';
update release_items set name = '中国西南道教文献整理与数据库建设' where it_id = 'XM20220404007';
update release_items set name = '《佛教造像艺术大辞典》汉译与研究' where it_id = 'XM20220405008';
update release_items set name = '汉文佛典英译本整理、研究与大型数据库建设' where it_id = 'XM20220406009';
update release_items set name = '域外藏多语种民国佛教文献群的发掘、整理与研究' where it_id = 'XM20220406010';
update release_items set name = '中国乐论与文论关系通史' where it_id = 'XM20220407001';
update release_items set name = '中国历代书院文学活动编年史' where it_id = 'XM20220407002';
update release_items set name = '中国古代流寓文学史' where it_id = 'XM20220407003';
update release_items set name = '历代别集编纂及其文学观念研究' where it_id = 'XM20220407004';
update release_items set name = '全宋小说整理与研究' where it_id = 'XM20220408005';
update release_items set name = '红色文艺与百年中国研究' where it_id = 'XM20220408006';
update release_items set name = '百年中国乡土文学与农村建设运动关系研究' where it_id = 'XM20220408007';
update release_items set name = '中国文学学术现代化进程研究' where it_id = 'XM20220408008';
update release_items set name = '文学伦理学批评的理论资源与对外传播研究' where it_id = 'XM20220408009';
update release_items set name = '中国网络文学的文化传承与海外传播研究' where it_id = 'XM20220409010';
update release_items set name = '经史之学与古典文学的关联及互动研究' where it_id = 'XM20220409011';
update release_items set name = '欧美戏剧剧场资料翻译与研究' where it_id = 'XM20220409012';
update release_items set name = '戏曲影像资料整理与数据库建设' where it_id = 'XM20220421001';
update release_items set name = '新中国少数民族文字文学史料整理与研究' where it_id = 'XM20220422001';






*/


select * from release_items where name like "%10%";






