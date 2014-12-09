Template.usernameForm.helpers({
	username: function () {
		if (Meteor.user()) {
			if (Meteor.user().profile.initialized) {
				return Meteor.user().profile.username;
			}
		}
	}
});

Template.usernameForm.events = {
	'submit #username-form': function (e) {
		e.preventDefault();
		var name = $('#username-input').val();
		if (name == '') {

			alert("warning", "Change Username Warning: Name is required");
			$('#username-input').focus();
			return;

		}
		if (Meteor.user()) {
			Meteor.call('changeUsername', name, function (err) {
				if (err) {
					alert("danger", "Change Username Error: "+err.message);
					return;
				}
				closeModal();
				alert("success", "Successfully changed username to '"+name+"'");
			});
		}
	}
};

Template.usernameModalFooter.events = {
	'click #close': function (e) {
		alert("info", "You can always change your username in your profile");
		closeModal();
	}
};
