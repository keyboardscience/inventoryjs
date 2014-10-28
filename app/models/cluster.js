/**
 *
 *  @author Kevin Phillips
 *  @email kphillips@inventoryjs.io
 *
 */

var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

var ClusterSchema = new Schema({
    name: { type: String, required: true, unique: true, validate: [validateString, '{PATH} is not a valid string.'] },
    owner: { type: String, required: true, validate: [validateUsername, '{PATH} is not a valid string.'] }
});

function validateNumber(value) {
    return /[0-9]{4,6}/i.test(value);
}

function validateUsername(value) {
    return /^[a-z]{1}[a-z\.\-\_]*/.test(value);
}

function validateString(value) {
    return /^[a-z0-9]{1}.*$/i.test(value);
}

module.exports = mongoose.model('Cluster', ClusterSchema);
