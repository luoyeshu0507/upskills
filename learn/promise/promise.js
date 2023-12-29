const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(fn) {
	this.status = PENDING;
	this.value = undefined;
	this.onRejectCallBack = [];
	this.onResolveCallBack = [];
	try {
		fn(this.resolve.bind(this), this.reject.bind(this));
	} catch(e) {
		this.reject.bind(this, e);
	}
}

MyPromise.prototype.resolve = function(value) {
	if (value instanceof MyPromise) {
		value.then(this.resolve, this.reject);
	}
	setTimeout(() => {
		if (this.status === PENDING) {
			this.status = FULFILLED;
			this.value = value;
			this.onResolveCallBack.forEach(r => r(value));
		}
	}, 0);
}

MyPromise.prototype.reject = function(reason) {
	setTimeout(() => {
		if (this.status === PENDING) {
			this.status = REJECTED;
			this.value = reason;
			this.onRejectCallBack.forEach(r => r(reason));
		}
}
}


MyPromise.prototype.then = function(onResolve, onReject) {
	var value = this.value;
	var promise2;
	var { onRejectCallBack, onResolveCallBack } = this;
	onResolve = typeof onResolve === 'function' ? onResolve : function(value) {
		return value;
	}
	onReject = typeof onReject === 'function' ? onReject : function(reason) {
		throw reason;
	}
	if (this.status === FULFILLED) {
		return promise2 = new MyPromise(function(resolve, reject) {
			try {
				var res = onResolve(value);
				if (res instanceof MyPromise) {
					res.then(resolve, reject);
				} else {
					resolve(res);
				}
			} catch(e) {
				reject(e);
			}
		});
	}
	if (this.status === REJECTED) {
		return promise2 = new MyPromise(function(resolve, reject) {
			try {
				var res = onReject(value);
				if (res instanceof MyPromise) {
					res.then(resolve, reject);
				} else {
					reject(res);
				}
			} catch(e) {
				reject(e);
			}
		});
	}
	if (this.status === PENDING) {
		return promise2 = new MyPromise(function(resolve, reject) {
			onRejectCallBack.push(function() {
				try {
					var res = onReject(value);
					if (res instanceof MyPromise) {
						res.then(resolve, reject);
					} else {
						reject(res);
					}
				} catch(e) {
					reject(e);
				}
			});

			onResolveCallBack.push(function() {
				try {
					var res = onResolve(value);
					if (res instanceof MyPromise) {
						res.then(resolve, reject);
					} else {
						resolve(res);
					}
				} catch(e) {
					reject(e);
				}
			})
		});
	}
}