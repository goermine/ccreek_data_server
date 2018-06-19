exports.up = function(knex){
    return knex.schema.createTable('data_weka_take_aggregate', function(t) {
        t.increments('id').primary();
        t.datetime('sample_time').notNullable();
        t.integer('cubic_meters').notNullable();
        t.timestamps(true, true);
    });
};
exports.down = (knex) => {
    return knex.schema.dropTableIfExists('data_weka_take_aggregate');
};