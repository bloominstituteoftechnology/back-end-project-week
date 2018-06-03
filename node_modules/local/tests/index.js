var fs = require('fs')
var Local = require('../')
var expect = require('expect.js')

describe('Test with Memory Driver', function(){
	it('should initialize with memory storage', function(done){
		var local = new Local();
		local.ready(function(error, memory){
			expect(memory).to.be.an(Object)
			expect(local._storage).to.be('memory')
			done()
		})
	})
	
	it('should save translation into memory', function(done){
		var local = new Local()
		local.ready(function(error){
			local.set('hello').to('hola').in('spanish').then(function(){
				expect(local.memory['hello']['spanish']).to.be('hola')
				done()
			})
			
		})
	})
	
	it('should get translation from memory', function(done){
		var local = new Local()
		local.ready(function(error){
			local.set('hello').to('hola').in('spanish')
			local.get('hello').in('spanish').then(function(translation){
				expect(translation).to.be('hola')
				done()
			})
			
		})
	})
	
	it('should create a locale in memory', function(done){
		var local = new Local()
		local.storeTo('memory')
		local.ready(function(error){
			local.set('awesome').to('impresionante').in('spanish')
			
			var locale = local.locale('spanish');
			locale('awesome').then(function(translation){
				expect(translation).to.be('impresionante')
				done()
			})
		})
	})
})

describe('Test with FileSystem Driver', function(){
	var dataPath = __dirname+'/locales/local.json'
	var dataPath2 = __dirname+'/locales/local2.json'
	try {
		fs.unlinkSync(dataPath)
	} catch (error) {
		if(error && error.code != 'ENOENT') {
			console.log(error)
		}
	}
	
	it('should initialize with file storage', function(done){
		var local = new Local();
		local.storeTo('fileSystem', dataPath)
		local.ready(function(error, memory){
			expect(memory).to.be.an(Object)
			expect(local._storage).to.be('fileSystem')
			done()
		})
	})
	
	it('should save translation into file system', function(done){
		var local = new Local();
		local.storeTo('fileSystem', dataPath)
		local.ready(function(error, memory){
			local
			.set('hello')
			.to('hola')
			.in('spanish')
			.then(function(){
				expect(memory['hello']['spanish']).to.be('hola')
				done()
			})
		})
	})
	
	it('should initialize and read from file system', function(done){
		var local = new Local();
		local.storeTo('fileSystem', dataPath2)
		local.ready(function(error, memory){
			local.get('hello').in('spanish').then(function(result){
				expect(result).to.be('hola')
				done()
			})
			
		})
	})
	
	it('should create a locale in file system', function(done){
		var local = new Local()
		local.storeTo('fileSystem', dataPath)
		local.ready(function(error){
			local.set('awesome').to('impresionante').in('spanish')
			
			var locale = local.locale('spanish');
			locale('awesome').then(function(translation){
				expect(translation).to.be('impresionante')
				done()
			})
		})
	})

})

describe('Test with Custom Driver', function(){
	var customDriver = require(__dirname+'/drivers/custom.js');
	
	it('should initialize with custom memory storage', function(done){
		var local = new Local();
		local.storeTo('customDriver', customDriver)
		local.ready(function(error, memory){
			expect(memory).to.be.an(Object)
			expect(local._storage).to.be('customDriver')
			done()
		})
	})
	
	it('should initialize with nameless custom memory storage', function(done){
		var local = new Local();
		local.storeTo(customDriver)
		local.ready(function(error, memory){
			expect(memory).to.be.an(Object)
			expect(local._storage).to.be('custom')
			done()
		})
	})
	
	it('should save translation into custom memory', function(done){
		var local = new Local()
		
		local.ready(function(){
			local.set('hello').to('hola').in('spanish')
			expect(local.memory['hello']['spanish']).to.be('hola')
			done()
		})
	})
	
	it('should get translation from custom memory', function(done){
		var local = new Local()

		local.ready(function(){
			local.set('hello').to('hola').in('spanish')
			local.get('hello').in('spanish').then(function(translation){
				expect(translation).to.be('hola')
				done()
			})
			
		})
	})
	
	it('should create a locale in memory', function(done){
		var local = new Local()
		
		local.ready(function(){
			local.set('awesome').to('impresionante').in('spanish')
			
			var locale = local.locale('spanish');
			locale('awesome').then(function(translation){
				expect(translation).to.be('impresionante')
				done()
			})
		})
	})
})