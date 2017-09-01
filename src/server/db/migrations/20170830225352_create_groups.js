
exports.up = function(knex, Promise) {
    return knex.schema.createTable('groups', function(t){
        t.increments().primary()
        t.string('foreign_id').notNullable()
        t.string('title')
        t.integer('members')
        t.text('permalink')
        t.text('description')
        t.timestamps(true, true)
    })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('groups')
}
