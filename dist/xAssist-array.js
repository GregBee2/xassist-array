// https://github.com/GregBee2/xassist-array#readme Version 0.0.6.
// Copyright 2018 Gregory Beirens.
// Created on Tue, 13 Mar 2018 11:04:38 GMT.
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.xa = global.xa || {})));
}(this, (function (exports) { 'use strict';

function pushUnique(arr,val,unique){
	unique=(typeof unique==="undefined"?true:!!unique);
	if(!unique || arr.indexOf(val)===-1){
		return arr.push(val);
	}
	else{
		//unique set but it is not
		return arr.length;
	}
}
function groupSequence(arr,checkFn){
	//this function groups elements based on previouselement and checkFn
	//the function returns an array of arrays with the groupelements in each subArray
	return arr.reduce(function(result,value,index,array){
		
		if(index&&checkFn(array[index-1],value)){
			//add to last element of result
			result[result.length-1].push(value);
		}
		else{
			//new subArray
			result.push([value]);
		}
		return result;
	},[]);
}
function replaceNull(arr,replacer){
	//this function replaces all null or undefined values with a value described by replacer
	//replacer may be static text or a function which will give correct textOutput
	var replaceFn,result=[];
	if (Array.isArray(replacer)){
		replaceFn=function(v,i){return replacer[i]};
	}
	else if (typeof replacer==="function"){
		replaceFn=replacer;
	}
	else {
		replaceFn=function(){return replacer};
	}
	for (let i=0,len=arr.length;i<len;i++){
		let v=arr[i];
		if (v===null||typeof v==="undefined"){
			result.push(replaceFn(v,i));
		}
		else {
			result.push(v);
		}
	}	return result;
}
function array(arr){
	return {
		pushUnique:pushUnique.bind(null,arr),
		groupSequence:groupSequence.bind(null,arr),
		replaceNull:replaceNull.bind(null,arr)
	};
}

exports.array = array;

Object.defineProperty(exports, '__esModule', { value: true });

})));
