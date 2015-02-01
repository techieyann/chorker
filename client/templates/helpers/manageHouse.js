Template.manageHouse.events = {
	'click #chore-reset' : function () {
		var options = Template.parentData(1).resetChores;
		openModal('resetChoresModalHeader','resetChoresModalBody','resetChoresModalFooter', options);
	}
};
