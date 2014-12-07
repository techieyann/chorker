Template.deleteChoreModalFooter.events = {
	'click #cancel': function (e) {
		$('#modal').modal('hide');
	},
	'click #delete': function (e) {
		if (this) {

			Meteor.call('deleteChore', this, function (err) {
				if (err) {
					alert("danger", "Delete Chore Error: " + err.message);
					return;
				}
				$('#modal').modal('hide');
			});
		}
	}
};
