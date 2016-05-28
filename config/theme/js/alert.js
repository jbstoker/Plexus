$(document).ready(function() 
{
		$.notifyDefaults({
		delay: 500,
		timer: 100,
		template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert fade-in alert-{0} alert-container" role="alert">' +
			'<span data-notify="icon"></span> ' +
			'<span data-notify="title">{1}</span> ' +
			'<span data-notify="message">{2}</span>' +
			'<div class="progress" data-notify="progressbar">' +
				'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
			'</div>' +
			'<a href="{3}" target="{4}" data-notify="url"></a>' +
		'</div>' 
	});	
});
	