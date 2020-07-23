var observer = Observer()


$('#btn').click(function() {
	observer.eventCenter(function() {
		$('#message').append('<p>购买成功</p>')
	}, function() {
		$('#login').removeClass('hidden')
	})
})

$('#loginBtn').click(function() {
	observer.isLogin = true
	$('#login').addClass('hidden')
})
