Template.removeChoreCompletionModalFooter.events = {
	'click #remove': function (e) {
		var options = {
			completeId: this.completed._id,
			choreId: this.completed.chore
		};
		Meteor.call('deleteCompletedChore', options, function (err) {
			if (err) {
				alert('danger', 'Remove Completed Chore Error: '+err);
				return;
			}
			closeModal();
		});
	}
};
