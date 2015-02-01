Template.houseDoughnutChart.helpers({
	chartHidden: function () {
		if (this.chart.length) return false;
		return true;
	},
	initChartAutorun: function () {
		var that = this;
		Deps.autorun(function () {
			renderHouseDoughnutChart(that.chart);
		});		
	}
});
Template.houseDoughnutChart.rendered = function () {
	renderHouseDoughnutChart(this.data.chart);

};
