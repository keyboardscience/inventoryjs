/**
 *
 *  @author Kevin Phillips
 *  @email kphillips@inventoryjs.io
 *
 */

var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema,
    ObjectId    = Schema.ObjectId;

var validCollectors = [ 'hypervisor/aws', 'hypervisor/libvirt' ]

var MetricSchema = new Schema({
    description: { type: String, validate: [validateDescription, '{PATH} is not a valid description.'] },
    collector: { type: String, validate: [validateCollector, '{PATH} is not a valid collector.'] },
    threshold_low: { type: Number, validate: [validateLow, '{PATH} is not a valid low threshold value.'] },
    threshold_high: { type: Number, validate: [validateHigh, '{PATH} is not a valid high threshold value.'] },
    threshold_tolerance: { type: Number, validate: [validateThreshold, '{PATH} is not a valid threshold percentage.'] },
    frequency: { type: Number, validate: [validateFreq, '{PATH} is not a valid frequency.'] },
    asset: ObjectId
});

function validateLow(value) {
    if (value == -1) return true;
    return (value > 0 && /[0-9].*$/.test(value)) ? true : false;
}

function validateHigh(value) {
    return (value > 0 && /[0-9].*$/.test(value)) ? true : false;
}

function validateThreshold(value) {
    return (value <= 99 && value >= 0) ? true : false;
}

function validateDescription(value) {
    return /^[a-z0-9]{1}[a-z0-9\$\%\#\@\!\&\*\(\)+=-_].*$/i.test(value);
}

function validateFreq(value) {
    return /^[0-9].*$/.test(value);
}

function validateCollector(value) {
    return (validCollectors.indexOf(value) !== -1) ? true : false;
}

module.exports = mongoose.model('Metric', MetricSchema);
