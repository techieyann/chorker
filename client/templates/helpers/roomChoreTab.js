Template.roomChoreTab.helpers({
	noneCompleted: function () {
		if (this) {
			if (this.completed.count()) return false;
		}
		return true;
	}
});

