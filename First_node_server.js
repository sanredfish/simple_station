var http = require('http');
var url = require('url');
var socket = require('socket.io');
//var filepath = __dirname+"/1.xls";
var fs = require('fs');
//var xlsx = require('node-xlsx');

//var bodyParser = require('body-parser');
var express = require('express');

var querystring = require('querystring');

var parsePostBody = function (req, done) {
    var length = req.headers['content-length'] - 0;
    var arr = [];
    var chunks;

    req.on('data', buff => {
        arr.push(buff);
    });

    req.on('end', () => {
        chunks = Buffer.concat(arr);
        done(chunks);
    });
};

 /***Node.js函数start***/
var app = http.createServer(function(req,res){
	 /***解析URL***/
	var pathname = decodeURIComponent(url.parse(req.url).pathname);
		if(pathname == '/favicon.ico'){
		return ;
	}
	switch(pathname){
		case '/':
			if(req.method=='POST'){
				login(res);		
				var reqBody ='';
				 req.on('data',function (data) {
					 reqBody += data;
					 });
		//		console.log(querystring.parse(reqBody).uname);
				console.log('pathname is //');
			}else{				
				login(res);			
				console.log('pathname is //');
			}
			console.log(req.method);
			break;
		case '/index':
			console.log('pathname is //index');
			index(res);
			break;
		case '/js_form_action.asp':
			console.log('pathname is asp  3');
			//  console.log(pathname);
			
			
			/*  方式1,用于解析提交的表单
			req.on('data',function(data){
				console.log("服务器收到数据:"+decodeURIComponent(data));				
			});
			
			var bodyParser = require('body-parser');
			var app = express();
			app.use(bodyParser.urlencoded({
			extended:true
			}));
			console.log(req.body);
*/

			parsePostBody(req, (chunks) => {
					var body = querystring.parse( chunks.toString() );  // 关键代码
					console.log(`Your nick is ${body.uname}`)
					console.log(`Your nick is ${body.psswd}`)
			});

			index(res);
			break;
		case '/login':
			console.log('pathname is //login  2');
			login(res);
			break;
		default:
			login(res);		
			console.log('pathname is default 1');
			console.log(pathname);
			/*  方式1,用于解析提交的表单*/
			req.on('data',function(data){
			console.log("服务器收到数据:"+decodeURIComponent(data));
			});
			
			/*   方式2  主要用于解析URL的内容
			
			const queryObj = url.parse(req.url,true).query;
			const name = queryObj.uname;
			const passwd = queryObj.passwd;
			console.log('name:${name},passwd:${passwd}');
			console.log("name:"+name);
			*/
			break;
	}

}).listen(1234);
function index(res){
	var page = fs.readFileSync(__dirname+'/'+url.parse('index.html').pathname,'utf8');
	res.writeHead(200,{'Content-Type':'text/html'});
	res.end(page);

}
function login(res){
	var page = fs.readFileSync(__dirname+'/'+url.parse('login.html').pathname,'utf8');
	res.writeHead(200,{'Content-Type':'text/html'});
	res.end(page);

}