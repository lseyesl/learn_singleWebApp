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
		chat_retract_height:15,
		chat_extended_title:'Click to retract',
		chat_retracted_title:'Click to extend'
	},
	stateMap = {
		$container:null,
		is_chat_retracted:true
	},
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
		var
		px_chat_ht = jqueryMap.$chat.height(),
		is_open    = px_chat_ht === configMap.chat_extend_height,
		is_closed  = px_chat_ht === configMap.chat_retract_height,
		is_sliding = ! is_open && ! is_closed;

		if(is_sliding){return false;}

		if(do_extend){
			jqueryMap.$chat.animate(
				{heigth:configMap.chat_extend_height},
				configMap.chat_extend_time,
				function(){
					jqueryMap.$chat.attr(
						"title",configMap.chat_exended_title
					);
					stateMap.is_chat_retracted = false;
					if(callback){callback(jqueryMap.$chat);}	
				}
			);
			return true;
		}
		
		jqueryMap.$chat.animate(
			{height:configMap.chat_retract_height},
			configMap.chat_retract_time,
			function(){
				jqueryMap.$chat.attr(
					"title",configMap.chat_retracted_title
				);
				stateMap.is_chat_retracted = true;
				if(callback){callback(jqueryMap.$chat);}
			}
		);
		return true;

	};
	initModule = function($container){
		stateMap.$container = $container;
		$container.html(configMap.main_html);
		setJqueryMap();

		setTimeout(function(){toggleChat(true);},3000);
		setTimeout(function(){toggleChat(false);},8000);
	};
	//end public method

	return {initModule:initModule};
}());
