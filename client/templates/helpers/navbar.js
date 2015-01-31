Template.myNavbar.helpers({
	activeNav: function (nav){
		check(nav, String);
		var currentRoute = Session.get('route');
		if(currentRoute){

			if (nav == currentRoute.substr(0,nav.length)) {
				return 'active';					
			}
			return '';
		}
	}
});

Template.myNavbar.events = {
	'click .time-filter': function (e) {
		e.preventDefault();
		openModal('timeFilterModalHeader', 'timeFilterModalBody', 'timeFilterModalFooter');
	}
};
