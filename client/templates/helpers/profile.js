Template.profileReporting.helpers({
	noneCompleted: function () {
		if (this) {
			if (this.completed.length) return false;
			return true;
		}
	}
});

Template.profileCharts.helpers({
	chartHidden: function () {
		if (this.chart.data) return false;
		return true;
	},
	initChartAutorun: function () {
		var that = this;

		Deps.autorun(function () {
			renderChart(that.chart, 'Bar', 'profile-bar-chart');
		});
	}
});

Template.profileCharts.rendered = function () {
	renderChart(this.data.chart, 'Bar', 'profile-bar-chart');
};


changeUsernameModal = function () {
	openModal('usernameModalHeader','usernameForm','', null);
	Meteor.setTimeout(function(){$('#username-input').focus();},500);
};

Template.profile.events = {
	'click #change-username': function () {
		changeUsernameModal();
	}
};
