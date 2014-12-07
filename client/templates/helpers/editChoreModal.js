Template.editChoreModalBody.helpers({
	rooms: function (chore) {
		var house = Session.get("house");
		if (house) {
			house.rooms.some(function (val, key) {
				if (val.name == chore.room) {
					house.rooms[key].selected = 1;
					return true;
				}
			});
			return house.rooms;
		}
	},
	selectedRoom: function () {
		if (this.selected) return 'selected';
	}
});

Template.editChoreModalFooter.events = {
	'click #cancel': function (e) {
		$('#modal').modal('hide');
	},
	'click #edit': function (e) {
		var formData = $('#edit-chore-form').serializeArray();

		var parsedData = parseFormData(formData);

		if (parsedData.choreName == '') {
			alert("warning", "Edit Chore Error: Name required.");
			$('#chore-name').focus();
			return;
		}
		if (this) {
			var house = Session.get("house");
			if (house) {
				if (Chores.findOne({_id: {$not : this._id}, house: house._id, name: parsedData.choreName})) {
					alert("danger", "Edit Chore Error: '"+parsedData.choreName+"' already taken");
					$('#chore-name').val('');
					$('#chore-name').focus();
					return;
				}
				

				parsedData._id = this._id;
				Meteor.call('editChore', parsedData, function (err) {
					if (err) {
						alert("danger", "Edit Chore Error: " + err.message);
						return;
					}
					$('#modal').modal('hide');
				});
			}
		}
	}
};
