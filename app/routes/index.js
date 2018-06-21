var express = require('express');
var router = express.Router();
const dataQuery = require('../services/data_service').dayTimeQuery;
const knex  = require('../../db/index');

const knex_weka = knex(process.env.TABLE_WEKA);
const knex_waitino = knex(process.env.TABLE_WAITINO);


router.get('/weka-data', (req, res) => {
    dataQuery(knex_weka, process.env.QUERY_DATETIME_ATTR).then((result) => {
        // res.append('Access-Control-Allow-Origin', ['*']);
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });
  
});

router.get('/waitino-data', (req, res) => {
    dataQuery(knex_waitino , process.env.QUERY_DATETIME_ATTR).then((result) => {
        // res.append('Access-Control-Allow-Origin', ['*']);
        res.send(result);
    }).catch((err) => {
        res.send(err);
    });

});

module.exports = router;
