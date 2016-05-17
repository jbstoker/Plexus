var async = require('async'),
couchbase = require('couchbase'),
db = require("../../app").bucket,
ViewQuery = couchbase.ViewQuery,
dbManager = db.manager();
function Query(){};
 /**
  * Get the search fields.
  * Returns an array of fieldNames based on DataTable Params object
  * All columns in Params.columns that have .searchable == true field will have the .data param returned in an String
  * 
  * @method     getSearchFields
  * @param      {Array}  Datatable object  
  * @return     {Array}  All searchable fields
  */
function getSearchFields(Params) 
{
    return Params.columns.filter(function(column) 
                                    {
                                        return JSON.parse(column.searchable);
                                    }).map(function(column) 
                                            {
                                                return column.data;
                                            });
};
/**
 * Determine if any value is NAN nor undefined.
 *
 * @method     isNaNorUndefined
 * @return     {boolean}
 */
function isNaNorUndefined() 
{
    var args = Array.prototype.slice.call(arguments);
    return args.some(function(arg)
    {
        return isNaN(arg) || (!arg && arg !== 0);
    });
};
/**
 * { function_description }
 *
 * @method     buildFindParameters
 * @param      {<type>}  Params  { description }
 * @return     {<type>}  { description_of_the_return_value }
 */
function buildFindParameters(Params) 
{
    if(!Params || !Params.columns || !Params.search_value && Params.search_value !== '')
    {
        return null;
    }

    var searchText = Params.search_value,
        findParameters = {},
        searchRegex,
        searchOrArray = [];
    
    if(searchText === '') 
    {
        return findParameters;
    }

    searchRegex = new RegExp(searchText, 'i');
    var searchableFields = getSearchFields(Params);
    
    if(searchableFields.length === 1)
    {
        findParameters[searchableFields[0]] = searchRegex;
        return findParameters;
    }

    searchableFields.forEach(function(field)
    {
        var column =  field.replace('key.','');
        var orCondition = {};
        orCondition[column] = searchRegex;
        searchOrArray.push(orCondition);
    });
    
    findParameters = searchOrArray;
    
    return findParameters;
};
/**
 * { function_description }
 *
 * @method     buildSortParameters
 * @param      {<type>}  Params  { description }
 * @return     {string}  { description_of_the_return_value }
 */
function buildSortParameters(Params) 
{
    if(!Params || Params.order_dir.length === 0)
    {
        return null;
    }

    var sortColumn = Number(Params.order_column),
        sortOrder = Params.order_dir,
        sortField;
    
    if(isNaNorUndefined(sortColumn) || !Array.isArray(Params.columns) || sortColumn >= Params.columns.length)
    {
        return null;
    }

    if(Params.columns[sortColumn].orderable === 'false')
    {
        return null;
    }

    sortField = Params.columns[sortColumn].data.replace('key.','');
    
    if(!sortField)
    {
        return null;
    }
    
    if(sortOrder === 'asc')
    {
        return sortField;
    }

    return '-' + sortField;
};
function findOrCreateViewCouchbase(Model, Viewname){};
function queryDataFromCouchBase(){};
/**
 * DataTable call rendering for couchbase
 *
 * @method     datatablesQuery
 * @param      {<type>}  Params  { description }
 * @param      {<type>}  Model   { description }
 * @param      {<type>}  Full    { description }
 * @return     {Object}  { description_of_the_return_value }
 */
Query.fetchData = function(Params,Model,Type,Viewname,Full,callback) 
{    
    var data = [{'draw':'','columns':[],'tablenames':[],'order_column':'','order_dir':'','start':'','length':'','search_value':'','search_regex':'','full':Full,'model':Model,'view':Viewname,'type':Type}];
    
    async.forEachOf(Params, function(value, key, cb)
    {
        try {
            if(key.endsWith('draw')){
                data[0]['draw'] = Number(Params[key]);
            }
            if(key.endsWith('][data]')){
                // data
                var rownum = parseInt(key.match(/[0-9]+/)[0], 10);
                data[0]['columns'][rownum] = [];
                data[0]['columns'][rownum]['data'] = Params[key];
                
                if(data[0]['tablenames'].indexOf(Params[key]) === -1)
                {
                    data[0]['tablenames'].push(Params[key]);
                } 
            }
            if(key.endsWith('][name]')){
                // name
                var rownum = parseInt(key.match(/[0-9]+/)[0], 10);
                data[0]['columns'][rownum]['name'] = Params[key];
            }
            if(key.endsWith('][searchable]')){
                // searchable
                var rownum = parseInt(key.match(/[0-9]+/)[0], 10);
                data[0]['columns'][rownum]['searchable'] = Params[key];
            }
            if(key.endsWith('][orderable]')){
                // orderable
                var rownum = parseInt(key.match(/[0-9]+/)[0], 10);
                data[0]['columns'][rownum]['orderable'] = Params[key];
            }
            if(key.endsWith('][search][value]')){
                // search
                var rownum = parseInt(key.match(/[0-9]+/)[0], 10);
                data[0]['columns'][rownum]['searchval'] = Params[key];
            }
            if(key.endsWith('][search][regex]')){
                // search
                var rownum = parseInt(key.match(/[0-9]+/)[0], 10);
                data[0]['columns'][rownum]['searchreg'] = Params[key];
            }
            if(key.endsWith('][column]')){
                data[0]['order_column'] = Number(Params[key]);
            }
            if(key.endsWith('][dir]')){
                data[0]['order_dir'] = Params[key];
            }
            if(key.endsWith('start')){
                data[0]['start'] = Number(Params[key]);
            }
            if(key.endsWith('length')){
               data[0]['length'] = Number(Params[key]);
            }
            if(key.endsWith('search[value]')){
                data[0]['search_value'] = Params[key];
            }
            if(key.endsWith('search[regex]')){
                data[0]['search_regex'] = Params[key];
            }  
        } 
        catch(e) 
        {
            return cb(e);
        }
     cb();   
    },function(err)
    {
    if (err) console.log(err);

                    async.series({
                                draw: function(cb){
                                    var draw = Number(data[0].draw);
                                        
                                    if (isNaNorUndefined(draw))
                                    {
                                        return cb(new Error('Some parameters are missing or in a wrong state. ' +
                                        'Could be any of draw, start or length'));
                                    }
                                    cb(null, draw);
                                },
                                data: function(cb)
                                {
                                    
                                    var model = data[0].model,
                                    viewname = data[0].view,
                                    type = data[0].type,
                                    tablenames = data[0].tablenames,
                                    sortVal = buildSortParameters(data[0]),
                                    findVal = buildFindParameters(data[0]); 


                                    

                                    //Build doc.* parameters for design
                                    tablenames.forEach(function(element, index) {
                                        tablenames[index] = '"'+element+'":doc.'+element;
                                    });
                                    if(data[0].full == true)
                                    {//Get all values 
                                        var design =  {
                                                         map : [ 'function(doc, meta) {',
                                                                 'if (doc.type && doc.type == "'+type+'") { ',
                                                                 'emit(doc, null); }',
                                                                 '}'].join('\n')
                                                     };
                                    }
                                    else
                                    {
                                         var design =  {
                                                         map : [ 'function(doc, meta){',
                                                                 'if(doc.type && doc.type == "'+type+'"){',
                                                                 'emit({'+tablenames.join(',')+'}, null); }',
                                                                 '}'].join('\n')
                                                        };
                                    }    

                                    dbManager.getDesignDocument(model,function(err, designdoc, meta )
                                    {
                                        if(designdoc === null)
                                        {
                                            designdoc = {views:{}};
                                            designdoc['views'][viewname] = design;

                                            dbManager.upsertDesignDocument(model, designdoc, function(err, res) 
                                            {
                                                if(err) 
                                                {
                                                    
                                                } 
                                                else if(res.ok) 
                                                {   
                                                    var query = ViewQuery.from(model, viewname).skip(data[0].start).limit(data[0].length);
                                                    db.query(query, function(err, results)
                                                    {
                                                        cb(null,results);
                                                    });
                                                }

                                            });    
                                        } 
                                        else if(!(viewname in designdoc['views']))
                                        {
                                            designdoc['views'][viewname] = design;

                                            dbManager.upsertDesignDocument(model, designdoc, function(err, res) 
                                            {
                                                if(err) 
                                                {
                                                    
                                                } 
                                                else if(res.ok) 
                                                {
                                                    var query = ViewQuery.from(model, viewname).skip(data[0].start).limit(data[0].length);
                                                    db.query(query, function(err, results)
                                                    {
                                                        cb(null,results);
                                                    });
                                                }

                                            });  
                                        }
                                        else    
                                        {
                                                var query = ViewQuery.from(data[0].model, data[0].view).skip(data[0].start).limit(data[0].length);
                                                        db.query(query, function(err, results)
                                                        {
                                                            cb(null,results);
                                                        });
                                        }
                                    });
                                },
                                recordsTotal: function(cb){
                                    var query = ViewQuery.from(data[0].model, data[0].view);
                                                        db.query(query, function(err, results)
                                                        {        
                                                            cb(null,results.length);
                                                        });
                                },
                                recordsFiltered: function(cb)
                                {
                                    var query = ViewQuery.from(data[0].model, data[0].view).skip(data[0].start).limit(data[0].length);
                                                        db.query(query, function(err, results)
                                                        {        
                                                            cb(null,results.length);
                                                        });
                                }
                            }, 
                            function(err, results)
                            {
                                if(err)
                                {
                                    return callback(null, {message: "Error", data: err});
                                }
                                else
                                {
                                    
                                    return callback(null, results);
                                }
                            });
    });                                             
};


module.exports = Query;


