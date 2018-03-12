var definition = require("../package.json");
var { array }=require("../"+definition.main);
var tape=require("tape");

var testArray=[
	1,2,3,4,5,6
]


tape("pushUnique should only push values when unique", function(test) {
	var t=array(testArray);
	var result=t.pushUnique(7);
	test.ok(testArray.length===result && testArray[6]==7,
		"pushUnique(val) adds nonUnique value to array");
	test.end();	
});

