const output = require('d3node-output');
const d3 = require('d3-node')().d3;
const LineChart = require('./chart_compile');
const dataQuery = require('../services/data_service').dayTimeQuery;
const knex  = require('../../db/index');

// const parseTime = d3.timeParse('%d-%b-%y');
// var tP = d3.timeFormat('%X');
var ert = d3.timeFormat("%H:%M %p");

const knex_weka = knex('data_weka_take_aggregate');
// const knex_waitino = knex(process.env.TABLE_WAITINO);

dataQuery(knex_weka, 'sample_time').then((result) => {
    // res.append('Access-Control-Allow-Origin', ['*']);
    
    let mapped_result = result.map((v)=> { return {key: v.sample_time, value: v.cubic_meters }; });
    console.log(mapped_result);
    
    output('./services', LineChart({ data: mapped_result}));
}).catch((err) => {
    return err;
});

// create output files
// output('./services', d3nLine({ data: data }));