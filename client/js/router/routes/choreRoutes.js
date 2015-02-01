Router.map(function () {
	this.route('chores', {
		path:'/chores',
		controller: 'RegisteredController',
		data: function () {
			return Chores.find();
		}
	});
	this.route('chore', {
		path:'/chores/:_id',
		controller: 'RegisteredController',
		data: function () {
			return Chores.findOne({_id: this.params._id});
		}
	});
});
