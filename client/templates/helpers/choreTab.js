Template.choreTab.helpers({
	choreOwner: function () {
		return checkChoreOwner(this);
	},
	buttonClass: function () {
		return choreCompleteButtonClass(this);
	}
});

Template.choreTab.events = {
	'click .complete-chore': function(e) {
		if (this) completeChore(this);
	},
	'click .goto-chore': function (e) {
		if (this) Router.go('/chores/'+this._id);
	},
	'click .edit-chore': function (e) {
		if (this) editChoreModal(this);
	},
	'click .delete-chore': function (e) {
		if (this) deleteChoreModal(this);
	}
};
