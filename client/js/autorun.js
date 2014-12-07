Deps.autorun(function () {
  if(Meteor.user()) {
		if (!Meteor.user().profile.initialized) {
			Router.go('userInit');
		}
		else {
				Session.set("house", Houses.findOne(Meteor.user().profile.house));
		}
	}
});
