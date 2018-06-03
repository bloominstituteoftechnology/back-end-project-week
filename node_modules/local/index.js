// ====================================================
//  Dependencies
// ====================================================
	
	if(module && module.exports){
		var fs = require('fs')
		var async = require('async')
		var drivers = {
			'memory': require('./drivers/memory'),
			'fileSystem': require('./drivers/fileSystem')
		};
	} else {
		console.warn('Browser not supported yet.');
	}


// ====================================================
//  Main Class
// ====================================================
	
	function Local(){
		return this;
	}
	
	
// ====================================================
//  Shared Variables
// ====================================================
	
	Local.prototype.memory = {};
	Local.prototype._readyCallback = false;
	Local.prototype.storages = {};

// ====================================================
//  Storage
// ====================================================	

	function Storage(storageName, parent){
		this.name = storageName;
		this.parent = parent;
		return this;
	}
	Storage.prototype.setter = function(callback){
		this.parent._set = callback;
		return this;
	}
	Storage.prototype.getter = function(callback){
		this.parent._get = callback;
		return this;
	}
	Local.prototype.storage = function storageDriver(storageName){
		return new Storage(storageName, this)
	}
	Local.prototype._storeTo;
	Local.prototype.storeTo = function storageChoose(storageName, options){
		var scope = this;
		
		if(typeof storageName == 'string') {
			scope._storage = storageName;
		} else {
			scope._storage = 'custom';
		}
		
		scope._storeTo = function(done){
			if(storageName == 'fileSystem' || storageName == 'memory'){
				drivers[storageName](scope, options, done)
			
			} else if (typeof storageName == 'function') {
				storageName(scope, options, done)
			
			} else if (typeof options == 'function') {
				options(scope, options, done)
			}
			return scope;
		}
		return scope;
	}
	
	
// ====================================================
//  Set
// ====================================================

	function Set(query, parentClass){
		this.query = query;
		this.parentClass = parentClass;
		return this;
	}

	Set.prototype.to = function(translation){
		this.translation = translation;
		return this;
	}
	
	Set.prototype.in = function(language){
		this.language = language;
		this.run();
		return this;
	}
	
	Set.prototype.run = function(){
		var parent = this.parentClass;
		var scope = this;
		process.nextTick(function(){
			parent._set(parent, scope.query, scope.language, scope.translation, function(error, response){
				if(error) {
					if(scope._catch) {
						scope._catch(error)
					} else {
						throw error;
					}
				} else if (scope._then) {
					scope._then(response)
				}
			})
		})
		return this.parentClass;
	}
	
	Set.prototype.then = function(callback){
		this._then = callback;
		return this;
	}
	
	Set.prototype.catch = function(callback){
		this._catch = callback;
		return this;
	}
	
// ====================================================
//  Get
// ====================================================

	function Get(query, parentClass){
		this.query = query;
		this.parentClass = parentClass;
		return this;
	}

	Get.prototype.in = function(language){
		this.language = language;
		this.run();
		return this;
	}
	
	Get.prototype.run = function(){
		var parent = this.parentClass;
		var scope = this;
		process.nextTick(function(){
			parent._get(parent, scope.query, scope.language, function(error, response){
				if(error) {
					if(scope._catch) {
						scope._catch(error)
					} else {
						throw error;
					}
				} else if (scope._then) {
					
					scope._then(response)
				}
			})
		})
		return this.parentClass;
	}
	
	Get.prototype.then = function(callback){
		this._then = callback;
		return this;
	}
	
	Get.prototype.catch = function(callback){
		this._catch = callback;
		return this;
	}

// ====================================================
//  Locale
// ====================================================
	
	function Locale(language, parent){
		this.language = language;
		this.parent = parent;
		return function(query){
			return parent.get(query).in(language);
		}
	}
	
	Local.prototype.locale = function(language){
		return new Locale(language, this)
	};


// ====================================================
//  Local Methods
// ====================================================
	
	Local.prototype.ready = function(callback){
		var scope = this;
		scope._readyCallback = callback;
		if(!scope._storeTo) scope.storeTo('memory') 
		scope._storeTo(callback)
	}
	
	Local.prototype.set = function(query){
		return new Set(query, this)
	};
	
	Local.prototype.get = function(query){
		return new Get(query, this)
	};


// ====================================================
//  Export (common js)
// ====================================================
	
	if(module && module.exports) module.exports = Local;
	
	