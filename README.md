inventoryjs
===========

An inventory API built on Express and Mongoose using the NodeJS framework

Modules
--------

IJS is split into a few javascript modules:
  * app/utils/Clack - the project namespace
  * app/utils/ijsConfiguration - a configuration object that reads from app/utils/config/ijs.json
  * app/utils/ijsConnection - a database connection object that handles connections to the backend database (not currently implemented in app.js, just need a quick fix)
  * app/utils/ijsRouter - a api router (takes incoming http requests by URL and routes them to the appropriate endpoint) object
  
IJS stores all of its models in app/utils/models/. I'll have a diagram on backend design up shortly.

Immediate Todo's:
------------------

So much to do, so little time to do so. Here is a quick list of todos to make this a functional project:
  * Add additional read functions for UI ease
  * Split route map from ijsRouter to separate objects
  * Implement UPDATE endpoints (functions are mostly written, they need do need to be added to the route map)
  * Implement DELETE endpoints
  * Implement Cloudwatch metric gathering (endpoints at http://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_Metric.html -- sample model is designed for this)
  * Implement Cloudwatch alarm management (endpoints at http://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_Operations.html -- metric model is designed for this)
  * Implement provisioners for EC2 and Ansible (n.b. Ansible could do this, but I don't feel it's within the scope of config mgmt)
  * Write a slick UI
  * Write a nifty script to parse EC2 inventory and autogenerate an inventory collection
