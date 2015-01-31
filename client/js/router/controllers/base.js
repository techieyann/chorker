BaseController = RouteController.extend({
	onBeforeAction: function () {
		Session.set('route', this.route._path);
		this.next();
	}
});

RegisteredController = BaseController.extend({
	subscriptions: function () {

		if (Meteor.user()) {
			if (Meteor.user().profile.initialized) {
				var houseId = Meteor.user().profile.house;
				var timeFilter = Session.get("timeFilter");
				var start = null;
				var end = null;
				switch(timeFilter.filter) {
					case 'day':
					start = moment().day(-1).format();
					break;
					case 'week':
					start = moment().week(-1).format();
					break;
					case 'month':
					start = moment().month(-1).format();
					break;
					case 'year':
					start = moment().month(-12).format();
					break;
					case 'custom':
					start = moment(timeFilter.range.from, 'MM/DD/YYYY').format();
					end = moment(timeFilter.range.to, 'MM/DD/YYYY').format();
					break;
				}
				this.wait(Meteor.subscribe('completed', houseId, start, end));
				this.wait(Meteor.subscribe('chores', houseId)); 
				this.wait(Meteor.subscribe('myHouse', houseId));
				if(this.ready()) {
					Session.set("house", Houses.findOne());
					this.render();
				}
			}
		}
		this.render('loading');


	}
});
