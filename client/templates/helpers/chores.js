Template.chores.helpers({

});

Template.chores.events = {
	'click #create-new-chore': function (e) {
		openModal('newChoreFormHeader', 'newChoreForm', '', null);
	}
};
