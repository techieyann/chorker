Router.map(function () {
	this.route('chores', {
		path:'/chores',
		controller: 'RegisteredController',
		data: function () {
			var allChores = Chores.find();
			var choreData = {
				anyChores: (allChores.count() ? true : false),
				chores: allChores
			};

			if (Session.equals("choreFiltersActive", true)) {
				var choreFilters = Session.get("choreFilters");		
				var house = Session.get("house");

				var filters = {};

				if (choreFilters.search) {
					var query = choreFilters.search;
					query = query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
					regSearch = new RegExp(query, "i");
					filters = {$or: [{'name': regSearch},{'desc': regSearch}]};
				}
				if (choreFilters.room) {
					var room = choreFilters.room;
					room = room.replace('-', ' ');
					filters['room'] = room;
				}
				filters['house_id'] = house._id;
				var foundChores = Chores.find(filters).fetch();
				if (choreFilters.due) {
					var dueChores = [];
					var due = choreFilters.due;
					foundChores.forEach(function (chore) {					
						if (chore.last_completed) {
							var diff = moment().diff(chore.last_completed, 'seconds');

							if (chore.period) {


								switch(due){
								case 'success':
									if (diff < chore.period) dueChores.push(chore);
									break;
								case 'primary':
									if (diff > chore.period && diff < (chore.period * 2)) dueChores.push(chore);
									break;
								case 'warning':
									if (diff > (2 * chore.period) && diff < (chore.period * 3)) dueChores.push(chore);
									break;
								case 'danger':
									if (diff > (3 * chore.period)) dueChores.push(chore);
									break;
								}							
							}
							else if (due == 'primary') dueChores.push(chore);
						}
						else if (due == 'never') dueChores.push(chore);
					});

					choreData.chores = dueChores;
				}
				else choreData.chores = foundChores;
			}
				choreData.chart = calcChoresDoughnutChart(choreData.chores);
			return choreData;
		}
	});
	this.route('chore', {
		path:'/chores/:_id',
		controller: 'RegisteredController',
		data: function () {
			var choreId = this.params._id;
			return {
				chore: Chores.findOne({_id: choreId}),
				completed: timelyCompleted([{chore: choreId}]),
				chart: calcChoreDoughnutChart(choreId)
			};
		}
	});
});
