Template.house.helpers({
	houseName: function () {
		if (Session.get("house")) return Session.get("house").name;
	},
	houseId: function () {
		if (Session.get("house")) return Session.get("house")._id;
	},
	isOwner: function () {
		if (Session.get("house")) {
			return (Session.get("house").owner == Meteor.user()._id);
		}
		return false;
	}
});


Template.houseByHousemate.rendered = function () {

	Deps.autorun(function () {
		calcAndRenderHouseDoughnut();
	});
};
