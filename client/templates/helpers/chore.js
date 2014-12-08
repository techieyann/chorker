Template.chore.helpers({
	chore: function () {
		if (this) return this;
		else Router.go('/chores');
	},
	completed: function () {
		if (this) {
			return Completed.find({chore: this._id}, {sort: {completed_on:-1}});
		}
	},
	buttonClass: function () {
		return choreCompleteButtonClass(this);
	},
	buttonIcon: function () {
		return choreCompleteButtonIcon(this);
	},
	choreOwner: function () {
		return checkChoreOwner(this);
	}
});


Template.chore.events = {
	'click .complete-chore': function(e) {
		var button = $('#'+e.target.id+'.complete-chore');
		if (this) queueChore(this, button);
	},
	'click .edit-chore': function (e) {
		if (this) editChoreModal(this);
	},
	'click .delete-chore': function (e) {
		if (this) deleteChoreModal(this);
	}
};

queueChore = function (chore, button) {
	if (button.hasClass('pending')) {
		var timeouts = Session.get("choreTimers");
		var timeoutId = timeouts[chore._id];
		if (timeoutId) {
			Meteor.clearTimeout(timeoutId);
			delete timeouts[chore._id];
			Session.set("choreTimers", timeouts);
			button.removeClass('pending');
		}
	}
	else {
		button.addClass('pending');

		var timeoutId = Meteor.setTimeout(function () {
			completeChore(chore);
			var timeouts = Session.get("choreTimers");
			delete timeouts[chore._id];
			Session.set("choreTimers", timeouts);
			button.removeClass('pending');
		}, 10000);
		var timeouts = Session.get("choreTimers");
		timeouts[chore._id] = timeoutId;
		Session.set("choreTimers", timeouts);		
	}
};

completeChore = function (chore) {
	if (Meteor.user()) {
		var username = Meteor.user().profile.username;
		if (!username) username = Meteor.user().emails[0].address;
		var options = {
			user: Meteor.user()._id,
			username: username,
			house: chore.house_id,
			chore: chore._id,
			completed_on: moment().format()
		}
		if (chore.times_completed) {
			var diff = moment().diff(chore.last_completed, 'seconds');
			if (chore.period) {
				options.period = ((chore.period*chore.times_completed)+diff) / (chore.times_completed+1);
			}
			else options.period = diff;
		}

		Meteor.call('doChore', options, function (err) {
			if (err) {
				alert("danger", "Complete Chore Error: "+err.message);
				return;
			}
			alert("success", "Completed Chore: "+chore.name+" ("+chore.room+")");
		});
	}
};

choreClass = function (chore) {
	if (chore) {
		var choreClass = '';
		if (chore.last_completed)	{
			var seconds = moment().diff(chore.last_completed, 'seconds');
			if (chore.period) {
				if (seconds < chore.period) {
					choreClass = 'success';
				}
				if (seconds > chore.period) {
					choreClass = 'primary';
				}
				if (seconds > 2 * chore.period) {
					choreClass = 'warning';
				}
				if (seconds > 3 * chore.period) {
					choreClass = 'danger';
				}
			}
			else {
				choreClass = 'primary';
			}
		}
		else choreClass = '';
	}

	return choreClass;
};

choreCompleteButtonClass = function (chore) {
	buttonClass = '';
	if (chore) {
		var cC = choreClass(chore);
		if (cC != '') buttonClass = 'btn-'+cC;
	}
	return buttonClass;
};

choreCompleteButtonIcon = function (chore) {
	if (chore) {
		var pending = Session.get("choreTimers");
		if (pending) {
			if (pending[chore._id]) return 'glyphicon-ok-sign';
		}
	}
	return 'glyphicon-ok';
};

checkChoreOwner = function (chore) {
	if (Meteor.user()) {
		var house = Session.get("house");
		if (house) {
			if (house.owner == Meteor.user()._id) {
				return true;
			}
		}
		if (chore) {
			if (chore.created_by == Meteor.user()._id) {
				return true;
			}
		}
	}
	return false;
};
editChoreModal = function (chore) {
	openModal('editChoreModalHeader', 'editChoreModalBody', 'editChoreModalFooter', chore);
};

deleteChoreModal = function (chore) {
	openModal('deleteChoreModalHeader', 'deleteChoreModalBody', 'deleteChoreModalFooter', chore);
};
