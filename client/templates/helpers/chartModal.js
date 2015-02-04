Template.chartModalBody.rendered = function () {
	renderChart(this.data.chart, this.data.type, 'chart-modal-canvas');
};

Template.chartModalBody.helpers({
	doughnut: function () {
		if (this) {
			if (this.type == 'Doughnut') return true;
		}
		return false;
	}
});
