/*
	cpa.chat.js
*/

/*
	jslint 
	browser:true,continue:true,
	devel:true,indent:2,maxerr:50,
	newcap:true,nomen:true,plusplus:true,
	regexp:true,sloppy:true,vars:false,
	white:true
*/

spa.chat = (function(){
	var 
	configMap = {
		main_html: String()
		+'<div style="padding:1em;color:#fff;">'
		+'Say hello to chat'
		+'</div>',
		setable_map:{}
	},
	stateMap = {$container:null},
	jqueyrMap = {},
	setJqueryMap,configModule,initModule;
	

	//begin dom method

	setJqueryMap = function(){
		var $container = stateMap.$container;
		jqueryMap = {$container:$container};
	};

	//end dom method

	//begin public method
	configModule = function(input_map){
		spa.util.setConfigMap({
			input_map:input_map,
			settable_map:configMap.settable_map,
			config_map:configMap
		});

		return true;
	};
	//end public method

	initModule = function($container){
		$container.html(configMapmain_html);
		stateMap.$container = $container;
		setJqueryMap();
		return true;
	}

	//return public methods
	return {
		configModule:configModule,
		initModule:initModule
	};
}());
