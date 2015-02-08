RegisteredController = BaseController.extend({
	subscriptions: function () {
		if (Meteor.user()) {
			if (Meteor.user().profile.initialized) {
				var houseId = Meteor.user().profile.house;
				this.wait(Meteor.subscribe('completed', houseId));
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
