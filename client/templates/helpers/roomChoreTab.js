Template.roomChoreTab.helpers({
	buttonClass: function () {
		return choreCompleteButtonClass(this);
	},
	buttonIcon: function () {
		return choreCompleteButtonIcon(this);
	},
	completed: function () {
		if (this) {
			return Completed.find({chore: this._id});
		}
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
