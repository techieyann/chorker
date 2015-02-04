Template.deleteRoomModalFooter.events = {
	'click #delete': function (e) {
		if (this) {

			Meteor.call('deleteRoom', this, function (err) {
				if (err) {
					alert("danger", "Delete Room Error: " + err.message);
					return;
				}
				$('#modal').modal('hide');
				clearChoreFilters();
			});
		}
	}
};
