Meteor.publish('houses', function() {
	return Houses.find(); 
});

Meteor.publish('chores', function (house) {
	return Chores.find({house_id: house});
});

Accounts.onCreateUser(function (options, user) {
	user.profile = {};
	if (options.profile) {
		user.profile = options.profile;
	}
	user.profile.initialized = 0;
	return user;
});


//hack for slow procs not pushing keepalive fast enough
process.argv = _.without(process.argv, '--keepalive');
Meteor.startup(function () { console.log("LISTENING"); });
