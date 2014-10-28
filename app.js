/*
    @author: Kevin Phillips

*/

global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
}

var express     = require('express'),
    bodyParser  = require('body-parser'),
    config      = rootRequire('app/utils/ijsConfiguration'),
    conn        = rootRequire('app/utils/ijsConnection'),
    ijsRouter   = rootRequire('app/utils/ijsRouter'),
    app         = express();

var configuration = new config(__dirname + '/app/config/ijs.json'),
    connection = new conn(configuration);

app.use(bodyParser.urlencoded({ extended: true }));

// routes for the API
var router = new ijsRouter();

var port = process.env.PORT || 10666;

app.use('/rest/', router);

app.listen(port);

console.log('Server is now listening on port '+ port);
