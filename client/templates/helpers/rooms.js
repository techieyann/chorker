Template.rooms.events = {
	'click .delete-room': function (e) {
		var room = e.target.id;
		var options = Template.parentData(1).affectedChores[room];
		if (options.numChores) {
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
};
