Template.chores.helpers({

});

Template.chores.events = {
	'click #create-new-chore': function (e) {
		openModal('newChoreFormHeader', 'newChoreForm', '', null);
	}
};

Template.choreTab.helpers({
	roomFilter: function () {
		return (Session.get("choreFilters").room ? true : false);
	},
});
