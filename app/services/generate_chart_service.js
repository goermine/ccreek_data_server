const output = require('d3node-output');
const d3 = require('d3-node')().d3;
const d3nLine = require('d3node-linechart');
const dataQuery = require('../services/data_service').dayTimeQuery;
const knex  = require('../../db/index');

const parseTime = d3.timeParse('%d-%b-%y');


const knex_weka = knex('data_weka_take_aggregate');
// const knex_waitino = knex(process.env.TABLE_WAITINO);

dataQuery(knex_weka, 'sample_time').then((result) => {
    // res.append('Access-Control-Allow-Origin', ['*']);
    // output('./services', d3nLine({ data: data}));
    console.log(result);

}).catch((err) => {
    return err;
});

// create output files
// output('./services', d3nLine({ data: data }));