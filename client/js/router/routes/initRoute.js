Router.map(function () {
	this.route('userInit', {
		path: '/init',
		controller: 'BaseController',
		title: 'Join a house',
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
