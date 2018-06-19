var knex  = require('../../db/index');


const baseQuery = (queryTable, query_attr, dateTime = new Date()) => {
    return queryTable.where(`${query_attr}`, '>=' ,  knex.raw(' ? - INTERVAL 1 DAY', dateTime));
};

// Step 2
const baseQuery = knex('data_waitino_take_aggregate');

// Step 3
const applyTitleFilter = filterByTitle(5);

// Step 4
const completedQuery = applyTitleFilter(baseQuery);

completedQuery.then((result) => {console.log(result);});

// SELECT * FROM mytable WHERE record_date >= NOW() - INTERVAL 1 DAY