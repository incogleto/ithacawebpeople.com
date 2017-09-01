
export default $ => {

    const permalink = $('meta[property="og:url"]').attr('content')

    // format
    return {
        foreign_id: permalink.replace('https://www.meetup.com/', ''),
        title: $('meta[property="og:title"]').attr('content'),
        permalink: permalink,
        description: String($('#groupDesc').html()).trim(),
        members: $('#C_nav ul').first().find('li:first-child .align-right').text()
    }
}
