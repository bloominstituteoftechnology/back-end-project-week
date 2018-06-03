# Local
### Asynchronous localization library for node.js

![Build Status](https://travis-ci.org/adamhalasz/local.svg?branch=master)

```js
var Local = require('local')
var local = new Local()
local.ready(SET)

function SET(){
	local
	.set('HELLO')
	.in('SPANISH')
	.to('HOLA')
	.catch(errors)
	.then(GET)
}

function GET(){
	local
	.get('HELLO')
	.in('SPANISH')
	.catch(errors)
	.then(DISPLAY)
}

function DISPLAY(translation){
	console.log(translation) // -> HOLA
}

function errors(err){
	console.error(err)
}
```

## Install
```
npm install local
```

## Features
- Ships with JSON Memory and FileStorage Drivers
- Human Readable Get/Set API
- Easy Locale Instantiation for Dynamic Localization
- Custom Storage Setter/Getter API

## How to Use

### Initialize
```js
var Local = require('local')
var local = new Local()
```

### Set
**API**

```js
local
.set($originValue)
.to($translatedValue)
.in($language)
.then($successCallback) 
.catch($errorCallback)
```

**Example**
```js
local
.set('hello')
.to('hola')
.in('spanish')
.then(function(value){
	console.log(value)
}) // one result argument
.catch(function(error){
	console.error(error)
}) // one error argument
```

### Get

**API**
```js
local.get($query).in($language)
```

**Example**
```js
local.get('hello').in('spanish') // -> hola
```

### Locale

**API**
```
var locale = local.locale($language)
    locale($query).then($successCallback).catch($errorCallback)
```

**Example**
```js
var spanish = local.locale('spanish')

spanish('hello').then(function(value){ 
	console.log(value)  // -> hola
	
}).catch(function(error){
	console.error(error)
}) 
     
```

### Storage

#### Defaults
```js
// memory
var local = new Local() 

// fileSystem
var local = new Local()
local.storeTo('fileSystem', '/your/custom/path/local.json')
```

#### Custom Storage
```js
// custom storage driver
function storageDriver(Local, options, finish){
	var error = null
	var memory = Local.memory
	var storage = Local.storage('customStorage')
	
	storage.getter(function(parent, query, language, translation, done){
		// ...
	})
	
	storage.setter(function(parent, query, language, done){
		// ...
	})
		
	finish(error, memory)
}

// initialize
var local = new Local()

// load the new driver into this local instance
local.storeTo(storageDriver)
```



## Tests
Tests are written with Mocha.js. To run the tests install mocha and run the tests with npm test.  
```
npm install mocha -g
npm test
```

## License
The MIT License (MIT)

Copyright (c) 2016 Ádám Halász

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
