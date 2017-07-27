var express = require('express');
var app = express();
var port = process.env.PORT || 3000;


// Get home page
app.get('/',function(req,res){
	res.send('Hello Express-api!')
})

var questions=[{
	id:213,
	status:444,
	range:12
},
{
	id:456,
	status:678,
	range:13
}];
//qustions API
app.get('/questions',function(req,res){
	res.status(200),
	res.json(questions)
})

/*Express 内置的 express.static 可以方便地托管静态文件，
例如图片、CSS、JavaScript 文件等*/
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));


app.listen(port);

console.log('express-api server started on: '+port);