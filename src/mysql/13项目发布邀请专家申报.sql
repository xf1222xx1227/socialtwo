drop table if exists release_items_invitation;
create table release_items_invitation
(
	it_id                          char(13)                       not null,
	ex_id                         char(6)                        not null,
    type							int,	# 0表示系统推荐，1表示自定义邀请
   primary key (ex_id, it_id)
)comment = '项目发布邀请专家参与申报';
# 测试数据
insert into release_items_invitation values
("XM20220304001","S00000",1),
("XM20220304001","S00002",1),
("XM20220304001","S00009",1);

select * from release_items_invitation;