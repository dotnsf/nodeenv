//. app.js
var express = require( 'express' ),
    app = express();

require( 'dotenv' ).config();

app.get( '/', function( req, res ){
  res.contentType( 'application/json; charset=utf-8' );
  var env = req.query.env;
  if( env ){
    if( env in process.env ){
      var data = { status: true };
      data[env] = ( process.env )[env];
      res.write( JSON.stringify( data, null, 2 ) );
      res.end();
    }else{
      res.write( JSON.stringify( { status: false, error: "no env value '" + env + "' specified." }, null, 2 ) );
      res.end();
    }
  }else{
    res.write( JSON.stringify( { status: false, error: "no query parameter 'env' specified." }, null, 2 ) );
    res.end();
  }
});

var port = process.env.PORT || 8080;
app.listen( port );
console.log( "server starting on " + port + " ..." );
