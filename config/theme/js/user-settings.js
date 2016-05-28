
$(document).ready(function(){
	$('#AccessBox').block({ 
							message: $('#AccesBoxModal'),
							css: {backgroundColor:'transparent',width:'100%','margin-top':'10%',border:'1px','z-index':'1'},
						    overlayCSS:  { 
						        backgroundColor: '#384b5f', 
						        opacity:         0.8, 
						        cursor:          'wait',
						        'z-index':       '1' 
						    }
						});	



	$(document).on('click', '#LoginBtn', function(event)
	{
		//event.preventDefault();
		var pass = $('#AccesBoxModal [name=password]').val();
		var email = $('#AccesBoxModal [name=email]').val();
		

$.ajax({
	url: '/access-check',
	type: 'POST',
	data: {email: email,password:pass},
}).done(function(data) {

if(data.message.type == 'success')
{
	     $('#AccessBox').unblock(); 
}

            $.notify({
                        title: data.message.title,
                        message: data.message.msg,
                        url: data.message.url,
                        target: data.message.target
                    }, {
                        type: data.message.type
                    });
}).fail(function(data) {
                $.notify({
                    title: data.message.title,
                    message: data.message.msg,
                    url: data.message.url,
                    target: data.message.target
                }, {
                    type: data.message.type
                });
});

	});
});



