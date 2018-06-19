const helper = require('../seeds_helper');  

exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('data_weka_take_aggregate').del()
        .then(function () {
            // Inserts seed entries
            return knex('data_weka_take_aggregate').insert(
                helper.timeList(11).reduce((collector, value, index)=>{
                    if(index !== 0){
                        collector.push(
                            {
                                id: index, 
                                sample_time: value, 
                                cubic_meters: (Math.random() * 100)
                            }
                        );
                        return collector;
                    }
                    return collector;
                }, [])
            );
        });
};
