Template.deleteRoomModalFooter.events = {
	'click #cancel': function (e) {
		$('#modal').modal('hide');
	},
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
