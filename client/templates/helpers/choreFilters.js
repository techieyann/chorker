
Template.choreFilters.helpers({
	
	rooms: function () {
		var house = Session.get("house");
		if (house) {
			return house.rooms;
		}
	},
	filters: function () {
		return Session.equals("choreFiltersActive", true);
	},
	searchFilter: function () {
		return Session.get("choreFilters").indexOf('search') != -1;
	},
	searchQuery: function () {
		return Session.get("choreSearchQuery");
	}
});

clearChoreFilters = function (e) {
	Session.set("choreFilters", []);
	Session.set("choreSearchQuery", '');
	Session.set("choreFiltersActive", false);
	$('#search').val('');
	$('.room-filter').removeClass('active')
};

Template.choreFilters.events = {
	'click #clear-filters': clearChoreFilters,
	'click #clear-search': function (e) {
		Session.set("choreSearchQuery", '');
		removeFilter('search');
		$('#search').val('');
	},
	'submit #chore-filter-search-form': function (e) {
		e.preventDefault();
		var query = $('#search').val();
		if (query) {
			addFilter('search');
			Session.set("choreSearchQuery", query);
		}
		else {
			removeFilter('search');
			Session.set("choreSearchQuery", '');
		}
	},
	'click .room-filter': function (e) {
		var roomFilter = e.target.id;
		var roomButton = $('#'+roomFilter);
		if (roomButton.hasClass('active')) {
			removeFilter('room');
			roomButton.removeClass('active');
			$('#heading-filters').focus();
		}
		else {
			removeFilter('room');
			$('.room-filter').removeClass('active');
			$('#'+roomFilter).addClass('active');
			addFilter('room');
		}
	}
};



var addFilter = function (filter) {
	var filters = Session.get("choreFilters");
	var index = filters.indexOf(filter);
	if (index == -1) {
		filters.push(filter);
	}
	Session.set("choreFilters", filters);
	if (filters.length == 0) {
		Session.set("choreFiltersActive",false);
	}
	else Session.set("choreFiltersActive",true);

};

var removeFilter = function (filter) {
	var filters = Session.get("choreFilters");
	var index = filters.indexOf(filter);
	if (index != -1) {
		filters.splice(index, 1);
	}
	Session.set("choreFilters", filters);
	if (filters.length == 0) {
		Session.set("choreFiltersActive",false);
	}
	else Session.set("choreFiltersActive",true);

};
