var net = require('net');
var port = 8888;
var host = '127.0.0.1';
var pkey = '1234';

var http = require('http');
var querystring = require('querystring');
var util = require('util');
var postHTML = 
  '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title><script src="https://cdn.jsdelivr.net/npm/jquery@1.12.4/dist/jquery.min.js"></script></head>' +
  '<body>' +
  '网站 URL： <button name="url">ab</button><br>' +
  '<script>$(document).ready(function(){$.ajax({url:"http://localhost:3007/",type: "POST",data: {attr: "applicant", dat: "2017,22121323"},success:function(result){console.log(result)}});});</script>' +
  '<script>$(document).ready(function(){$("button").click(function(){$.ajax({url:"http://localhost:3007/",type: "POST",data: {attr: "applicant", dat: "20172122,123223322222"},success:function(result){console.log(result)}});});});</script>'  +
  '</body></html>';


function server(attr,dat) {
  var client= new net.Socket();
  //创建socket客户端
  client.setEncoding('binary');
  //连接到服务端
  client.connect(port,host,function(){
    client.write(attr + ',' + dat + '\n');
    //向端口写入数据到达服务端
  });
  
  client.on('connect',function(){
    console.log('连接成功: ' + client.remoteAddress + ':' + client.remotePort)
  });
  client.on('data',function(data){
    console.log('from server:'+ data);
    //得到服务端返回来的数据
    pkey =  data.toString();
    
  });
  
  client.on('error',function(error){
  //错误出现之后关闭连接
    console.log('error:'+error);
    client.on('end', function() { 
     console.log('断开与服务器的连接');
  });
  });
  client.on('close',function(){
    console.log('Connection closed');
  });
}


http.createServer(function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*')
  // 定义了一个post变量，用于暂存请求体的信息
  var post = '';     

  // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
  req.on('data', function(chunk){    
      post += chunk;
      console.log(1,post);
      var data = querystring.parse(post);
      server(data.attr,data.dat);
      console.log(pkey);
  });

  // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
  req.on('end', function(){    
      post = querystring.parse(post);
      console.log(2,post);
      // 设置响应头部信息及编码
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
      if(post.attr) { // 输出提交的数据
        console.log(pkey);
        res.write(pkey);
      
     } else {  // 输出表单
        res.write(postHTML);
     }
      res.end();
  });
}).listen(3007);





