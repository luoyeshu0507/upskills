var name=1;
console.log(this.name);
this.name=2;
console.log(this.name);
(function(){
	console.log(this.name);
	this.name=2;
	setTimeout(function(){
		console.log(this,this.name);
	},1000);
})();