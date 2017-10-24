var app = require('express')();

var mysql = require('mysql');

var server = require('http').Server(app);

var io = require('socket.io')(server);

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

//set server to listen to port 8080
server.listen(8080, function(){
  console.log('listening on: *8080');
});

//connect to database
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "memory"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// Load the game and other required files

app.get('/', function (req, res)

{

  res.sendfile('Memory.html');

});

app.get('/Memory_src.js', function (req, res)

{

  res.sendfile('Memory_src.js');

});

app.get('/jscolor.min.js', function (req, res)

{

  res.sendfile('jscolor.min.js');

});

//integration of websockets
io.on('connection', function(socket){
  console.log('a user connected');
  getTopScore();
  //log if user disconnects
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
})


//submit username and score to database
app.post('/submitScore', function(req, res) {
    res.writeHead(200);
    res.end()
    console.log(req.body.name);
    var name = req.body.name;
    if(name.includes('script')){name = 'hackerman';}
    var score = req.body.score;
    if(score.includes('script')){score = 0;}
    score.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    //var score = req.body.score;
    var sql = 'INSERT INTO score(`Username`, `Score`) VALUES (' + con.escape(name) + ',' + con.escape(score) + ')';
    con.query(sql, function(error, results, fields) {
      if (error) throw error;
      console.log("added user: " + name + " with score: " + score);
    })
  getTopScore();

})

//create html string with topscore
function getTopScore(){
  var sql = "SELECT `Username`, `Score` FROM score ORDER BY `Score` ASC LIMIT 5";
  con.query(sql, function(error, results, fields){
    var scores = '';
    if (error) throw error;
    for(var i = 0; i < results.length; i++){
      scores += "<li>"+ results[i].Username +" "+ results[i].Score +"</li>"
    }
    io.emit('updateScore', scores);
  })
}