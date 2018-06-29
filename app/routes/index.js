var express = require('express');
var router = express.Router();
const oneDayDataFrom = require('../services/data_service').oneDayDataFrom;
const knex  = require('../../config/knex');

const wekaTable  = knex(process.env.TABLE_WEKA);
const waitinoTable = knex(process.env.TABLE_WAITINO);

const wekaData = oneDayDataFrom(wekaTable);
const waitinoData = oneDayDataFrom(waitinoTable);

router.get('/weka-data', (req, res) => {
    wekaData(process.env.QUERY_DATETIME_ATTR).then((result) => {
        // res.append('Access-Control-Allow-Origin', ['*']);
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
  
});

router.get('/waitino-data', (req, res) => {
    waitinoData(process.env.QUERY_DATETIME_ATTR).then((result) => {
        // res.append('Access-Control-Allow-Origin', ['*']);
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });

});

module.exports = router;
