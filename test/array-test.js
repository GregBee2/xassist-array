var definition = require("../package.json");
var { array }=require("../"+definition.main);
var tape=require("tape");

var testArray=[
	1,2,3,4,5,6
]
var testArray2=[
	1,2,3,5,6,8,9
]
var testArray3=[
	undefined,undefined,2,2,"a","b",{t:1},{a:2}
]


tape("pushUnique should only push values when unique", function(test) {
	var t=array(testArray);
	var result=t.pushUnique(7);
	test.ok(testArray.length===result && testArray[6]==7,
		"pushUnique(val) adds unique value to array and returns new length");
	t.pushUnique(7);
	test.deepEqual(testArray,[1,2,3,4,5,6,7],
		"pushUnique(val) does not add nonUnique value to array");
	t.pushUnique(7,false);	
	test.deepEqual(testArray,[1,2,3,4,5,6,7,7],
		"pushUnique(val,false) adds value to array, disregarding the uniqueNess");
	test.end();	
});

tape("groupSequence() groups the array based upon decision function", function(test) {
	//decision function creates new group when fn(prevValue,currentValue) ==false
	var t=array(testArray2);
	var fn=function(a,b){return b-a===1}
	var result=t.groupSequence(fn);
	test.deepEqual(result,[[1,2,3],[5,6],[8,9]],
		"groupSequence(fn) creates new group when fn(prevValue,currentValue)==false");
	var fn2=function(a,b){return typeof a===typeof b}
	test.deepEqual(array(testArray3).groupSequence(fn2),[[undefined,undefined],[2,2],["a","b"],[{t:1},{a:2}]],
		"groupSequence(fn) creates new group when fn(prevValue,currentValue)==false");
	test.end();	
});

tape("replaceNull() replaces null or undefined or empty values in array", function(test) {
	//decision function creates new group when fn(prevValue,currentValue) ==false
	var t=array(["ok","null",null,undefined,"test",false,3,,"end"]);
	var replacer1="replaced";
	var replacer2=["replaced0","replaced1","replaced2","replaced3","replaced4","replaced5"];
	var replacer3=function(value,i){
		if (value===null){
			return "replacednull_"+i;
		}
		else if (typeof value==="undefined"){
			return "replacedundef_"+i;
		}
		else{
			return "????"
		}
	};
	var replacer4={test:1};
	test.deepEqual(t.replaceNull(replacer1),["ok","null","replaced","replaced","test",false,3,"replaced","end"],
		"replaceNull(text) replaces all null,undefined or empty with text");
	test.deepEqual(t.replaceNull(replacer2),["ok","null","replaced2","replaced3","test",false,3,undefined,"end"],
		"replaceNull(array) replaces all null,undefined or empty with array[i] or undefined if array[i] not found");
	test.deepEqual(t.replaceNull(replacer3),["ok","null","replacednull_2","replacedundef_3","test",false,3,"replacedundef_7","end"],
		"replaceNull(fn) replaces all null, undefined or empty with fn(value,index)");
	test.deepEqual(t.replaceNull(replacer4),["ok","null",{test:1},{test:1},"test",false,3,{test:1},"end"],
		"replaceNull(otherThings_like_objects_dates_numbers) replaces all null, undefined or empty with the other thing");	
	test.end();	
});

