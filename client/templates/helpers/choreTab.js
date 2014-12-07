Template.choreTab.helpers({
	choreOwner: function () {
		if (Meteor.user()) {
			if (Meteor.user().profile.initialized) {
				var house = Session.get("house");
				if (house) {
					if (house.owner == Meteor.user()._id) {
						return true;
					}
				}
				if (this) {
					if (this.created_by == Meteor.user()._id) {
						return true;
					}
				}
			}
		}
	}
});

Template.choreTab.events = {
	'click .edit-chore': function (e) {
		if (this) {
			editChoreModal(this);
		}
	},
	'click .delete-chore': function (e) {
		if (this) {
			deleteChoreModal(this);		
		}
	}
};


editChoreModal = function (chore) {
	openModal('editChoreModalHeader', 'editChoreModalBody', 'editChoreModalFooter', chore);
};

deleteChoreModal = function (chore) {
	openModal('deleteChoreModalHeader', 'deleteChoreModalBody', 'deleteChoreModalFooter', chore);
};
