

Template.chore.helpers({
	buttonClass: function () {
		return choreCompleteButtonClass(this.chore);
	},
	buttonIcon: function () {
		return choreCompleteButtonIcon(this.chore);
	},
	choreOwner: function () {
		return checkChoreOwner(this.chore);
	},
	isSelf: function () {
		if (this && Meteor.user()) {
			if (this.chore.user == Meteor.user()._id) {
				return true;
			}
		}
		return false;
	},
	noneCompleted: function () {
		if (this) {
			if (this.completed.count()) return false;
		}
		return true;
	}
});


Template.chore.events = {
	'click .complete-chore': function(e) {
		var button = $('#'+e.target.id+'.complete-chore');
		if (this.chore) queueChore(this.chore, button);
	},
	'click .edit-chore': function (e) {
		if (this.chore) editChoreModal(this.chore);
	},
	'click .delete-chore': function (e) {
		if (this.chore) deleteChoreModal(this.chore);
	}
};

Template.choreByHousemate.helpers({
	chartHidden: function () {
		if (this) {
			if (this.chart.length) return false;
		}
		return true;
	},
	initChartAutorun: function () {
		var that = this;
		Deps.autorun(function () {
			renderChoreDoughnutChart(that.chart);
		});
	}
});

Template.choreByHousemate.rendered = function () {
	renderChoreDoughnutChart(this.data.chart);
};
