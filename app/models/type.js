/**
 *
 *  @author Kevin Phillips
 *  @email kphillips@inventorjs.io
 *
 */

var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

var TypeSchema = new Schema({
    name:   { type: String, required: true, validate: [validateString,'{PATH} is not a valid type name.'] },
    short:  { type: String, unique: true, required: true, validate: [validateShortString, '{PATH} is not a valid type short name.'] },
    make:   { type: String, required: true, validate: [validateString, '{PATH} is not a valid type make.'] },
    model:  { type: String, unique: true, required: true, validate: [validateString, '{PATH} is not a valid type model.'] }
});

function validateString(value) {
    return /^[a-z0-9]{1}.*$/i.test(value);
}

function validateShortString(value) {
    return /[0-9a-z]{3,15}/i.test(value);
}

module.exports = mongoose.model('Type', TypeSchema);
