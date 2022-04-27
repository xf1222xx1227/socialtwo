


drop table if exists topic_state;
create table topic_state(
	id           char(13)                      not null,
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













