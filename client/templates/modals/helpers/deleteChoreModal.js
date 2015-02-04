Template.deleteChoreModalFooter.events = {
	'click #delete': function (e) {
		if (this) {

			Meteor.call('deleteChore', this, function (err) {
				if (err) {
					alert("danger", "Delete Chore Error: " + err.message);
					return;
				}
				$('#modal').modal('hide');
				Router.go('/chores');
			});
		}
	}
};
