Router.map(function () {
	this.route('profile', {
		path: '/profile',
		controller:'BaseController'
	});
	this.route('welcome', {
		path: '/',
		controller:'BaseController'
	});
});
