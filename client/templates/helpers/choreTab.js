Template.choreTab.helpers({
	choreOwner: function () {
		return checkChoreOwner(this);
	},
	buttonClass: function () {
		return choreCompleteButtonClass(this);
	},
	buttonIcon: function () {
		return choreCompleteButtonIcon(this);
	}
});

Template.choreTab.events = {
	'click .complete-chore': function(e) {
		var button = $('#'+e.target.id+'.complete-chore');
		if (this) queueChore(this, button);
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
