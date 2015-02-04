Template.roomByHousemate.helpers({
	chartHidden: function () {
		if (this.chart.length) return false;
		return true;
	},
	initChartAutorun: function () {
		var that = this;
		Deps.autorun(function () {
			renderChart(that.chart, 'Doughnut', 'room-doughnut-chart');

		});
	}
});

Template.roomByHousemate.rendered = function () {
	renderChart(this.data.chart, 'Doughnut', 'room-doughnut-chart');
};

