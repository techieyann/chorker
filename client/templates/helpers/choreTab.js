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
	},
	buttonClass: function () {
		if (this) {
			var lastComplete = Completed.findOne({chore:this._id, user:Meteor.user()._id}, {sort: {completed_on: -1}});
			if (lastComplete)	{
				var hours = moment().diff(lastComplete.completed_on, 'hours');
				if (hours < 1) {
					return 'btn-success disabled';
				}
			}
		}
		return 'btn-primary';
	}
});

Template.choreTab.events = {
	'click .complete-chore': function (e) {
		if (this) {
			var button = $('#'+e.target.id+'.complete-chore');
			if (Meteor.user()) {
				var options = {
					user: Meteor.user()._id,
					username: Meteor.user().emails[0].address,
					house: this.house_id,
					chore: this._id,
					completed_on: moment().format()
				}
				Meteor.call('doChore', options, function (err) {
					if (err) {
						alert("danger", "Complete Chore Error: "+err.message);
						return;
					}
				});
			}
		}
	},
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
