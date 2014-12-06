Template.joinHouseForm.events = {
	'submit .join-house-form': function (e) {
		e.preventDefault();
		var pass = $('#pass').val();
		if (!pass) {
			alert("warning", "Join House Error: Password required.");
			$('#pass').focus();
			return;
		}
		var options = {
			id: e.target.id,
			password: pass
		};
		Meteor.call('joinHouse', options, function (err) {
			if (err) {
				alert("danger", 'Join House Error: '+err.error);
				if (err.error == 'Incorrect house Password') {
					$('#pass').val('');
					$('#pass').focus();
				}
				return;
			}
			Router.go('house');
		});
	}
};
