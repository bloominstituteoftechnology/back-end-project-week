var fs = require('fs')

module.exports = function(Local, path, finish){

	fs.readFile(path, function(error, response){
		if(error && error.code == 'ENOENT'){
			fs.writeFile(path, '{}', function(error){
				if(error) finish.apply(this, arguments)
				udpateMemory()
			})
		} else if (error) {
			if(error) finish.apply(this, arguments)
		} else {
			udpateMemory(JSON.parse(response))
			
		}
		
		function udpateMemory(response){
			Local.memory = response ? response : Local.memory ;
			finish(null, Local.memory)
		}
	})
	
	var storage = Local.storage('fileSystem')
	
	storage.setter(function(parent, query, language, translation, done){
		// get query from memory
		if(!parent.memory[query]) parent.memory[query] = {};
		
		// get query in language from memory
		if(!parent.memory[query][language]) parent.memory[query][language] = {};
		
		// save translation into memory for the query and the right language
		parent.memory[query][language] = translation;
		
		fs.writeFile(path, JSON.stringify(parent.memory, null, 4), function(error){
			if(error) {
				done.apply(this, arguments)
			} else {
				done(null, parent.memory[query][language])
			}
		})
	})
	storage.getter(function(parent, query, language, done){
		if(parent.memory[query] && parent.memory[query][language]){
			if(done) done(null, parent.memory[query][language])
			return parent.memory[query][language];
		} else {
			if(done) done(null, null)
			return null;
		}
	})
}