Template.chore.helpers({
	chore: function () {
		if (this) return this;
	},
	completed: function () {
		if (this) {
			return Completed.find({chore: this._id}, {sort: {completed_on:-1}});
		}
	}
});
