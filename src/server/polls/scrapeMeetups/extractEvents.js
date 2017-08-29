import _ from 'lodash'

export default $ => {

    // pull data from on-page schema
    const schema = $('script[type="application/ld+json"]').html()
    const evtData = _.first(JSON.parse(schema))

    const permalink = evtData.url
    const addressFields = [
        'name',
        'addressCountry',
        'postalCode',
        'streetAddress',
        'addressLocality',
        'addressRegion'
    ]

    // format
    return {
        foreign_id: permalink.split('/').filter(v => v).pop(),
        title: evtData.name || $('#event-title').text(),
        permalink: permalink,
        date: evtData.startDate,
        description: $('div[itemprop="description"]').text().trim(),
        geo: _.pick(evtData.geo, ['latitude', 'longitude']),
        address: {
            name: evtData.location.name,
            ..._.pick(evtData.location.address, addressFields)
        }
    }
}
