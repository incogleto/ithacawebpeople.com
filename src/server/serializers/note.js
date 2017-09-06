import _ from 'lodash'

export default note => {
    return _.pick(note, ['id', 'event_id', 'email', 'title', 'body', 'verified', 'created_at'])
}
