Template.roomChoreTab.helpers({
	buttonClass: function () {
		return choreCompleteButtonClass(this);
	},
	buttonIcon: function () {
		return choreCompleteButtonIcon(this);
	},
	noneCompleted: function () {
		if (this) {
			if (this.completed.count()) return false;
		}
		return true;
	}
});

Template.roomChoreTab.events = {
	'click .complete-chore': function(e) {
		var button = $('#'+e.target.id+'.complete-chore');
		if (this) queueChore(this, button);
	},
	'click .goto-chore': function (e) {
		if (this) Router.go('/chores/'+this._id);
	}
};
