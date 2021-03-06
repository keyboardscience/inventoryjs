/**
 *
 * @author Kevin Phillips
 * @email kphillips@inventoryjs.io
 *
 */

var Clack = {};

Clack.malformedReqHandle = function (req,res,err) {
    res.status(500).json({ error: err.message });
};

Clack.goof = function (req,res,err) {
    res.status(500).json({ error: 'The backend borked with the following message:\n' + err.message });
};

Clack._getAllBy = function (req,res,schema,opt,val) {
    var query = schema.where(opt).equals(val);
    this._execQuery(req,res,query);
};

Clack._getOneBy = function (req,res,schema,opt,val) {
    var query = schema.where(opt).equals(val).limit(1);
    this._execQuery(req,res,query);
};

Clack._getAll = function (req,res,schema) {
    var query = schema.where({});
    this._execQuery(req,res,query);
};

Clack._getAllByTag = function (req,res,schema,val) {
    var query = schema.where('tags').in(val);
    this._execQuery(req,res,query);
};

Clack._getAllByClusterName = function (req,res,asset,cluster_name) {
    var query = asset.where('cluster_name').eq(cluster_name);
    this._execQuery(req,res,query);
};

Clack._updateOneBy = function (req,res,schema,id,opt) {
    if (!(req.body.hasOwnProperty(opt))) this.malformedReqHandle(req,res,new Error('Requisite parameter was not passed correctly.'));
    var query = schema.findOneAndUpdate(
        schema.where('_id').equals(id), 
        { '$set': schema.where(opt).equals(req.body[opt]) } );
    this._execQuery(req,res,query);
};

Clack._validatePOST = function (req,res,req_params) {
    try {
        if (req_params) {
            if (Array.isArray(req_params)) {
                return req_params.every(function (val,idx,arr) {
                    if (!(req.body.hasOwnProperty(val))) {
                        throw new Error('Requisite parameter: ' + val + ' -- was not included in POST body.');
                    } else {
                        return true;
                    }
                });
            } else {
                throw new Error('Requisite parameters were passed incorrectly to function. POST request could not be validated.');
            }
        } else {
            throw new Error('No requisite parameters were passed to validate POST request.');
        }
    } catch (err) {
        this.malformedReqHandle(req,res,err);
    }
};

Clack._populateObj = function (req,res,schema,req_params,cb) {
    try {
        var myres = res,
            body = req.body,
            obj = new schema(body);

        obj.save(cb);
    } catch (err) {
        this.malformedReqHandle(req,res,err);
    }
}

Clack._create = function (req,res,schema,req_params) {
    try {
        if (this._validatePOST(req,res,req_params)) {
            this._populateObj(req,res,schema,req_params,function (err,ret) {
                if (err) throw err;

                res.status(200).json({ message: 'Request completed successfully. Obj _id: '+ret._id });
            });
        }
    } catch (err) {
        this.malformedReqHandle(req,res,err);
    }

};

Clack._execQuery = function (req,res,query) {
    try {
        query.exec(function (err, result) {
            if (err) throw err;

            if (result) {
                if (result == null) throw new Error('Unable to locate document.');
                res.status(200).json(result);
            }
        } );
    } catch (err) {
        this.malformedReqHandle(err,req,res);
    }

};

module.exports = Clack;
