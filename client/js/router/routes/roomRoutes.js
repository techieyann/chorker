Router.map(function () {
	this.route('room', {
		path: '/house/room/:room',
		controller: 'RegisteredController',
		title: 'Room Status',
		parent: 'house',
		data: function () {
			var roomName = this.params.room.replace('-',' ');
			var choresInRoom = Chores.find({room: roomName});
			var choreData = choresInRoom.fetch();
			choreData.forEach(function (val, index) {
				choreData[index].completed = timelyCompleted([{chore:val._id}]);
			});
			return {
				room: roomName, 
				chores: choreData,
				chart: calcRoomDoughnutChart(choresInRoom)
			};
		}
	});
});
