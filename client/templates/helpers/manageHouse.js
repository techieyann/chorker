Template.manageHouse.events = {
	'click #chore-reset' : function () {
		var options = Template.parentData(1).resetChores;
		openModal('resetChoresModalHeader','resetChoresModalBody','resetChoresModalFooter', options);
	}
};

Template.manageHousemates.events = {
	'click .remove-housemate': function () {
		openModal('removeHousemateModalHeader', 'removeHousemateModalBody', 'removeHousemateModalFooter', this);
	}
};
