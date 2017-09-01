
exports.up = function(knex, Promise) {
    return knex.schema.createTable('notes', function(t){
        t.increments().primary()
        t.integer('event_id').notNullable()
        t.string('email')
        t.string('title')
        t.text('body')
        t.timestamps(true, true)
    })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('notes')
}
