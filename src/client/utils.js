import _ from 'lodash'

// query events
export const getEvents = async params => {

    params = _.pick(params, ['limit', 'before'])

    if ( params.after ){
        params.order = 'ASC'
        params.after = params.after
    }

    // build query string from params
    const qs = _.keys(params).filter(key => {
        return params[key]
    }).map(key => {
        return `${key}=${params[key]}`
    }).join('&')

    // run request, get as json
    const json = await fetch(`/api/events?${ qs }`).then(r => r.json())
    if ( !_.get(json, 'meta.success') ) throw new Error(_.get(json, 'meta.message') || 'Error fetching events')

    // all good, return data
    return json.data
}

// get single event
export const getEvent = async id => {
    const json = await fetch(`/api/events/${ id }`).then(r => r.json())
    if ( !_.get(json, 'meta.success') ) throw new Error(_.get(json, 'meta.message') || 'Error fetching events')

    // all good, return data
    return json.data
}

// get notes for single event
export const getNotes = async event_id => {
    const json = await fetch(`/api/events/${ event_id }/notes`).then(r => r.json())
    if ( !_.get(json, 'meta.success') ) throw new Error(_.get(json, 'meta.message') || 'Error fetching events')

    // all good, return data
    return json.data
}

// search for events
export const searchEvents = async search => {
    const json = await fetch(`/api/events/?s=${ search }`).then(r => r.json())
    if ( !_.get(json, 'meta.success') ) throw new Error(_.get(json, 'meta.message') || 'Error fetching events')

    // all good, return data
    return json.data
}

// save new note to event
export const saveNote = async (event_id, params) => {

    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    const ops = {
        headers,
        method: 'POST',
        body: JSON.stringify(_.pick(params, ['email', 'body']))
    }
    const json = await fetch(`/api/events/${ event_id }/notes`, ops).then(r => r.json())
    if ( !_.get(json, 'meta.success') ) throw new Error(_.get(json, 'meta.message') || 'Error fetching events')

    // all good, return data
    return json.data
}
