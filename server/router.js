const express = require('express')

const router = express.Router()
// 导入数据库 sqlFn('sql',[].res=>{})
const sqlFn = require('./mysql')

// 文件需要的模块
const fs = require('fs')
const multer = require('multer')


// 路由接口
// router.get('/',(req,res)=>{
//     res.send('hello')
// ---------------------------------------------登录页-------------------------------------------------
// 社科下属账户
router.get("/bidding_user", (req, res) => {
    var search = req.query.search;
    const sql = "select * from bidding_user " + search;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 社科主体账户
router.get("/bidding_subject", (req, res) => {
    var search = req.query.search;
    const sql = "select * from bidding " + search;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 专家账户
router.get("/getExpertPersonal", (req, res) => {
    var search = req.query.search;
    const sql = "select * from expert_personal " + search;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 正在招标全部项目
router.get("/getAllBiddingItems", (req, res) => {
    const sql = `select a.*, b.* ,c.categoryid,c.categoryname, d.name as typename from release_items a join item_state b join item_category c join research_direction d 
	where a.it_id=b.it_id and a.cid = c.cid and a.type = d.re_id 
    and b.state = 2 ;`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 投标截至转换为初审状态
router.get("/updateBiddindToPre", (req, res) => {
    let it_id = req.query.it_id;
    let bid = req.query.bid || 2;
    let release_items = req.query.release_items || 1;
    let state = req.query.state || 3;
    const sql = "update item_state set bid=?,release_items=?,state=? where it_id=?";
    const arr = [bid, release_items,state, it_id];
    sqlFn(sql, arr, (result) => {
        if (result.affecteRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})
// 正在招标全部项目
router.get("/getFinishFirstTrial", (req, res) => {
    const sql = `select * from finish_first_trial;`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 初审状态变成细审
router.get("/updateBiddindPreToDetail", (req, res) => {
    let it_id = req.query.it_id;
    let bid = req.query.bid || 2;
    let review_details = req.query.review_details || 1;
    let release_items = req.query.release_items || 2;
    let state = req.query.state || 4;
    const sql = "update item_state set bid=?, release_items=?,review_details=?,state=? where it_id=?";
    const arr = [ bid,release_items,review_details,state, it_id];
    sqlFn(sql, arr, (result) => {
        if (result.affecteRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})



// ---------------------------------------------注册页-------------------------------------------------
// 专家注册
// 学历
router.get("/getEducation", (req, res) => {
    const sql = "select * from education; ";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 地区——省
router.get("/china_address_province", (req, res) => {
    var search = req.query.search;
    const sql = "select * from china where pid='0' and id!= '0';";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 地区——市
router.get("/china_address_city", (req, res) => {
    let search = req.query.pid;
    const sql = "select * from china where pid = " + search;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 地区——县
router.get("/china_address_county", (req, res) => {
    var search = req.query.pid;
    const sql = "select * from china where pid = " + search;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 地区——所有
router.get("/china_address", (req, res) => {
    const sql = "select * from china where id != '0'";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 获取待审核专家
router.get("/getAllExpertPersonalRegister", (req, res) => {
    const sql = "select * from expert_personal_register order by ex_id;";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 专家申请
router.get("/addExpertRegister", (req, res) => {
    let ex_id = req.query.ex_id;
    let name = req.query.name;
    let password = req.query.password;
    let honor = req.query.honor;
    let birthdate = req.query.birthdate;
    let research_specialty = req.query.research_specialty;
    let education = req.query.education;
    let degree = req.query.degree;
    let major = req.query.major || "#";
    let phone = req.query.phone;
    let email = req.query.email;
    let address_province = req.query.address_province;
    let address_city = req.query.address_city;
    let address_county = req.query.address_county || -1;
    let address_detail = req.query.address_detail;
    let company = req.query.company || "";
    let accept_invitation = req.query.accept_invitation || 1;
    let accept_recommend = req.query.accept_recommend || 1;
    let register_time = req.query.register_time;

    const sql = "insert into expert_personal_register values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const arr = [ex_id,name,password,honor,birthdate,research_specialty,education,degree,major,phone,email,address_province,address_city,address_county, address_detail, company, accept_invitation, accept_recommend, register_time];
    sqlFn(sql, arr, (result) => {
        if (result.affecteRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})


// 社科人员注册----------------------------------
// 社科人员申请表
router.get("/bidding_user_apply", (req, res) => {
    var search = req.query.search;
    const sql = "select * from bidding_user_apply " + search;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 社科人员申请
router.get("/add_bidding_user_apply", (req, res) => {
    let userid = req.query.userid;
    let username = req.query.username;
    let password = req.query.password;
    let address = req.query.address;
    let phone = req.query.phone;
    let b_id = req.query.b_id;

    const sql = "insert into bidding_user_apply values(?,?,?,?,?,?)";
    const arr = [userid, username, password, address, phone, b_id];
    sqlFn(sql, arr, (result) => {
        if (result.affecteRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})
// 研究方向
router.get("/getResearchDirection", (req, res) => {
    const sql = "select * from research_direction;";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})



//----------------------项目新增page--------------------------------
// 
// 项目分类
router.get("/itemCategory", (req, res) => {
    const sql = "select * from item_category group by categoryid;";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 项目类别名称
router.get("/itemCategoryname", (req, res) => {
    let categoryid = req.query.categoryid;
    const sql = "select * from item_category where categoryid = '" + categoryid + "';";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 项目全部类别
router.get("/getAllItemCategory", (req, res) => {
    const sql = "select * from item_category order by cid;";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})

// 学位类别 degree
router.get("/degree", (req, res) => {
    const sql = "select * from degree;";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 研究专长 research_specialty
router.get("/research_specialty", (req, res) => {
    const sql = "select * from research_direction;";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 荣誉称号 honor
router.get("/honor", (req, res) => {
    const sql = "select * from honor;";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 学科
router.get("/getMajorOneTwo", (req, res) => {
    const sql = "select * from majors order by id;";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 某个学科取子节点  暂时不用
router.get("/getOneMajorChildren", (req, res) => {
    const sql = "select * from majors where parentid='"+id+"' order by id;";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})

// 全部专家 getAllExpertPersonal
router.get("/getAllExpertPersonal", (req, res) => {
    const sql = "select * from expert_personal order by ex_id;";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 全部专家（有项目） expert_personal
router.get("/getAllExpertPersonalHave", (req, res) => {
    const sql = `
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
    group by expert_personal.ex_id; `;
    // const sql = "select * from expert_personal;";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 全部专家（无项目） expert_personal
router.get("/getAllExpertPersonalNo", (req, res) => {
    const sql = `
    select expert_personal.ex_id,expert_personal.name,expert_personal.birthdate,research_direction.name as research_specialty,
	expert_personal.phone,expert_personal.accept_invitation,expert_personal.accept_recommend,
	expert_personal.address_province,expert_personal.address_city,expert_personal.address_county,expert_personal.address_detail,expert_personal.email,
	honor.name as honorname,honor.pid as honorpid,
    degree.name as degreename,
    0 as count ,0 as money
    from expert_personal join honor join degree join research_direction
	where expert_personal.honor=honor.h_id and expert_personal.degree=degree.de_id and expert_personal.research_specialty=research_direction.re_id
    and expert_personal.ex_id not in
    (
		select expert_personal.ex_id
		from expert_personal join honor join degree join expert_achievements join release_items join item_state join achievements
        where expert_personal.honor=honor.h_id and expert_personal.degree=degree.de_id and expert_personal.ex_id=expert_achievements.ex_id 
        and expert_achievements.it_id=release_items.it_id and release_items.it_id = item_state.it_id and release_items.it_id=achievements.it_id 
        and item_state.state = 7 
        group by expert_personal.ex_id
    )
    group by expert_personal.ex_id;`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 一二级菜单专家（有项目） expert_personal
router.get("/getOneExpertPersonalHave", (req, res) => {
    // var search = req.query.search;
    let str = req.query.str;
    // let id=req.query.id;
    // console.log(111,column,id);
    const sql = `
    select expert_personal.ex_id,expert_personal.name,expert_personal.birthdate,research_direction.name as research_specialty,expert_personal.honor as honorid,
	expert_personal.phone,expert_personal.accept_invitation,expert_personal.accept_recommend,
	expert_personal.address_province,expert_personal.address_city,expert_personal.address_county,expert_personal.address_detail,expert_personal.email,
	honor.name as honorname,honor.pid as honorpid,
    degree.name as degreename,
    count(*) as count ,sum(money) as money
    from expert_personal join honor join degree join expert_achievements join release_items join item_state join achievements join research_direction join majors 
	where expert_personal.honor=honor.h_id and expert_personal.degree=degree.de_id and expert_personal.ex_id=expert_achievements.ex_id 
    and expert_personal.research_specialty=research_direction.re_id and expert_achievements.it_id=release_items.it_id 
    and release_items.it_id = item_state.it_id and release_items.it_id=achievements.it_id and expert_personal.major = majors.id 
    and item_state.state = 7 ` + str +
    ` group by expert_personal.ex_id;`;
    // console.log(111,sql);
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 一二级菜单专家（无项目） expert_personal
router.get("/getOneExpertPersonalNo", (req, res) => {
    let str = req.query.str;
    // let id=req.query.id;
    // console.log(222,column,id);
    const sql = `
    select expert_personal.ex_id,expert_personal.name,expert_personal.birthdate,research_direction.name as research_specialty,
	expert_personal.phone,expert_personal.accept_invitation,expert_personal.accept_recommend,
	expert_personal.address_province,expert_personal.address_city,expert_personal.address_county,expert_personal.address_detail,expert_personal.email,
	honor.name as honorname,honor.pid as honorpid,
    degree.name as degreename,
    0 as count ,0 as money
    from expert_personal join honor join degree join research_direction join majors 
	where expert_personal.honor=honor.h_id and expert_personal.degree=degree.de_id 
    and expert_personal.research_specialty=research_direction.re_id and expert_personal.major = majors.id 
    and expert_personal.ex_id not in
    (
		select expert_personal.ex_id
		from expert_personal join honor join degree join expert_achievements join release_items join item_state join achievements join majors 
        where expert_personal.honor=honor.h_id and expert_personal.degree=degree.de_id and expert_personal.ex_id=expert_achievements.ex_id 
        and expert_achievements.it_id=release_items.it_id and release_items.it_id = item_state.it_id and release_items.it_id=achievements.it_id 
        and expert_personal.major = majors.id 
        and item_state.state = 7 ` + str +
        ` group by expert_personal.ex_id
    ) ` + str +
        ` group by expert_personal.ex_id;`;
    // console.log(222,sql);
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 提交前准备-获取所有发布的项目id
router.get("/getReleaseAllItems", (req, res) => {
    const sql = `select * from release_items order by it_id;`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 项目提交添加四个表（项目发布 release_items ，项目状态，专家邀请）
router.get("/addReleaseItems", (req, res) => {
    let it_id = req.query.it_id;
    let name = req.query.name;
    let userid = req.query.userid;
    let content = req.query.content;
    let time_release = req.query.time_release;
    let time_end = req.query.time_end;
    let recommend = req.query.recommend;
    let public = req.query.public;
    let invitation = req.query.invitation;
    let type = req.query.type;
    let cid = req.query.cid;
    let rate_economics = req.query.rate_economics;
    let rate_comprehensive = req.query.rate_comprehensive;
    let rate_technology = req.query.rate_technology;
    let other = req.query.other;
    let funds = req.query.funds;
    const arr = [it_id, name, userid, content, time_release, time_end, recommend, public, invitation, type, cid, rate_economics, rate_comprehensive, rate_technology, other, funds];
    const sql = "insert into release_items values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    sqlFn(sql, arr, (result) => {
        if (result.affecteRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})
// 项目提交添加四个表（项目发布，项目状态 item_state ，专家邀请）
router.get("/addItemState", (req, res) => {
    let it_id = req.query.it_id;
    let releases = req.query.releases;
    let bid = req.query.bid;
    let release_items = req.query.release_items;
    let review_details = req.query.review_details;
    let calibratio = req.query.calibratio;
    let bid_opening = req.query.bid_opening;
    let finish = req.query.finish;
    let state = req.query.state;
    const arr = [it_id, releases, bid, release_items, review_details, calibratio, bid_opening, finish, state];
    const sql = "insert into item_state values(?,?,?,?,?,?,?,?,?)";
    sqlFn(sql, arr, (result) => {
        if (result.affecteRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})
// 项目提交添加四个表（项目发布，项目状态，专家邀请 release_items_invitation ，文件表）
router.get("/addReleaseItemsInvitation", (req, res) => {
    // console.log("进入添加第三个");
    let it_id = req.query.it_id;
    let ex_id = req.query.ex_id;
    console.log(33, it_id, ex_id);
    const arr = [it_id, ex_id];
    const sql = "insert into release_items_invitation values(?,?)";
    sqlFn(sql, arr, (result) => {
        if (result.affecteRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})
// 项目提交添加四个表（项目发布，项目状态，专家邀请  ，文件表 item_files ）
router.get("/addItemFiles", (req, res) => {
    let it_id = req.query.it_id;
    let upurl = req.query.upurl;
    let uid = req.query.uid;
    let url = req.query.url;
    let name = req.query.name;
    let uploadtime = req.query.uploadtime;
    let size = req.query.size;

    const arr = [it_id, upurl,uid,url,name,uploadtime,size];
    const sql = "insert into item_files values(?,?,?,?,?,?,?)";
    sqlFn(sql, arr, (result) => {
        if (result.affecteRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})
// 判断是否提交成功
router.get("/addSuccessOrDefault", (req, res) => {
    let it_id = req.query.it_id;
    let invitation = req.query.invitation;
    let sql = "";
    if (invitation == 0) {
        sql = `select a.it_id from release_items a join item_state b 
                where a.it_id = b.it_id  
                and a.it_id = '` + it_id + `';`;
    } else {
        sql = `select a.it_id from release_items a join item_state b join release_items_invitation c 
                where a.it_id = b.it_id and a.it_id = c.it_id 
                and a.it_id='` + it_id + `';`;
    }
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 添加失败后删除已经添加的部分数据
router.get("/deleteSomeSuccess", (req, res) => {
    // console.log("进入删除接口");
    let table = req.query.table;
    var it_id = req.query.it_id;
    const sql = "delete from " + table + " where it_id = '" + it_id + "';";
    const arr = [it_id];
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})



// 招标项目页面
// ------------------------------------------------------------------------------
// 正在招标项目信息 14条
router.get("/getBiddingItems", (req, res) => {
    let userid = req.query.userid;
    const sql = `select a.*, b.* ,c.categoryid,c.categoryname, d.name as typename 
    from release_items a join item_state b join item_category c join research_direction d 
	where a.it_id=b.it_id and a.cid = c.cid and a.type = d.re_id 
    and (b.state = 2 or b.state = 3) and a.userid = '`+userid+`' order by a.it_id;`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 获取文件列表
router.get("/getBiddingFiles", (req, res) => {
    let id = req.query.it_id;
    const sql = `select * from item_files where it_id = '`+id+`'`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 项目发表修改
router.get("/updateReleaseItems", (req, res) => {
    let it_id = req.query.it_id;
    let name = req.query.name;
    let userid = req.query.userid;
    let content = req.query.content;
    let time_release = req.query.time_release;
    let time_end = req.query.time_end;
    let recommend = req.query.recommend;
    let public = req.query.public;
    let invitation = req.query.invitation;
    let type = req.query.type;
    let cid = req.query.cid;
    let rate_economics = req.query.rate_economics;
    let rate_comprehensive = req.query.rate_comprehensive;
    let rate_technology = req.query.rate_technology;
    let other = req.query.other;
    let funds = req.query.funds;

    const sql = `update release_items set 
                name=?,userid=?,content=?,time_release=?,time_end=? ,recommend=? ,public=? ,
                invitation=?,type=?,cid=?,rate_economics=?,rate_comprehensive=? ,rate_technology=? ,other=? ,funds=? 
                where it_id=?;`;
    const arr = [name, userid, content, time_release, time_end, recommend,public,invitation,type,cid,rate_economics,rate_comprehensive,rate_technology,other,funds,it_id];
    sqlFn(sql, arr, (result) => {
        if (result.affecteRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})
// 删除文件
router.get("/deleteItemFiles", (req, res) => {
    let it_id = req.query.it_id;
    let url = req.query.url;
    const sql = `delete from item_files where it_id =?  and url=?`;
    const arr = [it_id,url];
    sqlFn(sql, arr, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})
// 项目发表修改
router.get("/deleteBidingReleaseItems", (req, res) => {
    let it_id = req.query.it_id;
    const sql = `update item_state set  state = 0 where it_id=?;`;
    const arr = [it_id];
    sqlFn(sql, arr, (result) => {
        if (result.affecteRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})

// ---------------------------项目初审页面-------------------------------------
// 所有进入初审的项目
router.get("/getAllPreItems", (req, res) => {
    // let str = req.query.str || "";
    let userid = req.query.userid;
    const sql = `
    select release_items.*, item_state.* ,item_category.categoryid,item_category.categoryname, 
    research_direction.name as typename,bidding.b_id, bidding.name as bidname, 
    bidding.address as bidaddress, bidding.phone as bidphone, 
    bidding_user.username, bidding_user.phone as userphone ,bidding_user.address as useraddress,
    bid_items.ex_id,bid_items.bid_time ,expert_personal.name as exname     
	from release_items  join item_state  join item_category  join research_direction 
    join bidding_user join bidding join bid_items join expert_personal  
	where release_items.it_id=item_state.it_id and release_items.cid = item_category.cid 
    and release_items.type = research_direction.re_id and release_items.userid=bidding_user.userid 
    and bidding_user.b_id = bidding.b_id and bid_items.it_id = release_items.it_id and expert_personal.ex_id = bid_items.ex_id 
    and (item_state.state = 3 or item_state.state = 2) and release_items.userid = '`+userid+`' 
    order by release_items.it_id;`;
    // and release_items.it_id not in (select it_id from bid_items where ex_id = '`+userid+`' )
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
router.get("/getOneBiddingItems", (req, res) => {
    let ex_id = req.query.ex_id;
    let it_id = req.query.it_id;
    const sql = `select bid_items.*, release_items.name as itemname from bid_items join release_items 
    where bid_items.it_id = release_items.it_id 
    and bid_items.ex_id = '` + ex_id + `' and bid_items.it_id = '` + it_id + `';`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 审核结果保存
router.get("/addFirstTrial", (req, res) => {
    let ex_id = req.query.ex_id;
    let it_id = req.query.it_id;
    let adopt = req.query.adopt;
    let reason = req.query.reason;
    let userid = req.query.userid;
    let time_examine = req.query.time_examine;
    const sql = "insert into first_trial(ex_id,it_id,adopt,reason,userid,time_examine) values(?,?,?,?,?,?)";
    const arr = [ex_id, it_id, adopt, reason, userid, time_examine];
    sqlFn(sql, arr, (result) => {
        if (result.affecteRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})
// 获取已经初审数据
router.get("/getAllFirstTrial", (req, res) => {
    const sql = `select * from first_trial`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})


// ---------------------------细审专家邀请页面-------------------------------------
// 初审截至
router.get("/addFinishFirst", (req, res) => {
    let it_id = req.query.it_id;
    let finishtime = req.query.finishtime;
    let updatetime = req.query.updatetime;
    let detailfinishtime = req.query.detailfinishtime;
    const sql = "insert into finish_first_trial(it_id,finishtime,updatetime,detailfinishtime) values(?,?,?,?)";
    const arr = [it_id, finishtime, updatetime,detailfinishtime];
    sqlFn(sql, arr, (result) => {
        if (result.affecteRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})
// 获取初审截至
router.get("/getOneItemFinishFirst", (req, res) => {
    let it_id = req.query.it_id;
    const sql = `select * from finish_first_trial where it_id = '`+it_id+`';`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 细审专家邀请
router.get("/addReviewDetailsInvitation", (req, res) => {
    let it_id = req.query.it_id;
    let ex_id = req.query.ex_id;
    let addtime = req.query.addtime;
    let state = req.query.state || 0;
    let type = req.query.type || 2;
    const sql = "insert into review_details_invitation(it_id,ex_id,addtime,state,type) values(?,?,?,?,?)";
    const arr = [it_id,ex_id, addtime, state,type];
    sqlFn(sql, arr, (result) => {
        if (result.affecteRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})
// 细审专家邀请(判断是否添加成功)
router.get("/addReviewDetailsInvitationSuccess", (req, res) => {
    let it_id = req.query.it_id;
    let ex_id = req.query.ex_id;
    const sql = "select * from review_details_invitation where it_id = '"+it_id+"' and ex_id = '"+ex_id+"'";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 获取某个项目的邀请数据
router.get("/getOneItemReviewDetailsInvitation", (req, res) => {
    let it_id = req.query.it_id;
    const sql = `select * from review_details_invitation where it_id = '`+it_id+`';`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 获取某个项目的细审邀请专家数据
router.get("/getOneItemReviewDetailsInvitationExpert", (req, res) => {
    let it_id = req.query.it_id;
    const sql = `
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
    and expert_personal.ex_id=review_details_invitation.ex_id  and review_details_invitation.it_id='`+it_id+`' 
    and item_state.state = 7  
    and expert_personal.ex_id in (select ex_id from review_details_invitation where it_id = '`+it_id+`') 
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
    group by expert_personal.ex_id
    `;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 撤销细审邀请
router.get("/deleteFinishFirst", (req, res) => {
    let it_id = req.query.it_id;
    let ex_id = req.query.ex_id;
    const sql = `delete from review_details_invitation where it_id =?  and ex_id=?`;
    const arr = [it_id,ex_id];
    sqlFn(sql, arr, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})
// 获取某个项目参与申报的专家
router.get("/getOneItemBid", (req, res) => {
    let it_id = req.query.it_id;
    const sql = `select * from bid_items where it_id = '`+it_id+`';`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})

// --------------------细审页面------------------------------
// 正在招标到细审的项目
router.get("/getBiddingItemsToDetail", (req, res) => {
    let userid = req.query.userid;
    const sql = `select a.*, b.* ,c.categoryid,c.categoryname, d.name as typename 
    from release_items a join item_state b join item_category c join research_direction d 
	where a.it_id=b.it_id and a.cid = c.cid and a.type = d.re_id 
    and (b.state = 2 or b.state = 3 or b.state = 4) and a.userid = '`+userid+`' order by a.it_id;`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 获取项目细审总人数
router.get("/getItemDetailcount", (req, res) => {
    let userid = req.query.userid;
    const sql = `select *,count(*) as count from first_trial where adopt = '1' and userid = '`+userid+`' group by it_id;`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 获取项目已经细审人数
router.get("/getItemDetailedcount", (req, res) => {
    let userid = req.query.userid;
    const sql = `select it_id,count(*) as count from review_details 
        where examineid = '`+userid+`' and examinetype = 2 
        group by it_id;`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
    // console.log(111,sql);
})
// 某个项目的需要细审表格数据 
router.get("/getOneItemNeedDetailExamine", (req, res) => {
    let it_id = req.query.it_id;
    const sql = `select a.* ,b.bid_time,b.ex_id, d.name as exname,e.name as typename, f.categoryname,
                g.name as bidname, g.address as bidaddress, g.phone as bidphone,h.username,h.phone as userphone      
                from release_items a join bid_items b join first_trial c join expert_personal d join research_direction e 
                join item_category f join bidding_user h join bidding g 
                where a.it_id = b.it_id and b.it_id = c.it_id and b.ex_id = c.ex_id and b.ex_id = d.ex_id and a.type = e.re_id
                and a.cid = f.cid and a.userid = h.userid and h.b_id = g.b_id    
                and c.adopt = 1 and a.it_id = '`+it_id+`';`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 某个项目的需已经细审的表格数据 
router.get("/getOneItemNeedDetailedExamine", (req, res) => {
    let it_id = req.query.it_id;
    let userid = req.query.userid;
    const sql = `select * from review_details where examineid ='`+userid+`' and it_id = '`+it_id+`';`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 某个项目的某个专家申报详情
router.get("/getOneItemBidDetail", (req, res) => {
    let it_id = req.query.it_id;
    let ex_id = req.query.ex_id;
    const sql = `select * from bid_items where it_id = '`+it_id+`' and ex_id = '`+ex_id+`';`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 某个专家详情
router.get("/getOneExpertDetail", (req, res) => {
    let ex_id = req.query.ex_id;
    const sql = `
    select expert_personal.ex_id,expert_personal.name,expert_personal.birthdate,research_direction.name as research_specialty,
	expert_personal.phone,expert_personal.accept_invitation,expert_personal.accept_recommend,
	expert_personal.address_province,expert_personal.address_city,expert_personal.address_county,expert_personal.address_detail,expert_personal.email,
	honor.name as honorname,honor.pid as honorpid,
    degree.name as degreename,
    count(*) || 0 as count ,sum(money) as money
    from expert_personal join honor join degree join expert_achievements join release_items join item_state join achievements join research_direction
	where expert_personal.honor=honor.h_id and expert_personal.degree=degree.de_id and expert_personal.ex_id=expert_achievements.ex_id 
    and expert_personal.research_specialty=research_direction.re_id
    and expert_achievements.it_id=release_items.it_id and release_items.it_id = item_state.it_id and release_items.it_id=achievements.it_id 
    and item_state.state = 7 
    and expert_personal.ex_id = '`+ex_id+`';`;
    // group by expert_personal.ex_id; `;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 细审提交
router.get("/addDeatilExamineResult", (req, res) => {
    let ex_id = req.query.ex_id;
    let it_id = req.query.it_id;
    let examineid = req.query.examineid;
    let examinetype = req.query.examinetype;
    let score_technology = req.query.score_technology;
    let reason_technology = req.query.reason_technology;
    let score_economics = req.query.score_economics;
    let reason_economics = req.query.reason_economics;
    let score_comprehensive = req.query.score_comprehensive;
    let reason_comprehensive = req.query.reason_comprehensive;
    let score_system = req.query.score_system || 10;
    let examinetime = req.query.examinetime;
    let other = req.query.other;
    const sql = "insert into review_details() values(?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const arr = [ex_id, it_id, examineid, examinetype, score_technology, reason_technology,score_economics,reason_economics,score_comprehensive,reason_comprehensive,score_system,examinetime,other];
    sqlFn(sql, arr, (result) => {
        if (result.affecteRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})
// 某个细审记录详情
router.get("/getOneExpertOneItemDetailed", (req, res) => {
    let ex_id = req.query.ex_id;
    let it_id = req.query.it_id;
    let userid = req.query.userid;
    const sql = `select * from review_details where it_id = '`+it_id+`' and ex_id = '`+ex_id+`' and examineid = '`+userid+`';`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
    // console.log(sql);
})
// 细审修改
router.get("/updateDeatilExamineResult", (req, res) => {
    let ex_id = req.query.ex_id;
    let it_id = req.query.it_id;
    let examineid = req.query.examineid;
    let examinetype = req.query.examinetype;
    let score_technology = req.query.score_technology;
    let reason_technology = req.query.reason_technology;
    let score_economics = req.query.score_economics;
    let reason_economics = req.query.reason_economics;
    let score_comprehensive = req.query.score_comprehensive;
    let reason_comprehensive = req.query.reason_comprehensive;
    let score_system = req.query.score_system || 10;
    let examinetime = req.query.examinetime;
    let other = req.query.other;
    const sql = `update review_details set score_technology=?,reason_technology=?,score_economics=?,
        reason_economics=?,score_comprehensive=?,reason_comprehensive=?,examinetime=?,other=? 
        where ex_id=? and it_id = ? and examineid=?;`;
    const arr = [ score_technology, reason_technology,score_economics,reason_economics,score_comprehensive,reason_comprehensive,examinetime,other,ex_id, it_id, examineid];
    sqlFn(sql, arr, (result) => {
        if (result.affecteRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})






// ----------------------------------------------------------------社科专家端口----------------------------------------------------------------
// 项目投标页面------------------------
// 获取社科联
router.get("/getSocial", (req, res) => {
    const sql = `select * from bidding order by b_id;`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 所有项目可申报但未申报项目
router.get("/getAllItems", (req, res) => {
    let str = req.query.str || "";
    let userid = req.query.userid;
    const sql = `
    select release_items.*, item_state.* ,item_category.categoryid,item_category.categoryname, 
    research_direction.name as typename,bidding.b_id, bidding.name as bidname, 
    bidding.address as bidaddress, bidding.phone as bidphone, 
    bidding_user.username, bidding_user.phone as userphone ,bidding_user.address as useraddress  
	from release_items  join item_state  join item_category  join research_direction join bidding_user join bidding  
	where release_items.it_id=item_state.it_id and release_items.cid = item_category.cid and release_items.type = research_direction.re_id 
    and release_items.userid=bidding_user.userid and bidding_user.b_id = bidding.b_id  
    and (item_state.state = 2 or item_state.state = 3) `+str+` 
    and release_items.it_id not in (select it_id from bid_items where ex_id = '`+userid+`' )
    order by release_items.it_id;`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 申报(投标)添加
router.get("/addBidItems", (req, res) => {
    let ex_id = req.query.ex_id;
    let it_id = req.query.it_id;
    let bid_time = req.query.bid_time;
    let budget = req.query.budget;
    let finilly_time = req.query.finilly_time;
    let other = req.query.other;

    const sql = "insert into bid_items(ex_id,it_id,bid_time,budget,finilly_time,other) values(?,?,?,?,?,?)";
    const arr = [ex_id, it_id, bid_time, budget, finilly_time, other];
    sqlFn(sql, arr, (result) => {
        if (result.affecteRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})
// 申报(投标)文件添加
router.get("/addBidItemFiles", (req, res) => {
    let it_id = req.query.it_id;
    let ex_id = req.query.ex_id;
    let upurl = req.query.upurl;
    let uid = req.query.uid;
    let url = req.query.url;
    let name = req.query.name;
    let uploadtime = req.query.uploadtime;
    let size = req.query.size;

    const sql = "insert into bid_item_files(it_id,ex_id,upurl,uid,url,name,uploadtime,size) values(?,?,?,?,?,?,?,?)";
    const arr = [it_id,ex_id, upurl, uid, url, name, uploadtime,size];
    sqlFn(sql, arr, (result) => {
        if (result.affecteRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})
// 检测是否添加成功
router.get("/successAddBidItemAndFiles", (req, res) => {
    let it_id = req.query.it_id;
    let ex_id = req.query.ex_id;
    let havefile = req.query.havefile || 0;
    let sql="";
    if(havefile == 0){
        sql = `select * from bid_items 
        where bid_items.it_id = '` + it_id + `' and bid_items.ex_id = '` + ex_id + `';`;
    }
    else{
        sql = `select * from bid_items join bid_item_files
        where bid_items.it_id=bid_item_files.it_id  and bid_items.ex_id = bid_item_files.ex_id
        and bid_items.it_id = '` + it_id + `' and bid_items.ex_id = '` + ex_id + `';`;
    }
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 失败就删除添加成功的一部分
router.get("/deleteBidItemAndFiles", (req, res) => {
    let it_id = req.query.it_id;
    let ex_id = req.query.ex_id;
    let table = req.query.table;
    const sql = `delete from ` + table + ` where it_id =? and ex_id = ?`;
    const arr = [it_id,ex_id];
    sqlFn(sql, arr, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})
// 获取某个专家参与细审的项目
router.get("/getOneExpertReviewDetailsItem", (req, res) => {
    let ex_id = req.query.ex_id;
    const sql = `select * from review_details_invitation where ex_id = '`+ex_id+`';`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})

// -------------------------查看投标页面---------------------------
// 获取投标项目
router.get("/getBidItems", (req, res) => {
    let ex_id = req.query.ex_id;
    const sql = `select bid_items.*, release_items.name as itemname from bid_items join release_items 
    where bid_items.it_id = release_items.it_id 
    and bid_items.ex_id = '` + ex_id + `';`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 获取项目信息
router.get("/getOneItem", (req, res) => {
    let it_id = req.query.it_id;
    const sql = `
    select release_items.* ,item_category.categoryid,item_category.categoryname, 
    research_direction.name as typename,bidding.b_id, bidding.name as bidname, 
    bidding.address as bidaddress, bidding.phone as bidphone, 
    bidding_user.username, bidding_user.phone as userphone ,bidding_user.address as useraddress  
	from release_items  join item_category  join research_direction join bidding_user join bidding  
	where  release_items.cid = item_category.cid and release_items.type = research_direction.re_id 
    and release_items.userid=bidding_user.userid and bidding_user.b_id = bidding.b_id  
    and release_items.it_id =  '`+it_id+`' 
    order by release_items.it_id;`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 获取投标文件信息
router.get("/getBidFiles", (req, res) => {
    let it_id = req.query.it_id;
    let ex_id = req.query.ex_id;
    const sql = `select * from bid_item_files where ex_id = '`+ex_id+`' and it_id = '`+it_id+`';`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 撤销项目申请
router.get("/deleteDeclareItem", (req, res) => {
    let ex_id = req.query.ex_id;
    let it_id = req.query.it_id;
    const sql = "delete from bid_items where it_id =? and ex_id = ?";
    const arr = [it_id,ex_id];
    sqlFn(sql, arr, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})
// 撤销项目申请 删除文件
router.get("/deleteDeclareFiles", (req, res) => {
    let ex_id = req.query.ex_id;
    let it_id = req.query.it_id;
    const sql = "delete from bid_item_files where it_id =? and ex_id = ?";
    const arr = [it_id,ex_id];
    sqlFn(sql, arr, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})
// 编辑项目申请 删除某个文件
router.get("/deleteDeclareOneFile", (req, res) => {
    let ex_id = req.query.ex_id;
    let it_id = req.query.it_id;
    let url = req.query.url;
    const sql = "delete from bid_item_files where it_id =? and ex_id = ? and url = ?";
    const arr = [it_id,ex_id,url];
    sqlFn(sql, arr, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})
// 修改投标信息
router.get("/updateBidItem", (req, res) => {
    let budget = req.query.budget;
    let finilly_time = req.query.finilly_time;
    let other = req.query.other;
    let ex_id = req.query.ex_id;
    let it_id = req.query.it_id;
    const sql = "update bid_items set budget=?,finilly_time=?,other=? where ex_id=? and it_id =?";
    const arr = [budget, finilly_time, other, ex_id, it_id];
    sqlFn(sql, arr, (result) => {
        if (result.affecteRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})


// --------------------------初审结果查询页面--------------------------
// 获取投标项目
router.get("/getBidItemsFirstTrialResult", (req, res) => {
    let ex_id = req.query.ex_id;
    const sql = `select bid_items.*, release_items.name as itemname, release_items.time_release, first_trial.* 
    from bid_items join release_items join first_trial 
    where bid_items.it_id = release_items.it_id and bid_items.it_id = first_trial.it_id and bid_items.ex_id = first_trial.ex_id
    and bid_items.ex_id = '` + ex_id + `';`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})



// -------------------------------细审参与界面----------------------
// 专家 细审邀请项目数据
router.get("/getInvitationExpertItems", (req, res) => {
    // let str = req.query.str || "";
    let userid = req.query.userid || "";
    const sql = `
    select release_items.*, item_state.* ,item_category.categoryid,item_category.categoryname, 
    research_direction.name as typename,bidding.b_id, bidding.name as bidname, 
    bidding.address as bidaddress, bidding.phone as bidphone, 
    bidding_user.username, bidding_user.phone as userphone ,bidding_user.address as useraddress  
	from release_items  join item_state  join item_category  join research_direction join bidding_user join bidding  
	where release_items.it_id=item_state.it_id and release_items.cid = item_category.cid and release_items.type = research_direction.re_id 
    and release_items.userid=bidding_user.userid and bidding_user.b_id = bidding.b_id  
    and (item_state.state = 2 or item_state.state = 3)  
    and release_items.it_id not in (select it_id from bid_items where ex_id = '`+userid+`' ) 
    and release_items.it_id in 
    (select it_id from review_details_invitation where ex_id = '`+userid+`' and state = 0) 
    order by release_items.it_id;`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 是否参与细审
router.get("/updateReviewDetailsInvitationState", (req, res) => {
    let state = req.query.state || 1;
    let it_id = req.query.it_id;
    let ex_id = req.query.ex_id;
    const sql = "update review_details_invitation set state=? where it_id=? and ex_id=?;";
    const arr = [state,it_id,ex_id];
    sqlFn(sql, arr, (result) => {
        if (result.affecteRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})
// 专家细审的项目
router.get("/getOneExpertDetailItems", (req, res) => {
    let userid = req.query.userid;
    const sql = `select a.*, b.* ,c.categoryid,c.categoryname, d.name as typename 
    from release_items a join item_state b join item_category c join research_direction d 
	where a.it_id=b.it_id and a.cid = c.cid and a.type = d.re_id 
    and (b.state = 2 or b.state = 3 or b.state = 4) 
    and a.it_id in (select it_id from review_details_invitation where ex_id = '`+userid+`' and state = 1) 
    order by a.it_id;`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 获取项目细审总人数
router.get("/getOneExpertItemDetailcount", (req, res) => {
    let userid = req.query.userid;
    const sql = `select *,count(*) as count from first_trial where adopt = '1' 
    and it_id in (select it_id from review_details_invitation where ex_id = '`+userid+`' and state = 1) 
    group by it_id;`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 获取项目已经细审人数
router.get("/getOneExpertItemDetailedcount", (req, res) => {
    let userid = req.query.userid;
    const sql = `select it_id,count(*) as count from review_details 
    where examineid = '`+userid+`' and examinetype = 1 
    group by it_id;`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
    // console.log(111,sql);
})
// 某个专家审核的某个项目的需要细审表格数据 
router.get("/getOneExpertOneItemNeedDetailExamine", (req, res) => {
    let it_id = req.query.it_id;
    let userid = req.query.userid;
    const sql = `select a.* ,b.bid_time,b.ex_id, d.name as exname,e.name as typename, f.categoryname,
                g.name as bidname, g.address as bidaddress, g.phone as bidphone,h.username,h.phone as userphone      
                from release_items a join bid_items b join first_trial c join expert_personal d join research_direction e 
                join item_category f join bidding_user h join bidding g 
                where a.it_id = b.it_id and b.it_id = c.it_id and b.ex_id = c.ex_id and b.ex_id = d.ex_id and a.type = e.re_id
                and a.cid = f.cid and a.userid = h.userid and h.b_id = g.b_id    
                and c.adopt = 1 and a.it_id = '`+it_id+`';` ;
                // and a.it_id in (select it_id from review_details_invitation where ex_id = '`+userid+`' and state = 1);`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})
// 某个专家审核的某个项目的需已经细审的表格数据 
router.get("/getOneExpertOneItemNeedDetailedExamine", (req, res) => {
    let it_id = req.query.it_id;
    let userid = req.query.userid;
    const sql = `select * from review_details where examineid ='`+userid+`' and it_id = '`+it_id+`';`;
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})














// 添加测试
router.get("/add", (req, res) => {
    let userid = req.query.userid;
    let username = req.query.username;
    let password = req.query.password;
    let address = req.query.address;
    let phone = req.query.phone;
    let b_id = req.query.b_id;


    const sql = "insert into bidding_user values(?,?,?,?,?,?)";
    const arr = [userid, username, password, address, phone, b_id];
    sqlFn(sql, arr, (result) => {
        if (result.affecteRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})
// 删除测试
router.get("/delete", (req, res) => {
    var userid = req.query.userid;
    const sql = "delete from bidding_user where userid =?";
    const arr = [userid];
    sqlFn(sql, arr, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})
// 修改测试
router.get("/update", (req, res) => {
    let userid = req.query.userid;
    let username = req.query.username;
    let password = req.query.password;
    let address = req.query.address;
    let phone = req.query.phone;
    let b_id = req.query.b_id;

    const sql = "update bidding_user set username=?,password=?,address=?,phone=?,b_id=? where userid=?";
    const arr = [username, password, address, phone, b_id, userid];
    sqlFn(sql, arr, (result) => {
        if (result.affecteRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})






/**
 *  上传图片测试
        上传图片post请求 调用element-ui组件库的upload
        1. 后台安装multer模块(npm i multer -S)，同时引入fs模块
        2.router.js入口文件导入模块
            const fs=require('fs');
            const multer = require('multer')
        3. 上传图片
 */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
var createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
};
var uploadFolder = './upload/';
createFolder(uploadFolder);
var upload = multer({
    storage: storage
});
router.post('/upload', upload.single('file'), function (req, res, next) {
    var file = req.file;
    // console.log('文件类型:%s',file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    // console.log('文件保存路径：%s',file.path);
    console.log("上传成功");
    res.json({
        res_code: '0',
        name: file.originalname,
        url: file.path
    });
});




module.exports = router