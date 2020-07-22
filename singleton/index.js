/*
*	option {
*		type		类型
*		key			标识
*		param		参数 （ajax参数或{event:function(){},time:1}
*	}
*/

(fuction() {

	var ajaxStorage = {}
	var timeoutStorage = {}
	var isTimeRun = false

	function timeClockRun() {
		if (isTimeRun) {
			return
		}
		isTimeRun = true
		timeClock()
	}

	function timeClock() {
		if (!Object.getOwnPropertyNames(timeoutStorage).length) {
			isTimeRun = false
			return
		}
		for (var key in timeoutStorage) {
			timeoutStorage[key].time --
			if (timeoutStorage[key].time <= 0) {
				try {
					timeoutStorage[key].event()
				} catch(e) {
					console.log(e)
				}
				delete timeoutStorage[key]
			}
		}
		setTimeout(function() {
			timeClock()
		}, 1000)
	}

	var singleton = function() {}

	singleton.prototype.init = function(option) {
		if (option.type === 'ajax') {
			this.ajax(option.key, option.param)
		} else if (option.type === 'timeout') {
			this.timeout(option.key, option.param)
		}
	}

	singleton.prototype.ajax = function(key, option) {
		ajaxStorage[key] = true
		var param = {}
		for (var k in option) {
			param[k] = option[k]
		}
		param['complete'] = function() {
			if (option.hasOwnProperty('complete')) {
				option.complete()
			}
			ajaxStorage[key] = false
		}
		$.ajax(param)
	}

	singleton.prototype.timeout = function(key, param) {
		timeoutStorage[key] = {
			time: Number(param.time) || 0,
			event: param.event || function() {}
		}
		timeClockRun()
	}

	window.Singleton = function(option) {
		if (!option['type'] || !option['key'] || !option['action']) {
			return
		}
		if (option.type === 'ajax' && ajaxStorage[option.key]) {
			return
		}
		if (option.type === 'timeout' && timeoutStorage[option.key]) {
			return
		}
		var p = new singleton()
		p.init(option)
		return p
	}

})()