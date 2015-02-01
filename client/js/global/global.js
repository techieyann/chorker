parseFormData = function (formData) {
	var parsedData = {};
	for(var i in formData) {
		parsedData[formData[i].name] = sanitizeInput(formData[i].value);
	}
	return parsedData;
};

sanitizeInput = function (input) {
	return input;
};

timelyCompleted = function (filter) {
	if (!filter) filter = [];
	var timeFilter = Session.get("timeFilter");
	var start = null;
	var end = null;
	switch(timeFilter.filter) {
	case 'day':
		start = moment().subtract(1, 'days').format();
		break;
	case 'week':
		start = moment().subtract(1, 'weeks').format();
		break;
	case 'month':
		start = moment().subtract(1, 'months').format();
		break;
	case 'year':
		start = moment().subtract(1, 'years').format();
		break;
	case 'custom':
		start = moment(timeFilter.range.from, 'MM/DD/YYYY').format();
		end = moment(timeFilter.range.to, 'MM/DD/YYYY').format();
		break;
	}
	if (start) {
			filter.push({completed_on: {$gte: start}});
		if (end) {
			filter.push({completed_on: {$lte: end}});
		}
	}
	if (filter.length) {
		return Completed.find({$and: filter});
	}
	return Completed.find();
};
