/**
 * 
 * 请求的方法
 */
import axios from 'axios'
import base from './base'
const api={
    // 登录页--------------------------------
    // 社科下属人员信息
    getbiduserList(params){
        return axios.get(base.biddingUserList,{
            params
        })
    },
    // 社科主体信息
    getbidList(params){
        return axios.get(base.biddingList,{
            params
        })
    },
    // 专家信息
    getExpertPersonal(params){
        return axios.get(base.getExpertPersonal,{
            params
        })
    },
    getAllBiddingItems(params){
        return axios.get(base.getAllBiddingItems,{
            params
        })
    },
    updateBiddindToPre(params){
        return axios.get(base.updateBiddindToPre,{
            params
        })
    },
    getFinishFirstTrial(params){
        return axios.get(base.getFinishFirstTrial,{
            params
        })
    },
    updateBiddindPreToDetail(params){
        return axios.get(base.updateBiddindPreToDetail,{
            params
        })
    },
    updateDetailToCalibration(params){
        return axios.get(base.updateDetailToCalibration,{
            params
        })
    },
    updateOpenToDinish(params){
        return axios.get(base.updateOpenToDinish,{
            params
        })
    },





    // 注册页----------------=--------------------------
    // 学历
    getEducation(params){
        return axios.get(base.getEducation,{
            params
        })
    },
    // 省
    getprovinceList(params){
        return axios.get(base.china_address_province,{
            params
        })
    },
    // 市
    getcityList(params){ //params={search:xxx}
        return axios.get(base.china_address_city,{
            params
        })
    },
    // 县
    getcountyList(params){
        return axios.get(base.china_address_county,{
            params
        })
    },
    // 所有地区 china_address
    getAddress(params){
        return axios.get(base.china_address,{
            params
        })
    },
    getAllExpertPersonalRegister(params){
        return axios.get(base.getAllExpertPersonalRegister,{
            params
        })
    },
    addExpertRegister(params){
        return axios.get(base.addExpertRegister,{
            params
        })
    },



    

    addBiddingUserApply(params){
        return axios.get(base.add_bidding_user_apply,{
            params
        })
    },
    biddingUserApply(params){
        return axios.get(base.bidding_user_apply,{
            params
        })
    },







    //--------------------项目新增page-------------------------
    getResearchDirection(params){             
        return axios.get(base.getResearchDirection,{
            params
        })
    },
    // 专家选择页面
    itemCategory(params){               // 项目分类
        return axios.get(base.itemCategory,{
            params
        })
    },
    itemCategoryname(params){               // 项目分类
        return axios.get(base.itemCategoryname,{
            params
        })
    },
    getDegree(params){               // 学位分类
        return axios.get(base.degree,{
            params
        })
    },
    getResearchSpecialty(params){               // 研究专长分类
        return axios.get(base.research_specialty,{
            params
        })
    },
    getHonor(params){               // 荣誉称号分类
        return axios.get(base.honor,{
            params
        })
    },
    getMajorOneTwo(params){               // 学科分类
        return axios.get(base.getMajorOneTwo,{
            params
        })
    },
    getOneMajorChildren(params){               // 学科分类
        return axios.get(base.getOneMajorChildren,{
            params
        })
    },
    getAllExpertPersonal(params){               // 全部专家
        return axios.get(base.getAllExpertPersonal,{
            params
        })
    },
    getAllExpertPersonalHave(params){               // 有项目的专家
        return axios.get(base.getAllExpertPersonalHave,{
            params
        })
    },
    getAllExpertPersonalNo(params){               // 无项目的专家
        return axios.get(base.getAllExpertPersonalNo,{
            params
        })
    },
    // 一二层专家
    getOneExpertPersonalHave(params){               // 有项目的专家
        return axios.get(base.getOneExpertPersonalHave,{
            params
        })
    },
    getOneExpertPersonalNo(params){               // 无项目的专家
        return axios.get(base.getOneExpertPersonalNo,{
            params
        })
    },

    getReleaseAllItems(params){               
        return axios.get(base.getReleaseAllItems,{
            params
        })
    },
    addReleaseItems(params){               
        return axios.get(base.addReleaseItems,{
            params
        })
    },
    addItemState(params){               
        return axios.get(base.addItemState,{
            params
        })
    },
    addReleaseItemsInvitation(params){               
        return axios.get(base.addReleaseItemsInvitation,{
            params
        })
    },
    addSuccessOrDefault(params){               
        return axios.get(base.addSuccessOrDefault,{
            params
        })
    },
    deleteSomeSuccess(params){               
        return axios.get(base.deleteSomeSuccess,{
            params
        })
    },
    addItemFiles(params){               
        return axios.get(base.addItemFiles,{
            params
        })
    },


    // 招标项目页面
    // -----------------------------------------------------------------
    getBiddingItems(params){               
        return axios.get(base.getBiddingItems,{
            params
        })
    },
    getBiddingFiles(params){               
        return axios.get(base.getBiddingFiles,{
            params
        })
    },
    updateReleaseItems(params){               
        return axios.get(base.updateReleaseItems,{
            params
        })
    },
    deleteItemFiles(params){               
        return axios.get(base.deleteItemFiles,{
            params
        })
    },
    deleteBidingReleaseItems(params){               
        return axios.get(base.deleteBidingReleaseItems,{
            params
        })
    },


    //--------------------投标初审page-------------------------
    getAllPreItems(params){               
        return axios.get(base.getAllPreItems,{
            params
        })
    },
    getOneBiddingItems(params){               
        return axios.get(base.getOneBiddingItems,{
            params
        })
    },
    addFirstTrial(params){               
        return axios.get(base.addFirstTrial,{
            params
        })
    },
    getAllFirstTrial(params){               
        return axios.get(base.getAllFirstTrial,{
            params
        })
    },

    // ---------------------------细审专家邀请页面------------------------------
   
    addFinishFirst(params){               
        return axios.get(base.addFinishFirst,{
            params
        })
    },
    updateFinishFirst(params){               
        return axios.get(base.updateFinishFirst,{
            params
        })
    },
    getOneItemFinishFirst(params){               
        return axios.get(base.getOneItemFinishFirst,{
            params
        })
    },
    addReviewDetailsInvitation(params){               
        return axios.get(base.addReviewDetailsInvitation,{
            params
        })
    },
    addReviewDetailsInvitationSuccess(params){               
        return axios.get(base.addReviewDetailsInvitationSuccess,{
            params
        })
    }, 
    getOneItemReviewDetailsInvitation(params){               
        return axios.get(base.getOneItemReviewDetailsInvitation,{
            params
        })
    },
    getOneItemReviewDetailsInvitationExpert(params){               
        return axios.get(base.getOneItemReviewDetailsInvitationExpert,{
            params
        })
    },
    deleteFinishFirst(params){               
        return axios.get(base.deleteFinishFirst,{
            params
        })
    },
    getOneItemBid(params){               
        return axios.get(base.getOneItemBid,{
            params
        })
    },

    // --------------------细审页面------------------------------
    // 获取项目细审人数
    getItemDetailcount(params){               
        return axios.get(base.getItemDetailcount,{
            params
        })
    },
    getBiddingItemsToDetail(params){               
        return axios.get(base.getBiddingItemsToDetail,{
            params
        })
    },
    getItemDetailedcount(params){               
        return axios.get(base.getItemDetailedcount,{
            params
        })
    },
    getOneItemNeedDetailExamine(params){               
        return axios.get(base.getOneItemNeedDetailExamine,{
            params
        })
    },
    getOneItemNeedDetailedExamine(params){               
        return axios.get(base.getOneItemNeedDetailedExamine,{
            params
        })
    },
    getOneItemBidDetail(params){               
        return axios.get(base.getOneItemBidDetail,{
            params
        })
    },
    getOneExpertDetail(params){               
        return axios.get(base.getOneExpertDetail,{
            params
        })
    },
    addDeatilExamineResult(params){               
        return axios.get(base.addDeatilExamineResult,{
            params
        })
    },
    getOneExpertOneItemDetailed(params){               
        return axios.get(base.getOneExpertOneItemDetailed,{
            params
        })
    },
    updateDeatilExamineResult(params){               
        return axios.get(base.updateDeatilExamineResult,{
            params
        })
    },


    // ----------------------------定标page------------------------------
    getCalibrationFirstItem(params){               
        return axios.get(base.getCalibrationFirstItem,{
            params
        })
    },
    getCalibrationExaminedItem(params){               
        return axios.get(base.getCalibrationExaminedItem,{
            params
        })
    },
    getCalibrationOneItemRank(params){               
        return axios.get(base.getCalibrationOneItemRank,{
            params
        })
    },
    getCalibrationOneItemInfo(params){               
        return axios.get(base.getCalibrationOneItemInfo,{
            params
        })
    },
    getOneItemCalibrationed(params){               
        return axios.get(base.getOneItemCalibrationed,{
            params
        })
    },
    addCalibration(params){               
        return axios.get(base.addCalibration,{
            params
        })
    },
    updateCalibration(params){               
        return axios.get(base.updateCalibration,{
            params
        })
    },
    getOneItemOneExpertCalibrationed(params){               
        return axios.get(base.getOneItemOneExpertCalibrationed,{
            params
        })
    },

    getCalibrationedItems(params){               
        return axios.get(base.getCalibrationedItems,{
            params
        })
    },
    deleteCalibration(params){               
        return axios.get(base.deleteCalibration,{
            params
        })
    },
    updateCalibrationToOpen(params){               
        return axios.get(base.updateCalibrationToOpen,{
            params
        })
    },
    addBidOpening(params){               
        return axios.get(base.addBidOpening,{
            params
        })
    },





    // -------------------------查看开标后查看进度页面---------------------------
    getOneSocialPersonScheduleItems(params){               
        return axios.get(base.getOneSocialPersonScheduleItems,{
            params
        })
    },
    addSchedulesUrge(params){               
        return axios.get(base.addSchedulesUrge,{
            params
        })
    },
    updateApplyFinishItemPass(params){               
        return axios.get(base.updateApplyFinishItemPass,{
            params
        })
    },
    updateApplyFinishItemNoPass(params){               
        return axios.get(base.updateApplyFinishItemNoPass,{
            params
        })
    },
    addFinishItem(params){               
        return axios.get(base.addFinishItem,{
            params
        })
    },













    // --------------------------------------------------------社科专家端口--------------------------------------------------------------
    // 项目投标页面-------------------------------
    // 获取社科
    getSocial(params){               
        return axios.get(base.getSocial,{
            params
        })
    },
    // 全部项目类别
    getAllItemCategory(params){               
        return axios.get(base.getAllItemCategory,{
            params
        })
    },
    // 全部项目
    getAllItems(params){               
        return axios.get(base.getAllItems,{
            params
        })
    },
    // 申报添加
    addBidItems(params){               
        return axios.get(base.addBidItems,{
            params
        })
    },
    // 申报文件
    addBidItemFiles(params){               
        return axios.get(base.addBidItemFiles,{
            params
        })
    },
    // 检测是否添加成功
    successAddBidItemAndFiles(params){               
        return axios.get(base.successAddBidItemAndFiles,{
            params
        })
    },
    // 失败就删除添加成功的一部分
    deleteBidItemAndFiles(params){               
        return axios.get(base.deleteBidItemAndFiles,{
            params
        })
    },
    getOneExpertReviewDetailsItem(params){               
        return axios.get(base.getOneExpertReviewDetailsItem,{
            params
        })
    },


    // 投标详情页面-------------------------------
    // 获取项目
    getBidItems(params){               
        return axios.get(base.getBidItems,{
            params
        })
    },
    getOneItem(params){               
        return axios.get(base.getOneItem,{
            params
        })
    },
    getBidFiles(params){               
        return axios.get(base.getBidFiles,{
            params
        })
    },
    deleteDeclareItem(params){               
        return axios.get(base.deleteDeclareItem,{
            params
        })
    },
    deleteDeclareFiles(params){               
        return axios.get(base.deleteDeclareFiles,{
            params
        })
    },
    deleteDeclareOneFile(params){               
        return axios.get(base.deleteDeclareOneFile,{
            params
        })
    },
    updateBidItem(params){               
        return axios.get(base.updateBidItem,{
            params
        })
    },



    // -------------------------------细审参与界面-----------------
    getInvitationExpertItems(params){               
        return axios.get(base.getInvitationExpertItems,{
            params
        })
    },
    updateReviewDetailsInvitationState(params){               
        return axios.get(base.updateReviewDetailsInvitationState,{
            params
        })
    },
    getOneExpertDetailItems(params){               
        return axios.get(base.getOneExpertDetailItems,{
            params
        })
    },
    getOneExpertItemDetailcount(params){               
        return axios.get(base.getOneExpertItemDetailcount,{
            params
        })
    },
    getOneExpertItemDetailedcount(params){               
        return axios.get(base.getOneExpertItemDetailedcount,{
            params
        })
    },
    // 表格数据
    getOneExpertOneItemNeedDetailExamine(params){               
        return axios.get(base.getOneExpertOneItemNeedDetailExamine,{
            params
        })
    },
    getOneExpertOneItemNeedDetailedExamine(params){               
        return axios.get(base.getOneExpertOneItemNeedDetailedExamine,{
            params
        })
    },





    
    // --------------------------初审结果查询页面--------------
    // 获取投标项目
    getBidItemsFirstTrialResult(params){               
        return axios.get(base.getBidItemsFirstTrialResult,{
            params
        })
    },





    // --------------------------细审结果查询页面--------------------------
    getOneExpertDetailExaminedItems(params){               
        return axios.get(base.getOneExpertDetailExaminedItems,{
            params
        })
    },





    // --------------------------定标页面--------------------------
    getOneExpertCalibrationingItems(params){               
        return axios.get(base.getOneExpertCalibrationingItems,{
            params
        })
    },
    getOneItemInfo(params){               
        return axios.get(base.getOneItemInfo,{
            params
        })
    },
    getOneExpertOneBidInfo(params){               
        return axios.get(base.getOneExpertOneBidInfo,{
            params
        })
    },
    updateCalibrationAccept(params){               
        return axios.get(base.updateCalibrationAccept,{
            params
        })
    },

    getOneExpertCalibrationingedItems(params){               
        return axios.get(base.getOneExpertCalibrationingedItems,{
            params
        })
    },






    // --------------------------进度上传页面--------------------------
    getOneExpertScheduleItems(params){
        return axios.get(base.getOneExpertScheduleItems,{
            params
        })
    },
    getOneExpertSchedules(params){
        return axios.get(base.getOneExpertSchedules,{
            params
        })
    },
    addSchedules(params){
        return axios.get(base.addSchedules,{
            params
        })
    },
    addSchedulesFiles(params){
        return axios.get(base.addSchedulesFiles,{
            params
        })
    },
    getSchedulesFiles(params){
        return axios.get(base.getSchedulesFiles,{
            params
        })
    },
    getSchedulesUrge(params){
        return axios.get(base.getSchedulesUrge,{
            params
        })
    },
    updateSchedulesUrge(params){
        return axios.get(base.updateSchedulesUrge,{
            params
        })
    },
    getApplyFinishItem(params){
        return axios.get(base.getApplyFinishItem,{
            params
        })
    },
    addApplyFinishItem(params){
        return axios.get(base.addApplyFinishItem,{
            params
        })
    },

    getReceipt(params){
        return axios.get(base.getReceipt,{
            params
        })
    },










    // --------------------------测试--------------------------
    addTest(params){
        return axios.get(base.addtest,{
            params
        })
    },
    deleteTest(params){
        return axios.get(base.deletetest,{
            params
        })
    },
    updateTest(params){
        return axios.get(base.updatetest,{
            params
        })
    },





    //--------------------------------------------
    // 图片保存测试
    // upload(params){               // 项目分类
    //     return axios.get(base.upload,{
    //         params
    //     })
    // },

}

export default api