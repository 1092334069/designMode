(function() {

	var observer = function() {
		this.isLogin = false
		this.statusCenter = {
			isLogin: false
		}
		this.callbackList = []
	}

	observer.prototype.init = function() {
		var _this = this

		Object.defineProperty(this, 'isLogin', {
			get: function() {
				return _this.statusCenter.isLogin
			},
			set: function(val) {
				_this.statusCenter.isLogin = val
				_this.pull()
			}
		})
	}

	observer.prototype.push = function(callback) {
		this.callbackList.push(callback)
	}

	observer.prototype.pull = function() {
		for (var i = this.callbackList.length - 1; i >= 0; i--) {
			var callback = this.callbackList.pop()
			try {
				callback()
			} catch (e) {
				console.log(e)
			}
		}
	}

	observer.prototype.eventCenter = function(successCallback, errorCallback) {
		if (this.statusCenter.isLogin) {
			successCallback()
		} else {
			this.push(successCallback)
			errorCallback()
		}
	}

	window.Observer = function() {
		var p = new observer()
		p.init()
		return p
	}

})()
