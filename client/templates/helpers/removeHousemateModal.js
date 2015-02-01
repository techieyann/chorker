Template.removeHousemateModalFooter.events = {
	'click #cancel': function (e) {
		$('#modal').modal('hide');
	},
	'click #remove': function (e) {
		var house = Session.get("house");
		if (this && house) {
			var options = {
				userId: this.id,
				house: house._id
			};
			Meteor.call('removeHousemate', options, function (err) {
				if (err) {
					alert("danger", "Remove Housemate Error: " + err.message);
					return;
				}
				$('#modal').modal('hide');
			});
		}
	}
};
