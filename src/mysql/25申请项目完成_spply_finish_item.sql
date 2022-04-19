
/*
drop table if exists apply_finish_item;
create table apply_finish_item(
	it_id		char(13) not null ,			# 项目id
    ex_id		char(6) not null ,			# 专家id
    applytime		varchar(20),		# 
    answertime		varchar(20),
    state			int,			# 0表示未应答，1表示同意，2表示拒绝
    reason			varchar(200),
    primary key(it_id,ex_id,applytime)
)comment = '申请项目完成';
*/


select * from apply_finish_item;

# update apply_finish_item set state=0,reason="" where it_id = "XM20220101013";








