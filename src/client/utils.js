import _ from 'lodash'

// query events
export const getEvents = async params => {
    params = _.pick(params, ['limit', 'before', 'after', 'order', 'orderBy'])

    // build query string from params
    const qs = _.keys(params).filter(key => {
        return params[key]
    }).map(key => {
        return `${key}=${params[key]}`
    }).join('&')

    // run request, get as json
    const json = await fetch(`/api/events?${ qs }`, { credentials: 'same-origin' }).then(r => r.json())
    if ( !_.get(json, 'meta.success') ) throw new Error(_.get(json, 'meta.message') || 'Error fetching events')

    // all good, return data
    return json.data
}

// get single event
export const getEvent = async id => {
    const json = await fetch(`/api/events/${ id }`, { credentials: 'same-origin' }).then(r => r.json())
    if ( !_.get(json, 'meta.success') ) throw new Error(_.get(json, 'meta.message') || 'Error fetching events')

    // all good, return data
    return json.data
}

// get notes for single event
export const getNotes = async event_id => {
    const json = await fetch(`/api/events/${ event_id }/notes`, { credentials: 'same-origin' }).then(r => r.json())
    if ( !_.get(json, 'meta.success') ) throw new Error(_.get(json, 'meta.message') || 'Error fetching events')

    // all good, return data
    return json.data
}

// search for events
export const searchEvents = async search => {
    const json = await fetch(`/api/events/?s=${ search }`, { credentials: 'same-origin' }).then(r => r.json())
    if ( !_.get(json, 'meta.success') ) throw new Error(_.get(json, 'meta.message') || 'Error fetching events')

    // all good, return data
    return json.data
}

export const getSelf = async () => {
    const json = await fetch(`/api/self`, { credentials: 'same-origin' }).then(r => r.json())
    if ( !_.get(json, 'meta.success') ) throw new Error(_.get(json, 'meta.message') || 'Error fetching events')

    // all good, return data
    const user = json.data.email ? json.data : null
    return user
}

// save new note to event
export const saveNote = async (event_id, params) => {

    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    const ops = {
        headers,
        method: 'POST',
        body: JSON.stringify(_.pick(params, ['email', 'body'])),
        credentials: 'same-origin'
    }
    const json = await fetch(`/api/events/${ event_id }/notes`, ops).then(r => r.json())
    if ( !_.get(json, 'meta.success') ) throw new Error(_.get(json, 'meta.message') || 'Error fetching events')

    // all good, return data
    return json.data
}
