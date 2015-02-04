renderChart = function (chartData, chartType, selector) {
	if (selector) {
		var chartElement = document.getElementById(selector);	
		if (chartElement && chartData) {
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


