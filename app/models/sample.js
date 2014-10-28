/**
 *
 *  @author Kevin Phillips
 *  @email kphillips@inventoryjs.io
 *
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var SampleSchema = new Schema({ 
    timestamp: { type: Date },
    one_h_sample: { type: String, validate: [validateJSON, '{PATH} is not a valid JSON string.'] },
    six_h_sample: { type: String, validate: [validateJSON, '{PATH} is not a valid JSON string.'] },· 
    twelve_h_sample:{ type: String, validate: [validateJSON, '{PATH} is not a valid JSON string.'] },
    one_d_sample: { type: String, validate: [validateJSON, '{PATH} is not a valid JSON string.'] },
    one_w_sample: { type: String, validate: [validateJSON, '{PATH} is not a valid JSON string.'] },
    two_w_sample: { type: String, validate: [validateJSON, '{PATH} is not a valid JSON string.'] },
    metric: ObjectId
});

function validateJSON(value) {
    try {
        return (JSON.parse(value) != null) ? true : false;
    } catch (err) {
        return false;
    }   
}

module.exports = mongoose.model('Sample', SampleSchema);
