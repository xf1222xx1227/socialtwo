


drop table if exists experience;
create table experience(
	ex_id			char(6),
    experience		varchar(40),		# 代表性成果
    item			varchar(40),		# 负责项目
    prize			varchar(100),		# 获奖情况
    apply			varchar(400),		# 成果采纳应用情况
    plan			varchar(300),		# 完成专项性发展规划，重要报告，法律法规规章情况
    publish			varchar(100),		# 规划、出版社科类出版物情况
    responsibility	varchar(200),		# 在社科类期刊作为策划、责任编辑情况
    media			varchar(200),		# 在媒体上策划栏目或活动情况
    overseas		varchar(100),		# 留学情况
    resume			varchar(200),		# 主要学术简历
    parttime		varchar(100),		# 学术兼职情况
    honor			varchar(100),		# 获得各类人才荣誉称号
    establish		varchar(50),		# 创建人
    establishtime	varchar(20),		# 创建时间
    edit			varchar(50),		# 最后修改人
    edittime		varchar(200)		# 最后修改时间
);

select * from experience;













