Template.houseDoughnutChart.helpers({
	chartHidden: function () {
		if (this.chart.length) return false;
		return true;
	},
	initChartAutorun: function () {
		var that = this;
		Deps.autorun(function () {
			renderChart(that.chart, 'Doughnut', 'house-doughnut-chart');
		});		
	}
});
Template.houseDoughnutChart.rendered = function () {
	renderChart(this.data.chart, 'Doughnut', 'house-doughnut-chart');
};
