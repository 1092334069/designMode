(function() {
	var pubSubData = localStorage['pubSubData'] ? JSON.parse(localStorage.pubSubData) : {}

	var pubSub = function() {}

	pubSub.prototype.push = function(key, data) {
		if (!pubSubData.hasOwnProperty(key)) {
			pubSubData[key] = []
		}
		pubSubData[key].push(data)
		this.resetStorage()
	}

	pubSub.prototype.pull = function(key, callback) {
		if (pubSubData.hasOwnProperty(key)) {
			var resList = JSON.parse(JSON.stringify(pubSubData[key]))
			callback(resList)
			pubSubData[key] = []
			this.resetStorage()
		} else {
			callback([])
		}
	}

	pubSub.prototype.resetStorage = function() {
		localStorage.pubSubData = JSON.stringify(pubSubData)
	}

	window.PubSub = function() {
		var p = new pubSub()
		return p
	}

})()
