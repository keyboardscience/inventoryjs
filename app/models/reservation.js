/**
 *
 *  @author Kevin Phillips
 *  @email kphillips@inventoryjs.io
 *
 */

var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema;

var ReservationSchema = new Schema({
    cluster_name: { type: String, valdiate: [validateString,'{PATH} is not a valid cluster name.'] },
    timestamp: { type: Date, validate: [validateDate, '{PATH} is not a valid date.'] },
    duration: { type: Number },
    requested_start: { type: Date, validate: [validateStartDate, '{PATH} is not a valid start date'] },
    requestee_username: { type: String, validate: [validateUsername, '{PATH} is not a valid username'] }
});

function validateString(value) {
    return /^[a-z0-9]{1}.*$/i.test(value);
}

function validateUsername(value) {
    return /^[a-z]{1}[a-z\.\-\_]*/.test(value);
}

function validateDate(value) {
    var now = new Date(),
        // TODO rethink this margin business -- methinks it should be timeout related
        margin = now.setSeconds(now.getSeconds() - 10);

    // if
    //  timestamp is less than the current time (timestamp is from later in time than current -- disallow requests from the future)
    //  timestamp is greater than or equal to the current time - 10 seconds (timestamp is not from too far in the past -- disallow requests from too far in the part to avoid issues with tie-breaking reservations
    return (value < now && value >= margin) ? true : false;
}

function validateStartDate(value) {
    var now = new Date(),
        // TODO convert SLA to a configurable option
        SLA = now.setDate(now.getDate() + 1);
    return (value >= SLA) ? true : false;
}

function validateShortString(value) {
    return /[0-9a-z]{3,5}/i.test(value);
}

module.exports = mongoose.model('Reservation', ReservationSchema);
