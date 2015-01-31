parseFormData = function (formData) {
	var parsedData = {};
	for(var i in formData) {
		parsedData[formData[i].name] = sanitizeInput(formData[i].value);
	}
	return parsedData;
};

sanitizeInput = function (input) {
	return input;
}
