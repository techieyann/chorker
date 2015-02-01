Template.choreByHousemate.rendered = function () {
	var that = this;
	Deps.autorun(function () {
		calcAndRenderChoreDoughnut(that.data);
	});
};

Template.chore.helpers({
	chore: function () {
		if (this) return this;
		else Router.go('/chores');
	},
	completed: function () {
		if (this) {
			return Completed.find({chore: this._id}, {sort: {completed_on:-1}});
		}
	},
	buttonClass: function () {
		return choreCompleteButtonClass(this);
	},
	buttonIcon: function () {
		return choreCompleteButtonIcon(this);
	},
	choreOwner: function () {
		return checkChoreOwner(this);
	},
	isSelf: function () {
		if (this && Meteor.user()) {
			if (this.user == Meteor.user()._id) {
				return true;
			}
		}
		return false;
	}
});


Template.chore.events = {
	'click .complete-chore': function(e) {
		var button = $('#'+e.target.id+'.complete-chore');
		if (this) queueChore(this, button);
	},
	'click .edit-chore': function (e) {
		if (this) editChoreModal(this);
	},
	'click .delete-chore': function (e) {
		if (this) deleteChoreModal(this);
	}
};


