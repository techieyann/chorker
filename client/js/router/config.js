Router.configure({
	layoutTemplate: 'index',
	yieldTemplates: {
		'myNavbar': {to: 'navbar'},
		'myFooter': {to: 'footer'}
	},
	notFoundTemplate: 'error404',
	loadingTemplate: 'loading'
});

Router.onBeforeAction('loading');
