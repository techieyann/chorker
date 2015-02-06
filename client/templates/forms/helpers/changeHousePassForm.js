Template.changeHousePassForm.events = {
	'submit #change-house-pass-form': function (e) {
		e.preventDefault();
		var formData = $('#change-house-pass-form').serializeArray();
		var parsedData = parseFormData(formData);
		if (parsedData.housePass1 == '') {
			alert("warning", "Change House Pass Error: Password required.");
			$('#house-pass1').focus();
			return;
		}
		if (parsedData.housePass2 == '') {
			alert("warning", "Change House Pass Error: Password confirmation required.");
			$('#house-pass2').focus();
			return;
		}
		if (parsedData.housePass1 != parsedData.housePass2) {
			alert("warning", "Change House Pass Error: Password fields do not match.");
			$('#house-pass1, #house-pass2').val('');
			$('#house-pass1').focus();
			return;
		}
		console.log(parsedData);
		var options = {
			house: Session.get("house")._id,
			newPass: parsedData.housePass1
		};

		Meteor.call('changeHousePass', options, function (err) {
			if (err) {
				alert("danger", "Change House Pass Error: "+err.message, 5000);
				return;
			}
			alert("success", "Successfully change house password");
		});
	}
};
