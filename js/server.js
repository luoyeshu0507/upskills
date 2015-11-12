var connect=require('connect'),
	  serverStatic=require('serve-static');
var app=connect();
app.use(serverStatic("../../upskills"));
app.listen(5000);
