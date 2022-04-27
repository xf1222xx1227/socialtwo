

/*
drop table if exists topic;
create table topic(
	id		varchar(20),		# KT20220101001
    name	varchar(100),	# 课题标题
    content		varchar(500),		# 研究内容
    # requirement		varchar(200),	# 研究要求
    nature			varchar(50),	# 课题性质
    direction		varchar(400),	# 选题方向
    topic_type			int,		# 课题类别，外键
    achievementstype	varchar(10),	#成果形式
    time_release		varchar(20),	# 发布时间
    time_declare		varchar(20),		# 申报截至日期
    releaseid				char(6),			# 发布人	
    mincount				int,			# 申报人数	
    maxcount				int,			# 最大申报人数
    rateEconomics			int,			# 经济评审占比
    rateTechnology			int,		# 技术评审占比
    rateComprehensive		int,		# 综合评审占比
    primary key(id)
);



insert into topic values("KT20220101001","党建引领带动共同富裕示范区建设研究",concat("高举新时代中国特色社会主义伟大旗帜，以习近平新时代中国特色社会主义思想为指导，",
"贯彻中央全会精神和习近平总书记对浙江、杭州的重要指示，坚持解放思想、实事求是的科学研究态度，根据基地自身学科优势，",
"围绕中国共产党百年奋斗的重大成就和历史经验、当前市委市政府中心工作、杭州党建创新过程中的经验和问题，加强理论研究和应用对策研究，",
"为争当浙江高质量发展建设共同富裕示范区的城市范例，展现“重要窗口”的“头雁风采”充分发挥哲学社会科学的智库作用。"),"本基地课题为杭州市哲学社会科学规划课题。"
,"基层党建引领共同富裕示范区建设研究。杭州基层党建引领社会治理研究。民族宗教领域党建工作研究",4,"1,2","2022-01-10","2022-05-01","C00000",3,0,30,60,10);
*/
select * from topic;


update topic set mincount = 2 where id="KT20220427001";

















