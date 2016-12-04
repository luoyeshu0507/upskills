function promise(fn) {
	var status = 'pending';
	var callback = null;

	this.then = function(cb) {
		callback = cb;
	}

	function resolve(value) {
		setTimeout(function() {
			callback(value);
		},0);
	}

	fn(resolve);
}

new promise(function(resolve) {
	setTimeout(function() {
		resolve(1);
	},3000);
}).then(function(v) {
	console.log(v);
})