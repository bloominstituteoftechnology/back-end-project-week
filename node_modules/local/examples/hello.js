var Local = require('../')
var local = new Local()
local.ready(SET)

function SET(){
	local
	.set('HELLO')
	.in('SPANISH')
	.to('HOLA')
	.then(GET)
	.catch(errors)
	
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