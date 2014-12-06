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
					filters = {$or: [
						{'name': regSearch},
						{'desc': regSearch}
					]};

				}
			}
			if (choreFilters.indexOf('room') != -1) {
				var room = $('.room-filter.active').attr('id');
				room = room.replace('-', ' ');
				filters['room'] = room;
			}
			filters['house_id'] = house._id;
			return Chores.find(filters);
		}
		if (this) {
			return this;
		}
	},
	owner: function () {
		if (Meteor.user().profile.initialized) {

			var house = Session.get("house");
			if (house) {
				if (house.owner == Meteor.user()._id) {
					return true;
				}
			}
			if (this) {
				console.log(this);
			}
		}
	}
});
