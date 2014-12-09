Deps.autorun(function () {
  if(Meteor.user()) {
		if (!Meteor.user().profile.initialized) {
			Router.go('userInit');
		}
	}
});
