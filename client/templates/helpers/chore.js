Template.chore.helpers({
	choreOwner: function () {
		return checkChoreOwner(this);
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
