drop table if exists expert_achievements;
create table expert_achievements
(
   ex_id                          char(6)                        not null,
   it_id                          char(13)                       not null,
   director                       int,						# 负责人？
   primary key (ex_id, it_id)
)comment = '学者项目成果对应表';
insert into expert_achievements values
("S00000","XM20220101001",1),
("S00000","XM20220101002",1),
("S00001","XM20220101002",0),
("S00002","XM20220101003",1),
("S00003","XM20220101004",1),
("S00003","XM20220101005",1),
("S00003","XM20220101006",1),
("S00004","XM20220101007",1),
("S00005","XM20220101007",0),
("S00006","XM20220101007",0);
select * from expert_achievements;