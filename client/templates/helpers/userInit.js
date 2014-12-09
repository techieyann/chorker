Template.userInit.events = {
	'click .join-house': function (e) {
		if (this) {
			openModal('','joinHouseForm', '', this);
			$('#pass').focus();
		}
	}
};
