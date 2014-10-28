/**
 *
 *  @author Kevin Phillips
 *  @email kphillips@inventorjs.io
 *
 */
var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

var UserSchema = new Schema({
    name: { type: String, required: true, validate: [validateUsername, '{PATH} is not a valid username.'] },
    first: { type: String, required: true, validate: [validateName, '{PATH} is not a valid name.'] },
    last: { type: String, required: true, validate: [validateName, '{PATH} is not a valid name.'] },
    email: { type: String, required: true, validate: [validateEmail, '{PATH} is not a valid email.'] },
    password: { type: String, required: true, select: false, validate: [validateString, '{PATH} is not a valid string.'] }
});

// leached from: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
function validateEmail(value) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
}

function validateName(value) {
    return /[a-zA-Z\ \-\']*/i.test(value);
}

function validateUsername(value) {
    return /^[a-z]{1}[a-z\.\-\_]*/.test(value);
}

function validateNumber(value) {
    return /[0-9]{4,6}/i.test(value);
}

function validateString(value) {
    return /^[a-z0-9\/\$]{1}.*$/i.test(value);
}

module.exports = mongoose.model('User', UserSchema);
