# 项目状态表

/*
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
("XM20220101012",2,2,2,2,2,2,2,7),
("XM20220101013",2,1,0,0,0,0,0,2),
("XM20220101014",2,1,0,0,0,0,0,2),
("XM20220101015",2,1,0,0,0,0,0,2),
("XM20220101016",2,1,0,0,0,0,0,2),
("XM20220101017",2,1,0,0,0,0,0,2),
("XM20220101018",2,2,1,0,0,0,0,3),
("XM20220101019",2,2,1,0,0,0,0,3),
("XM20220101020",2,2,1,0,0,0,0,3),
("XM20220101021",2,2,1,0,0,0,0,3),
("XM20220101022",2,2,1,0,0,0,0,3),
("XM20220101023",2,2,1,0,0,0,0,3),
("XM20220101024",2,2,1,0,0,0,0,3),
("XM20220101025",2,2,1,0,0,0,0,3),
("XM20220101026",2,2,1,0,0,0,0,3),
("XM20220101027",2,2,1,0,0,0,0,3),
("XM20220101028",2,2,1,0,0,0,0,3),
("XM20220101029",2,2,1,0,0,0,0,3),
("XM20220101030",2,2,1,0,0,0,0,3),
("XM20220101031",2,2,1,0,0,0,0,3),
("XM20220101032",2,2,1,0,0,0,0,3),
("XM20220101033",2,2,1,0,0,0,0,3),
("XM20220101034",2,2,1,0,0,0,0,3),
("XM20220101035",2,2,1,0,0,0,0,3),
("XM20220101036",2,2,1,0,0,0,0,3),
("XM20220101037",2,2,1,0,0,0,0,3),
("XM20220101038",2,2,1,0,0,0,0,3),
("XM20220101039",2,2,1,0,0,0,0,3),
("XM20220101040",2,2,1,0,0,0,0,3),
("XM20220101041",2,2,1,0,0,0,0,3),
("XM20220101042",2,2,1,0,0,0,0,3),
("XM20220101043",2,2,1,0,0,0,0,3),
("XM20220101044",2,2,1,0,0,0,0,3),
("XM20220101045",2,2,1,0,0,0,0,3),
("XM20220101046",2,2,1,0,0,0,0,3),
("XM20220101047",2,2,1,0,0,0,0,3),
("XM20220101048",2,2,1,0,0,0,0,3),
("XM20220101049",2,2,1,0,0,0,0,3),
("XM20220101050",2,2,1,0,0,0,0,3),
("XM20220101051",2,2,1,0,0,0,0,3),
("XM20220101052",2,2,1,0,0,0,0,3),
("XM20220101053",2,2,1,0,0,0,0,3),
("XM20220101054",2,2,1,0,0,0,0,3),
("XM20220101055",2,2,1,0,0,0,0,3),
("XM20220101056",2,2,1,0,0,0,0,3),
("XM20220101057",2,2,1,0,0,0,0,3),
("XM20220101058",2,2,1,0,0,0,0,3),
("XM20220101059",2,2,1,0,0,0,0,3),
("XM20220101060",2,2,1,0,0,0,0,3),
("XM20220101061",2,2,1,0,0,0,0,3),
("XM20220101062",2,2,1,0,0,0,0,3),
("XM20220101063",2,2,1,0,0,0,0,3),
("XM20220101064",2,2,1,0,0,0,0,3),
("XM20220101065",2,2,1,0,0,0,0,3),
("XM20220101066",2,2,1,0,0,0,0,3),
("XM20220101067",2,2,1,0,0,0,0,3),
("XM20220101068",2,2,1,0,0,0,0,3),
("XM20220101069",2,2,1,0,0,0,0,3),
("XM20220101070",2,2,1,0,0,0,0,3),
("XM20220101071",2,2,1,0,0,0,0,3),
("XM20220101072",2,2,1,0,0,0,0,3),
("XM20220101073",2,2,1,0,0,0,0,3),
("XM20220101074",2,2,1,0,0,0,0,3),
("XM20220101075",2,2,1,0,0,0,0,3),
("XM20220101076",2,2,1,0,0,0,0,3),
("XM20220101077",2,2,1,0,0,0,0,3),
("XM20220101078",2,2,1,0,0,0,0,3),
("XM20220101079",2,2,1,0,0,0,0,3),
("XM20220101080",2,2,1,0,0,0,0,3),
("XM20220101081",2,2,1,0,0,0,0,3),
("XM20220101082",2,2,1,0,0,0,0,3),
("XM20220101083",2,2,1,0,0,0,0,3);

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

*/



/*
insert into item_state  values ('XM20200102001',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20200102002',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20200102003',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20200102004',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20200102005',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20200102006',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20200102007',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20200102008',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20200102009',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20200102010',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20200102011',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20200102012',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220301001',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220301002',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220302003',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220302005',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220302011',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220302012',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220303004',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220304006',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220304007',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220305008',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220306009',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220306010',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220401001',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220401002',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220402003',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220402005',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220402011',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220402012',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220403004',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220404006',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220404007',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220405008',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220406009',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220406010',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220407001',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220407002',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220407003',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220407004',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220408005',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220408006',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220408007',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220408008',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220408009',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220409010',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220409011',2,2,2,2,2,2,2,7);
insert into item_state  values ('XM20220409012',2,2,2,2,2,2,2,7);



*/

select * from item_state;




select * from item_state where it_id = "XM20220101040";


/*
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = "XM20220101040";
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = "XM20220101041";
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = 'XM20220101032';
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = 'XM20220101033';
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = 'XM20220101037';
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = 'XM20220101038';
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = 'XM20220101039';
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = 'XM20220101042';
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = 'XM20220101043';
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = 'XM20220101044';
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = 'XM20220101045';
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = 'XM20220101046';
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = 'XM20220101047';
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = 'XM20220101048';
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = 'XM20220101049';
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = 'XM20220101050';
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = 'XM20220101051';
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = 'XM20220101052';
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = 'XM20220101053';
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = 'XM20220101054';
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = 'XM20220101055';
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = 'XM20220101056';
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = 'XM20220101057';
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = 'XM20220101074';
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = 'XM20220101075';
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = 'XM20220101076';
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = 'XM20220101077';
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = 'XM20220101078';
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = 'XM20220101080';
update item_state set release_items = 2,review_details=2,calibratio=2,bid_opening=2,finish = 2, state = 7 where it_id = 'XM20220102005';


*/


/*

update item_state set releases=2,bid=1, release_items = 0,review_details=0,calibratio=0,bid_opening=0,finish = 0, state = 2 where it_id = 'XM20200102009';
update item_state set releases=2,bid=1, release_items = 0,review_details=0,calibratio=0,bid_opening=0,finish = 0, state = 2 where it_id = 'XM20200102010';
update item_state set releases=2,bid=1, release_items = 0,review_details=0,calibratio=0,bid_opening=0,finish = 0, state = 2 where it_id = 'XM20200102011';
update item_state set releases=2,bid=1, release_items = 0,review_details=0,calibratio=0,bid_opening=0,finish = 0, state = 2 where it_id = 'XM20200102012';
update item_state set releases=2,bid=1, release_items = 0,review_details=0,calibratio=0,bid_opening=0,finish = 0, state = 2 where it_id = 'XM20220101008';
update item_state set releases=2,bid=1, release_items = 0,review_details=0,calibratio=0,bid_opening=0,finish = 0, state = 2 where it_id = 'XM20220101009';
update item_state set releases=2,bid=1, release_items = 0,review_details=0,calibratio=0,bid_opening=0,finish = 0, state = 2 where it_id = 'XM20220101010';
update item_state set releases=2,bid=1, release_items = 0,review_details=0,calibratio=0,bid_opening=0,finish = 0, state = 2 where it_id = 'XM20220101011';
update item_state set releases=2,bid=1, release_items = 0,review_details=0,calibratio=0,bid_opening=0,finish = 0, state = 2 where it_id = 'XM20220101012';
update item_state set releases=2,bid=1, release_items = 0,review_details=0,calibratio=0,bid_opening=0,finish = 0, state = 2 where it_id = 'XM20220301002';
update item_state set releases=2,bid=1, release_items = 0,review_details=0,calibratio=0,bid_opening=0,finish = 0, state = 2 where it_id = 'XM20220302011';
update item_state set releases=2,bid=1, release_items = 0,review_details=0,calibratio=0,bid_opening=0,finish = 0, state = 2 where it_id = 'XM20220302012';
update item_state set releases=2,bid=1, release_items = 0,review_details=0,calibratio=0,bid_opening=0,finish = 0, state = 2 where it_id = 'XM20220402011';
update item_state set releases=2,bid=1, release_items = 0,review_details=0,calibratio=0,bid_opening=0,finish = 0, state = 2 where it_id = 'XM20220402012';
update item_state set releases=2,bid=1, release_items = 0,review_details=0,calibratio=0,bid_opening=0,finish = 0, state = 2 where it_id = 'XM20220404007';
update item_state set releases=2,bid=1, release_items = 0,review_details=0,calibratio=0,bid_opening=0,finish = 0, state = 2 where it_id = 'XM20220405008';
update item_state set releases=2,bid=1, release_items = 0,review_details=0,calibratio=0,bid_opening=0,finish = 0, state = 2 where it_id = 'XM20220406009';
update item_state set releases=2,bid=1, release_items = 0,review_details=0,calibratio=0,bid_opening=0,finish = 0, state = 2 where it_id = 'XM20220406010';
update item_state set releases=2,bid=1, release_items = 0,review_details=0,calibratio=0,bid_opening=0,finish = 0, state = 2 where it_id = 'XM20220408006';
update item_state set releases=2,bid=1, release_items = 0,review_details=0,calibratio=0,bid_opening=0,finish = 0, state = 2 where it_id = 'XM20220408007';
update item_state set releases=2,bid=1, release_items = 0,review_details=0,calibratio=0,bid_opening=0,finish = 0, state = 2 where it_id = 'XM20220408008';
update item_state set releases=2,bid=1, release_items = 0,review_details=0,calibratio=0,bid_opening=0,finish = 0, state = 2 where it_id = 'XM20220408009';
update item_state set releases=2,bid=1, release_items = 0,review_details=0,calibratio=0,bid_opening=0,finish = 0, state = 2 where it_id = 'XM20220409012';


*/










