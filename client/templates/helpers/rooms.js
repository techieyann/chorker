Template.rooms.events = {
	'click .delete-room': function (e) {
		var house = Session.get("house");
		if (house) {
			var options = {
				id: house._id,
				name: e.target.id
			};
			var affectedChores = Chores.find({$and : [{house_id: house._id},{room: options.name}]});
			affectedChores = affectedChores.count()
			if (affectedChores >0) {
				options.numChores = affectedChores;
				openModal('deleteRoomModalHeader','deleteRoomModalBody','deleteRoomModalFooter', options);
			}
			else {
				Meteor.call('deleteRoom', options, function (err) {
					if (err) {
						alert("danger", "Delete Room Error: " + err.message);
						return;
					}
				});
			}
		}
	}
};
