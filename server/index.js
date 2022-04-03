// 搭建expree服务
const express = require("express")
const app= express()
// 请求表单数据
app.use(express.urlencoded({extended:true}))


// 资源共享
// const cors = require('cors')
// app.use(cors());


// 静态文件托管，为了后续访问上传到服务器的文件（localhost:8080/图片.jpg (等等)
app.use(express.static('upload'))






//路由
const router = require('./router')

//设置跨域访问
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})



app.use('/api',router)


app.listen(8989,()=>{
    console.log(8989);
})