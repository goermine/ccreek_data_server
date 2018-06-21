var knex  = require('../../db/index');

module.exports = {
    dayTimeQuery: (queryTable, queryAttr, dateTime = new Date()) => {
        return queryTable.where(`${queryAttr}`, '>=' ,  knex.raw('? - INTERVAL 1 DAY', dateTime));
    }
};