
Template.choreFilters.helpers({
	
	rooms: function () {
		var house = Session.get("house");
		if (house) {
			return house.rooms;
		}
	},
	filters: function () {
		return Session.get("choreFiltersActive");
	},
	searchFilter: function () {
		return (Session.get("choreFilters").search ? true : false);
	},
	searchQuery: function () {
		return Session.get("choreFilters").search;
	},
	activeRoom: function (room) {
		return (Session.get("choreFilters").room == room.replace(' ', '-') ? 'active' : '');
	},
	activeDue: function (due) {
		return (Session.get("choreFilters").due == due ? 'active' : '');
	}
});

clearChoreFilters = function (e) {
	Session.set("choreFilters", {});
	Session.set("choreFiltersActive", false);
};

Template.choreFilters.events = {
	'click #clear-filters': clearChoreFilters,
	'click #clear-search': function (e) {
		e.preventDefault();
		removeFilter('search');
	},
	'submit #chore-filter-search-form': function (e) {
		e.preventDefault();
		var query = $('#search').val();
		if (query) {
			addFilter('search', query);
		}
		else {
			removeFilter('search');
		}
	},
	'click .room-filter': function (e) {
		var roomFilter = e.target.id;
		var roomButton = $('#'+roomFilter.replace(' ', '-'));
		if (roomButton.hasClass('active')) {
			removeFilter('room');
			roomButton.blur();
		}
		else {
			addFilter('room', roomFilter);
		}
	},
	'click .due-filter': function (e) {
		var dueFilter = e.target.id;
		var dueButton = $('#'+dueFilter);
		if (dueButton.hasClass('active')) {
			removeFilter('due');
			dueButton.blur();
		}
		else {
			addFilter('due', e.target.id);
		}
	}
};

var addFilter = function (filter, value) {
	var filters = Session.get("choreFilters");
	filters[filter] = value;
	Session.set("choreFilters", filters);
	Session.set("choreFiltersActive",true);
};

var removeFilter = function (filter) {
	var filters = Session.get("choreFilters");
	delete filters[filter];

	Session.set("choreFilters", filters);
	
	if (Object.keys(filters).length) {
		Session.set("choreFiltersActive",true);
	}
	else Session.set("choreFiltersActive",false);
};
