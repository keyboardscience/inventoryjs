/**
 *
 *  @author Kevin Phillips
 *  @email kphillips@inventorjs.io
 *
 */
var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

var DepartmentSchema = new Schema({
    name: { type: String, required: true, validate: [validateString, '{PATH} is not a valid username.'] },
    description: { type: String, required: true, validate: [validateString, '{PATH} is not a valid description'] },
    manager: { type: Schema.ObjectId }
});

function validateString(value) {
    return /^[a-z0-9\/\$]{1}.*$/i.test(value);
}

module.exports = mongoose.model('Department', DepartmentSchema);