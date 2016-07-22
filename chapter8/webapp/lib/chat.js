/*
chat.js module to provide chat messaging
*/

'sue strict';
var 
chatObj,
socket = require('socket.io'),
crud = require('./crud');

chatObj = {
	connect:function(server){
		var io = socket.listen(server);
		io
		.set('blacklist',[])
		.on('connection',function(socket){
			socket.on('adduser',function(){});
			socket.on('updaechat',function(){});
			socket.on('leavechat',function(){});
			socket.on('disconnect',function(){});
			socket.on('updateavatar',function(){});
		})
		return io;
	}	
}

module.exports = chatObj;
