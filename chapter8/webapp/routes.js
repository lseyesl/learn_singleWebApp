/*
	router.js module to provide routing
*/

'use strict'

var 
configRoutes,
mongodb = require('mongodb'),
mongoServer = new mongodb.Server(
	'localhost',
	mongodb.Connection.DEFAILT_PORT
),
dbHandle = new mongodb.Db(
	'spa',
	mongoServer,
	{safe,true}
)

dbHandle.open(function(){
	console.log('** connected to mongodb **');
});

configRotes = function(app,server){
	app.get('/',function(request,response){
		response.redirect('/spa.html');
	});

	app.all('/:obj_type/*?',function(request,response,next){
		response.contentTpe('json');
		next();
	});
	
	app.get('/:obj_type/list',function(request,response){
		response.send({title:request.params.obj_type+ ' list'});
	});

	app.get('/:obj_type/create',function(request,response){
		response.send({title:request.params.obj_type+' create'});	
	});

	app.get('/:obj_type/read/:id([0-9]+)',function(request,response){
		response.send({
			title:request.params.obj_type
			+' with id '+ request.params.id+ ' found'
		});
	});

	app.get('/:obj_type/update/:id([0-9]+)',function(request,response){
		response.send({
			title:request.params.obj_type
			+' with id '+ request.params.id+ ' updated'
		});
	});

	app.get('/:obj_type/delete/:id([0-9]+)',function(request,response){
		response.send({
			title:request.params.obj_type
			+' with id '+request.params.id + ' delete'
		});
	});
};

module.exports = {configRoutes:configRoutes};

