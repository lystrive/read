const http = require('http');
const mysql = require('mysql');
const URL = require("url");
var connection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'123',
    port:'3306',
    database: "read"
});
//开始你的mysql连接
connection.connect();


var server = http.createServer(function (req, res) {
    //如果你发一个GET到http://127.0.0.1:9000/api/user/register
    var url_info = URL.parse(req.url, true);

    //登录用户
    if(url_info.pathname === '/api/user/login'){
        var getUserUrl = 'SELECT * FROM user where username = ?';
        var query = url_info.query;
        var param = [query.username];
        res.writeHead(200, {
            'Content-Type': 'text/json;charset=gbk',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Method': 'GET,POST'
        });
        // res.writeHead(200, {'Content-Type': 'text/plain'});
        connection.query(getUserUrl, param, function(err, results,fields){
            if(err) {
                res.end(err.message);
            } else {
                // res.end(JSON.stringify(results));
                var str = url_info.query.callback + '(' + JSON.stringify(results) +')';
                res.end(str);
            }
        });
    }


    //注册用户
    if(url_info.pathname === '/api/user/register'){
        var addUserUrl = 'INSERT INTO user(username,password) values(?,?)';
        var query = url_info.query;
        var param = [query.username, query.password];
        // res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200, {
            'Content-Type': 'text/json;charset=gbk',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Method': 'GET,POST'
        });
        connection.query(addUserUrl, param, function(err, results, fields){
            if(err) {
                res.end(err.message);
            } else {
                var str = url_info.query.callback + '(' + JSON.stringify(results) +')';
                res.end(str);
            }
        });
    }

    //更新用户
    if(url_info.pathname === '/api/user/update'){
        var updateUserUrl = 'UPDATE user set password = ? where id = ?';
        var query = url_info.query;
        var param = [query.password, query.id];
        // console.log(param)
        res.writeHead(200, {
            'Content-Type': 'text/json;charset=gbk',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Method': 'GET,POST'
        });
        connection.query(updateUserUrl, param, function(err, results,fields){
            if(err) {
                res.end(err.message);
            } else {
                // console.log(url_info.query.callback)
                var str = url_info.query.callback + '(' + JSON.stringify(results) +')';
                res.end(str);
                // res.json({code: 200, data: results});
            }
        });
    }


    //获取商品数据
    if(url_info.pathname === '/api/product/getList'){
        var getProductUrl = 'SELECT * FROM product';
        res.writeHead(200, {
            'Content-Type': 'text/json;charset=gbk',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Method': 'GET,POST'
        });
        connection.query(getProductUrl, function(err, results,fields){
            if(err) {
                res.end(err.message);
            } else {
                var str = url_info.query.callback + '(' + JSON.stringify(results) +')';
                res.end(str);
                // res.json({code: 200, data: results});
            }
        });
    }

    //获取商品name数据
    if(url_info.pathname === '/api/product/getPro'){
        var getProductUrl = 'SELECT * FROM product where proName = ?';
        var query = url_info.query;
        var param = [query.proName];
        res.writeHead(200, {
            'Content-Type': 'text/json;charset=gbk',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Method': 'GET,POST'
        });
        connection.query(getProductUrl, param, function(err, results,fields){
            if(err) {
                res.end(err.message);
            } else {
                var str = url_info.query.callback + '(' + JSON.stringify(results) +')';
                res.end(str);
                // res.json({code: 200, data: results});
            }
        });
    }

    //获取购物车数据
    if(url_info.pathname === '/api/cart/getList'){
        var getCartUrl = 'SELECT * FROM cart where userId = ?';
        var query = url_info.query;
        var param = [query.userId];
        res.writeHead(200, {
            'Content-Type': 'text/json;charset=gbk',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Method': 'GET,POST'
        });
        connection.query(getCartUrl, param, function(err, results,fields){
            if(err) {
                res.end(err.message);
            } else {
                var str = url_info.query.callback + '(' + JSON.stringify(results) +')';
                res.end(str);
                // res.json({code: 200, data: results});
            }
        });
    }

    //获取id购物车数据
    if(url_info.pathname === '/api/cart/get'){
        var getCart = 'SELECT * FROM cart where id = ?';
        var query = url_info.query;
        var param = [query.id];
        res.writeHead(200, {
            'Content-Type': 'text/json;charset=gbk',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Method': 'GET,POST'
        });
        connection.query(getCart, param, function(err, results,fields){
            if(err) {
                res.end(err.message);
            } else {
                // console.log(results)
                var str = url_info.query.callback + '(' + JSON.stringify(results) +')';
                res.end(str);
                // res.json({code: 200, data: results});
            }
        });
    }

    //加入购物车
    if(url_info.pathname === '/api/cart/add'){
        var addCartUrl = 'INSERT INTO cart(proId, proName, price, amount, userId, img) values(?, ?, ?, ?, ?, ?)';
        var query = url_info.query;
        var param = [query.proId, query.proName, query.price, query.amount, query.userId, query.img];
        res.writeHead(200, {
            'Content-Type': 'text/json;charset=gbk',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Method': 'GET,POST'
        });
        connection.query(addCartUrl, param, function(err, results,fields){
            if(err) {
                res.end(err.message);
            } else {
                // console.log(url_info.query.callback)
                var str = url_info.query.callback + '(' + JSON.stringify(results) +')';
                res.end(str);
                // res.json({code: 200, data: results});
            }
        });
    }

    //更新购物车
    if(url_info.pathname === '/api/cart/update'){
        var updateCartUrl = 'UPDATE cart set amount = ? where id = ? and userId = ?';
        var query = url_info.query;
        var param = [query.amount, query.id, query.userId];
        res.writeHead(200, {
            'Content-Type': 'text/json;charset=gbk',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Method': 'GET,POST'
        });
        connection.query(updateCartUrl, param, function(err, results,fields){
            if(err) {
                res.end(err.message);
            } else {
                // console.log(url_info.query.callback)
                var str = url_info.query.callback + '(' + JSON.stringify(results) +')';
                res.end(str);
                // res.json({code: 200, data: results});
            }
        });
    }

    //删除购物车
    if(url_info.pathname === '/api/cart/delete'){
        var getCart = 'DELETE FROM cart where id = ?';
        var query = url_info.query;
        var param = [query.id];
        res.writeHead(200, {
            'Content-Type': 'text/json;charset=gbk',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Method': 'GET,POST'
        });
        connection.query(getCart, param, function(err, results,fields){
            if(err) {
                res.end(err.message);
            } else {
                // console.log(results)
                var str = url_info.query.callback + '(' + JSON.stringify(results) +')';
                res.end(str);
                // res.json({code: 200, data: results});
            }
        });
    }

    //这个是用来回复上面那个post的，显示post的数据以表示成功了。你要是有别的目标，自然不需要这一段。
    // else{
    //     req.pipe(res);
    // }
});


server.listen(9000, '127.0.0.1');
//在server关闭的时候也关闭mysql连接
server.on('close',function(){
    connection.end();
});
console.log('listening on port  9000');