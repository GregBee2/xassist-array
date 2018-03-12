var definition = require("../package.json");
var { array }=require("../"+definition.main);
var tape=require("tape");

var testArray=[
	1,2,3,4,5,6
]
var testArray2=[
	1,2,3,5,6,8,9
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
	test.end();	
});

