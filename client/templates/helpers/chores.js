Template.chores.helpers({
	chores: function () {
		if (Session.equals("choreFiltersActive", true)) {
		var choreFilters = Session.get("choreFilters");		
			var house = Session.get("house");

			var filters = {};

			if (choreFilters.indexOf('search') != -1) {
				var query = Session.get("choreSearchQuery");
				if (query) {
					query = query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
					regSearch = new RegExp(query, "i");
					filters = {$or: [{'name': regSearch},{'desc': regSearch}]};
				}
			}
			if (choreFilters.indexOf('room') != -1) {
				var room = $('.room-filter.active').attr('id');
				room = room.replace('-', ' ');
				filters['room'] = room;
			}
			filters['house_id'] = house._id;
			var foundChores = Chores.find(filters);
			if (choreFilters.indexOf('due') != -1) {
				var dueChores = [];
				var due = $('.due-filter.active').attr('id');
				foundChores.forEach(function (chore) {					
					if (chore.last_completed) {
							var diff = moment().diff(chore.last_completed, 'seconds');

						if (chore.period) {


							switch(due){
							case 'success':
								if (diff < chore.period) dueChores.push(chore);
								break;
							case 'primary':
								if (diff > chore.period && diff < (chore.period * 2)) dueChores.push(chore);
								break;
							case 'warning':
								if (diff > (2 * chore.period) && diff < (chore.period * 3)) dueChores.push(chore);
								break;
							case 'danger':
								if (diff > (3 * chore.period)) dueChores.push(chore);
								break;
							}							
						}
					else if (due == 'primary') dueChores.push(chore);
					}
					else if (due == 'never') dueChores.push(chore);
				});

				return dueChores;
			}
			else return foundChores;
		}

		if (this) {

			return this;
		}
	}
});

Template.chores.events = {
	'click #create-new-chore': function (e) {
		openModal('newChoreFormHeader', 'newChoreForm', '', null);
	}
};