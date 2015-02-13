Template.removeChoreCompletionModalFooter.events = {
	'click #remove': function (e) {
		var options = {
			completeId: this.completed._id,
			choreId: this.chore._id
		};
		Meteor.call('deleteCompletedChore', options, function (err) {
			if (err) {
				alert('danger', 'Remove Completed Chore Error: '+err);
				return;
			}
			alert('success', 'Successfully removed completed chore');
		});
			closeModal();
	}
};
