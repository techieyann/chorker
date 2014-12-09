Meteor.publish('houses', function() {
	return Houses.find(); 
});

Meteor.publish('myHouse', function (house) {
	return Houses.find({_id: house});
});

Meteor.publish('chores', function (house) {
	return Chores.find({house_id: house});
});

Meteor.publish('completed', function (house) {
	return Completed.find({house: house});
});

Accounts.onCreateUser(function (options, user) {
	user.profile = {};
	if (options.profile) {
		user.profile = options.profile;
	}
	user.profile.initialized = false;
	return user;
});


//hack for slow procs not pushing keepalive fast enough
process.argv = _.without(process.argv, '--keepalive');
Meteor.startup(function () { console.log("LISTENING"); });
