for(var i=0;i<=10;i++){console.log(i.toString(2),sum.apply(null,i.toString(2).split("")))}
function sum(){
	var n=0;
	for(var i=0;i<arguments.length;i++){
		n+=parseInt(arguments[i])};return n;
}
function sum1A(num){
	var s=0;
	for(var i=0;i<=num;i++){
		s+=sum.apply(null,i.toString(2).split(""));
	}
	console.log(s);
}
function sum1B(num){
	var s=0;
	var n=3
	while(num<n){
		
	}
}
sum1A(10);