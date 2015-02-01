Template.roomByHousemate.helpers({
	chartHidden: function () {
		if (this.chart.length) return false;
		return true;
	},
	initChartAutorun: function () {
		var that = this;
		Deps.autorun(function () {
			renderRoomDoughnutChart(that.chart);
		});
	}
});

Template.roomByHousemate.rendered = function () {
	renderRoomDoughnutChart(this.data.chart);
};

