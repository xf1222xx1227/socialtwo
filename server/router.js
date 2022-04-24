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
// 管理员账户
router.get("/geAdmins", (req, res) => {
    const sql = "select * from admins ";
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
    const sql = `select * from finish_first_trial a join item_state b where a.it_id = b.it_id and b.state < 5;`;
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
// 细审状态变成定标
router.get("/updateDetailToCalibration", (req, res) => {
    let it_id = req.query.it_id;
    let bid = req.query.bid || 2;
    let release_items = req.query.release_items || 2;
    let review_details = req.query.review_details || 2;
    let calibratio = req.query.calibratio || 1;
    let state = req.query.state || 5;
    const sql = "update item_state set bid=?, release_items=?,review_details=?,calibratio=?,state=? where it_id=?";
    const arr = [ bid,release_items,review_details,calibratio,state, it_id];
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
// 开标，修改项目状态为开标状态
router.get("/updateCalibrationToOpen", (req, res) => {
    let it_id = req.query.it_id;
    let release_items = req.query.release_items || 2;
    let review_details = req.query.review_details || 2;
    let calibratio = req.query.calibratio || 2;
    let bid_opening = req.query.bid_opening || 1; 
    let state = req.query.state || 6;

    const sql = `update item_state set release_items=?,review_details=?,calibratio=?,bid_opening=?,state=? 
        where it_id = ?;`;
    const arr = [release_items,review_details,calibratio,bid_opening,state,it_id];
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
// 开标状态变成完成状态
router.get("/updateOpenToDinish", (req, res) => {
    let it_id = req.query.it_id;
    let bid = req.query.bid || 2;
    let release_items = req.query.release_items || 2;
    let review_details = req.query.review_details || 2;
    let calibratio = req.query.calibratio || 2;
    let bid_opening = req.query.bid_opening || 2;
    let finish = req.query.finish || 2
    let state = req.query.state || 7;
    const sql = "update item_state set calibratio=?,bid_opening=?,finish=?,state=? where it_id=?";
    const arr = [ calibratio,bid_opening,finish,state, it_id];
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
    const sql = "select * from bidding_user_apply where result = 0 " + search;
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
// 社科人员注册
router.get("/add_bidding_user_apply", (req, res) => {
    let userid = req.query.userid;
    let username = req.query.username;
    let password = req.query.password;
    let address = req.query.address;
    let phone = req.query.phone;
    let b_id = req.query.b_id;
    let register_time = req.query.register_time || "";
    let cancellation_time = req.query.cancellation_time || "";
    let result = 0;
    let reason = "";

    const sql = "insert into bidding_user_apply values(?,?,?,?,?,?,?,?)";
    const arr = [userid, username, password, address, phone, b_id,result,reason];
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





// --------------------------------------------------社科成员端----------------------------------------------
// 获取某个社科账户信息
router.get("/getOneBiddingUserInfo", (req, res) => {
    let userid = req.query.userid;
    const sql = `select * from bidding_user where userid = '` + userid + `';`;
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
// ----------------------------首页--------------------------------
// 获取某个社科成员发布项目总数
router.get("/getOneBiddingUserBiddingItems", (req, res) => {
    let userid = req.query.userid;
    const sql = `select count(*) as count from release_items where userid = '` + userid + `';`;
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
// 获取某个社科成员初审项目
router.get("/getOneBiddingUserFirstCount", (req, res) => {
    let userid = req.query.userid;
    const sql = `select * from first_trial where userid = '` + userid + `';`;
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
// 获取某个社科成员细审情况
router.get("/getOneBiddingUserDetail", (req, res) => {
    let userid = req.query.userid;
    const sql = `select * from review_details where examineid = '` + userid + `';`;
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
// 获取某个社科成员细审邀请
router.get("/getOneBiddingUserDetailInvitation", (req, res) => {
    let userid = req.query.userid;
    const sql = `
        select a.* from review_details_invitation a join release_items b 
        where a.it_id = b.it_id and b.userid = '` + userid + `';`;
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
// 获取未完成的项目细审邀请(还能进入审核)
router.get("/getOneBiddingUserInvitationNow", (req, res) => {
    let userid = req.query.userid;
    const sql = `
        select a.* from review_details_invitation a join release_items b join item_state c 
        where a.it_id = b.it_id and a.it_id = c.it_id 
        and b.userid = '` + userid + `' and c.state < 4 ;`;
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

// 获取某个社科成员正在进行项目数量
router.get("/getOneBiddingUserScheduleItems", (req, res) => {
    let userid = req.query.userid;
    const sql = `
        select a.*,c.name from bidopening a join item_state b join release_items c 
        where a.it_id = b.it_id and a.it_id = c.it_id and a.userid = '`+userid+`' and b.state = 6 
        ;`;
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
// 获取社科成员正在进行项目进度
router.get("/getOneBiddingUserSchedule", (req, res) => {
    let userid = req.query.userid;
    const sql = `select * from schedules a join release_items b 
        where a.it_id = b.it_id and b.userid = '`+userid+`';`;
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






//----------------------项目发起page--------------------------------
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
router.get("/getDegree", (req, res) => {
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
    expert_personal.cancellation_time,expert_personal.frozen,
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
    group by expert_personal.ex_id; `;
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
    expert_personal.cancellation_time,expert_personal.frozen,
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
		from expert_personal join honor join degree  join release_items join item_state join calibration a 
        where expert_personal.honor=honor.h_id and expert_personal.degree=degree.de_id  
        and release_items.it_id = item_state.it_id  
        and release_items.it_id = a.it_id and a.ex_id = expert_personal.ex_id 
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
    let str = req.query.str;
    const sql = `
    select expert_personal.ex_id,expert_personal.name,expert_personal.birthdate,research_direction.name as research_specialty,expert_personal.honor as honorid,
	expert_personal.phone,expert_personal.accept_invitation,expert_personal.accept_recommend,
    expert_personal.cancellation_time,expert_personal.frozen,
	expert_personal.address_province,expert_personal.address_city,expert_personal.address_county,expert_personal.address_detail,expert_personal.email,
	honor.name as honorname,honor.pid as honorpid,
    degree.name as degreename,
    count(*) as count ,sum(a.budget) as money
    from expert_personal join honor join degree join release_items join item_state join research_direction join majors join calibration a 
	where expert_personal.honor=honor.h_id and expert_personal.degree=degree.de_id  
    and expert_personal.research_specialty=research_direction.re_id  
    and release_items.it_id = item_state.it_id  and expert_personal.major = majors.id 
    and release_items.it_id = a.it_id and a.ex_id = expert_personal.ex_id 
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
    expert_personal.cancellation_time,expert_personal.frozen,
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
		from expert_personal join honor join degree join release_items join item_state  join majors join calibration a 
        where expert_personal.honor=honor.h_id and expert_personal.degree=degree.de_id 
        and release_items.it_id = item_state.it_id 
        and expert_personal.major = majors.id 
        and release_items.it_id = a.it_id and a.ex_id = expert_personal.ex_id 
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
    let type = req.query.type || 1;
    // console.log(33, it_id, ex_id);
    const arr = [it_id, ex_id,type];
    const sql = "insert into release_items_invitation values(?,?,?)";
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



// -------------------------------------招标项目页面-----------------------------------------
// 正在招标项目信息
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
router.get("/updateFinishFirst", (req, res) => {
    let it_id = req.query.it_id;
    let finishtime = req.query.finishtime;
    let updatetime = req.query.updatetime;
    let detailfinishtime = req.query.detailfinishtime;
    const sql = "update finish_first_trial set finishtime=?,updatetime=?,detailfinishtime=? where it_id=?";
    const arr = [ finishtime, updatetime,detailfinishtime,it_id];
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
    count(*) as count ,sum(a.budget) as money
    from expert_personal join honor join degree join release_items join calibration a 
    join item_state join research_direction join review_details_invitation 
	where expert_personal.honor=honor.h_id and expert_personal.degree=degree.de_id 
    and expert_personal.research_specialty=research_direction.re_id 
    and release_items.it_id = item_state.it_id 
    and release_items.it_id = a.it_id and a.ex_id = expert_personal.ex_id 
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
		from expert_personal join honor join degree join release_items join item_state 
        join review_details_invitation join calibration a 
        where expert_personal.honor=honor.h_id and expert_personal.degree=degree.de_id 
        and release_items.it_id = item_state.it_id 
        and expert_personal.ex_id=review_details_invitation.ex_id  and review_details_invitation.it_id='`+it_id+`' 
        and item_state.state = 7 
        and release_items.it_id = a.it_id and a.ex_id = expert_personal.ex_id 
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

// ----------------------------细审页面------------------------------
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
// 某个项目的已经细审的表格数据 
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
    count(*) || 0 as count ,sum(a.budget) as money
    from expert_personal join honor join degree join release_items join item_state join research_direction join calibration a 
	where expert_personal.honor=honor.h_id and expert_personal.degree=degree.de_id 
    and expert_personal.research_specialty=research_direction.re_id
    and release_items.it_id = item_state.it_id 
    and release_items.it_id = a.it_id and a.ex_id = expert_personal.ex_id 
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


// ----------------------------定标page------------------------------
// 获取还在初审阶段和细审的项目-定标处
router.get("/getCalibrationFirstItem", (req, res) => {
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
// 获取审核结束需要定标的项目-定标处
router.get("/getCalibrationExaminedItem", (req, res) => {
    let userid = req.query.userid;
    const sql = `select a.*, b.* ,c.categoryid,c.categoryname, d.name as typename 
    from release_items a join item_state b join item_category c join research_direction d 
	where a.it_id=b.it_id and a.cid = c.cid and a.type = d.re_id 
    and b.state = 5 and a.userid = '`+userid+`' order by a.it_id;`;
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
// 获取某个项目当前总分排行榜
router.get("/getCalibrationOneItemRank", (req, res) => {
    let it_id = req.query.it_id;
    const sql = `
        select a.it_id,a.ex_id,sum(score_technology) as total_score_technology, 
        sum(score_economics) as total_score_economics,
        sum(score_comprehensive) as total_score_comprehensive,sum(score_system) as total_score_system,
        count(*) as count,b.rate_economics,b.rate_technology,b.rate_comprehensive,c.*   
        from review_details a join release_items b join expert_personal c 
        where a.it_id = b.it_id and a.ex_id = c.ex_id 
        and a.it_id = '`+it_id+`' 
        group by a.ex_id
    ;`;
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
// 获取某个项目当前细审信息
router.get("/getCalibrationOneItemInfo", (req, res) => {
    let it_id = req.query.it_id;
    let ex_id = req.query.ex_id;
    const sql = `
        select a.*,b.name as exaname from review_details a join expert_personal b
        where a.examineid = b.ex_id  
        and a.ex_id = '`+ex_id+`' and a.it_id = '`+it_id+`' and a.examinetype = 1
        union
        select a.*,b.username as exaname from review_details a join bidding_user b
        where a.examineid = b.userid  
        and a.ex_id = '`+ex_id+`' and a.it_id = '`+it_id+`' and a.examinetype = 2
    ;`;
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
// 获取某个项目定标情况
router.get("/getOneItemCalibrationed", (req, res) => {
    let it_id = req.query.it_id;
    const sql = `select * from calibration where it_id = '`+it_id+`' ;`;
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
// 定标插入
router.get("/addCalibration", (req, res) => {
    let ex_id = req.query.ex_id;
    let it_id = req.query.it_id;
    let time_calibration = req.query.time_calibration;
    let time_finilly = req.query.time_finilly;
    let budget = req.query.budget;
    let userid = req.query.userid;
    let state = req.query.state || 0;
    let other = req.query.other;

    const sql = "insert into calibration(ex_id,it_id,time_calibration,time_finilly,budget,userid,state,other) values(?,?,?,?,?,?,?,?)";
    const arr = [ex_id, it_id, time_calibration,time_finilly, budget, userid, state,other];
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
// 定标修改
router.get("/updateCalibration", (req, res) => {
    let ex_id = req.query.ex_id;
    let it_id = req.query.it_id;
    let time_calibration = req.query.time_calibration;
    let time_finilly = req.query.time_finilly;
    let budget = req.query.budget;
    // let userid = req.query.userid;
    // let state = req.query.state || 0;
    let other = req.query.other;

    const sql = `update calibration set time_calibration=?,time_finilly=?,budget=?,other=? 
        where ex_id = '`+ex_id+`' and it_id = '`+it_id+`';`;
    const arr = [time_calibration,time_finilly, budget,other,ex_id, it_id];
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
// 获取某个项目某个专家定标情况
router.get("/getOneItemOneExpertCalibrationed", (req, res) => {
    let it_id = req.query.it_id;
    let ex_id = req.query.ex_id;
    const sql = `select a.*,b.state as states from calibration a join item_state b 
         where a.it_id = b.it_id and a.it_id = '`+it_id+`' and a.ex_id = '`+ex_id+`' ;`;
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

// 获取审核结束需要定标的项目-定标处
router.get("/getCalibrationedItems", (req, res) => {
    let userid = req.query.userid;
    const sql = `select a.*, b.* ,c.categoryid,c.categoryname, d.name as typename 
    from release_items a join item_state b join item_category c join research_direction d 
	where a.it_id=b.it_id and a.cid = c.cid and a.type = d.re_id 
    and b.state = 5 and a.userid = '`+userid+`' 
    and a.it_id in (select distinct it_id from calibration where state != 0) 
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
// 删除邀请
router.get("/deleteCalibration", (req, res) => {
    let it_id = req.query.it_id;
    let ex_id = req.query.ex_id;
    const sql = "delete from calibration where it_id =? and ex_id=?;";
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
// 开标插入
router.get("/addBidOpening", (req, res) => {
    let ex_id = req.query.ex_id;
    let it_id = req.query.it_id;
    let time_open = req.query.time_open;
    let userid = req.query.userid;
    
    const sql = "insert into bidopening(it_id,ex_id,time_open,userid) values(?,?,?,?)";
    const arr = [it_id, ex_id, time_open,userid];
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






// -------------------------查看开标后查看进度页面---------------------------
// 获取某个社科人员开标项目
router.get("/getOneSocialPersonScheduleItems", (req, res) => {    
    let userid = req.query.userid;
    const sql = `select a.*,c.name,d.name as exname 
        from bidopening a join item_state b join release_items c join expert_personal d 
        where a.it_id = b.it_id and a.it_id = c.it_id and a.ex_id=d.ex_id 
        and a.userid = '`+userid+`' and b.state = 6 
        ;`;
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
// 进度催促
router.get("/addSchedulesUrge", (req, res) => {
    let ex_id = req.query.ex_id;
    let it_id = req.query.it_id;
    let urgetime = req.query.urgetime;
    let state = req.query.state || 0;
    
    const sql = "insert into schedules_urge(it_id,ex_id,urgetime,state) values(?,?,?,?)";
    const arr = [it_id, ex_id, urgetime,state];
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
// 项目完成申请通过
router.get("/updateApplyFinishItemPass", (req, res) => {
    let it_id = req.query.it_id;
    let ex_id = req.query.ex_id;
    let answertime = req.query.answertime;
    let state = req.query.state || 1;
    let reason = req.query.reason || ""; 

    const sql = `update apply_finish_item set answertime=?,state=?,reason=? 
        where it_id = ? and ex_id = ?;`;
    const arr = [answertime,state,reason,it_id,ex_id];
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
// 项目完成申请不通过
router.get("/updateApplyFinishItemNoPass", (req, res) => {
    let it_id = req.query.it_id;
    let ex_id = req.query.ex_id;
    let answertime = req.query.answertime;
    let state = req.query.state || 2;
    let reason = req.query.reason || ""; 

    const sql = `update apply_finish_item set answertime=?,state=?,reason=? 
        where it_id = ? and ex_id = ?;`;
    const arr = [answertime,state,reason,it_id,ex_id];
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
// 完成项目
router.get("/addFinishItem", (req, res) => {
    let it_id = req.query.it_id;
    let ex_id = req.query.ex_id;
    let finilly_time = req.query.finilly_time;
    let director = req.query.director || 1;
    let userid = req.query.userid;
    let score = req.query.score || 0;
    let reasonscore = req.query.reasonscore || "";
    let scoreonce = req.query.scoreonce || 0;
    let reasonscoreonce = req.query.reasonscoreonce || "";

    const sql = "insert into finish_item(it_id,ex_id,finilly_time,director,userid,score,reasonscore,scoreonce,reasonscoreonce) values(?,?,?,?,?,?,?,?,?);";
    const arr = [it_id, ex_id, finilly_time, director,userid, score,reasonscore,scoreonce,reasonscoreonce];
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






// -------------------------项目完成页面---------------------------
// 获取总条数
router.get("/getOneSocialUserFinishItemsCount", (req, res) => {    
    let userid = req.query.userid;
    let str = req.query.str || "";
    const sql = `select count(*) as count  
        from release_items a join research_direction b join item_state c join finish_item d 
        join bidding_user f join bidding g 
        where a.type = b.re_id and a.it_id = c.it_id and a.it_id = d.it_id
        and d.userid = '`+userid+`' and c.state = 7 
        and a.userid = f.userid and f.b_id = g.b_id 
        `+str+`
        order by d.finilly_time desc 
        ;`;
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
// 获取社科人员完成的项目
router.get("/getOneSocialUserFinishItems", (req, res) => {    
    let userid = req.query.userid;
    let pagesize = req.query.pagesize;
    let pagenum = req.query.pagenum;
    let str = req.query.str || "";
    let begin = (pagenum-1) * pagesize;
    const sql = `select a.*,b.name as re_name,d.ex_id,d.finilly_time,e.budget,e.time_finilly,f.username,g.name as bname,h.name as exname 
        from release_items a join research_direction b join item_state c join finish_item d join calibration e 
        join bidding_user f join bidding g join expert_personal h
        where a.type = b.re_id and a.it_id = c.it_id and a.it_id = d.it_id 
        and a.it_id = e.it_id and e.userid = '`+userid+`' and e.state = 1 
        and a.userid = f.userid and f.b_id = g.b_id and d.ex_id = h.ex_id 
        and d.userid = '`+userid+`' and c.state = 7 
        `+str+` 
        order by d.finilly_time desc 
        limit `+ begin +`,`+ pagesize+`
        ;`;
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
// 获取某个项目时间线
router.get("/getOneSocialUserOneItemTimeLine", (req, res) => {    
    let it_id = req.query.it_id;
    let userid  = req.query.userid;
    const sql = `select a.it_id,a.name,a.userid,a.time_release,a.time_end,c.finishtime,c.detailfinishtime,
        f.time_calibration,g.time_open,h.finilly_time  
        from release_items a join finish_first_trial c 
        join calibration f join bidopening g join finish_item h 
        where a.it_id = c.it_id and a.userid = '`+userid+`' 
        and a.it_id = f.it_id and f.state = 1 and a.it_id = g.it_id and a.it_id = h.it_id 
        and a.it_id = '`+it_id+`'
        ;`;
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
// 获取某个项目初审结果
router.get("/getOneItemFirstTrial", (req, res) => {    
    let it_id = req.query.it_id;
    const sql = `select a.*,b.name as exname from first_trial a join expert_personal b 
        where a.ex_id = b.ex_id 
        and a.it_id = '`+it_id+`'
        ;`;
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
// 获取某个项目参与细审的人
router.get("/getOneItemReviewDetails", (req, res) => {    
    let it_id = req.query.it_id;
    const sql = `select distinct a.ex_id,b.name from review_details a join expert_personal b 
        where a.ex_id = b.ex_id 
        and a.it_id = '`+it_id+`'
        ;`;
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


// ---------------------------个人中心------------------------------
// 修改账号信息
router.get("/updateSocialUserInfo", (req, res) => {
    let userid = req.query.userid;
    let username = req.query.username;
    let address = req.query.address;
    let phone = req.query.phone

    const sql = `update bidding_user set username=?,address=?,phone=? where userid = ?;`;
    const arr = [username,address,phone,userid];
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
//账户注销
router.get("/updateSocialUserCancellation", (req, res) => {
    let userid = req.query.userid;
    let time = req.query.time;
    const sql = `update bidding_user set cancellation_time=? where userid = ?;`;
    const arr = [time,userid];
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
// -----------------------首页----------------------------
// 获取专家申报数量
router.get("/getOneExpertBidCount", (req, res) => {
    let ex_id = req.query.ex_id;
    const sql = `select count(*) as count from bid_items where ex_id = '`+ex_id+`' group by ex_id ;`;
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
// 获取专家收到的细审邀请情况
router.get("/getOneExpertDetailInvitation", (req, res) => {
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
// 获取专家审核总条数
router.get("/getOneExpertDetailExamineCount", (req, res) => {
    let ex_id = req.query.ex_id;
    const sql = `select count(*) as count from review_details 
        where examineid = '`+ex_id+`' group by examineid;`;
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
// 获取专家完成项目数据
router.get("/getOneExpertFinishedItems", (req, res) => {
    let ex_id = req.query.ex_id;
    const sql = `select * from finish_item a join calibration b  
        where a.it_id = b.it_id and  a.ex_id = '`+ex_id+`';`;
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
// 获取专家正在进行项目进度
router.get("/getOneExpertSchedule", (req, res) => {
    let ex_id = req.query.ex_id;
    const sql = `select * from schedules where ex_id = '`+ex_id+`';`;
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






// 项目投标页面--------------------------------
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
    and release_items.it_id not in (select it_id from review_details_invitation where ex_id = '`+userid+`' and state = '1') 
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
    const sql = `select bid_items.*, release_items.name as itemname from bid_items join release_items join item_state 
    where bid_items.it_id = release_items.it_id and bid_items.it_id = item_state.it_id 
    and item_state.state < 5  
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




// -------------------------------细审参与界面----------------------
// 专家 细审邀请项目数据
router.get("/getInvitationExpertItems", (req, res) => {
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
    and release_items.it_id not in (select it_id from bid_items where ex_id = '`+userid+`') 
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








// --------------------------初审结果查询页面--------------------------
// 获取投标项目初审结果
router.get("/getBidItemsFirstTrialResult", (req, res) => {
    let ex_id = req.query.ex_id;
    const sql = `select bid_items.*, release_items.name as itemname, release_items.time_release, first_trial.* 
    from bid_items join release_items join first_trial 
    where bid_items.it_id = release_items.it_id and bid_items.it_id = first_trial.it_id 
    and bid_items.ex_id = first_trial.ex_id 
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




// --------------------------细审结果查询页面--------------------------
// 获取专家正在细审的项目
router.get("/getOneExpertDetailExaminedItems", (req, res) => {
    let ex_id = req.query.ex_id;
    const sql = `select a.it_id,a.name from release_items a join item_state b 
        where a.it_id = b.it_id and b.state < 5 
        and a.it_id in(select distinct it_id from review_details where ex_id = '`+ex_id+`') 
        ;`;
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






// --------------------------定标页面--------------------------
// 获取专家需要定标的项目
router.get("/getOneExpertCalibrationingItems", (req, res) => {
    let ex_id = req.query.ex_id;
    const sql = `select * from calibration a join release_items b join item_state c 
        where a.it_id = b.it_id and a.it_id = c.it_id and  ex_id = '`+ex_id+`' and a.state = 0 and c.state<6
        ;`;
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
// 某个项目详情 
router.get("/getOneItemInfo", (req, res) => {
    let it_id = req.query.it_id;
    // const sql = `select a.* ,c.categoryid,c.categoryname, d.name as typename 
    // from release_items a join item_category c join research_direction d 
	// where a.cid = c.cid and a.type = d.re_id 
    // and a.it_id = '`+it_id+`';`;
    const sql = `
        select release_items.* ,item_category.categoryid,item_category.categoryname, 
        research_direction.name as typename,bidding.b_id, bidding.name as bidname, 
        bidding.address as bidaddress, bidding.phone as bidphone, 
        bidding_user.username, bidding_user.phone as userphone ,bidding_user.address as useraddress  
        from release_items   join item_category  join research_direction join bidding_user join bidding  
        where release_items.cid = item_category.cid and release_items.type = research_direction.re_id 
        and release_items.userid=bidding_user.userid and bidding_user.b_id = bidding.b_id    
        and release_items.it_id = '`+it_id+`';`;
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
// 获取某个专家某个项目申报信息
router.get("/getOneExpertOneBidInfo", (req, res) => {
    let ex_id = req.query.ex_id;
    let it_id = req.query.it_id;
    const sql = `select * from bid_items where it_id = '`+it_id+`' and  ex_id = '`+ex_id+`';`;
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
// 接受/拒绝项目
router.get("/updateCalibrationAccept", (req, res) => {
    let ex_id = req.query.ex_id;
    let it_id = req.query.it_id;
    let state = req.query.state || 1;

    const sql = `update calibration set state=? where ex_id = '`+ex_id+`' and it_id = '`+it_id+`';`;
    const arr = [state,ex_id, it_id];
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

// 获取专家已经定标的项目
router.get("/getOneExpertCalibrationingedItems", (req, res) => {
    let ex_id = req.query.ex_id;
    const sql = `select *,c.state as states from calibration a join release_items b join item_state c 
        where a.it_id = b.it_id and a.it_id = c.it_id and  ex_id = '`+ex_id+`' and a.state in (1,2)  and c.state < 7 
        ;`;
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




// --------------------------进度上传页面--------------------------
// 获取某个专家开标项目
router.get("/getOneExpertScheduleItems", (req, res) => {    
    let ex_id = req.query.ex_id;
    const sql = `select a.*,c.name from bidopening a join item_state b join release_items c 
    where a.it_id = b.it_id and a.it_id = c.it_id and a.ex_id = '`+ex_id+`' and b.state = 6 
        ;`;
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
// 获取某个专家某个项目进度上传情况
router.get("/getOneExpertSchedules", (req, res) => {    
    let ex_id = req.query.ex_id;
    let it_id = req.query.it_id;
    const sql = `select * from schedules where ex_id = '`+ex_id+`' and it_id = '`+it_id+`' order by time_schedule desc
        ;`;
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
// 进度上传
router.get("/addSchedules", (req, res) => {
    let it_id = req.query.it_id;
    let ex_id = req.query.ex_id;
    let title = req.query.title;
    let schedules = req.query.schedules;
    let other = req.query.other;
    let time_schedule = req.query.time_schedule

    const sql = "insert into schedules(it_id,ex_id,title,schedules,time_schedule,other) values(?,?,?,?,?,?)";
    const arr = [it_id, ex_id, title, schedules,time_schedule, other];
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
// 进度文件上传
router.get("/addSchedulesFiles", (req, res) => {
    let it_id = req.query.it_id;
    let ex_id = req.query.ex_id;
    let upurl = req.query.upurl;
    let uid = req.query.uid;
    let url = req.query.url;
    let name = req.query.name;
    let uploadtime = req.query.uploadtime;
    let size = req.query.size;

    const arr = [it_id, ex_id,upurl,uid,url,name,uploadtime,size];
    const sql = "insert into schedules_files values(?,?,?,?,?,?,?,?)";
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
// 获取进度文件
router.get("/getSchedulesFiles", (req, res) => {
    let ex_id = req.query.ex_id;
    let it_id = req.query.it_id;
    let uploadtime = req.query.uploadtime;
    const sql = `select * from schedules_files where it_id = '`+it_id+`' and ex_id = '`+ex_id+`' and uploadtime = '`+uploadtime+`';`;
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

// 获取催促
router.get("/getSchedulesUrge", (req, res) => {
    let ex_id = req.query.ex_id;
    let it_id = req.query.it_id;
    const sql = `select * from schedules_urge where it_id = '`+it_id+`' and ex_id = '`+ex_id+`' and state = 0;`;
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
// 催促接收
router.get("/updateSchedulesUrge", (req, res) => {
    let ex_id = req.query.ex_id;
    let it_id = req.query.it_id;
    let state = req.query.state || 1;

    const sql = `update schedules_urge set state=? where ex_id = '`+ex_id+`' and it_id = '`+it_id+`';`;
    const arr = [state,ex_id, it_id];
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
// 获取申请完成信息
router.get("/getApplyFinishItem", (req, res) => {
    let ex_id = req.query.ex_id;
    let it_id = req.query.it_id;
    const sql = `select * from apply_finish_item 
        where it_id = '`+it_id+`' and ex_id = '`+ex_id+`' 
        order by applytime desc;`;
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
// 申请完成项目
router.get("/addApplyFinishItem", (req, res) => {
    let it_id = req.query.it_id;
    let ex_id = req.query.ex_id;
    let applytime = req.query.applytime;
    let answertime = req.query.answertime || "";
    let state = req.query.state || 0;
    let reason = req.query.reason || "";

    const sql = "insert into apply_finish_item(it_id,ex_id,applytime,answertime,state,reason) values(?,?,?,?,?,?)";
    const arr = [it_id, ex_id, applytime, answertime,state, reason];
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
// 获取回执
router.get("/getReceipt", (req, res) => {
    let ex_id = req.query.ex_id;
    let it_id = req.query.it_id;
    const sql = `select * from apply_finish_item 
        where it_id = '`+it_id+`' and ex_id = '`+ex_id+`' and state = 2 
        order by answertime desc;`;
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





// -------------------------项目完成页面---------------------------
// 获取总条数
router.get("/getOneExpertFinishItemsCount", (req, res) => {    
    let ex_id = req.query.ex_id;
    let str = req.query.str || "";
    // let userid = req.query.userid;
    const sql = `select count(*) as count  
        from release_items a join research_direction b join item_state c join finish_item d 
        join bidding_user f join bidding g 
        where a.type = b.re_id and a.it_id = c.it_id and a.it_id = d.it_id
        and d.ex_id = '`+ex_id+`' and c.state = 7 
        and a.userid = f.userid and f.b_id = g.b_id 
        `+str+`
        order by d.finilly_time desc 
        ;`;
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
// 获取专家完成的项目
router.get("/getOneExpertFinishItems", (req, res) => {    
    let ex_id = req.query.ex_id;
    let pagesize = req.query.pagesize;
    let pagenum = req.query.pagenum;
    let str = req.query.str;
    let begin = (pagenum-1) * pagesize;
    const sql = `select a.*,b.name as re_name,d.finilly_time,e.budget,f.username,g.name as bname 
        from release_items a join research_direction b join item_state c join finish_item d join calibration e 
        join bidding_user f join bidding g 
        where a.type = b.re_id and a.it_id = c.it_id and a.it_id = d.it_id and a.it_id = e.it_id and e.ex_id = '`+ex_id+`' 
        and a.userid = f.userid and f.b_id = g.b_id 
        and d.ex_id = '`+ex_id+`' and c.state = 7 
        `+str+` 
        order by d.finilly_time desc 
        limit `+ begin +`,`+ pagesize+`
        ;`;
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
// 获取某个项目时间线
router.get("/getOneItemTimeLine", (req, res) => {    
    let it_id = req.query.it_id;
    let ex_id  = req.query.ex_id;
    const sql = `select a.it_id,a.name,a.userid,a.time_release,a.time_end,b.bid_time,b.ex_id,c.finishtime,c.detailfinishtime,
        d.time_examine,e.examinetime, f.time_calibration,g.time_open,h.finilly_time 
        from release_items a join bid_items b join finish_first_trial c join first_trial d join review_details e 
        join calibration f join bidopening g join finish_item h 
        where a.it_id = b.it_id and b.ex_id = '`+ex_id+`' and a.it_id = c.it_id and b.it_id = d.it_id and b.ex_id = d.ex_id
        and b.it_id = e.it_id and b.ex_id = e.ex_id and b.it_id = f.it_id and b.ex_id = f.ex_id 
        and b.it_id = g.it_id and b.ex_id = g.ex_id and b.it_id = h.it_id and b.ex_id = h.ex_id 
        and a.it_id = '`+it_id+`'
        ;`;
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
// 获取某个项目某个专家投标项目
router.get("/getOneExpertOneItem", (req, res) => {
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
// 获取某个项目某个专家初审详情
router.get("/getOneExpertOneItemFirstResult", (req, res) => {
    let ex_id = req.query.ex_id;
    let it_id = req.query.it_id;
    const sql = `select bid_items.*, release_items.name as itemname, release_items.time_release, first_trial.* 
    from bid_items join release_items join first_trial 
    where bid_items.it_id = release_items.it_id and bid_items.it_id = first_trial.it_id and bid_items.ex_id = first_trial.ex_id
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



// -------------------------个人中心页面---------------------------
// 获取某个专家信息
router.get("/getOneExpertInfo", (req, res) => {
    let ex_id = req.query.ex_id;
    const sql = `select * from expert_personal where ex_id = '` + ex_id + `';`;
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
//专家信息修改
router.get("/updateExpertInfo", (req, res) => {
    let ex_id = req.query.ex_id;
    let name = req.query.name;
    let honor = req.query.honor;
    let birthdate = req.query.birthdate;
    let research_specialty = req.query.research_specialty;
    let education = req.query.education;
    let degree = req.query.degree;
    let major = req.query.major;
    let phone = req.query.phone;
    let email = req.query.email;
    let address_province = req.query.address_province;
    let address_city = req.query.address_city;
    let address_county = req.query.address_county;
    let address_detail = req.query.address_detail;
    let company = req.query.company || "";
    let accept_invitation = req.query.accept_invitation;
    let accept_recommend = req.query.accept_recommend;
    let tags = req.query.tags || "";

    const sql = `update expert_personal set name=?,honor=?,birthdate=?,research_specialty=?,
        education=?,degree=?,major=?,phone=?,email=?,address_province=?,address_city=?,address_county=?,
        address_detail=?,company=?,accept_invitation=?,accept_recommend=?,tags=? 
        where ex_id = ?;`;
    const arr = [name,honor, birthdate,research_specialty,education,degree,major,phone,email,address_province,address_city,address_county,address_detail,company,accept_invitation,accept_recommend,tags,ex_id];
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
//专家密码修改
router.get("/updateExpertPassword", (req, res) => {
    let ex_id = req.query.ex_id;
    let password = req.query.password;

    const sql = `update expert_personal set password=? where ex_id = ?;`;
    const arr = [password,ex_id];
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
//账户注销
router.get("/updateExpertCancellation", (req, res) => {
    let ex_id = req.query.ex_id;
    let time = req.query.time;

    const sql = `update expert_personal set cancellation_time=? where ex_id = ?;`;
    const arr = [time,ex_id];
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






// ----------------------------------------------------------------社科端口------------------------------------------------------------
// ---------------------------发布统计------------------------------
// 获取某个社科信息
router.get("/getOneBiddingInfo", (req, res) => {
    let userid = req.query.userid;
    const sql = `select * from bidding where b_id = '` + userid + `';`;
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
// 获取某个社科下属成员项目发布情况
router.get("/getOneBiddingUsersBidItems", (req, res) => {
    let userid = req.query.userid;
    const sql = `
        select a.*,count(*) as count from bidding_user a join bidding b join release_items c 
        where a.b_id = b.b_id and b.b_id = '`+userid+`' and a.userid = c.userid 
        group by a.userid 
        union 
        select a.*,0 as count from bidding_user a join bidding b 
        where a.b_id = b.b_id and b.b_id = '`+userid+`' 
        and a.userid not in (
            select a.userid from bidding_user a join bidding b join release_items c 
            where a.b_id = b.b_id and b.b_id = '`+userid+`' and a.userid = c.userid 
            group by a.userid
        )
    ;`;
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
// 获取某个社科所有下属成员项目发布情况-分类
router.get("/getOneBiddingUsersBidCategoryItems", (req, res) => {
    let userid = req.query.userid;
    let str = req.query.str;
    let attribute = req.query.attribute;
    let groupby = req.query.groupby;
    const sql = `
        select a.*,count(*) as count`+attribute+` from bidding_user a join bidding b join release_items c 
        where a.b_id = b.b_id and b.b_id = '`+userid+`' and a.userid = c.userid `+str+` 
        group by a.userid`+groupby+` 
    ;`;
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
// 获取某个社科的所有下属人员
router.get("/getOneBiddingUsers", (req, res) => {
    let userid = req.query.userid;
    const sql = `select * from bidding_user where b_id = '` + userid + `';`;
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




// ---------------------------初审统计------------------------------
// 获取某个社科下属成员项目发布情况
router.get("/getOneBiddingUsersFirstItems", (req, res) => {
    let userid = req.query.userid;
    const sql = `
        select a.*,count(*) as count from bidding_user a join bidding b join first_trial c 
        where a.b_id = b.b_id and b.b_id = '`+userid+`' and a.userid = c.userid 
        group by a.userid 
        union 
        select a.*,0 as count from bidding_user a join bidding b 
        where a.b_id = b.b_id and b.b_id = '`+userid+`' 
        and a.userid not in (
            select a.userid from bidding_user a join bidding b join first_trial c 
            where a.b_id = b.b_id and b.b_id = '`+userid+`' and a.userid = c.userid 
            group by a.userid
        )
    ;`;
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
// 获取某个社科所有下属成员项目初审情况-分类
router.get("/getOneBiddingUsersFirstCategoryItems", (req, res) => {
    let userid = req.query.userid;
    let str = req.query.str;
    let attribute = req.query.attribute;
    let groupby = req.query.groupby;
    const sql = `
        select a.*,count(*) as count`+attribute+` from bidding_user a join bidding b join first_trial c 
        where a.b_id = b.b_id and b.b_id = '`+userid+`' and a.userid = c.userid `+str+` 
        group by a.userid`+groupby+` 
    ;`;
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




// ---------------------------细审统计------------------------------
// 获取某个社科下属成员项目发布情况
router.get("/getOneBiddingUsersDetailItems", (req, res) => {
    let userid = req.query.userid;
    const sql = `
        select a.*,count(*) as count from bidding_user a join bidding b join review_details c 
        where a.b_id = b.b_id and b.b_id = '`+userid+`' and a.userid = c.examineid 
        group by a.userid 
        union 
        select a.*,0 as count from bidding_user a join bidding b 
        where a.b_id = b.b_id and b.b_id = '`+userid+`' 
        and a.userid not in (
            select a.userid from bidding_user a join bidding b join review_details c 
            where a.b_id = b.b_id and b.b_id = '`+userid+`' and a.userid = c.examineid 
            group by a.userid
        )
    ;`;
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
// 获取某个社科所有下属成员项目初审情况-分类
router.get("/getOneBiddingUsersDetailCategoryItems", (req, res) => {
    let userid = req.query.userid;
    let str = req.query.str;
    let attribute = req.query.attribute;
    let groupby = req.query.groupby;
    const sql = `
        select a.*,count(*) as count`+attribute+` from bidding_user a join bidding b join review_details c 
        where a.b_id = b.b_id and b.b_id = '`+userid+`' and a.userid = c.examineid `+str+` 
        group by a.userid`+groupby+` 
    ;`;
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




// ---------------------------完成统计------------------------------
// 获取某个社科下属成员项目完成情况
router.get("/getOneBiddingUsersFinishItems", (req, res) => {
    let userid = req.query.userid;
    let str = req.query.str;
    const sql = `
        select a.*,count(*) as count from bidding_user a join bidding b join finish_item c 
        where a.b_id = b.b_id and b.b_id = '`+userid+`' and a.userid = c.userid  `+str+` 
        group by a.userid 
        union 
        select a.*,0 as count from bidding_user a join bidding b 
        where a.b_id = b.b_id and b.b_id = '`+userid+`' 
        and a.userid not in (
            select a.userid from bidding_user a join bidding b join finish_item c 
            where a.b_id = b.b_id and b.b_id = '`+userid+`' and a.userid = c.userid `+str+` 
            group by a.userid
        )
    ;`;
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
// 获取某个社科所有下属成员项目完成情况-分类
router.get("/getOneBiddingUsersFinishCategoryItems", (req, res) => {
    let userid = req.query.userid;
    let str = req.query.str;
    let attribute = req.query.attribute;
    let groupby = req.query.groupby;
    const sql = `
        select a.*,count(*) as count `+attribute+` from bidding_user a join bidding b join finish_item c 
        where a.b_id = b.b_id and b.b_id = '`+userid+`' and a.userid = c.userid `+str+` 
        group by a.userid`+groupby+` 
    ;`;
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


// ---------------------------下属管理------------------------------
// 获取某个社科新注册账号
router.get("/getOneBiddingUsersRegister", (req, res) => {
    let userid = req.query.userid;
    const sql = `
        select * from bidding_user_apply 
        where b_id = '`+userid+`' and result = 0  
    ;`;
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
//账户冻结
router.get("/updateSocialUserfrozen", (req, res) => {
    let userid = req.query.userid;
    let frozen = req.query.frozen;
    let frozen_reason = req.query.frozen_reason

    const sql = `update bidding_user set frozen=?,frozen_reason=? where userid = ?;`;
    const arr = [frozen,frozen_reason,userid];
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
//账户申请审核结果
router.get("/updateSocialUserApply", (req, res) => {
    let userid = req.query.userid;
    let result = req.query.result;
    let reason = req.query.reason

    const sql = `update bidding_user_apply set result=?,reason=? where userid = ?;`;
    const arr = [result,reason,userid];
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
// 审核通过添加到社科成员表
router.get("/addBiddingUsers", (req, res) => {
    let userid = req.query.userid;
    let username = req.query.username;
    let password = req.query.password;
    let address = req.query.address;
    let phone = req.query.phone;
    let b_id = req.query.b_id;
    let register_time = req.query.register_time || "";
    let cancellation_time = req.query.cancellation_time || "";
    let frozen = req.query.frozen || "";
    let frozen_reason = req.query.frozen_reason||"";

    const sql = "insert into bidding_user values(?,?,?,?,?,?,?,?,?,?)";
    const arr = [userid, username, password, address, phone, b_id,register_time,cancellation_time,frozen,frozen_reason];
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
// 获取某个社科新注册未通过账号
router.get("/getOneBiddingUsersRegisterEliminate", (req, res) => {
    let userid = req.query.userid;
    const sql = `
        select * from bidding_user_apply 
        where b_id = '`+userid+`' and result = 2  
    ;`;
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




// ---------------------------个人中心------------------------------
// 修改账号信息
router.get("/updateSocialInfo", (req, res) => {
    let name = req.query.name;
    let address = req.query.address;
    let phone = req.query.phone
    let representative = req.query.representative;
    let representative_phone = req.query.representative_phone;
    let representative_address = req.query.representative_address || ""
    let b_id = req.query.b_id

    const sql = `update bidding set name=?,address=?,phone=?,representative=?,representative_phone=?,representative_address=? where b_id = ?;`;
    const arr = [name,address,phone,representative,representative_phone,representative_address,b_id];
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
// 修改密码
router.get("/updateSocialPassword", (req, res) => {
    let password = req.query.password;
    let b_id = req.query.b_id

    const sql = `update bidding set password=? where b_id = ?;`;
    const arr = [password,b_id];
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
//账户注销
router.get("/updateSocialCancellation", (req, res) => {
    let b_id = req.query.b_id;
    let time = req.query.time;

    const sql = `update bidding set cancellation_time=? where b_id = ?;`;
    const arr = [time,b_id];
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







// ----------------------------------------------------------------管理员端口-------------------------------------------------------
// 获取某个管理员信息
router.get("/getOneAdminInfo", (req, res) => {
    let userid = req.query.userid;
    const sql = `select * from admins where id = '` + userid + `';`;
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
// -------------------------专家管理------------------------------------
// 获取专家密码
router.get("/getOneExpertPassword", (req, res) => {
    let ex_id = req.query.ex_id;
    const sql = `select password from expert_personal where ex_id = '` + ex_id + `';`;
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
//账户冻结
router.get("/updateExpertfrozen", (req, res) => {
    let ex_id = req.query.ex_id;
    let frozen = req.query.frozen;
    let frozen_reason = req.query.frozen_reason

    const sql = `update expert_personal set frozen=?,frozen_reason=? where ex_id = ?;`;
    const arr = [frozen,frozen_reason,ex_id];
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





// -------------------------社科管理------------------------------------
//社科密码修改
router.get("/updateSocialPassword", (req, res) => {
    let b_id = req.query.b_id;
    let password = req.query.password;

    const sql = `update bidding set password=? where b_id = ?;`;
    const arr = [password,b_id];
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
// 删除社科
router.get("/deleteSocail", (req, res) => {
    var b_id = req.query.b_id;
    const sql = "delete from bidding where b_id =?";
    const arr = [b_id];
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
// 添加社科
router.get("/addSocial", (req, res) => {
    let b_id = req.query.b_id;
    let name = req.query.name;
    let password = req.query.password;
    let address = req.query.address;
    let phone = req.query.phone
    let representative = req.query.representative;
    let representative_phone = req.query.representative_phone;
    let representative_address = req.query.representative_address || ""
    let register_time = req.query.register_time;
    let cancellation_time = req.cancellation_time || "";
    let frozen = req.frozen || "";
    let frozen_reason = req.frozen_reason || "";

    const sql = `insert into bidding(b_id,name,password,address,phone,representative,
            representative_phone,representative_address,register_time,cancellation_time,frozen,frozen_reason) 
            values(?,?,?,?,?,?,?,?,?,?,?,?);`;
    const arr = [b_id,name,password,address,phone,representative,representative_phone,representative_address,register_time,cancellation_time,frozen,frozen_reason];
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




// -------------------------社科账户管理---------------------------
// 某个社科账号获取
router.get("/getOneSocialUser", (req, res) => {
    let b_id = req.query.b_id;
    let sql="";
    if(b_id != "all"){
        sql = `select a.*,b.name as bname, b.phone as bphone from bidding_user a join bidding b 
        where a.b_id = b.b_id and a.b_id = '`+b_id+`';`;
    }else{
        sql = `select a.*,b.name as bname, b.phone as bphone from bidding_user a join bidding b 
        where a.b_id = b.b_id;`;
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
//社科账号密码修改
router.get("/updateSocialUserPassword", (req, res) => {
    let userid = req.query.userid;
    let password = req.query.password;

    const sql = `update bidding_user set password=? where userid = ?;`;
    const arr = [password,userid];
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



// -------------------------个人中心-------------------------------
//管理员信息修改
router.get("/updateAdminInfo", (req, res) => {
    let id = req.query.id;
    let name = req.query.name;
    let phone = req.query.phone;

    const sql = `update admins set name=?,phone=? where id = ?;`;
    const arr = [name,phone,id];
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
//管理员密码修改
router.get("/updateAdminPassword", (req, res) => {
    let id = req.query.id;
    let password = req.query.password;

    const sql = `update admins set password=? where id = ?;`;
    const arr = [password,id];
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
// //账户注销
// router.get("/updateExpertCancellation", (req, res) => {
//     let ex_id = req.query.ex_id;
//     let time = req.query.time;

//     const sql = `update expert_personal set cancellation_time=? where ex_id = ?;`;
//     const arr = [time,ex_id];
//     sqlFn(sql, arr, (result) => {
//         if (result.affecteRows > 0) {
//             res.send({
//                 status: 200,
//                 msg: "修改成功"
//             })
//         } else {
//             res.send({
//                 status: 500,
//                 msg: "修改失败"
//             })
//         }
//     })
// })







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