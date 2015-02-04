Template.joinHouseForm.events = {
	'submit .join-house-form': function (e) {
		e.preventDefault();
		var pass = sanitizeInput($('#pass').val());
		if (!pass) {
			alert("warning", "Join House Error: Password required.");
			$('#pass').focus();
			return;
		}
		var options = {
			id: e.target.id,
			password: pass
		};
		var that=this;
		Meteor.call('joinHouse', options, function (err) {
			if (err) {
				alert("danger", 'Join House Error: '+err.error);
				if (err.error == 'Incorrect house Password') {
					$('#pass').val('');
					$('#pass').focus();
				}
				return;
			}
			closeModal();
			Router.go('/house');
			alert("success", "Successfully joined "+that.name);
		});
	}
};
