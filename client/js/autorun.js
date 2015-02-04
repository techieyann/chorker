Deps.autorun(function () {
  if(Meteor.user()) {
		if (!Meteor.user().profile.initialized) Router.go('userInit');
		else if (Session.get("route") == '/') Router.go('chores');
	}
});
