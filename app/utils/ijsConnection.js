/**
 * 
 * @author Kevin Phillips
 * @email kphillips@inventoryjs.io
 * 
 */

var m = require('mongoose');

var ijsConnection = function (configuration) {
    this.config = configuration;
    this.handler = null;
    this.uri = null;
    
    this._construct();
};

ijsConnection.prototype._construct = function () {
    if (this.config.hasOwnProperty("database")) {
        var host = ("host" in this.config.database) ? this.config.database.host : 'localhost',
            port = ("port" in this.config.database) ? this.config.database.port : '27017',
            collection = ("collection" in this.config.database) ? this.config.database.collection : 'inventoryjs';
    } else {
        var host = 'localhost',
            port = 27017,
            collection = 'inventoryjs';
    }
    this.uri = 'mongodb://' + host + ':' + port.toString() + '/' + collection;
    this.handler = m.connect(this.uri);
};

module.exports = ijsConnection;
