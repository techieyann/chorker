Template.newChoreForm.helpers({
	rooms: function () {
		var house = Session.get("house");
		if (house) {
			return house.rooms;
		}
	}
});

Template.newChoreForm.events = {
	'submit #new-chore-form': function (e) {
		e.preventDefault();
		var formData = $('#new-chore-form').serializeArray();

		var parsedData = {};
		for(var i in formData) {
			parsedData[formData[i].name] = formData[i].value;
		}

		if (parsedData.choreName == '') {
			alert("warning", "New Chore Error: Name required.");
			$('#chore-name').focus();
			return;
		}
		var house = Session.get("house");
		if (house) {
			if (Chores.findOne({house: house._id, name: parsedData.choreName})) {
				alert("danger", "New Chore Error: '"+parsedData.choreName+"' already taken");
				$('#chore-name').val('');
				$('#chore-name').focus();
				return;
			}
			
			var options = {
				name: parsedData.choreName,
				desc: parsedData.choreDesc,
				room: parsedData.choreRoom,
				house_id: house._id,
				created_by: Meteor.user()._id
			};
			Meteor.call('createChore', options, function (err) {
				if (err) {
					alert("danger", "New Chore Error: "+ err.message);
					return;
				}
				$('#chore-name').val('');
				$('#chore-desc').val('');
				$('#chore-name').focus();
				hideModal();
			});
		}

	}
};
