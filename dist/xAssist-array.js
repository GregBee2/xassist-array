// https://github.com/GregBee2/xassist-array#readme Version 0.0.3.
// Copyright 2018 undefined.
// Created on Mon, 12 Mar 2018 14:04:46 GMT.
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.xa = global.xa || {})));
}(this, (function (exports) { 'use strict';

function pushUnique(arr,val,unique){
	if(!!unique===false){
		return arr.push(val);
	}
	else if(arr.indexOf(val)===-1){
		//unique is set to true and it is really unique
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
		if(checkFn(array[index-1],value)){
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
function array(arr){
	return {
		pushUnique:pushUnique.bind(null,arr),
		groupSequence:groupSequence.bind(null,arr)
	};
}

exports.array = array;

Object.defineProperty(exports, '__esModule', { value: true });

})));
