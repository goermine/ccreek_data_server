const output = require('d3node-output');
const d3 = require('d3-node')().d3;
const LineChart = require('./multy_line');
const oneDayDataFrom = require('../services/data_service').oneDayDataFrom;
const knex  = require('../../config/knex');

const wekaTable  = knex('data_weka_take_aggregate');
const waitinoTable = knex('data_waitino_take_aggregate');

const wekaData = oneDayDataFrom(wekaTable);
const waitinoData = oneDayDataFrom(waitinoTable);

var requestedData = Promise.all([
    wekaData(process.env.QUERY_DATETIME_ATTR),
    waitinoData(process.env.QUERY_DATETIME_ATTR)
]).then(results => {
    let data =  results.reduce((accumulator, item, i) => {
        let valueName = (i === 0 ? 'Weka' : 'Waitino');
        console.log(item);
        accumulator = accumulator.concat(item.map((obj) => {
            return {symbol: valueName, date: obj.sample_time, price: obj.cubic_meters};
        }));
        return accumulator;
    }, []);
    return data;
}).then(data => {
    output('./services', LineChart({ data: data}) );
});

// const parseTime = d3.timeParse('%d-%b-%y');
// var tP = d3.timeFormat('%X');
// var ert = d3.timeFormat("%H:%M %p");
// function composeData(result){
//     return result.reduce((accumulator, item, i) => {
//         let valueName = (i === 0 ? 'Weka' : 'Waitino');
//         accumulator = accumulator.concat(item.map((obj) => {
//             return {symbol: valueName, date: obj.sample_time, price: obj.cubic_meters};
//         }));
//         return accumulator;
//     }, []);
// }

// requestedData.then((result) => { 
//     let localCollector = [];
//     result.forEach((item, i) => {
//         let valueName = (i === 0 ? 'Weka' : 'Waitino');
//         console.log(item.map((obj) => {
//             return {symbol: valueName, date: obj.sample_time, price: obj.cubic_meters};
//         }));
//     });
// });

// wekaData('sample_time').then((result) => {
//     // res.append('Access-Control-Allow-Origin', ['*']);
    
//     let mapped_result = result.map((v)=> { return {x: v.sample_time, y: v.cubic_meters }; });
//     console.log(mapped_result);
    
//     output('./services', LineChart({ data: [mapped_result] }));
// }).catch((err) => {
//     return err;
// });

// create output files
// output('./services', d3nLine({ data: data }));
// var  Chart = require('./multy_line');
// const output = require('d3node-output');
// // Chart({ data: x});
// output('./services', Chart({ data: x}) );

var result = [
    [ { id: 1,
        sample_time: '2018-06-24T17:32:51.000Z',
        cubic_meters: 9,
        created_at: '2018-06-24T17:47:42.000Z',
        updated_at: '2018-06-24T17:47:42.000Z' },
    { id: 7,
        sample_time: '2018-06-24T17:33:34.000Z',
        cubic_meters: 86,
        created_at: '2018-06-24T17:47:42.000Z',
        updated_at: '2018-06-24T17:47:42.000Z' },
    { id: 13,
        sample_time: '2018-06-24T01:17:51.000Z',
        cubic_meters: 48,
        created_at: '2018-06-24T17:47:42.000Z',
        updated_at: '2018-06-24T17:47:42.000Z' },
    { id: 14,
        sample_time: '2018-06-23T21:20:28.000Z',
        cubic_meters: 60,
        created_at: '2018-06-24T17:47:42.000Z',
        updated_at: '2018-06-24T17:47:42.000Z' },
    { id: 15,
        sample_time: '2018-06-24T11:58:12.000Z',
        cubic_meters: 26,
        created_at: '2018-06-24T17:47:42.000Z',
        updated_at: '2018-06-24T17:47:42.000Z' } ],
    [ { id: 7,
        sample_time: '2018-06-24T17:25:26.000Z',
        cubic_meters: 4,
        created_at: '2018-06-24T17:47:42.000Z',
        updated_at: '2018-06-24T17:47:42.000Z' },
    { id: 8,
        sample_time: '2018-06-24T14:53:01.000Z',
        cubic_meters: 32,
        created_at: '2018-06-24T17:47:42.000Z',
        updated_at: '2018-06-24T17:47:42.000Z' },
    { id: 11,
        sample_time: '2018-06-24T08:54:50.000Z',
        cubic_meters: 71,
        created_at: '2018-06-24T17:47:42.000Z',
        updated_at: '2018-06-24T17:47:42.000Z' },
    { id: 12,
        sample_time: '2018-06-24T13:04:06.000Z',
        cubic_meters: 64,
        created_at: '2018-06-24T17:47:42.000Z',
        updated_at: '2018-06-24T17:47:42.000Z' },
    { id: 15,
        sample_time: '2018-06-24T09:50:01.000Z',
        cubic_meters: 30,
        created_at: '2018-06-24T17:47:42.000Z',
        updated_at: '2018-06-24T17:47:42.000Z' } ] 
];
      