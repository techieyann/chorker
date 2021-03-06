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
	backdateChore: function (options) {
		if (Meteor.user()) {
			var houseId = Meteor.user().profile.house;
			var username = Meteor.user().profile.username;
			if (!username) username = Meteor.user().emails[0].address;
			var completed = {
				user: Meteor.user()._id,
				username: username,
				house: houseId,
				chore: options.id,
				completed_on: options.datetime
			};
			Completed.insert(completed);
			return Meteor.call('updateChoreMetadata',options.id, function (err) {
				if (err) throw err;
			});
		}
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
	deleteCompletedChore: function (options) {
		Completed.remove({_id: options.completeId});
		return Meteor.call('updateChoreMetadata', options.choreId, function (err) {
			if (err) throw err;
		});
	},
	updateChoreMetadata: function (choreId) {
		var completedArray = Completed.find({chore:choreId}, {sort: {completed_on: 1}}).fetch();
		var timesCompleted = completedArray.length;
		var newPeriod = 0;
		var lastCompleted = '';
		if (timesCompleted > 0) {
			lastCompleted = completedArray[timesCompleted-1].completed_on;


			if (timesCompleted > 1) {
				completedArray.forEach(function (val, index) {
					if (index == 1) {
						newPeriod = moment(val.completed_on).diff(moment(completedArray[0].completed_on), 'seconds');
					}
					if (index > 1) {
						var diff = moment(val.completed_on).diff(moment(completedArray[index-1].completed_on), 'seconds');
						newPeriod = ((newPeriod*index)+diff) / (index+1);
					}
				});
			}
		}

		metadata = {
			last_completed: lastCompleted,
			period: newPeriod,
			times_completed: timesCompleted
		};
		return Chores.update({_id: choreId}, {$set: metadata});

	},
	resetChores: function (options) {
		var id = options.id;
		Completed.remove({house: id});
		Chores.update({house_id: id}, {$set: {last_completed: "", times_completed: 0, period: ""}}, {multi:true});
	},
	joinHouse: function (options) {
		if (Meteor.isServer) {
			var house = Houses.findOne({_id: options.id});

			if (house) {

				if (house.pass == options.password) {
					Meteor.users.update({_id: Meteor.user()._id}, {$set:{
						"profile.initialized":true,
						"profile.house":options.id
					}});
					var mates = house.members;
					var username = Meteor.user().profile.username;
					if (!username) username = Meteor.user().emails[0].address;
					mates[Meteor.user()._id] = username;
					return Houses.update({_id: house._id},{$set: {members: mates}});
				}
				else { throw new Meteor.Error('Incorrect house Password');}
			}
			
			throw new Meteor.Error('Could not find specified house');																
		}
	},
	removeHousemate: function (options) {
		if (Meteor.user()) {
			var userId = Meteor.user()._id;
			if (Meteor.isClient) {
				var house = Session.get("house");
				if (userId != options.userId && userId != house.owner) {
					throw new Meteor.Error('Not manager -- cannot remove other users from house');
				}
			}
			if (Meteor.isServer) {
				var house = Houses.findOne({_id: options.house});
				if (house) {
					if (userId == house.owner) {
						if (options.userId == userId) throw new Meteor.Error('You are the manager of this house and cannot remove yourself from it');
						Meteor.users.update({_id: options.userId}, {$set:{
							"profile.initialized": false,
							"profile.house": ''
						}});
						var mates = house.members;
						delete mates[options.userId];
						return Houses.update({_id: house._id},{$set: {members: mates}});
					}
					else if (userId == options.userId) {
						Meteor.users.update({_id: options.userId}, {$set:{
							"profile.initialized": false,
							"profile.house": ''
						}});
						var mates = house.members;
						delete mates[options.userId];
						return Houses.update({_id: house._id},{$set: {members: mates}});
					}
					else throw new Meteor.Error('Cannot remove others from the house, contact house manager');

				}
				else throw new Meteor.Error('Could not find specified house');
			}
		}
		else throw new Meteor.Error('Must be logged in to remove members from house');
	},
	changeHousePass: function (options) {
		var house = options.house;
		var newPass = options.newPass;
		console.log(options);
		if (house && newPass) {
			return Houses.update({_id: house},{$set: {pass: newPass}});
		}
		throw new Meteor.Error('Could not update house password');
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
					'room': 'misc'
				}});
				return;
			}
			else throw new Meteor.Error('Could not find specified room');
		}
		throw new Meteor.Error('Could not find specified house');
	},
	changeUsername: function (name) {
		var userId = Meteor.user()._id
		Meteor.users.update({_id: userId}, {$set:{
			"profile.username":name
		}});
		var house = Houses.findOne({_id: Meteor.user().profile.house});
		if (house) {
			var mates = house.members;
			if (! mates) mates = {};
			mates[userId] = name;
			return Houses.update({_id: house._id}, {$set: {members: mates}});
		}
	}
});
