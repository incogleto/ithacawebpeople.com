import _ from 'lodash'

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
