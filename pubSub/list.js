var list = [{
	id: 1,
	title: '第一个订单',
	status: '待支付',
}, {
	id: 2,
	title: '第二个订单',
	status: '待支付'
}, {
	id: 3,
	title: '第三个订单',
	status: '待支付'
}]

function reviewOrderList() {
	var tpl = $('#orderListTemplate').html()
	var html = template(tpl, list)
	$('#app').html(html)
}

reviewOrderList()

var pubSub = PubSub()

window.onpageshow = function() {
	pubSub.pull('orderStatus', function(resList) {
		console.log(resList)
		for (var i = 0; i < resList.length; i++) {
			for (var j = 0; j < list.length; j++) {
				if (resList[i].id === list[j].id) {
					list[j].status = resList[i].status
				}
			}
		}
		reviewOrderList()
	})
}
