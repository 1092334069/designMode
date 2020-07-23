(function() {

	function parseCoordinate(option) {
		var obj = {}
		if (option && typeof option === 'object') {
			for (var key in option) {
				obj = Number(option[key])
			}
		}
		var left = obj.left || 0
		var top = obj.top || 0
		var right = left + (obj.width || 0)
		var bottom = top + (obj.height || 0)
		return {
			left: left,
			top: top,
			right: right,
			bottom: bottom
		}
	}

	var decorator = function(option) {
		if (option && typeof option === 'object') {
			for (var key in option) {
				this[key] = option[key]
			}
		}
	}

	decorator.prototype.compareTop = function(obj) {
		var source = parseCoordinate(this)
		var contrast = parseCoordinate(obj)
		return source.top > contrast.top
	}

	decorator.prototype.compareLeft = function() {
		var source = parseCoordinate(this)
		var contrast = parseCoordinate(obj)
		return source.left > contrast.left
	}

	decorator.prototype.compareBottom = function(obj) {
		var source = parseCoordinate(this)
		var contrast = parseCoordinate(obj)
		return source.bottom > contrast.bottom
	}

	decorator.prototype.compareRight = function(obj) {
		var source = parseCoordinate(this)
		var contrast = parseCoordinate(obj)
		return source.right > contrast.right
	}

	// 计算包含
	decorator.prototype.compareInside = function(obj) {
		var source = parseCoordinate(this)
		var contrast = parseCoordinate(obj)
		return source.top < contrast.top && source.left < contrast.left && source.bottom > contrast.bottom && source.right > contrast.right
	}

	// 计算相交
	decorator.prototype.compareIntersect = function(obj) {
		var source = parseCoordinate(this)
		var contrast = parseCoordinate(obj)
		var lengthways = (source.top < contrast.top && source.bottom > contrast.top) || (contrast.top < source.top && contrast.bottom > source.top)
		var crosswise = (source.left < contrast.left && source.right > contrast.left) || (contrast.left < source.left && contrast.right > source.left)
		return  lengthways && crosswise
	}

	window.Decorator = function(option) {
		var p = new decorator(option)
		return p
	}

})()
