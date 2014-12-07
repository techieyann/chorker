Template.modal.helpers({
	modalHeader: function () {
		return Session.get("modal-header");
	},
	modalBody: function () {
		return Session.get("modal-body");
	},
	modalFooter: function () {
		return Session.get("modal-footer");
	},
	modalData: function () {
		return Session.get("modal-data");
	}
});

openModal = function (header, body, footer, data) {
	if (header) Session.set("modal-header", header);
	if (body) Session.set("modal-body", body);
	if (footer) Session.set("modal-footer", footer);
	if (data) Session.set("modal-data", data);
	$('#modal').modal('show');
};

closeModal = function () {
	Session.set("modal-header", null);
	Session.set("modal-body", null);
	Session.set("modal-footer", null);
	Session.set("modal-data", null);
	hideModal();
};

hideModal = function () {
	$('#modal').modal('hide');
}