

drop table if exists declaresstate;
create table declaresstate(
	topicid		varchar(20),	# 课题id
    sb_id	varchar(20),	# 申报id
    state	int				# 0为暂存，1为申报，2为初审
    
);
alter table declaresstate add primary key(sb_id);




select * from declaresstate;


delete from declaresstate where sb_id = "KT202204270020001";




















