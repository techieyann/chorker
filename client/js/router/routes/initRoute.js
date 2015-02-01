Router.map(function () {
	this.route('userInit', {
		path: '/init',
		controller: 'BaseController',
		waitOn: function () {
			return Meteor.subscribe('houses');
		},
		data: function () {
			return {
				houses: Houses.find()
			};
		}
	});
});
