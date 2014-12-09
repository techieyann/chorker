Chores = new Mongo.Collection('chores');
Houses = new Mongo.Collection('houses');
Completed = new Mongo.Collection('completed');


Meteor.methods({
	doChore: function (options) {
		Chores.update({_id:options.chore}, {
			$set: {
				last_completed:options.completed_on, 
				period:options.period
			}, 
			$inc: {
				times_completed:1
			}
		});
		delete options.period;
		return Completed.insert(options);
	},
	createChore: function (options) {
		return Chores.insert(options);
	},
	deleteChore: function (options) {
		Completed.remove({chore: options._id});
		return Chores.remove({_id: options._id});
	},
	editChore: function (options) {
		var id = options._id;
		updatedChore = {
			desc: options.choreDesc,
			name: options.choreName,
			room: options.choreRoom
		};
		Chores.update({_id: id}, {$set: updatedChore});
	},
	joinHouse: function (options) {

		var house = Houses.findOne({_id: options.id});

		if (house) {
			if (house.pass == options.password) {
				Meteor.users.update({_id: Meteor.user()._id}, {$set:{
					"profile.initialized":true,
					"profile.house":options.id
				}});
				return;
			}
			else { throw new Meteor.Error('Incorrect house Password');}
		}
		throw new Meteor.Error('Could not find specified house');																
	},
	createHouse: function (options) {
		return Houses.insert(options);
	},
	newRoom: function (options) {
		var id = options.id;
		var roomName = options.name;
		var house = Houses.findOne({_id: id});
		if (house) {
			if (house.rooms) {
				house.rooms.push({name: roomName});
				house.rooms = house.rooms.sort(function(a,b){
					if (a.name > b.name) {
						return 1;
					}
					if (a.name < b.name) {
						return -1;
					}
					// a must be equal to b
					return 0;
				});
			}
			else {
				house.rooms = [{
					name: roomName
				}];
			}
			Houses.update({_id: id}, {$set:{
				'rooms': house.rooms
			}});
			return;
		}
		throw new Meteor.Error('Could not find specified house');
	},
	deleteRoom: function (options) {
		var id = options.id;
		var roomName = options.name;
		
		var house = Houses.findOne({_id: id});
		if (house) {
			var index = -1;
			house.rooms.some(function (val, key) {
				if (val.name == roomName) {
					index = key;
					return true;
				}
			});
			if (index >= 0) {
				house.rooms.splice(index, 1);
				Houses.update({_id: id}, {$set:{
					'rooms': house.rooms
				}});
				Chores.update({house_id: id, room: roomName}, {$set:{
					'room': 'other'
				}});
				return;
			}
			else throw new Meteor.Error('Could not find specified room');
		}
		throw new Meteor.Error('Could not find specified house');
	}
});
