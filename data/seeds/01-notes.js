exports.seed = function(knex, Promise) {
	return knex('notes')
	.truncate()
	.then(function() {
		return knex('notes').insert([
			{
				title: 'Bacon Ipsum',
				content: 'Bacon ipsum dolor amet shoulder bacon buffalo shank t-bone beef bresaola pork loin. Pork t-bone turkey pork loin. Strip steak filet mignon ball tip pig chicken porchetta. Short ribs spare ribs filet mignon, turkey buffalo alcatra pancetta porchetta pork belly shank. Ground round venison short loin leberkas shank beef, corned beef ham hock salami tenderloin rump spare ribs shankle cow. Pig drumstick meatloaf, pork belly short loin turducken shoulder pork loin prosciutto tongue andouille sausage frankfurter ham hock ham. Pancetta porchetta bacon bresaola ground round filet mignon turkey jowl.\n\nChuck boudin tenderloin, chicken spare ribs burgdoggen biltong. Pork belly jowl kevin ham, tail cupim brisket swine shankle. Hamburger ground round tri-tip chicken landjaeger tongue. Tenderloin corned beef sirloin, swine ham jowl shoulder jerky filet mignon turkey spare ribs landjaeger ham hock strip steak picanha. Andouille kevin shank shoulder, swine beef ribs meatball ribeye rump capicola landjaeger short ribs. Ground round pastrami doner buffalo drumstick flank chuck.',
			},
			{
				title: 'Sleep everywhere, but not in my bed',
				content: 'Ptracy ears back wide eyed or jump off balcony, onto stranger\'s head. Refuse to drink water except out of someone\'s glass i love cuddles leave hair everywhere, so purr when being pet purr while eating. Chase dog then run away disappear for four days and return home with an expensive injury; bite the vet yet scamper so spread kitty litter all over house has closed eyes but still sees you or cats go for world domination yet twitch tail in permanent irritation. Russian blue scratch at the door then walk away chase red laser dot you are a captive audience while sitting on the toilet, pet me for hit you unexpectedly eat prawns daintily with a claw then lick paws clean wash down prawns with a lap of carnation milk then retire to the warmest spot on the couch to claw at the fabric before taking a catnap purr when being pet. While happily ignoring when being called attack dog, run away and pretend to be victim or refuse to come home when humans are going to bed; stay out all night then yowl like i am dying at 4am or white cat sleeps on a black shirt and thinking longingly about tuna brine. Cats are fats i like to pets them they like to meow back sit and stare flex claws on the human\'s belly and purr like a lawnmower dont wait for the storm to pass, dance in the rain fight an alligator and win lay on arms while you\'re using the keyboard. ',
			},
			{
				title: 'Lorem Ipsum',
				content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			},
		]);
	});
};
