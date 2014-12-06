Chores = new Mongo.Collection('chores');
Houses = new Mongo.Collection('houses');

Chores.allow({
	insert: function() {
		return true;
	},
	update: function () {
		return true;
	},
	remove: function () {
		return true;
  }
});

Houses.allow({
	insert: function() {
		return true;
	},
	update: function () {
		return true;
	},
	remove: function () {
		return true;
  }
});


Meteor.methods({
	doChore: function (choreID) {

	},
	createChore: function (options) {

	},
	joinHouse: function (options) {

		var house = Houses.findOne({_id: options.id});

		if(house){
			if (house.pass == options.password) {
				Meteor.users.update({_id: Meteor.user()._id}, {$set:{
					"profile.initialized":true,
					"profile.house":options.id
				}});
				return;
			}
			else{ throw new Meteor.Error('Incorrect house Password');}
		}
		throw new Meteor.Error('Could not find specified house');
			

																			
	},
	createHouse: function (options) {
		return Houses.insert(options);
	}

});
