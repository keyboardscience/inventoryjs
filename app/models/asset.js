/**
 *
 *  @author Kevin Phillips
 *  @email kphillips@inventoryjs.io
 *
 */

var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema,
    ObjectId    = Schema.ObjectId;

var AssetSchema = new Schema({
    hostname: { type: String, unique: true, validate: [validateString, '{PATH} is not a valid asset name.'] },
    type: ObjectId,
    cluster: ObjectId,
    instance_id: { type: Number, unique: true, validate: [validateInstanceId, '{PATH} is not a valid instance id.'] },
    tags: { type: Array }
});

function validateString(value) {
    return /^[a-z0-9]{1}.*$/i.test(value);
}

function validateInstanceId(value) {
    return /^[a-zA-Z0-9]{1}[a-zA-Z0-9\$\-\_].*$/.test(value);
}

module.exports = mongoose.model('Asset', AssetSchema);
