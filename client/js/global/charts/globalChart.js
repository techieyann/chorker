renderChart = function (chartData, chartType, selector) {
	if (selector) {
		var chartElement = document.getElementById(selector);	
		if (chartElement && !emptyChartData(chartData)) {
			if (chartType == 'Bar') {
				chartData = {
					labels: chartData.labels,
					datasets: [{
						fillColor: "rgba(151,187,205,0.5)",
						strokeColor: "rgba(151,187,205,0.8)",
						highlightFill: "rgba(151,187,205,0.75)",
						highlightStroke: "rgba(151,187,205,1)",
						data: chartData.data
					}]
				};
			}
			new Chart(chartElement.getContext("2d"))[chartType](chartData,null);
		}
	}
};

var emptyChartData = function (chartData) {
	if (chartData) {
		var chartDataObj = Object.keys(chartData);
		if (chartDataObj) {
			if (chartDataObj.length) {
				return false;
			}
		}
		else return false;
	}
	return true;
}

