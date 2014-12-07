Template.registerHelper('spacesToHyphens', function (inputStr) {
	return inputStr.replace(' ','-');
});

Template.registerHelper('houseOwner', function () {
	var house = Session.get("house");
	if (house) {
		if (Meteor.user()) {
			if (Meteor.user().profile.initialized) {
				return Meteor.user()._id == house.owner;
			}
		}
	}
});

parseFormData = function (formData) {
	var parsedData = {};
	for(var i in formData) {
		parsedData[formData[i].name] = sanitizeInput(formData[i].value);
	}
	return parsedData;
};

sanitizeInput = function (input) {
	return input.replace(/[\-\[\]{}*+;\\\^$|#]/g, "\\$&");
}

var round2Dec = function (num) {
	return Math.round(num*100)/100;
}

Template.registerHelper('secondsToMinutes', function (seconds) {
	return round2Dec(seconds/60);
});

Template.registerHelper('secondsToHours', function (seconds) {
	return round2Dec((seconds/60)/60);
});

Template.registerHelper('secondsToDays', function (seconds) {
	return round2Dec((seconds/3600)/24);
});
