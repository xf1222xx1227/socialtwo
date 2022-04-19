drop table if exists research_direction;
create table research_direction(
	re_id       char(4),
    name		varchar(20),
    remark		varchar(100)
)comment = '研究方向';
insert into research_direction values
("R000","哲学",""),
("R001","经济学",""),
("R002","法学",""),
("R003","教育学",""),
("R004","文学",""),
("R005","历史学",""),
("R006","理学",""),
("R007","工学",""),
("R008","农学",""),
("R009","医学",""),
("R010","军事学",""),
("R011","管理学",""),
("R012","艺术学",""),
("R999","其他","");
select * from research_direction;