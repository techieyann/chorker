Router.map(function () {
	this.route('house', {
		path: '/house',
		controller: 'RegisteredController',
		data: function () {
			var house = Session.get("house");
			if (Meteor.user() && house) {
				var housemateArray = [];
				for (var key in house.members) {
					housemateArray.push({
						id: key,
						name: house.members[key]
					});
				}

				return {
					houseName: house.name,
					houseId: house._id,
					isOwner: (house.owner == Meteor.user()._id ? true: false),
					housemates: housemateArray,
					chart: calcHouseDoughnutChart(),
					rooms: house.rooms,
					recentChores: Chores.find({},{sort: {last_completed: -1}, limit: 5}),
					leastRecentChores: Chores.find({},{sort: {last_completed: 1}, limit: 5})
				};
			}
		}
	});
	this.route('manageHouse', {
		path: '/house/:_id',
		controller: 'RegisteredController',
		data: function () {
			var house = Session.get("house");
			if (house) {
				var affectedChoresByRoom = {};
				house.rooms.forEach(function (val) {
					var roomName = val.name
					affectedChoresByRoom[roomName] = {
						id: house._id,
						name: roomName
					}
					var affectedChores = Chores.find({$and : [{house_id: house._id},{room: roomName}]}).count();
					if (affectedChores >0) {
						affectedChoresByRoom[roomName].numChores = affectedChores;
					}
				});
				resetChoreModalOptions = {
					id: house._id,
					numCompleted: Completed.find().count()
				};
				var housemateArray = [];
				for (var key in house.members) {
					housemateArray.push({
						id: key,
						name: house.members[key]
					});
				}
				return {
					rooms: house.rooms,
					affectedChores: affectedChoresByRoom,
					resetChores: resetChoreModalOptions,
					housemates: housemateArray
				};
			}
		}
	});
});
