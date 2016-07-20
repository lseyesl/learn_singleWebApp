/*
	router.js module to provide routing
*/

'use strict'

var 
configRoutes,
crud = require('./crud'),

configRoutes = function(app,server){
	app.get('/',function(request,response){
		response.redirect('/spa.html');
	});
       
	app.all('/:obj_type/*?',function(request,response,next){
		console.log('obj_type',request.body);
		console.log('params',request.params);
		response.contentType('json');
		if(objTypeMap[request.params.obj_type]){
			next();
		}else{
			response.send({error_msg:request.params.obj_type+' is not a valid object type'});
		}
		console.log('next');
	});
	
	app.get('/:obj_type/list',function(request,response){
		dbHandle.collection(
			request.params.obj_type,
			function(outer_error,collection){
				collection.find().toArray(
					function(inner_error,map_list){
						response.send(map_list);
					}
				)
			}
		)
		//response.send({title:request.params.obj_type+ ' list'});
	});

	app.post('/:obj_type/create',function(request,response){
		console.log('create');
		var 
		obj_type = request.params.obj_type,
		obj_map = request.body;

		checkSchema(
			obj_type,obj_map,
			function(error_list){
				if(error_list.length === 0) {
					dbHandle.collection(
						obj_type,
						function(outer_error,collection){
							var options_map = {
								safe:true
							};

							collection.insert(
								obj_map,
								options_map,
								function(inner_error,result_map){
									response.send(result_map);
								}
							);
						}
					);
				}else{
					response.send({
						error_msg:"Input document not valid",
						error_list:error_list
					});
				}
			}
		)
	});

	app.get('/:obj_type/read/:id',function(request,response){
		/*response.send({
			title:request.params.obj_type
			+' with id '+ request.params.id+ ' found'
		});*/
		var find_map = {_id:makeMongoId(request.params.id)};

		deHandle.collection(
			request.params.obj_type,
			function(outer_error,collection){
				collection.findOne(
					find_map,
					function(inner_error,result_map){
						response.send(result_map);
					}
				)
			}
		)
	});

	app.post('/:obj_type/update/:id',function(request,response){
		/*response.send({
			title:request.params.obj_type
			+' with id '+ request.params.id+ ' updated'
		});*/

		var 
		find_map = {_id:makeMongoId(request.params.id)},
		obj_map = request.body,
		obj_type = request.params.obj_type;

		checkSchema(
			obj_type,obj_map,
			function(error_list){
				if(error_list.length === 0){
					dbHandle.collection(
						obj_type,
						function(outer_error,collection){
							var
							sort_order =[],
							options_map = {
								'new':true,
								upsert:false,
								safe:true
							};

							collection.findAndModify(
								find_map,
								sort_order,
								obj_map,
								options_map,
								function(inner_error,updated_map){
									response.send(updated_map);
								}
							)
						}
					)
				}else{
					response.send({
						error_msg:"Input document no valid",
						error_list:error_list
					});
				}
			}
		)
	});

	app.get('/:obj_type/delete/:id',function(request,response){
		/*response.send({
			title:request.params.obj_type
			+' with id '+request.params.id + ' delete'
		});*/
		var find_map = {_id:makeMongoId(request.params.id)};
		dbHandle.collection(
			request.params.obj_type,
			function(outer_error,collection){
				var options_map = {safe:true,single:true};

				collection.remove(
					find_map,
					options_map,
					function(inner_error,delete_count){
						response.send({
							delete_count:delete_count
						});
					}
				)
			}
		)
	});
};
dbHandle.open(function(){
	console.log('** connected to mongodb **');
});

(function(){
	var schema_name,schema_path;
	for(schema_name in objTypeMap){
		if(objTypeMap.hasOwnProperty(schema_name)){
			schema_path = __dirname + '/' +schema_name+'.json';
			loadSchema(schema_name,schema_path);
		}
	}
}());


module.exports = {configRoutes:configRoutes};

