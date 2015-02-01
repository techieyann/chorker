Router.map(function () {
	this.route('room', {
		path: '/house/room/:room',
		controller: 'RegisteredController',
		data: function () {
			return this.params.room.replace('-',' ');
		}
	});
});
