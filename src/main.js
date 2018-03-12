
'use strict'

var idSeed=Math.round(Math.random()*(1000000)),
	DOMContentLoadedEvent,
	readyCallBacks=[],
	isReady=false;
document.addEventListener( "DOMContentLoaded", readyHandler,{once:true});
function readyHandler(){
	//save event information
	DOMContentLoadedEvent=arguments[0];
	readyCallBacks.forEach(function(cb){
		cb[0].call(cb[1],DOMContentLoadedEvent);
	});
	//empty readyCallBacks
	readyCallBacks=[];
	isReady=true;
};
export function id(prefix){
	//creates unique ID based on 
	return ((!arguments.length?'':prefix+'_')+idSeed++);
	
};
export function ready(callBack,thisArg){
	//thisArg refers to this inside callback
	if(!thisArg){
		thisArg=document;
	}
	//check if document state is complete
	if (isReady){
		callBack.call(thisArg,DOMContentLoadedEvent);
	}
	else{
		//add to executionList;
		readyCallBacks.push([callBack,thisArg]);
	}
	
};
export function template(text,obj,notfoundText){
	notfoundText=(notfoundText?notfoundText:"");
	return text.replace(/\${([^}]*)}/g,function(match,p1,offset){
		
		return p1.split(".").reduce(function(obj,prop){
			if(obj.hasOwnProperty(prop)){
				return obj[prop];
			}
			return notfoundText;
		},obj);
	});
};






