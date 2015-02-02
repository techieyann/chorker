Template.timeFilterModalBody.rendered = function () {
	$('#start').datepicker({
		changeMonth: true,
		maxDate: Session.get("timeFilter").range.to,
		onClose: function (selectedDate) {
			$('#end').datepicker("option", "minDate", selectedDate);
			var timeFilter = Session.get("timeFilter");
			timeFilter.range.from = selectedDate;
			Session.set("timeFilter", timeFilter);
		}
	});
	$('#end').datepicker({
		changeMonth: true,
		minDate: Session.get("timeFilter").range.from,
		maxDate: 1,
		onClose: function (selectedDate) {
			$('#start').datepicker("option", "maxDate", selectedDate);
			var timeFilter = Session.get("timeFilter");
			timeFilter.range.to = selectedDate;
			Session.set("timeFilter", timeFilter);
		}
	});
};



Template.timeFilterModalBody.helpers({
	activeFilter: function (filter) {
		var timeFilter = Session.get("timeFilter");
		return (filter == timeFilter.filter ? 'primary':'default');
	},
	customActive: function () {
		var timeFilter = Session.get("timeFilter");
		return (timeFilter.filter == 'custom' ? true:false);
	},
	startTime: function () {
		var timeFilter = Session.get("timeFilter");
		return timeFilter.range.from;
	},
	endTime: function () {
		var timeFilter = Session.get("timeFilter");
		return timeFilter.range.to;
	}
});

Template.timeFilterModalBody.events = {
	'click .time-filter': function (e) {
		var filter = e.target.id;
		var timeFilter = Session.get("timeFilter");
		timeFilter.filter = filter;
		Session.set("timeFilter", timeFilter);
	}
};
