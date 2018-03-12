'use strict'
var $b=(function(my){
	'use strict'
	my.array=function(arr){
		return{
			pushUnique:function(val,unique){
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
			},
			groupSequence:function(checkFn){
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
		}
	};
	return my;
})($b);