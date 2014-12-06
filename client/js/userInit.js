Deps.autorun(function () {
  if(Meteor.user()) {
		if (Meteor.user().profile.initialized) {
			Router.go('house');
		}
		else {
			Router.go('userInit');
		}
	}
	else {
		Router.go('welcome');
	}
});
