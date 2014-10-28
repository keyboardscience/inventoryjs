/**
 * 
 * @author Kevin Phillips
 * @email kphillips@inventoryjs.io
 * 
 */

global.rootRequire = function (name) {
    return require(__dirname + '/' + name);
}

var Asset       = require('../models/asset'),
    Type        = require('../models/type'),
    Cluster     = require('../models/cluster'),
    Metric      = require('../models/metric'),
    Sample      = require('../models/sample'),
    Department  = require('../models/department'),
    User        = require('../models/user'),
    express     = require('express'),
    _Clack      = rootRequire('Clack');

var ijsRouter = function() {
    return this._construct();
};

ijsRouter.prototype._construct = function () {
    // instantiate the router
    this.router = express.Router();
    //this.router = this.app.Router();
    
    // create logging middleware
    this.router.use(function(req,res,next) {
        console.log('[' + new Date().toString() + '] ' + req.method + ' request for ' + req.originalUrl);
        next();
    } );
    
    // attach the other router points
    this.attachRoutes();
    return this.router;
};

ijsRouter.prototype.attachRoutes = function () {
    var me = this;

    Object.keys(this.routes).forEach(function (operation) {
        var router = me.router,
            op = operation; // holy shit batman it's a string

        Object.keys(me.routes[op]).forEach(function (j) {
            me.routes[op][j].forEach(function (k) {
                var alias = router.route(k.endpoint);
                switch (op) {
                    case 'create':
                        alias.post(k.cb);
                        break;
                    case 'read':
                        alias.get(k.cb);
                        break;
                    case 'update':
                        alias.put(k.cb);
                        break;
                    case 'delete':
                        alias.delete(k.cb);
                        break;
                    default:
                        break;
                }
            } );
        } );
    } );
};

ijsRouter.prototype.routes = {
    create: {
		asset: 		[
		  { alias: 'CreateAssetByPOST', method: 'POST', endpoint: '/create/asset', cb: function (req,res) {
		      _Clack._create(req, res, Asset, [ 'hostname', 'instance_id' ]); } }
		],
		cluster: 	[
		  { alias: 'CreateClusterByPOST', method: 'POST', endpoint: '/create/cluster', cb: function (req,res) {
		      _Clack._create(req, res, Cluster, [ 'name', 'owner' ]); } }
		],
		metric: 	[
		  { alias: 'CreateMetricByPOST', method: 'POST', endpoint: '/create/metric', cb: function (req,res) {
		      // XXX Creating a metric should automatically create a sample -- even though the sample will be imcomplete
		      _Clack._create(req, res, Metric, [ 'description', 'collector', 'asset' ]); } }
		],
		sample: 	[
		  { alias: 'CreateSampleByPOST', method: 'POST', endpoint: '/create/sample', cb: function (req,res) {
		      _Clack._create(req, res, Sample, [ 'timestamp', 'metric' ]); } }
		],
		type:		[
		  { alias: 'CreateTypeByPOST', method: 'POST', endpoint: '/create/type', cb: function (req,res) { 
		      _Clack._create(req, res, Type, [ 'name', 'short', 'make', 'model' ]); } }
		],
		user:		[
		  { alias: 'CreateUserByPOST', method: 'POST', endpoint: '/create/user', cb: function (req,res) { 
		      _Clack._create(req, res, User, [ 'name', 'first', 'last', 'email', 'password' ]); } }
		],
		department:	[
		  { alias: 'CreateDeptByPOST', method: 'POST', endpoint: '/create/department', cb: function (req,res) { 
		      _Clack._create(req, res, Department, [ 'name', 'description', 'manager' ]); } }
		]
    },
    read: {
		asset: 		[
		  // get all
		  { alias: 'ReadAllAssets', method: 'GET', endpoint: '/read/assets', cb: function (req,res) { 
		      _Clack._getAll(req, res, Asset); } },
		  // id, instance, cluster, type, tag
		  { alias: 'ReadAssetById', method: 'GET', endpoint: '/read/asset/id/:_id', cb: function (req,res) { 
		      _Clack._getOneBy(req, res. Asset, '_id', req.params._id); } },
		  { alias: 'ReadAssetByInstance', method: 'GET', endpoint: '/read/asset/instance/:instance_id', cb: function (req,res) { 
		      _Clack._getOneBy(req, res, Asset, 'instance_id', req.params.instance_id); } },
		  { alias: 'ReadAssetsByCluster', method: 'GET', endpoint: '/read/asset/cluster/:cluster', cb: function (req,res) { 
		      _Clack._getAllBy(req, res, Asset, 'cluster', req.parmas.cluster); } },
		  { alias: 'ReadAssetsByType', method: 'GET', endpoint: '/read/asset/type/:type', cb: function (req,res) { 
		      _Clack._getAllBy(req, res, Asset, 'type', req.params.type); } },
		  { alias: 'ReadAssetByTag', method: 'GET', endpoint: '/read/asset/tag/:tags', cb: function (req,res) { 
		      _Clack._getAllByTag(req, res, Asset, req.params.tags); } }
		],
		cluster: 	[
		  // get all
          { alias: 'ReadAllClusters', method: 'GET', endpoint: '/read/clusters', cb: function (req,res) { 
              _Clack._getAll(req, res, Cluster); } },
		  // id, name, owner
		  { alias: 'ReadClusterById', method: 'GET', endpoint: '/read/cluster/id/:_id', cb: function (req,res) { 
		      _Clack._getOneBy(req, res, Cluster, '_id', req.params._id); } },
		  { alias: 'ReadClusterByName', method: 'GET', endpoint: '/read/cluster/name/:name', cb: function (req,res) { 
		      _Clack._getOneBy(req, res, Cluster, 'name', req.params.name ); } },
		  { alias: 'ReadClustersByOwner', method: 'GET', endpoint: '/read/cluster/owner/:owner', cb: function (req,res) { 
		      _Clack._getAllBy(req, res, Cluster, 'owner', req.params.owner); } }
		],
		metric: 	[
		  // get all
          { alias: 'ReadAllMetrics', method: 'GET', endpoint: '/read/metrics', cb: function (req,res) { 
              _Clack._getAll(req, res, Metric); } },
		  // id, collector, asset
		  { alias: 'ReadMetricById', method: 'GET', endpoint: '/read/metric/id/:_id', cb: function (req,res) { 
		      _Clack._getOneBy(req, res, Metric, '_id', req.params._id); } },
		  { alias: 'ReadMetricsByCollector', method: 'GET', endpoint: '/read/metric/collector/:collector', cb: function (req,res) { 
		      _Clack._getAllBy(req, res, Metric, 'collector', req.params.collector); } },
		  { alias: 'ReadMetricsByAsset', method: 'GET', endpoint: '/read/metric/asset/:asset', cb: function (req,res) { 
		      _Clack._getAllBy(req, res, Metric, 'asset', req.params.asset); } }
		],
		sample: 	[
		  // get all
          { alias: 'ReadAllSamples', method: 'GET', endpoint: '/read/samples', cb: function (req,res) { 
              _Clack._getAll(req, res, Sample); } },
		  // id, timestamp, metric
		  { alias: 'ReadSampleById', method: 'GET', endpoint: '/read/sample/id/:_id', cb: function (req,res) { 
		      _Clack._getOneBy(req, res, Sample, '_id', req.params._id); } },
		  { alias: 'ReadSamplesByTimestamp', method: 'GET', endpoint: '/read/sample/timestamp/:timestamp', cb: function (req, res) { 
		      _Clack.getAllBy(req, res, 'timestamp', req.params.timestamp); } },
		  { alias: 'ReadSamplesByMetric', method: 'GET', endpoint: '/read/sample/metric/:metric_object_id', cb: function (req,res) { 
		      _Clack._getAllBy(req, res, Sample, 'metric', req.params.metric); } }
		],
		type:		[
		  // get all
          { alias: 'ReadAllTypes', method: 'GET', endpoint: '/read/types', cb: function (req,res) { 
              _Clack._getAll(req, res, Type); } },
		  // id, short, make, model
		  { alias: 'ReadTypeById', method: 'GET', endpoint: '/read/type/id/:_id', cb: function (req,res) { 
		      _Clack._getOneBy(req, res, Type, '_id', req.params._id); } },
		  { alias: 'ReadTypeByShort', method: 'GET', endpoint: '/read/type/short/:short', cb: function (req,res) { 
		      _Clack._getOneBy(req, res, Type, 'short', req.params.short); } },
		  { alias: 'ReadTypesByMake', method: 'GET', endpoint: '/read/type/make/:make', cb: function (req,res) { 
		      _Clack._getAllBy(req, res, Type, 'make', req.params.make); } },
		  { alias: 'ReadTypeByModel', method: 'GET', endpoint: '/read/type/model/:model', cb: function (req,res) { 
		      _Clack._getOneBy(req, res, Type, 'model', req.params.model); } }
		],
		user:		[
		  // get all
          { alias: 'ReadAllUsers', method: 'GET', endpoint: '/read/users', cb: function (req,res) { 
              _Clack._getAll(req, res, User); } },
		  // id, name, first, last, email
		  { alias: 'ReadUserById', method: 'GET', endpoint: '/read/user/id/:_id', cb: function (req,res) { 
		      _Clack._getOneBy(req, res, User, '_id', req.params._id); } },
		  { alias: 'ReadUserByName', method: 'GET', endpoint: '/read/user/name/:name', cb: function (req,res) { 
		      _Clack._getOneBy(req, res, User, 'name', req.params.name); } },
		  { alias: 'ReadUsersByFirst', method: 'GET', endpoint: '/read/user/first/:first', cb: function (req,res) { 
		      _Clack._getAllBy(req, res, User, 'first', req.params.first); } },
		  { alias: 'ReadUsersByLast', method: 'GET', endpoint: '/read/user/last/:last', cb: function (req,res) { 
		      _Clack._getAllBy(req, res, User, 'last', req.params.last); } },
		  { alias: 'ReadUserByEmail', method: 'GET', endpoint: '/read/user/email/:email', cb: function (req,res) { 
		      _Clack._getOneBy(req, res, User, 'email', req.parmas.email); } }
		],
		department:	[
		  // get all
          { alias: 'ReadAllDepartmnets', method: 'GET', endpoint: '/read/departments', cb: function (req,res) { 
              _Clack._getAll(req, res, Department); } },
		  // id, name, manager
		  { alias: 'ReadDepartmentById', method: 'GET', endpoint: '/read/department/id/:_id', cb: function (req,res) { 
		      _Clack._getOneBy(req, res, Department, '_id', req.params._id); } },
		  { alias: 'ReadDepartmentByName', method: 'GET', endpoint: '/read/department/name/:name', cb: function (req,res) { 
		      _Clack._getOneBy(req, res, Department, 'name', req.params.name); } },
		  { alias: 'ReadDepartmentsByManager', method: 'GET', endpoint: '/read/department/manager/:manager', cb: function (req,res) { 
		      _Clack._getAllBy(req, res, Department, 'manager', req.params.manager); } }
		]
    },
    update: {
		asset: 		[],
		cluster: 	[],
		metric: 	[],
		sample: 	[],
		type:		[],
		user:		[],
		department:	[]
    },
    delete: {
		asset: 		[],
		cluster: 	[],
		metric: 	[],
		sample: 	[],
		type:		[],
		user:		[],
		department:	[]
    } 
};


module.exports = ijsRouter;
