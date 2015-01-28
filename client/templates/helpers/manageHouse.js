Template.manageHouse.events = {
	'click #chore-reset' : function () {
		var house = Session.get("house");
		if (house) {
			var options = {
				id: house._id,
			};
			var completedChores = Completed.find().count();
			options.numCompleted = completedChores;
			openModal('resetChoresModalHeader','resetChoresModalBody','resetChoresModalFooter', options);
		}
	}
};
