var express = require('express');
var app = express();
var path=require('path')
const {ObjectId} = require('mongodb'); // or ObjectID 
//var router = express.Router();

var orderFs=require("./db_controller/dbOrders.js")


var publicPath=path.resolve(__dirname, "static" );
app.use(express.static(publicPath))

var bodyParser = require('body-parser')
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var session=require('express-session')

var sess = {
  secret: 'keyboard cat',
  cookie: {}
}


app.use(session(sess))

var MongoClient = require('mongodb').MongoClient;
var db,menu;
//var dbURL="mongodb://pizza1:pizza1@localhost:27017/pizzadb"
//step1:
var dbURL="mongodb://pizzaOwner:pizzaOwner@ds149724.mlab.com:49724/heroku_6pmnpj2x"
const PORT = process.env.PORT || 3000

MongoClient.connect(dbURL, function(err, database) {
  if(err) throw err;

//  db=database.db("pizzadb")
//step2:
   db=database.db("heroku_6pmnpj2x")

  // Start the application after the database connection is ready
  app.listen(PORT);
  console.log("Listening on port "+PORT);
});

app.get('/', function(req, res){
  res.sendFile(`${publicPath}/orders.html`)
});


app.get('/showOrders',function(req,res){
  console.log(req.query.date)
  var day=new Date(req.query.date)
  console.log("day:"+day)
  var nextDay=new Date()
  nextDay.setDate(day.getDate()+1)
  console.log(nextDay)
  var strDay=day.toISOString().slice(0,10);
  var strNextDay=nextDay.toISOString().slice(0,10);
  console.log(strDay+" "+strNextDay)
var query={$and:
      [
        {date:{$gt:new Date(strDay)}},
        {date:{$lt:new Date(strNextDay)}}
      ]
    }
    console.log(query)
      orderFs.findOrderItems(res,query)
})

app.post("/deleteOrder",function (req,res) {
  var data=req.body
 console.log("deleted:"+JSON.stringify(data))
 console.log(data._id)
 var query={_id:ObjectId(data._id)}
 orderFs.deleteOrders(res,query)
})

var getDb = function() {
  return db
};

var getPublicPath=function(){
  return publicPath
}
// module.exports.dbFunc = getDb;
module.exports.getDb=getDb
module.exports.getPublicPath=getPublicPath


