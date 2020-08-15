let proxyObj = {}
proxyObj['/']={
    ws:false, //websocket
    target:'http://localhost:8090',
    changeOrigin: true,
    pathRewrite:{
        '^/':''
    }
}
module.exports={
    devServer:{
        host:'localhost',
        port:8081,
        proxy:proxyObj
    }
}