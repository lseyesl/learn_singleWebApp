/*
	spa.shell.js
	shell module for spa
*/
/*
jslit 
brower:true,comtinue:true,
devel:true,indent:2,maxerr:50,
newcap:true,nomen:true,plusplus:true,
regexp:true,sloppy:true,vars:false,
white:true	
*/

/*global $,spa*/

spa.shell = (function(){

	// module scope variables
	var
	configMap = {
		main_html : String()
		+'<div class="spa-shell-head">'
		+'<div class="spa-shell-head-logo"></div>'
		+'<div class="spa-shell-head-acct"></div>'
		+'<div class="spa-shell-head-search"></div>'
		+'</div>'
		+'<div class="spa-shell-main">'
		+'<div class="spa-shell-main-nav"></div>'
		+'<div class="spa-shell-main-content"></div>'
		+'</div>'
		+'<div class="spa-shell-font"></div>'
		+'<div class="spa-shell-chat"></div>'
		+'<div class="spa-shell-modal"></div>',
		chat_extend_time:1000,
		chat_retract_time:300,
		chat_extend_height:450,
		chat_retract_height:15
	},
	stateMap = {$container:null},
	jqueryMap = {},
	setJqueryMap,toggleChat,initModule;
	// end module scope variables


	//dom method
	setJqueryMap = function(){
		var $container = stateMap.$container;
		jqueryMap = { 
			$container:$container,
			$chat:$container.find('.spa-shell-chat')
		};
	};
	//end dom method

	//public method
	toggleChat = function(do_extend,callback){
		
	};
	initModle = function($container){
		stateMap.$container = $container;
		$container.html(configMap.main_html);
		setJqueryMap();
	};
	//end public method

	return {initModule:initModule};
}());
