const myFunctions={
    // new Date()转换为年月日
    newDateToDate(date) {
        date=new Date(date);
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
        date=new Date(date);
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
    
}

export default myFunctions;