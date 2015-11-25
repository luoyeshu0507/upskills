var connect=require('connect'),
	  serverStatic=require('serve-static');
var app=connect();
app.use(serverStatic("../upskills"));
console.log(1);
app.listen(5000);
