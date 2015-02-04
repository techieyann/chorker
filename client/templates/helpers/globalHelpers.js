Template.registerHelper('self', function () {
	if (this && Meteor.user()) {
		if (this.id == Meteor.user()._id) return true;
	}
	return false;
});

Template.registerHelper('spacesToHyphens', function (inputStr) {
	if (inputStr) return inputStr.replace(' ','-');
	return '';
});

Template.registerHelper('houseOwner', function () {
	var house = Session.get("house");
	if (house) {
		if (Meteor.user()) {
			return Meteor.user()._id == house.owner;
		}
	}
});

Template.registerHelper('humanReadableDate', function (datetime) {
	return moment(datetime).format('MMMM Do YYYY, h:mm a');
});

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

Template.registerHelper('buttonClass', function () {
	return choreCompleteButtonClass(this);
});
Template.registerHelper('buttonIcon', function () {
	return choreCompleteButtonIcon(this);
});

Template.registerHelper('manageableCompleted', function () {
	var house = Session.get("house");
	if (this && Meteor.user() && house) {
		var userId = Meteor.user()._id;
		if (this.user == userId || house.owner == userId) return true;
	}
	return false;
});

Template.index.events = {
	'click .time-filter' : function (e) {
		e.preventDefault();
		openModal('timeFilterModalHeader', 'timeFilterModalBody', 'timeFilterModalFooter');
	},
	'click .show-chart': function (e) {
		e.preventDefault();
		var options = {
			chart: this.data,
			type: this.type
		};
		switch (this.type) {
			case 'Doughnut': 
			options.name = 'Housemate Ratios';
			break;
			case 'Bar': 
			options.name = 'Room Count';
			break;
		}
		openModal('chartModalHeader', 'chartModalBody', '', options);

	},
	'click .backdate-chore': function (e) {
		e.preventDefault();
		var options = {
			_id: this._id,
			name: this.name,
			room: this.room
		}
		openModal('backdateChoreModalHeader','backdateChoreModalBody','backdateChoreModalFooter', options);
	},
	'click .remove-logged-chore': function (e) {
		e.preventDefault();
		var options = {
			completed: this,
			chore: Chores.findOne(this.chore)
		}


		openModal('removeChoreCompletionModalHeader','removeChoreCompletionModalBody','removeChoreCompletionModalFooter',options);
	},
	'click .complete-chore': function(e) {

		var button = $('#'+e.target.id+'.complete-chore');
		if (this) {queueChore(this, button);}
	},
	'click .edit-chore': function (e) {
		if (this) editChoreModal(this);
	},
	'click .delete-chore': function (e) {
		if (this) deleteChoreModal(this);
	},
	'click .goto-chore': function (e) {
		if (this) Router.go('/chores/'+this._id);
	},
	'click .close-modal': function (e) {
		closeModal();
	}
};

