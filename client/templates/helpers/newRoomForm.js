Template.newRoomForm.events = {
	'submit #new-room-form': function (e) {
		e.preventDefault();

		var roomName = sanitizeInput($('#new-room').val());
		roomName = roomName.replace('-',' ');
		if (roomName == '') {
			alert("warning", "New Room Warning: Name for room/space is required");
			$('#new-room').focus();
			return;
		}
		var house = Session.get("house");
		if (house) {
			if (house.rooms) {
				var index = -1;

				house.rooms.some(function (val, key) {

					if (val.name == roomName) {
						index = key;
						return true;
					}
				});
				if (index >= 0) {
					alert("danger", "New Room Error: '"+roomName+"' already taken");
					$('#new-room').val('');
					$('#new-room').focus();
					return;
				}
			}
			var options = {
				id: house._id,
				name: roomName
			};
			Meteor.call('newRoom', options, function (err) {
				if (err) {
					alert("danger", "New Room Error: " + err.message);
					$('#new-room').focus();
					return;
				}
				$('#new-room').val('');
			});
		}

	}
};
