Template.backdateChoreModalBody.rendered = function () {
	var today = moment().format('MM/DD/YYYY');
	$('#datetime-completed').datetimepicker({
		defaultDate: today,
		maxDate: today
	});
};

Template.backdateChoreModalBody.helpers({
	today: function () {
		return moment().format('MM/DD/YYYY');
	}
});

Template.backdateChoreModalFooter.events = {
	'click .backdate-chore': function (e) {
		var chore = this;
		var backdate = $('#datetime-completed').val();
		var momentBackdate = moment(backdate, 'MM/DD/YYYY hh:mm A').format();
		var options = {
			id: chore._id,
			datetime: momentBackdate
		};
		
		Meteor.call('backdateChore', options, function (err) {
				if (err) {
					alert("danger", "Backdate Chore Error: " + err.message);
					return;
				}
			alert("success", "Backdated Chore: "+chore.name+" ("+chore.room+") @ "+backdate);
			closeModal();
		});
	}
};
