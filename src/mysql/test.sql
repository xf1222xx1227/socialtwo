






select a.*,count(*) as count,substring(c.time_release,1,4) as "year" from bidding_user a join bidding b join release_items c 
        where a.b_id = b.b_id and b.b_id = 'b00000000' and a.userid = c.userid 
        and substring(c.time_release,1,4) between "2020" and "2022" 
        group by a.userid,substring(c.time_release,1,4) ;






select a.*,count(*) as count from bidding_user a join bidding b join release_items c 
        where a.b_id = b.b_id and b.b_id = 'b00000000' and a.userid = c.userid 
        and substring(c.time_release,1,4) in ("2020","2021","2022")  
        group by a.userid ;











select bid_items.*, release_items.name as itemname from bid_items join release_items join item_state 
        where bid_items.it_id = release_items.it_id and bid_items.it_id = item_state.it_id 
        and item_state.state < 5  
        and bid_items.ex_id = 'S00005' and bid_items.it_id = 'XM20220101006';







select a.it_id,a.name,a.userid,a.time_release,a.time_end,b.bid_time,b.ex_id,c.finishtime,c.detailfinishtime,
        d.time_examine,e.examinetime, f.time_calibration,g.time_open,h.finilly_time 
        from release_items a join bid_items b join finish_first_trial c join first_trial d join review_details e 
        join calibration f join bidopening g join finish_item h 
        where a.it_id = b.it_id and b.ex_id = 'S00005' and a.it_id = c.it_id and b.it_id = d.it_id and b.ex_id = d.ex_id
        and b.it_id = e.it_id and b.ex_id = e.ex_id and b.it_id = f.it_id and b.ex_id = f.ex_id 
        and b.it_id = g.it_id and b.ex_id = g.ex_id and b.it_id = h.it_id and b.ex_id = h.ex_id 
        and a.it_id ="XM20220101006";








select a.it_id,a.name,a.userid,a.time_release,a.time_end,b.bid_time,b.ex_id,c.finishtime,c.detailfinishtime,
        d.time_examine,e.examinetime, f.time_calibration,g.time_open,h.finilly_time 
        from release_items a join bid_items b join finish_first_trial c join first_trial d join review_details e 
        join calibration f join bidopening g join finish_item h 
        where a.it_id = b.it_id and b.ex_id = 'S00005' and a.it_id = c.it_id and b.it_id = d.it_id and b.ex_id = d.ex_id
        and b.it_id = e.it_id and b.ex_id = e.ex_id and b.it_id = f.it_id and b.ex_id = f.ex_id 
        and b.it_id = g.it_id and b.ex_id = g.ex_id and b.it_id = h.it_id and b.ex_id = h.ex_id 
        and a.it_id="XM20220101013";




/*
select expert_personal.ex_id,expert_personal.name,expert_personal.birthdate,research_direction.name as research_specialty,
	expert_personal.phone,expert_personal.accept_invitation,expert_personal.accept_recommend,
	expert_personal.address_province,expert_personal.address_city,expert_personal.address_county,expert_personal.address_detail,expert_personal.email,
	honor.name as honorname,honor.pid as honorpid,
    degree.name as degreename,
    count(*) as count ,sum(a.budget) as money
    from expert_personal join honor join degree join release_items join calibration a 
    join item_state join research_direction
	where expert_personal.honor=honor.h_id and expert_personal.degree=degree.de_id 
    and expert_personal.research_specialty=research_direction.re_id
    and release_items.it_id = item_state.it_id 
    and release_items.it_id = a.it_id and a.ex_id = expert_personal.ex_id 
    and item_state.state = 7
    group by expert_personal.ex_id; ;
*/









/*
select a.*, b.gr,c.zc  
from village a join 
	(select villageId as id, count(*) as gr from resident where healthstatus="已感染"  group by villageId 
		union select villageId as id, 0 as gr from resident where villageId not in 
			(select villageId as id from resident where healthstatus="已感染"  group by villageId)) b join 
	(select villageId as id, count(*) as zc from resident where healthstatus="正常"  group by villageId
		union select villageId as id, 0 as zc from resident where villageId not in 
			(select villageId as id from resident where healthstatus="正常"  group by villageId)) c
where a.id = b.id and a.id=c.id;
*/



select a.*,c.name from bidopening a join item_state b join release_items c 
    where a.it_id = b.it_id and a.it_id = c.it_id and a.ex_id = 'S00005' and b.state = 6 ;








select a.*,b.name from review_details a join release_items b 
        where a.it_id = b.it_id and a.ex_id = 'S00000';






select expert_personal.ex_id,expert_personal.name,expert_personal.birthdate,research_direction.name as research_specialty,
	expert_personal.phone,expert_personal.accept_invitation,expert_personal.accept_recommend,
	expert_personal.address_province,expert_personal.address_city,expert_personal.address_county,expert_personal.address_detail,expert_personal.email,
	honor.name as honorname,honor.pid as honorpid,
    degree.name as degreename, review_details_invitation.state as expertstate, 
    count(*) as count ,sum(money) as money
    from expert_personal join honor join degree join expert_achievements join release_items 
    join item_state join achievements join research_direction join review_details_invitation 
	where expert_personal.honor=honor.h_id and expert_personal.degree=degree.de_id and expert_personal.ex_id=expert_achievements.ex_id 
    and expert_personal.research_specialty=research_direction.re_id and expert_achievements.it_id=release_items.it_id 
    and release_items.it_id = item_state.it_id and release_items.it_id=achievements.it_id 
    and expert_personal.ex_id=review_details_invitation.ex_id  and review_details_invitation.it_id='XM20220101015' 
    and item_state.state = 7  
    and expert_personal.ex_id in (select ex_id from review_details_invitation where it_id = 'XM20220101015') 
    group by expert_personal.ex_id;

select expert_personal.ex_id,expert_personal.name,expert_personal.birthdate,research_direction.name as research_specialty,
	expert_personal.phone,expert_personal.accept_invitation,expert_personal.accept_recommend,
	expert_personal.address_province,expert_personal.address_city,expert_personal.address_county,expert_personal.address_detail,expert_personal.email,
	honor.name as honorname,honor.pid as honorpid,
    degree.name as degreename,
    count(*) as count ,sum(money) as money
    from expert_personal join honor join degree join expert_achievements join release_items join item_state join achievements join research_direction
	where expert_personal.honor=honor.h_id and expert_personal.degree=degree.de_id and expert_personal.ex_id=expert_achievements.ex_id 
    and expert_personal.research_specialty=research_direction.re_id
    and expert_achievements.it_id=release_items.it_id and release_items.it_id = item_state.it_id and release_items.it_id=achievements.it_id 
    and item_state.state = 7
    group by expert_personal.ex_id
	union
    select expert_personal.ex_id,expert_personal.name,expert_personal.birthdate,research_direction.name as research_specialty,
	expert_personal.phone,expert_personal.accept_invitation,expert_personal.accept_recommend,
	expert_personal.address_province,expert_personal.address_city,expert_personal.address_county,expert_personal.address_detail,
    expert_personal.email,
	honor.name as honorname,honor.pid as honorpid,
    degree.name as degreename, review_details_invitation.state as expertstate, 
    0 as count ,0 as money
    from expert_personal join honor join degree join research_direction join review_details_invitation 
	where expert_personal.honor=honor.h_id and expert_personal.degree=degree.de_id 
    and expert_personal.research_specialty=research_direction.re_id 
    and expert_personal.ex_id=review_details_invitation.ex_id  and review_details_invitation.it_id='`+it_id+`' 
    and expert_personal.ex_id not in
    (
		select expert_personal.ex_id
		from expert_personal join honor join degree join expert_achievements join release_items join item_state 
        join achievements join review_details_invitation  
        where expert_personal.honor=honor.h_id and expert_personal.degree=degree.de_id 
        and expert_personal.ex_id=expert_achievements.ex_id  and expert_achievements.it_id=release_items.it_id 
        and release_items.it_id = item_state.it_id and release_items.it_id=achievements.it_id 
        and expert_personal.ex_id=review_details_invitation.ex_id  and review_details_invitation.it_id='`+it_id+`' 
        and item_state.state = 7 
        and expert_personal.ex_id in (select ex_id from review_details_invitation where it_id = '`+it_id+`') 
        group by expert_personal.ex_id
    )
    group by expert_personal.ex_id;
    
    
    
    
    
    
select bid_items.*, release_items.name as itemname, release_items.time_release, first_trial.* 
    from bid_items join release_items join first_trial 
    where bid_items.it_id = release_items.it_id and bid_items.it_id = first_trial.it_id and bid_items.ex_id = first_trial.ex_id
    and bid_items.ex_id = "S00000";
    
    
drop table if exists test;
create table test
(
id int,
cid int,
num1 int,
num2  int,
primary key(id)
);
insert into test values
(1,1,12,1),
(2,1,12,1),
(3,1,42,1),
(4,1,12,1);

update test set id = 56 where id = 1;




select * from test;

select id,cid,sum(num1) as num11,sum(num2) as num22 from test group by id,cid;






select * from bid_items where it_id = 'XM20220101013' and  ex_id = 'S00005';



select a.*, b.* ,c.categoryid,c.categoryname, d.name as typename 
    from release_items a join item_state b join item_category c join research_direction d 
	where a.it_id=b.it_id and a.cid = c.cid and a.type = d.re_id 
    and (b.state = 2 or b.state = 3) and a.userid = 'u00001' order by a.it_id;










select a.* ,b.bid_time,b.ex_id, d.name as exname,e.name as typename, f.categoryname,
                g.name as bidname, g.address as bidaddress, g.phone as bidphone,h.username,h.phone as userphone      
                from release_items a join bid_items b join first_trial c join expert_personal d join research_direction e 
                join item_category f join bidding_user h join bidding g 
                where a.it_id = b.it_id and b.it_id = c.it_id and b.ex_id = c.ex_id and b.ex_id = d.ex_id and a.type = e.re_id
                and a.cid = f.cid and a.userid = h.userid and h.b_id = g.b_id    
                and c.adopt = 1 and a.it_id = 'XM20220102003' ;
                # and a.it_id in (select it_id from review_details_invitation where ex_id = 'S00004' and state = 1);

# g h f e 
select a.* ,b.bid_time,b.ex_id
                      
                from release_items a join bid_items b    
                 
                where a.it_id = b.it_id    
                
                and  a.it_id = 'XM20220102003' ;    
    
    
    
    
    
    
/*
drop database if exists Test;
create database Test;
use Test;



DROP TABLE IF EXISTS village;
CREATE TABLE village(
 id VARCHAR(50) PRIMARY KEY  COMMENT '小区ID',
    name VARCHAR(100) COMMENT '小区名称',
    home_isolationNum INT COMMENT '居家隔离人数',
    infectedNum INT COMMENT '当前感染人数',
    newdnum INT COMMENT '新增确诊人数',
    riskGrade VARCHAR(50) COMMENT '当前风险等级',
    controlMeasures VARCHAR(100) COMMENT '管控措施',
    population INT COMMENT '当前总人口数',
    modifytime datetime  NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间'
)COMMENT='小区信息表';
insert into village values
('MD','明德小区',0,0,0,'低风险','人员车辆可正常出入',10228,CURRENT_TIMESTAMP),
('MJ','明镜小区',0,0,0,'低风险','人员车辆可正常出入',10229,CURRENT_TIMESTAMP);
select * from village;
*/

/*
DROP TABLE IF EXISTS resident;
CREATE TABLE resident(
 r_name VARCHAR(50) COMMENT '居民姓名',
    r_identity VARCHAR(50) COMMENT '身份证号',
    villageId VARCHAR(50) COMMENT '所属小区ID',
    buildingId VARCHAR(50) COMMENT '所属楼栋ID',
    housenumber VARCHAR(50) COMMENT '门牌号',
    healthstatus VARCHAR(50) COMMENT '目前状态',  
    vaccinationstatus VARCHAR(50) COMMENT '疫苗接种情况'
) COMMENT '居民信息表';
insert into resident values
('张浩天','330104199802290231','MD','MD01','一单元101','已感染','暂未接种'),
('张浩天','330104199802290231','MD','MD01','一单元101','正常','一针剂/已完成一针剂首轮全部针剂'),
('张浩天','330104199802290231','MD','MD01','一单元101','已感染','一针剂/已完成一针剂首轮全部针剂'),
('张浩天','330104199802290231','MD','MD01','一单元101','集中隔离','一针剂/已完成一针剂首轮全部针剂'),
('张浩天','330104199802290231','MD','MD01','一单元101','正常','一针剂/已完成一针剂首轮全部针剂'),
('张浩天','330104199802290231','MD','MD01','一单元101','正常','一针剂/已完成一针剂首轮全部针剂'),
('张浩天','330104199802290231','MD','MD01','一单元101','正常','一针剂/已完成一针剂首轮全部针剂'),
('张浩天','330104199802290231','MD','MD01','一单元101','居家隔离','一针剂/已完成一针剂首轮全部针剂'),
('张浩天','330104199802290231','MD','MD01','一单元101','正常','一针剂/已完成一针剂首轮全部针剂'),
('张浩天','330104199802290231','MD','MD01','一单元101','正常','一针剂/已完成一针剂首轮全部针剂'),
('张浩天','330104199802290231','MD','MD01','一单元101','正常','一针剂/已完成一针剂首轮全部针剂'),
('张浩天','330104199802290231','MD','MD01','一单元101','正常','一针剂/已完成一针剂首轮全部针剂'),
('张浩天','330104199802290231','MD','MD01','一单元101','正常','一针剂/已完成一针剂首轮全部针剂'),
('张浩天','330104199802290231','MD','MD01','一单元101','正常','一针剂/已完成一针剂首轮全部针剂'),
('张浩天','330104199802290231','MD','MD01','一单元101','正常','一针剂/已完成一针剂首轮全部针剂'),
('张浩天','330104199802290231','MD','MD01','一单元101','正常','一针剂/已完成一针剂首轮全部针剂'),
('张浩天','330104199802290231','MD','MD01','一单元101','正常','一针剂/已完成一针剂首轮全部针剂'),
('张浩天','330104199802290231','MD','MD01','一单元101','正常','一针剂/已完成一针剂首轮全部针剂'),
('张浩天','330104199802290231','MD','MD01','一单元101','居家健康监测','一针剂/已完成一针剂首轮全部针剂'),
('张浩天','330104199802290231','MD','MD01','一单元101','正常','一针剂/已完成一针剂首轮全部针剂'),
('付鸡公','330104200002290319','MJ','MJ02','一单元703','已感染','暂未接种');
select * from resident;

*/
    
    

