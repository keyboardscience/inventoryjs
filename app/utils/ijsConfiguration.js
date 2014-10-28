/**
 * 
 * @author Kevin Phillips
 * @email kphillips@inventoryjs.io
 * 
 */

var fs = require('fs');

var ijsConfiguration = function (file) {
    this.configFile = file;
    this.config = {}; 
    this.init();
};

ijsConfiguration.prototype.init = function () {
    var self = this;
    try {
        fs.readFile(this.configFile, function (err, data) {
            if (err) throw err;
            self.config = JSON.parse(data);
        });
    } catch (e) {
        console.log('There was an problem parsing the configuration file. Using defaults.');    
    }
};

module.exports = ijsConfiguration;
