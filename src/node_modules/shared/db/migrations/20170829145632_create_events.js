
exports.up = function(knex, Promise) {
    return knex.schema.createTable('events', function(t){
        t.increments().primary()
        t.string('foreign_id').notNullable()
        t.string('title')
        t.text('permalink')
        t.timestamp('date')
        t.text('description')
        t.jsonb('geo')
        t.jsonb('address')
        t.timestamps(true, true)
    })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('events')
}
