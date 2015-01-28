Template.resetChoresModalFooter.events = {
	'click #cancel': function (e) {
		$('#modal').modal('hide');
	},
	'click #reset': function (e) {
		Meteor.call('resetChores', this, function (err) {
			if (err) {
				alert("danger", "Reset Chores Error: " + err.message);
				return;
			}
			$('#modal').modal('hide');
		});
	}
};
