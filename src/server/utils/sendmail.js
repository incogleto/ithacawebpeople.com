import mailcomposer from 'mailcomposer'
import MG from 'mailgun-js'

const { MAILGUN_SECRET, MAILGUN_DOMAIN } = process.env

let mailgun = false
if ( MAILGUN_SECRET && MAILGUN_DOMAIN )
    mailgun = MG({ apiKey: MAILGUN_SECRET, domain: MAILGUN_DOMAIN })

export default (ops) => {
    return new Promise((resolve, reject) => {
        if ( !mailgun ) return reject()

        const settings = {
            subject: 'Message Verifiction',
            body: '',
            ...ops,
            from: `Ithaca Web People <bot@${ MAILGUN_DOMAIN }>`
        }

        // no recipient
        if ( !settings.to ) return reject()

        const mail = mailcomposer(settings)
        return mail.build((err, message) => {
            if (err) return reject(err)

            var dataToSend = {
                to: settings.to,
                message: message.toString('ascii')
            }

            // send the message with mailgun
            return mailgun.messages().sendMime(dataToSend, (err, body) => {
                if (err) return reject(err)
                resolve()
            })
        })
    })
}
