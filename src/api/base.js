/**
 * 接口路径配置
 * 一般文件目录：base.js  index.js
 * 但是公司不一定
 *  config
 *      login index.js  config.js
 */
const base={
    host:'http://localhost:8989',      // 基础域名
    // 登录页------------------------------------------------
    biddingUserList: 'api/api/bidding_user',  // 社科下属账户
    biddingList: 'api/api/bidding_subject',    // 社科主体账户
    getExpertPersonal: 'api/api/getExpertPersonal',    // 专家账户
    geAdmins: 'api/api/geAdmins',    // 
    getAllBiddingItems: 'api/api/getAllBiddingItems',    // 
    getFinishFirstTrial: 'api/api/getFinishFirstTrial',    // 
    updateBiddindToPre: 'api/api/updateBiddindToPre',
    updateBiddindPreToDetail: 'api/api/updateBiddindPreToDetail',
    updateDetailToCalibration: 'api/api/updateDetailToCalibration',
    updateOpenToDinish: 'api/api/updateOpenToDinish',

    // 注册页---------------------------------------
    getEducation: 'api/api/getEducation',
    china_address_province: 'api/api/china_address_province',
    china_address_city: 'api/api/china_address_city',
    china_address_county: 'api/api/china_address_county',
    china_address: 'api/api/china_address',

    getAllExpertPersonalRegister: 'api/api/getAllExpertPersonalRegister',    // 专家账户
    addExpertRegister: 'api/api/addExpertRegister',    // 专家账户


    addtest:'api/api/add',     // 添加测试
    deletetest:'api/api/delete',     // 删除测试
    updatetest:'api/api/update',     // 修改测试
    // bidding_user_apply
    add_bidding_user_apply:'api/api/add_bidding_user_apply',
    bidding_user_apply: 'api/api/bidding_user_apply',


    // -----------------------------------------------------------社科下属端-------------------------------------------------------
    getOneBiddingUserInfo: 'api/api/getOneBiddingUserInfo',
    //---------------------------------------------
    // 项目新增page
    itemCategory: 'api/api/itemCategory',           // 项目分类
    getResearchDirection:'api/api/getResearchDirection',    // 项目类别-研究方向
    getReleaseAllItems:'api/api/getReleaseAllItems', 
    addReleaseItems:'api/api/addReleaseItems', 
    addItemState:'api/api/addItemState', 
    addReleaseItemsInvitation:'api/api/addReleaseItemsInvitation', 
    addItemFiles:'api/api/addItemFiles', 
    addSuccessOrDefault:'api/api/addSuccessOrDefault',      // 判断是否添加成功
    deleteSomeSuccess:'api/api/deleteSomeSuccess',      // 失败后删除成功的部分
    // 选择专家
    itemCategoryname: 'api/api/itemCategoryname',           // 项目类别名称
    getDegree:'api/api/getDegree',            // 学位类别
    research_specialty:'api/api/research_specialty',            // 研究专长类别
    honor:'api/api/honor',          // 荣誉称号 honor
    getMajorOneTwo:'api/api/getMajorOneTwo',          // 学科 
    getOneMajorChildren:'api/api/getOneMajorChildren',
    getAllExpertPersonal:'api/api/getAllExpertPersonal',             // 全部专家
    getAllExpertPersonalHave:'api/api/getAllExpertPersonalHave',             // 有项目的专家
    getAllExpertPersonalNo:'api/api/getAllExpertPersonalNo',             // 无项目的专家
    getOneExpertPersonalHave:'api/api/getOneExpertPersonalHave',             // 有项目的专家（一层）
    getOneExpertPersonalNo:'api/api/getOneExpertPersonalNo',             // 无项目的专家（一层）


    // -----------------------------------------------------------
    // 招标项目页面
    getBiddingItems:'api/api/getBiddingItems',            // 获取项目
    getBiddingFiles:'api/api/getBiddingFiles',            // 获取文件
    updateReleaseItems:'api/api/updateReleaseItems',        // 项目修改
    deleteItemFiles:'api/api/deleteItemFiles',        // 删除文件
    deleteBidingReleaseItems:'api/api/deleteBidingReleaseItems',        // 撤销项目

    // ----------------------------------------------------------
    // 项目初审页面
    getAllPreItems:'api/api/getAllPreItems',
    getOneBiddingItems:'api/api/getOneBiddingItems', 
    addFirstTrial:'api/api/addFirstTrial',
    getAllFirstTrial:'api/api/getAllFirstTrial',

    // ---------------------------细审专家邀请页面-----------------------
    addFinishFirst:'api/api/addFinishFirst',
    updateFinishFirst:'api/api/updateFinishFirst',
    getOneItemFinishFirst:'api/api/getOneItemFinishFirst',
    addReviewDetailsInvitation:'api/api/addReviewDetailsInvitation',
    addReviewDetailsInvitationSuccess:'api/api/addReviewDetailsInvitationSuccess',
    getOneItemReviewDetailsInvitation:'api/api/getOneItemReviewDetailsInvitation',
    getOneItemReviewDetailsInvitationExpert:'api/api/getOneItemReviewDetailsInvitationExpert',
    deleteFinishFirst:'api/api/deleteFinishFirst',
    getOneItemBid:'api/api/getOneItemBid',


    // --------------------细审页面------------------------------
    getItemDetailcount:'api/api/getItemDetailcount',        // 获取项目细审人数
    getBiddingItemsToDetail:'api/api/getBiddingItemsToDetail',
    getItemDetailedcount:'api/api/getItemDetailedcount',
    getOneItemNeedDetailExamine:'api/api/getOneItemNeedDetailExamine',
    getOneItemNeedDetailedExamine:'api/api/getOneItemNeedDetailedExamine',
    getOneItemBidDetail:'api/api/getOneItemBidDetail',
    getOneExpertDetail:'api/api/getOneExpertDetail',
    addDeatilExamineResult:'api/api/addDeatilExamineResult',
    getOneExpertOneItemDetailed:'api/api/getOneExpertOneItemDetailed',
    updateDeatilExamineResult:'api/api/updateDeatilExamineResult',


    // ----------------------------定标page------------------------------
    getCalibrationFirstItem:'api/api/getCalibrationFirstItem',
    getCalibrationExaminedItem:'api/api/getCalibrationExaminedItem',
    getCalibrationOneItemRank:'api/api/getCalibrationOneItemRank',
    getCalibrationOneItemInfo:'api/api/getCalibrationOneItemInfo',
    getOneItemCalibrationed:'api/api/getOneItemCalibrationed',
    addCalibration:'api/api/addCalibration',
    updateCalibration:'api/api/updateCalibration',
    getOneItemOneExpertCalibrationed:'api/api/getOneItemOneExpertCalibrationed',

    getCalibrationedItems:'api/api/getCalibrationedItems',
    deleteCalibration:'api/api/deleteCalibration',
    updateCalibrationToOpen:'api/api/updateCalibrationToOpen',
    addBidOpening:'api/api/addBidOpening',




    // -------------------------查看开标后查看进度页面---------------------------
    getOneSocialPersonScheduleItems:'api/api/getOneSocialPersonScheduleItems',
    addSchedulesUrge:'api/api/addSchedulesUrge',
    updateApplyFinishItemPass:'api/api/updateApplyFinishItemPass',
    updateApplyFinishItemNoPass:'api/api/updateApplyFinishItemNoPass',
    addFinishItem:'api/api/addFinishItem',




    // -------------------------项目完成页面---------------------------
    getOneSocialUserFinishItemsCount:'api/api/getOneSocialUserFinishItemsCount', 
    getOneSocialUserFinishItems:'api/api/getOneSocialUserFinishItems',
    getOneSocialUserOneItemTimeLine:'api/api/getOneSocialUserOneItemTimeLine',
    getOneItemFirstTrial:'api/api/getOneItemFirstTrial',
    getOneItemReviewDetails:'api/api/getOneItemReviewDetails',






    // --------------------------------------------------------社科专家端口--------------------------------------------------------------
    // 项目投标页面
    getSocial:'api/api/getSocial',            // 获取社科联
    getAllItemCategory:'api/api/getAllItemCategory',            // 全部项目类别
    getAllItems:'api/api/getAllItems',            // 全部项目
    addBidItems:'api/api/addBidItems',            // 申报
    addBidItemFiles:'api/api/addBidItemFiles',            // 申报文件
    successAddBidItemAndFiles:'api/api/successAddBidItemAndFiles',            // 检测是否添加成功
    deleteBidItemAndFiles:'api/api/deleteBidItemAndFiles',            // 失败就删除添加成功的一部分
    getOneExpertReviewDetailsItem:'api/api/getOneExpertReviewDetailsItem',            
    // 投标项目详情页面
    getBidItems:'api/api/getBidItems',            // 获取已经投标项目
    getOneItem:'api/api/getOneItem', 
    getBidFiles:'api/api/getBidFiles', 
    deleteDeclareItem:'api/api/deleteDeclareItem', 
    deleteDeclareFiles:'api/api/deleteDeclareFiles', 
    deleteDeclareOneFile:'api/api/deleteDeclareOneFile', 
    updateBidItem:'api/api/updateBidItem', 




    // -------------------------------细审参与界面-----------------
    getInvitationExpertItems:'api/api/getInvitationExpertItems', 
    updateReviewDetailsInvitationState:'api/api/updateReviewDetailsInvitationState', 
    getOneExpertDetailItems:'api/api/getOneExpertDetailItems',
    getOneExpertItemDetailcount:'api/api/getOneExpertItemDetailcount', 
    getOneExpertItemDetailedcount:'api/api/getOneExpertItemDetailedcount', 
    // 表格数据
    getOneExpertOneItemNeedDetailExamine:'api/api/getOneExpertOneItemNeedDetailExamine', 
    getOneExpertOneItemNeedDetailedExamine:'api/api/getOneExpertOneItemNeedDetailedExamine', 




    // --------------------------初审结果查询页面--------------
    // 获取投标项目
    getBidItemsFirstTrialResult:'api/api/getBidItemsFirstTrialResult', 





    // --------------------------细审结果查询页面--------------------------
    getOneExpertDetailExaminedItems:'api/api/getOneExpertDetailExaminedItems', 






    // --------------------------定标页面--------------------------
    getOneExpertCalibrationingItems:'api/api/getOneExpertCalibrationingItems', 
    getOneItemInfo:'api/api/getOneItemInfo', 
    getOneExpertOneBidInfo:'api/api/getOneExpertOneBidInfo', 
    updateCalibrationAccept:'api/api/updateCalibrationAccept', 

    getOneExpertCalibrationingedItems:'api/api/getOneExpertCalibrationingedItems', 






    // --------------------------进度上传页面--------------------------
    getOneExpertScheduleItems:'api/api/getOneExpertScheduleItems', 
    getOneExpertSchedules:'api/api/getOneExpertSchedules', 
    addSchedules:'api/api/addSchedules', 
    addSchedulesFiles:'api/api/addSchedulesFiles', 
    getSchedulesFiles:'api/api/getSchedulesFiles',
    getSchedulesUrge:'api/api/getSchedulesUrge', 
    updateSchedulesUrge:'api/api/updateSchedulesUrge', 
    getApplyFinishItem:'api/api/getApplyFinishItem', 
    addApplyFinishItem:'api/api/addApplyFinishItem', 

    getReceipt:'api/api/getReceipt', 






    // -------------------------项目完成页面---------------------------
    getOneExpertFinishItemsCount:'api/api/getOneExpertFinishItemsCount', 
    getOneExpertFinishItems:'api/api/getOneExpertFinishItems', 
    getOneItemTimeLine:'api/api/getOneItemTimeLine',
    getOneExpertOneItem:'api/api/getOneExpertOneItem',
    getOneExpertOneItemFirstResult:'api/api/getOneExpertOneItemFirstResult',





    // -------------------------个人中心页面---------------------------
    getOneExpertInfo:'api/api/getOneExpertInfo',
    updateExpertInfo:'api/api/updateExpertInfo',
    updateExpertPassword:'api/api/updateExpertPassword',
    updateExpertCancellation:'api/api/updateExpertCancellation',





    // ------------------------------------------------------------社科端口------------------------------------------------------------
    getOneBiddingInfo:'api/api/getOneBiddingInfo',







    


    // ----------------------------------------------------------------管理员端口----------------------------------------------------
    getOneAdminInfo:'api/api/getOneAdminInfo',
    // -------------------------专家管理------------------------------------
    getOneExpertPassword:'api/api/getOneExpertPassword',
    updateExpertfrozen:'api/api/updateExpertfrozen',


    // -------------------------社科管理------------------------------------
    updateSocialPassword:'api/api/updateSocialPassword',



    // -------------------------社科账户管理------------------------------------
    getOneSocialUser:'api/api/getOneSocialUser',
    updateSocialUserPassword:'api/api/updateSocialUserPassword',








    //--------------------------------------------
    // 文件保存接口
    upload: 'api/api/upload',
}

export default base;