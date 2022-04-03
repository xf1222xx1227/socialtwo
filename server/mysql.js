// 连接数据库 1.安装MySQL  2.创建连接

const mysql=require('mysql')

// 创建数据库连接
const client=mysql.createConnection({
    host:'localhost', // 数据域名 地址
    user:'root', //数据名称
    password:'sql2008',  
    database: 'social',
    useConnectionPooling: true
    // port:'3306
})

// 封装数据库操作语句 sql语句 参数数组arr callback成功函数结果
function sqlFun(sql,arr,callback){
    client.query(sql,arr,function(error,result){
        if(error){
            console.log(error);
            return;
        }
        callback(result);
    })
}

module.exports=sqlFun