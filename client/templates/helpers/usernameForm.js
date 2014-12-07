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
		var name = sanitizeInput($('#username-input').val());
		if (name == '') {

			alert("warning", "Change Username Warning: Name is required");
			$('#username-input').focus();
			return;

		}
		if (Meteor.user()) {
			Meteor.users.update({_id: Meteor.user()._id}, {$set:{
				"profile.username":name
			}});
			alert("success", "Successfully changed username to '"+name+"'");
		}
	}
};