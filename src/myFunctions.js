const myFunctions={
  // 获取课题研究类型
  gettopicresearchtype(){
    let data=[
      {id:1,name:"应用性研究课题"},
      {id:2,name:"经验研究性课题"},
      {id:3,name:"实验性课题"}
    ];
    return data;
  },
  // 获取课题申报类型
  gettopicdeclaretype(){
    let data=[
      {id:1,name:"基础理论类"},
      {id:2,name:"应用理论类"}
      // {id:3,name:"实验性课题"}
    ];
    return data;
  },
  gettopicgone(){
    let data=[
      {id:1,name:"公开出版"},
      {id:2,name:"公开发表"},
      {id:3,name:"提交相关部门"}
    ];
    return data;
  },
  getNewDeclareId(data){
    let len = data.length;
    let result="";
    if(len<15){
      result = data+"0001";
    }else{
      let left = data.substring(0,13);
      let right = data.substring(13,17);
      // console.log(111,left,right);
      right = parseInt(right);
      right +=1;
      right = right+"";
      for(let i=right.length;i<4;i++){
        right = "0" +right;
      }
      result = left + right;
    }
    return result;
},









    // new Date()转换为年月日
    newDateToDate(date) {
        if(date){
          date=new Date(date);
        }else{
          var date = new Date();
        }
        
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if(month<10){
            month="0"+month;
        }
        if(day<10){
            day="0"+day;
        }
        return year + "-" + month + "-" + day;
    },
    // new Date()转换为年月日时分秒
    newDateToDatetime(date) {
        if(date){
          date=new Date(date);
        }else{
          var date = new Date();
        }
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minutes = date.getMinutes();   
        let seconds = date.getSeconds();
        if(month<10){
            month="0"+month;
        }
        if(day<10){
            day="0"+day;
        }
        if(hour<10){
            hour="0"+hour;
        }
        if(minutes<10){
            minutes="0"+minutes;
        }
        if(seconds<10){
            seconds="0"+seconds;
        }
        return year + "-" + month + "-" + day+" "+hour+":"+minutes+":"+seconds;
    },
    dateAddAndReduce(date,type,num){
        num = parseInt(num)
        date=new Date(date);
        if(type == "year"){
            date.setFullYear(date.getFullYear()+num);
        }else if(type == "month"){
            date.setMonth(date.getMonth()+num);
        }else if(type = "day"){
            date.setDate(date.getDate()+num);
        }
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minutes = date.getMinutes();   
        let seconds = date.getSeconds();
        // let data = {"year":year,"month":month,"day":day,"hour":hour,"minutes":minutes,"seconds":seconds};
        // return data;
        return date;
    },
    twoDateReduce(date1,date2){
      date1 = new  Date(date1);
      date2 = new Date(date2);
      let days;
      let day;
      if(date1>date2){
        days = date1.getTime()-date2.getTime();
        day = parseInt(days/(1000*60*60*24));
      }else{
        days = date2.getTime()-date1.getTime();
        day = Math.ceil(days/(1000*60*60*24));
        day = day*-1;
      } 
      return day;
    },
    getNewId(data) {
        let len = data.length;
        let result="";
        let dataint = data.replace(/[^0-9]/gi, ""); // 移除非数字
        dataint = parseInt(dataint)+1;
        dataint += "";
        result += data[0];
        let len0 = len - dataint.length - 1;
        if(len0>0){
            for(let i=0;i<len0;i++){
                result += "0";
            }
        }
        result += dataint;
        return result;
    },
    getNewItemId(data){
        let len = data.length;
        let result="";
        let dataint = data[len-3]+data[len-2]+data[len-1];
        // let dataint = data.replace(/[^0-9]/gi, ""); // 移除非数字
        dataint = parseInt(dataint)+1;
        dataint += "";
        result += data[0];
        result += data[1];
        let datadate="";
        let date=new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if(month<10){
            month="0"+month;
        }
        if(day<10){
            day="0"+day;
        }
        datadate += year+month+day;
        let olddate=data.substring(2,10);
        if(datadate==olddate){
            while(dataint.length<3){
                dataint = "0"+dataint;
            }
        }
        else{
            dataint="001";
        }
        result += datadate;
        result += dataint;
        return result;
    },
    chooseHave(data1,data2){
        if( data1== null|| data1==""){
            return data2;
        }
        return data1;
    },
    // 判断数组或者对象是否为空 非空返回false
    isEmpty(obj) {
        // 检验 undefined 和 null
        if(!obj && obj !== 0 && obj !== '') {
            return true;
        }
        if(Array.prototype.isPrototypeOf(obj) && obj.length === 0) { 
            return true;
        }
        if(Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0) {
            return true;
        }
        return false;
    },
    // 判读一个数据是否在数组对象中出现
    dataInJson(data,list,json){
        for(let i=0;i<json.length;i++){
            if(data == json[i][list]){
                return 1;
            }
        }
        return 0;
    },
     // 判读一个数据是否在数组对象中出现
     dataInObj(data,list,obj){
        for(let i=0;i<obj.length;i++){
            if(data == obj[i][list]){
                return true;
            }
        }
        return false;
    },
    sortData(obj,column,type){
      if(!type || type!="ascending"){
        type = "descending";
      }
      let compare = function(obj1,obj2){
        let data1 = obj1[column];
        let data2 = obj2[column];
        if(data1<data2){
          if(type == "descending") return 1;
          else return -1;
        }else if(data1>data2){
          if(type == "descending") return -1;
          else return 1;
        }else{
          return 0;
        }
      }
      obj = obj.sort(compare);
      return obj
    },
    // 计算分数
    calculationPoint(data){
      for (let i = 0; i < data.length; i++) {
        data[i].rate =
          data[i].rate_economics +
          data[i].rate_technology +
          data[i].rate_comprehensive;
        //   保留原来比例
        data[i].rate_economics1 = data[i].rate_economics;
        data[i].rate_technology1 = data[i].rate_technology;
        data[i].rate_comprehensive1 = data[i].rate_comprehensive;
        // 计算新比例
        data[i].rate_economics =
          data[i].rate_economics / parseInt(data[i].rate).toFixed(2);
        data[i].rate_technology =
          data[i].rate_technology / parseInt(data[i].rate).toFixed(2);
        data[i].rate_comprehensive =
          data[i].rate_comprehensive /
          parseInt(data[i].rate).toFixed(2);
        // 计算平均分
        data[i].average_score_technology = (
          parseInt(data[i].total_score_technology) /
          parseInt(data[i].count)
        ).toFixed(2);
        data[i].average_score_economics = (
          parseInt(data[i].total_score_economics) /
          parseInt(data[i].count)
        ).toFixed(2);
        data[i].average_score_comprehensive = (
          parseInt(data[i].total_score_comprehensive) /
          parseInt(data[i].count)
        ).toFixed(2);
        data[i].average_total2 = (
          parseInt(
            data[i].rate_economics * data[i].average_score_economics
          ) +
          parseInt(
            data[i].rate_technology * data[i].average_score_technology
          ) +
          parseInt(
            data[i].rate_comprehensive *
              data[i].average_score_comprehensive
          )
        ).toFixed(2);
        // 计算整数得分
        // data[i].average_total = Math.round(data[i].average_total2);
        data[i].average_total = data[i].average_total2;
      }
      return data;
    },











    bidToFirst(){
        let date = myFunctions.newDateToDatetime(new Date());
        this.$api.getAllBiddingItems({}).then((res) => {
            if (res.status == 200) {
              if (res.data.status == 200) {
                let data = res.data.result;
                for (let i = 0; i < data.length; i++) {
                  if (data[i].time_end < date) {
                    this.$api
                      .updateBiddindToPre({
                        it_id: data[i].it_id,
                      })
                      .then((res) => {
                        if (res.status == 200) {
                          if (res.data.status == 200) {
                          }
                        }
                      });
                  }
                }
              }
            }
        });
    },
    firstToDetail(){
        let date = myFunctions.newDateToDatetime(new Date());
        this.$api.getFinishFirstTrial({}).then((res) => {
            if (res.status == 200) {
              if (res.data.status == 200) {
                let data = res.data.result;
                for (let i = 0; i < data.length; i++) {
                  if (data[i].finishtime < date) {
                    this.$api
                      .updateBiddindPreToDetail({
                        it_id: data[i].it_id,
                      })
                      .then((res) => {
                        if (res.status == 200) {
                          if (res.data.status == 200) {
                          }
                        }
                      });
                  }
                }
              }
            }
        });
    },
    detailToCalibration(){
        let date = myFunctions.newDateToDatetime(new Date());
        this.$api.getFinishFirstTrial({}).then((res) => {
            if (res.status == 200) {
              if (res.data.status == 200) {
                let data = res.data.result;
                for (let i = 0; i < data.length; i++) {
                  if (data[i].detailfinishtime=="" && data[i].detailfinishtime < date) {
                    this.$api
                      .updateDetailToCalibration({
                        it_id: data[i].it_id,
                      })
                      .then((res) => {
                        if (res.status == 200) {
                          if (res.data.status == 200) {
                          }
                        }
                      });
                  }
                }
              }
            }
        });
    },
    gethello(){
      let date = new Date();
      let hour = date.getHours();
      if(hour>=0 && hour<6){
        return "夜深了，该休息了!"
      }
      else if(hour>=6 && hour <10){
        return "早上好！"
      }else if(hour>=10 && hour< 14){
        return "中午好！"
      }
      else if(hour>=14 && hour< 19){
        return "下午好！"
      }else{
        return "晚上好！"
      }
    },
    randomcolor(){
      let red = parseInt(Math.random()*255);
      let green = parseInt(Math.random()*255);
      let blue = parseInt(Math.random()*255);
      let color = "rgb("+red+","+green+","+blue+")";
      return color;
    },

    getNextDate(date){
      date = new Date(date);

      let now = new Date();
      let day = now.getDate();
      let daywx =date.getDate();
      
      if(day > daywx){
        now.setMonth(now.getMonth()+1);
      }
      let year = now.getFullYear();
      let month = now.getMonth()+1;
      let maxday = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();  // 获取当月最后一天

      let datenext ;    // 返回值
      datenext = year + " " + month +" ";
      if(daywx > maxday){
        datenext += maxday;
      }else{
        if(daywx<10){
          daywx = "0" + daywx;
        } 
        datenext += daywx;
      }
      return datenext;
    },
    getLastDay(date){
      date = new Date(date);
      let day = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      return day;
    },

    deepClone(obj, newObj) {
      var newObj = newObj || {};
      for (let key in obj) {
          if (typeof obj[key] == 'object') {
              newObj[key] = (obj[key].constructor === Array) ? [] : {}
              deepClone(obj[key], newObj[key]);
          } else {
              newObj[key] = obj[key]
          }
      }
      return newObj;
    },
    // 文件大小转换
    filterfilesize(size) {
      let sizes = "";
      if (size >= 1000000) {
        sizes = (size / 1000000).toFixed(2) + "MB";
      } else if (size >= 1000) {
        sizes = (size / 1000).toFixed(0) + "KB";
      } else {
        sizes = size / 1000 + "kb";
      }
      return sizes;
    },
    

   
}

export default myFunctions;