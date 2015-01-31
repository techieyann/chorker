Meteor.publish('chores', function (house) {
	return Chores.find({house_id: house});
});

Meteor.publish('completed', function (house, start, end) {
	if (start) {
		if (end) {
		return Completed.find({$and: [{house: house},{completed_on: {$gte: start}}, {completed_on: {$lte: end}}]});
		}
		return Completed.find({$and: [{house: house},{completed_on: {$gte: start}}]});
	}
	return Completed.find({house: house});
});

Meteor.publish('houses', function() {
	return Houses.find({}, {fields: {'pass': 0}}); 
});

Meteor.publish('myHouse', function (house) {
	return Houses.find({_id: house}, {fields: {'pass': 0}});
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
