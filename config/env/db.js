/*
* @Author: JB Stoker
* @Date:   2016-03-25 14:54:27
* @Last Modified by:   JB Stoker
* @Last Modified time: 2016-03-25 15:08:53
*/
var fs = require('fs');
var couchbase=require('couchbase');
var ottoman=require('ottoman');
var env = process.env.NODE_ENV || 'development', config = require('./config')[env];

// Build my cluster object and open a new cluster
var PlexusCluster = new couchbase.Cluster(config.db.server);
var PlexusBucket = PlexusCluster.openBucket(config.db.bucket);
ottoman.bucket=PlexusBucket;
//Include models
var models_dir = __dirname + '../../../models';
fs.readdirSync(models_dir).forEach(function(file){ if(file[0] === '.') return; require(models_dir+'/'+ file); });
// Build the necessary indexes to function
ottoman.ensureIndices(function(err){ if(err) throw err; });