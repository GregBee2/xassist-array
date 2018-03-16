# xassist-array

This module provides some helperfunctions for javascript ```Arrays```. It does not extend the native ```Array-object```, but the extra methods are available via the ```array()```-function.

## Installation

This is a [Node.js](https://nodejs.org/) module available through the 
[npm registry](https://www.npmjs.com/). It can be installed using the 
[`npm`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)
or 
[`yarn`](https://yarnpkg.com/en/)
command line tools.

```sh
npm install @xassist/xassist-array --save
```

## Tests

```sh
npm install
npm test
```

## Usage

### array()

The base function array(), gives access to the underlying methods
```js
array(/*array:Array*/)
```

#### parameters for array() 
`array()` takes one (non-optional) parameters:
- **array**: an Array on which we will execute the underlying methods.

example usage:
```js
array([1,2,3])
array(["hello","world", "!"])
```

#### result for array()
`array()` returns 3 methods:
- `pushUnique` [function]: Pushes elements on the array, only if the element is unique
- `groupSequence` [function]: this function groups elements based on previouselement (so it is best to have an ordered array as input)
- `replaceNull` [function]: this function replaces all null or undefined values


### array().pushUnique()

The first method `array().pushUnique()` will push elements onto the array, but only if their unique

```js
csv(arr).pushUnique(value [,unique::Boolean; default:true])
```

**value** is an element that you want to push on the array.


This method accepts 2 parameters. the last one `unique` is optional, and defaults to true.

#### parameters for array().pushUnique()

the method `pushUnique(value,unique)` accepts 2 parameters.
- **value** is an element that you want to push on the array
- **unique** [Boolean; default:true]: a boolean indicating if the function must check if the value allready exists

#### Result for array().pushUnique()
`array().pushUnique()` returns the length of the original array.

Suppose following initialization:
```js
var b={yes:true};
var a=[1,2,b,{a:1},"test"]
var a2=array(a)
```

Let's try to add some values to the array a;
```js
a2.pushUnique(1)											//a.length===5 (the element 1 exists, nothing added)
a2.pushUnique(1,false)					//a.lenght===6 (override of the unique check, so 1 is added)
a2.pushUnique({a:1})							//a.length===7 (objects should be passed by reference)
a2.pushUnique(b)											//a.length===8 (object is passed by reference, so it get's added)
```
the result being
```js
a===[1,2,b,{a:1},"test",1,{a:1},b]
```

### array().groupSequence()

`array().groupSequence()` works best on a sorted array. it will group the array based on a groupingfunction, which compares each value with it's predecessor.

```js
csv(arr).groupSequence(checkFn::function)
```

This method accepts 1 parameters. 

#### parameters for array().groupSequence()

the method `pushUnique(value,unique)` accepts 2 parameters.
- **checkFn** [Function]: is a function which compares each value of the array with it's predecesor, if it returns true, the element is added to the current group. Otherwise a new group is made

#### Result for array().groupSequence()
`array().groupSequence()` returns a new array (ie the original array, has not changed) with subarray for each group.

Suppose following initialization:
```js
var fn=function(a,b){return b-a===1}
var fn2=function(a,b){return typeof a===typeof b}
var testArray=[1,2,3,5,6,8,9]
var testArray2=[undefined,undefined,2,2,"a","b",{t:1},{a:2}]

```

Let's try to group the values.
```js
var result=array(testArray).groupSequence(fn)
var result2=array(testArray2).groupSequence(fn2)
```
the results being
```js
result===[[1,2,3],[5,6],[8,9]]
result2===[[undefined,undefined],[2,2],["a","b"],[{t:1},{a:2}]]
```
### array().replaceNull()

The last method `array().replaceNull()` replaces all null or undefined values with a value described by replacer

```js
csv(arr).replaceNull(replacer)
```

This method accepts 1 parameters. 

#### parameters for array().replaceNull()

the method `replaceNull(replacer)` accepts 1 parameters, but it may come in three forms (a function, an array or something else)
- **replacer** [Function]: is a function with parameters (`currentValue` and `currentIndex`) if a null, undefined or empty (!!! an empty value is taken into account aswell) the function get's executed and based on the curentValue and it's index the return-value will be put in the array.
- **replacer** [Array]: if a null, undefined or empty is encountered the currentValue get's changed by the value of the replacerArray at the given index.
- **replacer** [anything else]: all the null's, undefined or empty values are replaced by the replacer-value itself


#### Result for array().replaceNull()
`array().replaceNull()` returns a new array (ie the original array, has not changed) with the correct result.

Suppose following initialization:
```js
var testArray=array(["ok","null",null,undefined,"test",false,3,,"end"]);
var replacerV="replaced";
var replacerA=["replaced0","replaced1","replaced2","replaced3","replaced4","replaced5"];
var replacerF=function(value,i){
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

```

Let's try to remove the null,undefined or empty values 
```js
var resultV=array(testArray).replaceNull(replacerV)
var resultA=array(testArray).replaceNull(replacerA)
var resultF=array(testArray).replaceNull(replacerF)
```
the results being
```js
resultV===["ok","null","replaced","replaced","test",false,3,"replaced","end"]
resultA===["ok","null","replaced2","replaced3","test",false,3,undefined,"end"]
resultF===["ok","null","replacednull_2","replacedundef_3","test",false,3,"replacedundef_7","end"]
```

**Remark**:: empty values (ie [/*empty*/,"not empty"]) are considered undefined. But there's a slight difference with explicitly defining undefined as the value.

try following code:
```js
[1,,2].map(v=>"ok")===["ok",,"ok"]
[1,undefined,2].map(v=>"ok")===["ok","ok","ok"]
```
The reason for this is the implementation of map; it makes an object of the array `Object([1,,2]) and checks if the key (ie the index) exists in this object. For empty values this returns false.
If someone has more information about this, feel free to contact me.


## Dependencies

No dependencies

## Dev Dependencies

- [rimraf](https://ghub.io/rimraf): A deep deletion module for node (like `rm -rf`)
- [rollup](https://ghub.io/rollup): Next-generation ES6 module bundler
- [tape](https://ghub.io/tape): tap-producing test harness for node and browsers

## License

GPL-3.0

