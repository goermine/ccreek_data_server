const knex  = require('../../config/knex');

module.exports = {
    oneDayDataFrom: (query) => {
        return (queryAttr, dateTime = new Date()) => {
            return query.where(`${queryAttr}`, '>=' ,  knex.raw('? - INTERVAL 1 DAY', dateTime)); 
        };       
    }
};

// Promise.all([
//     completedWaitino,
//     completedWeka
// ]).then(results => {
//     console.log(results);
// });