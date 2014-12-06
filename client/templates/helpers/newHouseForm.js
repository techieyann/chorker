Template.newHouseForm.events = {
	'submit #new-house-form': function (e) {
		e.preventDefault();
		var formData = $('#new-house-form').serializeArray();

		var parsedData = {};
		for(var i in formData) {
			parsedData[formData[i].name] = formData[i].value;
		}
		if (parsedData.houseName == '') {
			alert("warning", "New House Error: Username required.");
			$('#house-name').focus();
			return;
		}
		if (Houses.findOne({name: parsedData.houseName})) {
			alert("danger", "New House Error: '"+parsedData.houseName+"' already taken");
			$('#house-name').val('');
			$('#house-name').focus();
			return;
		}
		if (parsedData.housePass1 == '') {
			alert("warning", "New House Error: Password required.");
			$('#house-pass1').focus();
			return;
		}
		if (parsedData.housePass2 == '') {
			alert("warning", "New House Error: Password confirmation required.");
			$('#house-pass2').focus();
			return;
		}
		if (parsedData.housePass1 != parsedData.housePass2) {
			alert("warning", "New House Error: Password fields do not match.");
			$('#house-pass1, #house-pass2').val('');
			$('#house-pass1').focus();
			return;
		}
		var options = {
			name: parsedData.houseName,
			pass: parsedData.housePass1,
			owner: Meteor.user()._id
		};
		Meteor.call('createHouse', options, function (err, id) {
			if (err) {
				alert("danger", err.message, 5000);
				return;
			}
		Meteor.users.update({_id: Meteor.user()._id}, {$set:{
			"profile.initialized":true,
			"profile.house":id
		}});
			Router.go('house');
		});
	}
};
